
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

const platformIcons: Record<string, JSX.Element> = {
  facebook: <Facebook className="h-5 w-5" />,
  instagram: <Instagram className="h-5 w-5" />,
  twitter: <Twitter className="h-5 w-5" />,
  tiktok: <TikTok />,
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
  const [quantity, setQuantity] = useState(1);
  const [link, setLink] = useState('');
  const [purchasing, setPurchasing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const defaultTab = searchParams.get('platform') || 'all';

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
    setQuantity(1);
    setLink('');
    setDialogOpen(true);
  };

  const handleConfirmPurchase = async () => {
    if (!user || !selectedService) return;
    
    const totalCost = selectedService.price * quantity;
    
    if (walletBalance < totalCost) {
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
      setQuantity(1);
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
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading services...</p>
        </div>
      ) : filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <Card key={service.id} className="card-hover">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                    {platformIcons[service.platform]}
                  </div>
                </div>
                <CardDescription>{service.platform.charAt(0).toUpperCase() + service.platform.slice(1)}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 min-h-[60px]">{service.description}</p>
                <div className="mt-4 flex items-center text-2xl font-bold text-primary">
                  <DollarSign className="h-5 w-5" />
                  {service.price.toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground">per unit</p>
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
        <div className="text-center py-12">
          <p className="text-muted-foreground">No services found for this platform.</p>
        </div>
      )}
    </>
  );

  return (
    user ? <DashboardLayout> 
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Services</h1>
          <p className="text-muted-foreground">
            Browse our social media promotion services.
          </p>
        </div>

        <Tabs defaultValue={defaultTab} onValueChange={handleTabChange}>
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="facebook">Facebook</TabsTrigger>
              <TabsTrigger value="instagram">Instagram</TabsTrigger>
              <TabsTrigger value="twitter">Twitter</TabsTrigger>
              <TabsTrigger value="tiktok">TikTok</TabsTrigger>
            </TabsList>
            <div className="text-sm text-muted-foreground">
              Wallet Balance: <span className="font-semibold text-primary">${walletBalance.toFixed(2)}</span>
            </div>
          </div>
          <TabsContent value="all" className="mt-6">
            <ServiceList />
          </TabsContent>
          <TabsContent value="facebook" className="mt-6">
            <ServiceList />
          </TabsContent>
          <TabsContent value="instagram" className="mt-6">
            <ServiceList />
          </TabsContent>
          <TabsContent value="twitter" className="mt-6">
            <ServiceList />
          </TabsContent>
          <TabsContent value="tiktok" className="mt-6">
            <ServiceList />
          </TabsContent>
        </Tabs>
      </div>

      {/* Purchase Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
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
                  variant="outline" 
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >-</Button>
                <Input 
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="text-center"
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                >+</Button>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between mb-2">
                <span>Price per unit:</span>
                <span>${selectedService?.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Quantity:</span>
                <span>{quantity}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span className="text-primary">
                  ${selectedService && (selectedService.price * quantity).toFixed(2)}
                </span>
              </div>
              
              {selectedService && walletBalance < (selectedService.price * quantity) && (
                <div className="mt-2 text-sm text-red-500">
                  You don't have enough funds. Please add more to your wallet.
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
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
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Browse our range of social media promotion services to boost your online presence.
          </p>
        </div>

        <Tabs defaultValue={defaultTab} onValueChange={handleTabChange}>
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="facebook">Facebook</TabsTrigger>
              <TabsTrigger value="instagram">Instagram</TabsTrigger>
              <TabsTrigger value="twitter">Twitter</TabsTrigger>
              <TabsTrigger value="tiktok">TikTok</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="all" className="mt-6">
            <ServiceList />
          </TabsContent>
          <TabsContent value="facebook" className="mt-6">
            <ServiceList />
          </TabsContent>
          <TabsContent value="instagram" className="mt-6">
            <ServiceList />
          </TabsContent>
          <TabsContent value="twitter" className="mt-6">
            <ServiceList />
          </TabsContent>
          <TabsContent value="tiktok" className="mt-6">
            <ServiceList />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Services;
