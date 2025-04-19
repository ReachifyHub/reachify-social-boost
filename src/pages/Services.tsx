import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import DashboardLayout from '@/components/DashboardLayout';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Facebook, Instagram, Twitter, Loader2 } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile'; // Ensure this hook is safe and implemented correctly
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const TikTok = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
        <path d="M15 8h.01" />
        <path d="M9 0h6v12h-6z" />
        <path d="M15 2a4 4 0 0 0 4 4V0h-4z" />
    </svg>
);

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
    const navigate = useNavigate();
    const { toast } = useToast();
    const isMobile = useIsMobile();

    const [allServices, setAllServices] = useState<Service[]>([]);
    const [walletBalance, setWalletBalance] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [fetchError, setFetchError] = useState<string | null>(null);

    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [quantity, setQuantity] = useState<number>(1000);
    const [link, setLink] = useState<string>('');
    const [purchasing, setPurchasing] = useState<boolean>(false);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    const currentTab = useMemo(() => searchParams.get('platform') || 'all', [searchParams]);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        setFetchError(null);

        const fetchData = async () => {
            try {
                const { data: servicesData, error: servicesError } = await supabase
                    .from('services')
                    .select('*')
                    .order('platform');

                if (servicesError) throw new Error(`Failed to fetch services: ${servicesError.message}`);
                if (isMounted) {
                    setAllServices(servicesData || []);
                }

                if (user) {
                    const { data: walletData, error: walletError } = await supabase
                        .from('wallets')
                        .select('balance')
                        .eq('user_id', user.id)
                        .single();

                    if (walletError && walletError.code !== 'PGRST116') {
                        console.warn('Error fetching wallet:', walletError);
                        if (isMounted) setWalletBalance(0);
                    } else if (isMounted) {
                        setWalletBalance(walletData?.balance ?? 0);
                    }
                } else {
                     if (isMounted) setWalletBalance(0);
                }

            } catch (error) {
                console.error('Data fetching error:', error);
                if (isMounted) {
                    setFetchError(error instanceof Error ? error.message : 'An unknown error occurred while fetching data.');
                    setAllServices([]);
                    setWalletBalance(0);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [user]);

    const filteredServices = useMemo(() => {
        if (currentTab === 'all') {
            return allServices;
        }
        return allServices.filter(service => service.platform === currentTab);
    }, [allServices, currentTab]);

    const handleTabChange = useCallback((value: string) => {
        const newParams = new URLSearchParams(searchParams);
        if (value === 'all') {
            newParams.delete('platform');
        } else {
            newParams.set('platform', value);
        }
        setSearchParams(newParams);
    }, [searchParams, setSearchParams]);

    const handleOpenPurchaseDialog = useCallback((service: Service) => {
        if (!user) {
            toast({
                title: "Authentication Required",
                description: "Please log in or sign up to purchase services.",
                variant: "destructive",
            });
            navigate('/login');
            return;
        }
        setSelectedService(service);
        setLink('');
        setQuantity(1000);
        setDialogOpen(true);
    }, [user, navigate, toast]);

    const handleDialogStateChange = useCallback((open: boolean) => {
        setDialogOpen(open);
        if (!open) {
            setSelectedService(null);
            setLink('');
            setQuantity(1000);
            setPurchasing(false);
        }
    }, []);

    const handleConfirmPurchase = async () => {
        if (!selectedService || !user || !link.trim() || quantity < 100) {
             toast({
                title: "Invalid Input",
                description: "Please ensure you've entered a valid link and quantity (minimum 100).",
                variant: "destructive",
            });
            return;
        }

        const totalCost = (selectedService.price / 1000) * quantity;
        const roundedTotalCost = parseFloat(totalCost.toFixed(2));

        if (walletBalance < roundedTotalCost) {
            toast({
                title: "Insufficient Funds",
                description: "Please add funds to your wallet to complete this purchase.",
                variant: "destructive",
            });
            navigate('/wallet/add-funds');
            setDialogOpen(false);
            return;
        }

        setPurchasing(true);

        try {
            // Consider using a Supabase Edge Function for atomic transactions in production
            const { data: orderData, error: orderError } = await supabase
                .from('orders')
                .insert({
                    user_id: user.id,
                    service_id: selectedService.id,
                    link: link.trim(),
                    quantity: quantity,
                    status: 'pending',
                    amount: roundedTotalCost,
                })
                .select('id')
                .single();

            if (orderError || !orderData) throw new Error(orderError?.message || 'Failed to create order record.');

            const { error: transactionError } = await supabase
                .from('transactions')
                .insert({
                    user_id: user.id,
                    amount: -roundedTotalCost,
                    type: 'purchase',
                    description: `Order #${orderData.id} (${selectedService.name})`,
                    order_id: orderData.id,
                });

             if (transactionError) throw new Error(transactionError.message || 'Failed to log transaction.');

            const newBalance = parseFloat((walletBalance - roundedTotalCost).toFixed(2));
            const { error: walletError } = await supabase
                .from('wallets')
                .update({ balance: newBalance })
                .eq('user_id', user.id);

            if (walletError) throw new Error(walletError.message || 'Failed to update wallet balance.');

            setWalletBalance(newBalance);
            toast({
                title: "Purchase Successful!",
                description: `Your order for ${quantity} ${selectedService.name} has been placed.`,
            });

            setDialogOpen(false);
            navigate('/orders');

        } catch (error) {
            console.error('Purchase error:', error);
            toast({
                title: "Purchase Failed",
                description: error instanceof Error ? error.message : "An unknown error occurred. Please try again.",
                variant: "destructive",
            });
        } finally {
            setPurchasing(false);
        }
    };

    const renderServiceList = () => {
        if (loading) {
            return (
                <div className="flex justify-center items-center py-12">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    <p className="ml-4 text-muted-foreground">Loading services...</p>
                </div>
            );
        }

        if (fetchError) {
            return (
                <div className="text-center py-12 text-destructive">
                    <p>Error loading services.</p>
                    <p className="text-sm">{fetchError}</p>
                </div>
            );
        }

        if (filteredServices.length === 0) {
            return (
                <div className="text-center py-12 text-muted-foreground">
                    <p>No services found for '{currentTab === 'all' ? 'any platform' : currentTab}'.</p>
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredServices.map((service) => (
                    <Card key={service.id} className="flex flex-col justify-between transition-shadow duration-200 hover:shadow-md">
                        <CardHeader>
                            <div className="flex items-center justify-between mb-1">
                                <CardTitle className="text-base sm:text-lg">{service.name}</CardTitle>
                                <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300">
                                    {platformIcons[service.platform] || null}
                                </div>
                            </div>
                            <CardDescription>{service.platform}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 min-h-[40px] sm:min-h-[60px]">
                                {service.description}
                            </p>
                            <div className="mt-3 sm:mt-4 flex items-baseline text-xl sm:text-2xl font-bold text-primary">
                                <NairaIcon />
                                {service.price.toFixed(2)}
                                <span className="text-xs text-muted-foreground font-normal ml-1"> / 1000</span>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" onClick={() => handleOpenPurchaseDialog(service)} aria-label={`Order ${service.name}`}>
                                Order Now
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        );
    };

    const calculatedTotalPrice = useMemo(() => {
        if (!selectedService) return 0;
        return (selectedService.price / 1000) * quantity;
    }, [selectedService, quantity]);

     const isPurchaseDisabled = useMemo(() => {
        if (!selectedService || purchasing || !link.trim() || quantity < 100) return true;
        return walletBalance < calculatedTotalPrice;
    }, [selectedService, purchasing, link, quantity, walletBalance, calculatedTotalPrice]);

    const MainContent = () => (
        <div className="space-y-6">
            {user && (
                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Services</h1>
                        <p className="text-sm sm:text-base text-muted-foreground mt-1">
                            Browse and order social media promotion services.
                        </p>
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
                        Wallet Balance: <span className="font-semibold text-primary text-base">₦{walletBalance.toFixed(2)}</span>
                    </div>
                </div>
            )}
            {!user && (
                 <div className="text-center mb-8 sm:mb-12">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">Our Services</h1>
                    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Boost your online presence. Log in or sign up to order.
                    </p>
                </div>
            )}

            <Tabs value={currentTab} onValueChange={handleTabChange}>
                <TabsList className={`grid ${isMobile ? 'grid-cols-5' : 'w-full sm:w-auto'} gap-1 h-auto p-1`}>
                    <TabsTrigger value="all" className={`flex-1 ${isMobile ? 'text-xs px-1' : 'px-3'}`}>All</TabsTrigger>
                    <TabsTrigger value="Facebook" className={`flex-1 ${isMobile ? 'text-xs px-1' : 'px-3'}`}>Facebook</TabsTrigger>
                    <TabsTrigger value="Instagram" className={`flex-1 ${isMobile ? 'text-xs px-1' : 'px-3'}`}>Instagram</TabsTrigger>
                    <TabsTrigger value="Twitter" className={`flex-1 ${isMobile ? 'text-xs px-1' : 'px-3'}`}>Twitter</TabsTrigger>
                    <TabsTrigger value="TikTok" className={`flex-1 ${isMobile ? 'text-xs px-1' : 'px-3'}`}>TikTok</TabsTrigger>
                </TabsList>

                <div className="mt-4 sm:mt-6">
                    {renderServiceList()}
                </div>
            </Tabs>
        </div>
    );

    return (
        <>
            {user ? (
                <DashboardLayout>
                    <MainContent />
                </DashboardLayout>
            ) : (
                <Layout>
                    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                       <MainContent />
                    </div>
                </Layout>
            )}

            <Dialog open={dialogOpen} onOpenChange={handleDialogStateChange}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Order: {selectedService?.name ?? 'Service'}</DialogTitle>
                        <DialogDescription>
                           Enter the link and quantity for your order.
                        </DialogDescription>
                    </DialogHeader>
                    {selectedService && (
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="link">Social Media Link</Label>
                                <Input
                                    id="link"
                                    placeholder="e.g., https://www.instagram.com/p/..."
                                    value={link}
                                    onChange={(e) => setLink(e.target.value)}
                                    disabled={purchasing}
                                />
                                <p className="text-xs text-muted-foreground">
                                    Link to the profile, post, or video.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="quantity">Quantity (Min: 100)</Label>
                                <div className="flex items-center space-x-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => setQuantity((prev) => Math.max(100, prev - 100))}
                                        disabled={quantity <= 100 || purchasing}
                                        aria-label="Decrease quantity by 100"
                                    > - </Button>
                                    <Input
                                        id="quantity"
                                        type="number"
                                        min="100"
                                        step="100"
                                        value={quantity}
                                        onChange={(e) => {
                                            const value = parseInt(e.target.value, 10);
                                            setQuantity(isNaN(value) ? 100 : Math.max(100, value));
                                        }}
                                        className="text-center"
                                        disabled={purchasing}
                                        aria-label="Order quantity"
                                    />
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => setQuantity(quantity + 100)}
                                        disabled={purchasing}
                                        aria-label="Increase quantity by 100"
                                    > + </Button>
                                </div>
                            </div>
                            <div className="space-y-1 border-t pt-4 mt-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Price / 1000:</span>
                                    <span className="font-medium">
                                        ₦{selectedService.price.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Total Quantity:</span>
                                    <span className="font-medium">{quantity.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between font-semibold text-base">
                                    <span>Total Price:</span>
                                    <span className="text-primary">
                                        ₦{calculatedTotalPrice.toFixed(2)}
                                    </span>
                                </div>
                                 <div className