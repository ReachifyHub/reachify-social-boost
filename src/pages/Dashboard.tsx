
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, Package, ShoppingCart, ArrowUpRight } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [walletBalance, setWalletBalance] = useState(0);
  const [activeOrders, setActiveOrders] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        if (!user) return;

        // Fetch wallet balance
        const { data: walletData, error: walletError } = await supabase
          .from('wallets')
          .select('balance')
          .eq('user_id', user.id)
          .single();

        if (walletError) {
          console.error('Error fetching wallet:', walletError);
        } else {
          setWalletBalance(walletData?.balance || 0);
        }

        // Fetch active orders count
        const { count: activeOrdersCount, error: activeOrdersError } = await supabase
          .from('orders')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .in('status', ['pending', 'processing']);

        if (activeOrdersError) {
          console.error('Error fetching active orders:', activeOrdersError);
        } else {
          setActiveOrders(activeOrdersCount || 0);
        }

        // Fetch total orders count
        const { count: totalOrdersCount, error: totalOrdersError } = await supabase
          .from('orders')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);

        if (totalOrdersError) {
          console.error('Error fetching total orders:', totalOrdersError);
        } else {
          setTotalOrders(totalOrdersCount || 0);
        }

        // Fetch recent transactions
        const { data: transactions, error: transactionsError } = await supabase
          .from('transactions')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5);

        if (transactionsError) {
          console.error('Error fetching transactions:', transactionsError);
        } else {
          setRecentTransactions(transactions || []);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your account and recent activity.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${walletBalance.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <Link to="/wallet/add-funds" className="text-primary inline-flex items-center">
                  Add funds <ArrowUpRight className="ml-1 h-3 w-3" />
                </Link>
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeOrders}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Orders in progress
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalOrders}</div>
              <p className="text-xs text-muted-foreground mt-1">
                All-time orders
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/services">
              <Button variant="outline" className="w-full">Browse Services</Button>
            </Link>
            <Link to="/wallet/add-funds">
              <Button variant="outline" className="w-full">Add Funds</Button>
            </Link>
            <Link to="/orders">
              <Button variant="outline" className="w-full">View Orders</Button>
            </Link>
            <Link to="/profile">
              <Button variant="outline" className="w-full">Update Profile</Button>
            </Link>
          </div>
        </div>

        {/* Recent Transactions */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest financial activities</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto"></div>
                  <p className="mt-2 text-sm text-muted-foreground">Loading transactions...</p>
                </div>
              ) : recentTransactions.length > 0 ? (
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0">
                      <div>
                        <p className="font-medium">
                          {transaction.type === 'deposit' ? 'Wallet Deposit' : 'Service Purchase'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(transaction.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className={`font-semibold ${transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No transactions yet</p>
                  <Link to="/wallet/add-funds">
                    <Button variant="link" className="mt-2">Add your first funds</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
