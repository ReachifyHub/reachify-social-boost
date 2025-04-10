import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-xl font-bold text-primary">
              Reachify <span className="text-brand-purple">Promotions</span>
            </Link>
            <p className="mt-2 text-sm text-gray-500">
              Boosting your social media presence with premium promotion services.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-primary">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-medium text-gray-900">Services</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/services" className="text-sm text-gray-500 hover:text-primary">
                  Facebook Promotion
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm text-gray-500 hover:text-primary">
                  Instagram Promotion
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm text-gray-500 hover:text-primary">
                  Twitter Promotion
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm text-gray-500 hover:text-primary">
                  TikTok Promotion
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-medium text-gray-900">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-sm text-gray-500 hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-500 hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-500 hover:text-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-gray-500 hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-medium text-gray-900">Support</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/faq" className="text-sm text-gray-500 hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-sm text-gray-500 hover:text-primary">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-sm text-gray-500 hover:text-primary">
                  Customer Support
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-gray-500 hover:text-primary">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Reachify Promotions. Services are for social proof only. We comply with platform guidelines.  
[Powered by Vercel] (link to https://vercel.com)  
Lightning-fast & secure delivery  
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
