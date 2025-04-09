
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  PlusCircle, 
  ArrowUp, 
  ArrowDown, 
  Clock, 
  CheckCircle, 
  XCircle 
} from 'lucide-react';

interface Transaction {
  id: number;
  amount: number;
  type: string;
  created_at: string;
  status?: string;
}

const Wallet = () => {
  const { user } = useAuth();
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWalletData = async () => {
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
          setBalance(walletData?.balance || 0);
        }

        // Fetch transactions
        const { data: transactionsData, error: transactionsError } = await supabase
          .from('transactions')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (transactionsError) {
          console.error('Error fetching transactions:', transactionsError);
        } else {
          setTransactions(transactionsData || []);
        }
      } catch (error) {
        console.error('Error fetching wallet data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWalletData();
  }, [user]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Wallet</h1>
          <p className="text-muted-foreground">
            Manage your funds and view transaction history.
          </p>
        </div>

        {/* Wallet Card */}
        <Card>
          <CardHeader>
            <CardTitle>Your Balance</CardTitle>
            <CardDescription>Current available funds in your account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <div className="text-4xl font-bold text-primary">${balance.toFixed(2)}</div>
              <Link to="/wallet/add-funds">
                <Button className="w-full sm:w-auto">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Funds
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="deposit">Deposits</TabsTrigger>
              <TabsTrigger value="purchase">Purchases</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <TransactionList
                transactions={transactions}
                loading={loading}
              />
            </TabsContent>
            
            <TabsContent value="deposit">
              <TransactionList
                transactions={transactions.filter(t => t.type === 'deposit')}
                loading={loading}
              />
            </TabsContent>
            
            <TabsContent value="purchase">
              <TransactionList
                transactions={transactions.filter(t => t.type === 'purchase')}
                loading={loading}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

interface TransactionListProps {
  transactions: Transaction[];
  loading: boolean;
}

const TransactionList = ({ transactions, loading }: TransactionListProps) => {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Loading transactions...</p>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No transactions found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <Card key={transaction.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${transaction.type === 'deposit' ? 'bg-green-100' : 'bg-blue-100'}`}>
                  {transaction.type === 'deposit' ? (
                    <ArrowUp className={`h-5 w-5 ${transaction.type === 'deposit' ? 'text-green-600' : 'text-blue-600'}`} />
                  ) : (
                    <ArrowDown className={`h-5 w-5 ${transaction.type === 'deposit' ? 'text-green-600' : 'text-blue-600'}`} />
                  )}
                </div>
                <div>
                  <p className="font-medium">
                    {transaction.type === 'deposit' ? 'Wallet Deposit' : 'Service Purchase'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(transaction.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
              <div>
                <p className={`font-semibold text-right ${transaction.type === 'deposit' ? 'text-green-600' : 'text-blue-600'}`}>
                  {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                </p>
                <div className="text-xs text-right mt-1 flex items-center justify-end">
                  {transaction.status === 'pending' && (
                    <>
                      <Clock className="h-3 w-3 text-yellow-600 mr-1" />
                      <span className="text-yellow-600">Pending</span>
                    </>
                  )}
                  {transaction.status === 'completed' && (
                    <>
                      <CheckCircle className="h-3 w-3 text-green-600 mr-1" />
                      <span className="text-green-600">Completed</span>
                    </>
                  )}
                  {transaction.status === 'failed' && (
                    <>
                      <XCircle className="h-3 w-3 text-red-600 mr-1" />
                      <span className="text-red-600">Failed</span>
                    </>
                  )}
                  {!transaction.status && (
                    <>
                      <CheckCircle className="h-3 w-3 text-green-600 mr-1" />
                      <span className="text-green-600">Completed</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Wallet;
