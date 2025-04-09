
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram, Twitter, TiktokIcon } from 'lucide-react';

// Custom TikTok icon since it's not in lucide-react
const TikTok = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
    <path d="M15 8h.01" />
    <path d="M9 0h6v12h-6z" />
    <path d="M15 2a4 4 0 0 0 4 4V0h-4z" />
  </svg>
);

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-hero-gradient text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Boost Your Social Media Presence
              </h1>
              <p className="text-lg mb-8">
                Get more likes, followers, and engagement with our premium social media promotion services.
                Affordable, reliable, and fast results guaranteed.
              </p>
              <div className="flex space-x-4">
                <Link to="/signup">
                  <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                    Get Started
                  </Button>
                </Link>
                <Link to="/services">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Browse Services
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:flex justify-end">
              <div className="relative">
                <div className="w-80 h-80 bg-white/10 backdrop-blur-sm rounded-full"></div>
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl flex items-center justify-center">
                      <Facebook size={40} />
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl flex items-center justify-center">
                      <Instagram size={40} />
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl flex items-center justify-center">
                      <Twitter size={40} />
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl flex items-center justify-center">
                      <TikTok />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Reachify Promotions?</h2>
            <p className="mt-4 text-lg text-gray-600">
              We offer comprehensive social media promotion services to help you grow your online presence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 card-hover">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="h-6 w-6 text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Fast Delivery</h3>
              <p className="mt-2 text-gray-600">
                Get results quickly with our efficient promotion services, often starting within minutes of your order.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 card-hover">
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="h-6 w-6 text-brand-purple"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Secure Payments</h3>
              <p className="mt-2 text-gray-600">
                Your financial information is always protected with our secure wallet system and payment processing.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 card-hover">
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="h-6 w-6 text-green-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Quality Guarantee</h3>
              <p className="mt-2 text-gray-600">
                We guarantee the quality of our services, providing authentic engagement from real accounts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Supported Platforms</h2>
            <p className="mt-4 text-lg text-gray-600">
              We offer comprehensive promotion services across all major social media platforms.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center card-hover">
              <div className="h-16 w-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Facebook className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Facebook</h3>
              <p className="mt-2 text-sm text-gray-600">
                Likes, Followers, Comments, Shares
              </p>
              <Link to="/services?platform=facebook">
                <Button variant="link" className="mt-4">View Services</Button>
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center card-hover">
              <div className="h-16 w-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Instagram className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Instagram</h3>
              <p className="mt-2 text-sm text-gray-600">
                Followers, Likes, Comments, Views
              </p>
              <Link to="/services?platform=instagram">
                <Button variant="link" className="mt-4">View Services</Button>
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center card-hover">
              <div className="h-16 w-16 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Twitter className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Twitter</h3>
              <p className="mt-2 text-sm text-gray-600">
                Followers, Retweets, Likes
              </p>
              <Link to="/services?platform=twitter">
                <Button variant="link" className="mt-4">View Services</Button>
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center card-hover">
              <div className="h-16 w-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <TikTok />
              </div>
              <h3 className="text-lg font-medium text-gray-900">TikTok</h3>
              <p className="mt-2 text-sm text-gray-600">
                Followers, Likes, Views, Shares
              </p>
              <Link to="/services?platform=tiktok">
                <Button variant="link" className="mt-4">View Services</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Boost Your Social Media Presence?</h2>
          <p className="text-white text-lg mb-8 max-w-3xl mx-auto">
            Join thousands of content creators, businesses, and influencers who are already growing their audience with Reachify Promotions.
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
              Create Your Account Now
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
