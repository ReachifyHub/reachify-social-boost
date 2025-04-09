
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isConfigured } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {!isConfigured && (
        <div className="container mx-auto mt-4 px-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Supabase connection not detected. Please connect your project to Supabase using the green Supabase button in the top right corner.
            </AlertDescription>
          </Alert>
        </div>
      )}
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
