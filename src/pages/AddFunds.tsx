import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { AlertCircle, Copy, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const AddFunds = () => {
  const { user } = useAuth();
  const [amount, setAmount] = useState('');
  const [reference, setReference] = useState('');
  const [copied, setCopied] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Generate a unique reference number if not already set
  if (!reference && user) {
    setReference(`REF${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`);
  }

  const bankDetails = {
    bank: 'Palmpay',
    accountName: 'Joseph John',
    accountNumber: '8165913697',
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow positive numbers with up to 2 decimal places
    if (/^\d*\.?\d{0,2}$/.test(value) || value === '') {
      setAmount(value);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    
    toast({
      title: "Copied to clipboard",
      description: "The text has been copied to your clipboard.",
    });
  };

  const handleProceed = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to deposit",
        variant: "destructive",
      });
      return;
    }
    
    setConfirmDialogOpen(true);
  };

  const handleConfirmDeposit = async () => {
    if (!user || !amount) return;
    
    try {
      setLoading(true);
      
      // Create a pending transaction
      const { data, error } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          amount: parseFloat(amount),
          type: 'deposit',
          reference: reference,
          status: 'pending',
        })
        .select()
        .single();
        
      if (error) {
        throw error;
      }
      
      toast({
        title: "Deposit Request Submitted",
        description: "Your deposit will be processed once the payment is confirmed.",
      });
      
      setConfirmDialogOpen(false);
      navigate('/wallet');
    } catch (error) {
      console.error('Error creating deposit request:', error);
      toast({
        title: "Error",
        description: "There was an error processing your deposit request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const predefinedAmounts = [1000, 2000, 5000, 10000, 20000];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Add Funds</h1>
          <p className="text-muted-foreground">
            Deposit money into your wallet to purchase services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Bank Transfer</CardTitle>
              <CardDescription>
                Make a deposit to your wallet by bank transfer.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (USD)</Label>
                <div className="flex gap-4 flex-wrap">
                  {predefinedAmounts.map((preAmount) => (
                    <Button
                      key={preAmount}
                      type="button"
                      variant={amount === preAmount.toString() ? "default" : "outline"}
                      onClick={() => setAmount(preAmount.toString())}
                    >
                      #{preAmount}
                    </Button>
                  ))}
                </div>
                <div className="mt-2">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-gray-500">#</span>
                    </div>
                    <Input
                      id="amount"
                      type="text"
                      value={amount}
                      onChange={handleAmountChange}
                      className="pl-8"
                      placeholder="Enter amount"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reference">Your Reference Code</Label>
                <div className="flex">
                  <Input
                    id="reference"
                    value={reference}
                    readOnly
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="ml-2"
                    onClick={() => copyToClipboard(reference)}
                  >
                    {copied ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Include this reference code in your payment description.
                </p>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Important</AlertTitle>
                <AlertDescription>
                  Please include your reference code in the payment description to ensure your deposit is properly credited to your account.
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={handleProceed}
                disabled={!amount || parseFloat(amount) <= 0}
              >
                Proceed
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bank Account Details</CardTitle>
              <CardDescription>
                Transfer the exact amount to this account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Bank</Label>
                <div className="flex">
                  <Input value={bankDetails.bank} readOnly className="flex-1" />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="ml-2"
                    onClick={() => copyToClipboard(bankDetails.bank)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Account Name</Label>
                <div className="flex">
                  <Input value={bankDetails.accountName} readOnly className="flex-1" />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="ml-2"
                    onClick={() => copyToClipboard(bankDetails.accountName)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Account Number</Label>
                <div className="flex">
                  <Input value={bankDetails.accountNumber} readOnly className="flex-1" />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="ml-2"
                    onClick={() => copyToClipboard(bankDetails.accountNumber)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="pt-4 space-y-2">
                <h3 className="font-medium">Instructions:</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Enter the amount you want to deposit</li>
                  <li>Transfer the exact amount to the bank account above</li>
                  <li>Include your reference code in the payment description</li>
                  <li>Click "I've Made the Transfer" to confirm your deposit</li>
                  <li>Your wallet will be credited once payment is verified</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deposit</DialogTitle>
            <DialogDescription>
              Have you completed the bank transfer for #{amount}?
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Reminder</AlertTitle>
              <AlertDescription>
                Make sure you've included your reference code ({reference}) in the payment description.
              </AlertDescription>
            </Alert>
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-medium mb-2">Transfer Details:</h4>
              <ul className="space-y-1 text-sm">
                <li><span className="font-medium">Amount:</span> ${amount}</li>
                <li><span className="font-medium">Bank:</span> {bankDetails.bank}</li>
                <li><span className="font-medium">Account Name:</span> {bankDetails.accountName}</li>
                <li><span className="font-medium">Account Number:</span> {bankDetails.accountNumber}</li>
                <li><span className="font-medium">Reference:</span> {reference}</li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmDeposit} disabled={loading}>
              {loading ? 'Processing...' : "I've Made the Transfer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default AddFunds;
