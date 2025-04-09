
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Settings = () => {
  const { user, signOut } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);
  const [deleteAccountDialogOpen, setDeleteAccountDialogOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [deletingAccount, setDeletingAccount] = useState(false);
  const { toast } = useToast();

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "New password and confirmation do not match",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setChangingPassword(true);
      
      // First, verify the current password by attempting to sign in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email || '',
        password: currentPassword,
      });
      
      if (signInError) {
        toast({
          title: "Incorrect Password",
          description: "Your current password is incorrect",
          variant: "destructive",
        });
        return;
      }
      
      // If verification successful, update the password
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Password Updated",
        description: "Your password has been changed successfully",
      });
      
      // Clear the form
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error changing password:', error);
      toast({
        title: "Update Failed",
        description: "There was an error updating your password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setChangingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    
    if (deleteConfirmText !== 'DELETE') {
      toast({
        title: "Confirmation Required",
        description: "Please type DELETE to confirm account deletion",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setDeletingAccount(true);
      
      // First delete user data from database tables
      await Promise.all([
        // Delete wallet records
        supabase.from('wallets').delete().eq('user_id', user.id),
        
        // Delete transaction records
        supabase.from('transactions').delete().eq('user_id', user.id),
        
        // Delete order records
        supabase.from('orders').delete().eq('user_id', user.id),
        
        // Delete profile records
        supabase.from('profiles').delete().eq('id', user.id),
      ]);
      
      // Then delete the Supabase user account
      const { error } = await supabase.auth.admin.deleteUser(user.id);
      
      if (error) {
        throw error;
      }
      
      // Sign out the user
      await signOut();
      
      toast({
        title: "Account Deleted",
        description: "Your account and all associated data have been deleted",
      });
    } catch (error) {
      console.error('Error deleting account:', error);
      toast({
        title: "Deletion Failed",
        description: "There was an error deleting your account. Please contact support.",
        variant: "destructive",
      });
    } finally {
      setDeletingAccount(false);
      setDeleteAccountDialogOpen(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>

        {/* Change Password Card */}
        <Card>
          <form onSubmit={handleChangePassword}>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your account password.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={changingPassword}>
                {changingPassword ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Change Password'
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>

        {/* Delete Account Card */}
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600">Delete Account</CardTitle>
            <CardDescription>
              Permanently delete your account and all associated data.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                This action cannot be undone. All your data will be permanently deleted.
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter>
            <Dialog open={deleteAccountDialogOpen} onOpenChange={setDeleteAccountDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive">Delete Account</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-red-600">Delete Account</DialogTitle>
                  <DialogDescription>
                    This action is permanent and cannot be undone. All your data, including 
                    wallet balance, order history, and personal information will be permanently deleted.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Point of No Return</AlertTitle>
                    <AlertDescription>
                      Your current wallet balance will be lost and cannot be recovered.
                    </AlertDescription>
                  </Alert>
                  <div className="space-y-2">
                    <Label htmlFor="confirmDelete">
                      Type <span className="font-bold">DELETE</span> to confirm:
                    </Label>
                    <Input
                      id="confirmDelete"
                      value={deleteConfirmText}
                      onChange={(e) => setDeleteConfirmText(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDeleteAccountDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDeleteAccount}
                    disabled={deletingAccount || deleteConfirmText !== 'DELETE'}
                  >
                    {deletingAccount ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      'Permanently Delete Account'
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
