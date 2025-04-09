
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, X, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' }
  ];

  const authedNavigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Services', href: '/services' },
    { name: 'Orders', href: '/orders' },
    { name: 'Wallet', href: '/wallet' }
  ];

  const activeLink = "text-primary font-medium";
  const inactiveLink = "text-gray-700 hover:text-primary transition-colors";

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-primary">
                Reachify <span className="text-brand-purple">Promotions</span>
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {user
              ? authedNavigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={location.pathname === item.href ? activeLink : inactiveLink}
                  >
                    {item.name}
                  </Link>
                ))
              : navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={location.pathname === item.href ? activeLink : inactiveLink}
                  >
                    {item.name}
                  </Link>
                ))}
            
            {user ? (
              <div className="flex items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="ml-2">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Link to="/profile" className="w-full">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/settings" className="w-full">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login">
                  <Button variant="outline">Log in</Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {user
              ? authedNavigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      location.pathname === item.href ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
                    } block px-3 py-2 rounded-md text-base font-medium`}
                    onClick={toggleMenu}
                  >
                    {item.name}
                  </Link>
                ))
              : navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      location.pathname === item.href ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
                    } block px-3 py-2 rounded-md text-base font-medium`}
                    onClick={toggleMenu}
                  >
                    {item.name}
                  </Link>
                ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {user ? (
              <div className="px-2 space-y-1">
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                  onClick={toggleMenu}
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                  onClick={toggleMenu}
                >
                  Settings
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    toggleMenu();
                  }}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="px-2 space-y-1">
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                  onClick={toggleMenu}
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                  onClick={toggleMenu}
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
