import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import DashboardLayout from '@/components/DashboardLayout';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
const NairaIcon = () => <span className="text-lg font-bold mr-0.5">₦</span>;

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
          setFilteredServices(data.filter((service) => service.platform === defaultTab));
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
      setFilteredServices(services.filter((service) => service.platform === value));
      searchParams.set('platform', value);
    }
    setSearchParams(searchParams);
  };

  const handlePurchase = (service: Service) => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please log in to purchase services',
        variant: 'destructive',
      });
      navigate('/login');
      return;
    }

    setSelectedService(service);
    setQuantity(1000);
    setLink('');
    setDialogOpen(true);
  };

  const handleConfirmPurchase = async () => {
    if (!link) {
      toast({
        title: 'Link Required',
        description: 'Please enter a valid social media link',
        variant: 'destructive',
      });
      return;
    }

    try {
      const totalCost = (selectedService.price / 1000) * quantity;

      if (walletBalance < totalCost) {
        toast({
          title: 'Insufficient Funds',
          description: 'Please add more funds to your wallet to complete this purchase',
          variant: 'destructive',
        });
        setDialogOpen(false);
        navigate('/wallet/add-funds');
        return;
      }

      setPurchasing(true);

      const { error: orderError } = await supabase.from('orders').insert({
        user_id: user.id,
        service_id: selectedService.id,
        link,
        quantity,
        status: 'pending',
      });

      if (orderError) throw orderError;

      // Deduct the balance
      setWalletBalance(walletBalance - totalCost);

      toast({
        title: 'Purchase Successful',
        description: `You have successfully ordered ${selectedService.name}`,
      });

      setDialogOpen(false);
      navigate('/orders');
    } catch (error) {
      console.error('Error processing purchase:', error);
      toast({
        title: 'Purchase Failed',
        description: 'There was an error processing your purchase. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setPurchasing(false);
    }
  };

  return (
    <div>
      {/* Rest of the JSX */}
    </div>
  );
};

export default Services;