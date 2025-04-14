import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import DashboardLayout from '@/components/DashboardLayout';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Facebook, Instagram, Twitter, DollarSign } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Custom TikTok icon
const TikTok = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
    <path d="M15 8h.01" />
    <path d="M9 0h6v12h-6z" />
    <path d="M15 2a4 4 0 0 0 4 4V0h-4z" />
  </svg>
);

// Custom Naira icon component
const NairaIcon = () => (
  <span className="text-lg font-bold mr-0.5">₦</span>
);

const platformIcons: Record<string, JSX.Element> = {
  Facebook: <Facebook className="h-5 w-5" />,
  Instagram: <Instagram className="h-5 w-5" />,
  Twitter: <Twitter className="h-5 w-5" />,
  TikTok: <TikTok />,
};

interface Service {
  id: number;
  name: string;
  platform: string;
  price: number;
  description: string;
}

const Services = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [walletBalance, setWalletBalance] = useState(0);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [quantity, setQuantity] = useState(1000);
  const [link, setLink] = useState('');
  const [purchasing, setPurchasing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const defaultTab = searchParams.get('platform') || 'all';
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .order('platform');

        if (error) {
          console.error('Error fetching services:', error);
          return;
        }

        setServices(data || []);
        
        // Apply initial filter if platform parameter exists
        if (defaultTab && defaultTab !== 'all') {
          setFilteredServices(data.filter(service => service.platform === defaultTab));
        } else {
          setFilteredServices(data || []);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchWalletBalance = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('wallets')
          .select('balance')
          .eq('user_id', user.id)
          .single();

        if (error) {
          console.error('Error fetching wallet:', error);
          return;
        }

        setWalletBalance(data?.balance || 0);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchServices();
    if (user) {
      fetchWalletBalance();
    }
  }, [user, defaultTab]);

  const handleTabChange = (value: string) => {
    if (value === 'all') {
      setFilteredServices(services);
      searchParams.delete('platform');
    } else {
      setFilteredServices(services.filter(service => service.platform === value));
      searchParams.set('platform', value);
    }
    setSearchParams(searchParams);
  };

  const handlePurchase = (service: Service) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to purchase services",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    setSelectedService(service);
    setQuantity(0);
    setLink('');
    setDialogOpen(true);
  };

  const handleConfirmPurchase = async () => {
    if (!user || !selectedService) return;
    
    const totalCost = (selectedService.price / 1000) * quantity;
    
    if (Number(walletBalance.toFixed(2)) < Number(totalCost.toFixed(2))) {
      toast({
        title: "Insufficient Funds",
        description: "Please add more funds to your wallet to complete this purchase",
        variant: "destructive",
      });
      setDialogOpen(false);
      navigate('/wallet/add-funds');
      return;
    }
    
    if (!link) {
      toast({
        title: "Link Required",
        description: "Please enter a valid social media link",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setPurchasing(true);
      
      // 1. Create order
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          service_id: selectedService.id,
          link: link,
          quantity: quantity,
          status: 'pending',
        })
        .select()
        .single();
        
      if (orderError) {
        throw orderError;
      }
      
      // 2. Create transaction record
      const { error: transactionError } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          amount: totalCost,
          type: 'purchase',
        });
        
      if (transactionError) {
        throw transactionError;
      }
      
      // 3. Update wallet balance
      const newBalance = walletBalance - totalCost;
      const { error: walletError } = await supabase
        .from('wallets')
        .update({ balance: newBalance })
        .eq('user_id', user.id);
        
      if (walletError) {
        throw walletError;
      }
      
      // Update local wallet balance
      setWalletBalance(newBalance);
      
      // Success message
      toast({
        title: "Purchase Successful",
        description: `You have successfully ordered ${selectedService.name}`,
      });
      
      // Close dialog and reset fields
      setDialogOpen(false);
      setQuantity(1000);
      setLink('');
      
      // Navigate to orders page
      navigate('/orders');
    } catch (error) {
      console.error('Error processing purchase:', error);
      toast({
        title: "Purchase Failed",
        description: "There was an error processing your purchase. Please try again.",
        variant: "destructive",
      });
    } finally {
      setPurchasing(false);
    }
  };

  const ServiceList = () => (
    <>
      {loading ? (
        <div className="text-center py-8 sm:py-12">
          <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground">Loading services...</p>
        </div>
      ) : filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredServices.map((service) => (
            <Card key={service.id} className="card-hover">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base sm:text-lg">{service.name}</CardTitle>
                  <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-gray-100 flex items-center justify-center">
                    {platformIcons[service.platform]}
                  </div>
                </div>
                <CardDescription>{service.platform.charAt(0).toUpperCase() + service.platform.slice(1)}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xs sm:text-sm text-gray-600 min-h-[40px] sm:min-h-[60px]">{service.description}</p>
                <div className="mt-3 sm:mt-4 flex items-center text-xl sm:text-2xl font-bold text-primary">
                  <NairaIcon />
                  {service.price.toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground">per 1000</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handlePurchase(service)}>
                  Order Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 sm:py-12">
          <p className="text-sm sm:text-base text-muted-foreground">No services found for this platform.</p>
        </div>
      )}
    </>
  );

  return (
    user ? <DashboardLayout> 
      <div className="space-y-4 sm:space-y-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Services</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Browse our social media promotion services.
          </p>
        </div>

        <Tabs defaultValue={defaultTab} onValueChange={handleTabChange}>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
            <TabsList className="flex overflow-x-auto pb-2 gap-1 no-scrollbar">
            <TabsTrigger value="all" className="px-3 py-1 text-sm">All</TabsTrigger>
            <TabsTrigger value="Facebook" className="px-3 py-1 text-sm">Facebook</TabsTrigger>
            <TabsTrigger value="Instagram" className="px-3 py-1 text-sm">Instagram</TabsTrigger>
            <TabsTrigger value="Twitter" className="px-3 py-1 text-sm">Twitter</TabsTrigger>
            <TabsTrigger value="TikTok" className="px-3 py-1 text-sm">TikTok</TabsTrigger>
            </TabsList>
            <div className="text-xs sm:text-sm text-muted-foreground">
              Wallet Balance: <span className="font-semibold text-primary">₦{walletBalance.toFixed(2)}</span>
            </div>
          </div>
          <TabsContent value="all" className="mt-4 sm:mt-6">
            <ServiceList />
          </TabsContent>
          <TabsContent value="Facebook" className="mt-4 sm:mt-6">
            <ServiceList />
          </TabsContent>
          <TabsContent value="Instagram" className="mt-4 sm:mt-6">
            <ServiceList />
          </TabsContent>
          <TabsContent value="Twitter" className="mt-4 sm:mt-6">
            <ServiceList />
          </TabsContent>
          <TabsContent value="TikTok" className="mt-4 sm:mt-6">
            <ServiceList />
          </TabsContent>
        </Tabs>
      </div>

      {/* Purchase Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Order Service</DialogTitle>
            <DialogDescription>
              {selectedService && `You are about to order ${selectedService.name}`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="link">Social Media Link</Label>
              <Input 
                id="link" 
                placeholder="https://www.instagram.com/your_post" 
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Enter the link to the profile, post, or video you want to promote
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <div className="flex items-center space-x-2">
                
                 <Button
                onClick={() => setQuantity(prev => Math.max(100, Number(prev) - 100))}
                 >

</Button>
<Input
  id="quantity"
  type="number"
  min="100"
  value={quantity}
  onChange={(e) => {
    const value = Number(e.target.value);
    setQuantity(isNaN(value) ? 1 : value);
  }}
/>                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setQuantity(quantity + 100)}
                >+</Button>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between mb-2">
                <span>Price per 1000:</span>
                <span>₦{selectedService?.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Quantity:</span>
                <span>{quantity}</span>
              </div>
              <div className="flex justify-between font-bold">
  <span>Total:</span>
  <span className="text-primary">
    ₦{selectedService && ((selectedService.price / 1000) * quantity).toFixed(2)}
  </span>
</div>
              
              {selectedService && walletBalance < (selectedService.price * quantity) && (
                <div className="mt-2 text-sm text-red-500">
                  You don't have enough funds. Please add more to your wallet.
                </div>
              )}
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmPurchase} 
              disabled={
                purchasing || 
                !link || 
                (selectedService && walletBalance < (selectedService.price * quantity))
              }
            >
              {purchasing ? 'Processing...' : 'Confirm Order'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout> :
    <Layout>
      <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Our Services</h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Browse our range of social media promotion services to boost your online presence.
          </p>
        </div>

        <Tabs defaultValue={defaultTab} onValueChange={handleTabChange}>
          <div className="flex justify-center mb-6 sm:mb-8 overflow-x-auto">
            <TabsList className={`${isMobile ? 'grid grid-cols-5 w-full' : ''}`}>
              <TabsTrigger value="all" className={`${isMobile ? 'text-xs' : ''}`}>All</TabsTrigger>
              <TabsTrigger value="Facebook" className={`${isMobile ? 'text-xs' : ''}`}>Facebook</TabsTrigger>
              <TabsTrigger value="Instagram" className={`${isMobile ? 'text-xs' : ''}`}>Instagram</TabsTrigger>
              <TabsTrigger value="Twitter" className={`${isMobile ? 'text-xs' : ''}`}>Twitter</TabsTrigger>
              <TabsTrigger value="TikTok" className={`${isMobile ? 'text-xs' : ''}`}>TikTok</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="all" className="mt-4 sm:mt-6">
            <ServiceList />
          </TabsContent>
          <TabsContent value="Facebook" className="mt-4 sm:mt-6">
            <ServiceList />
          </TabsContent>
          <TabsContent value="Instagram" className="mt-4 sm:mt-6">
            <ServiceList />
          </TabsContent>
          <TabsContent value="Twitter" className="mt-4 sm:mt-6">
            <ServiceList />
          </TabsContent>
          <TabsContent value="TikTok" className="mt-4 sm:mt-6">
            <ServiceList />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Services;
