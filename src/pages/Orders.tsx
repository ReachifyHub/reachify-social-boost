import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import DashboardLayout from '@/components/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink, Clock, CheckCircle, AlertTriangle, RotateCw } from 'lucide-react';

interface Order {
  id: number;
  service_id: number;
  link: string;
  quantity: number;
  status?: string;
  created_at: string;
  service: {
    name: string;
    platform: string;
    price: number;
  };
}

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          service:service_id (
            name,
            platform,
            price
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching orders:', error.message);
      } else {
        setOrders(data || []);
      }

      setLoading(false);
    };

    fetchOrders();
  }, [user]);

  const filterOrders = (status: string) => orders.filter(o => o.status === status);

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6 px-4 sm:px-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">
            Track and manage your promotion service orders.
          </p>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="flex overflow-x-auto whitespace-nowrap pb-2 gap-2 no-scrollbar">
            <TabsTrigger value="all" className="text-xs sm:text-sm">All</TabsTrigger>
<TabsTrigger value="pending" className="text-xs sm:text-sm">Pending</TabsTrigger>
<TabsTrigger value="processing" className="text-xs sm:text-sm">Processing</TabsTrigger>
<TabsTrigger value="completed" className="text-xs sm:text-sm">Completed</TabsTrigger>
<TabsTrigger value="cancelled" className="text-xs sm:text-sm">Cancelled</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <OrdersList orders={orders} loading={loading} emptyMessage="No orders found." />
          </TabsContent>
          <TabsContent value="pending" className="mt-6">
            <OrdersList orders={filterOrders('pending')} loading={loading} emptyMessage="No pending orders." />
          </TabsContent>
          <TabsContent value="processing" className="mt-6">
            <OrdersList orders={filterOrders('processing')} loading={loading} emptyMessage="No processing orders." />
          </TabsContent>
          <TabsContent value="completed" className="mt-6">
            <OrdersList orders={filterOrders('completed')} loading={loading} emptyMessage="No completed orders." />
          </TabsContent>
          <TabsContent value="cancelled" className="mt-6">
            <OrdersList orders={filterOrders('cancelled')} loading={loading} emptyMessage="No cancelled orders." />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

interface OrdersListProps {
  orders: Order[];
  loading: boolean;
  emptyMessage: string;
}

const OrdersList = ({ orders, loading, emptyMessage }: OrdersListProps) => {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Loading orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'processing': return <RotateCw className="h-5 w-5 text-blue-500" />;
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'cancelled': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default: return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-300 bg-yellow-50">Pending</Badge>;
      case 'processing':
        return <Badge variant="outline" className="text-blue-600 border-blue-300 bg-blue-50">Processing</Badge>;
      case 'completed':
        return <Badge variant="outline" className="text-green-600 border-green-300 bg-green-50">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="text-red-600 border-red-300 bg-red-50">Cancelled</Badge>;
      default:
        return null;
    }
  };

  const getPlatformBadge = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return <Badge variant="outline" className="text-blue-600 border-blue-300 bg-blue-50">Facebook</Badge>;
      case 'instagram':
        return <Badge variant="outline" className="text-pink-600 border-pink-300 bg-pink-50">Instagram</Badge>;
      case 'twitter':
        return <Badge variant="outline" className="text-blue-400 border-blue-200 bg-blue-50">Twitter</Badge>;
      case 'tiktok':
        return <Badge variant="outline" className="text-black border-gray-300 bg-gray-50">TikTok</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {orders.map((order) => {
        const status = order.status || 'unknown';
        return (
          <Card key={order.id}>
            <CardHeader className="py-4 px-6">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div>
                  <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                  <CardDescription>
                    Placed on {new Date(order.created_at).toLocaleDateString()}
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  {getPlatformBadge(order.service.platform)}
                  {getStatusBadge(status)}
                </div>
              </div>
            </CardHeader>
            <CardContent className="py-0 px-6">
              <div className="border-t pt-4 pb-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Service</h3>
                    <p className="font-medium">{order.service.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Quantity</h3>
                    <p className="font-medium">{order.quantity}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Link</h3>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-sm truncate max-w-[300px] sm:max-w-[400px]">{order.link}</p>
                      <a href={order.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Price</h3>
                    <p className="font-medium">${(order.service.price * order.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <div className="px-6 py-4 bg-gray-50 rounded-b-lg border-t">
              <div className="flex items-center">
                {getStatusIcon(status)}
                <div className="ml-2">
                  <h3 className="font-medium">
                    Status: <span className="font-normal">{status.charAt(0).toUpperCase() + status.slice(1)}</span>
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {status === 'pending' && 'Your order is being reviewed.'}
                    {status === 'processing' && 'Your order is being processed.'}
                    {status === 'completed' && 'Your order has been completed.'}
                    {status === 'cancelled' && 'Your order has been cancelled.'}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default Orders;
    