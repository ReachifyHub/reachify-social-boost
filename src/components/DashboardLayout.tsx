
import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard,
  ShoppingBag,
  Wallet,
  Settings,
  User,
  CircleDollarSign,
  LogOut
} from 'lucide-react';
import Navbar from './Navbar';
import { Button } from '@/components/ui/button';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { signOut } = useAuth();
  const location = useLocation();

  const sidebarItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Services', href: '/services', icon: ShoppingBag },
    { name: 'Orders', href: '/orders', icon: CircleDollarSign },
    { name: 'Wallet', href: '/wallet', icon: Wallet },
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        {/* Sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-16 bg-white border-r border-gray-200">
          <div className="flex-1 flex flex-col min-h-0 pt-5">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              {sidebarItems.map((item) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      isActive
                        ? 'bg-primary text-white'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                  >
                    <Icon className={`mr-3 flex-shrink-0 h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-primary'}`} />
                    {item.name}
                  </Link>
                );
              })}
              <Button 
                variant="ghost" 
                onClick={() => signOut()}
                className="w-full justify-start text-gray-600 hover:bg-gray-50 hover:text-primary px-2 py-2 text-sm font-medium rounded-md"
              >
                <LogOut className="mr-3 flex-shrink-0 h-5 w-5 text-gray-400" />
                Sign Out
              </Button>
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="md:pl-64 flex flex-col flex-1">
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
