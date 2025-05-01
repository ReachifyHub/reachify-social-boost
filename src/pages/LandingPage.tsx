
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Check, Star, HelpCircle, CircleDollarSign, Layout, Users, MessageSquareQuestion, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

const LandingPage = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col">
      {/* SEO */}
      <Helmet>
        <title>Reachify Promotions - Affordable Social Media Growth Services</title>
        <meta name="description" content="Boost your social media presence with Reachify Promotions. Get real followers, likes and engagement for all major social platforms. Affordable prices in Nigerian Naira." />
      </Helmet>

      {/* Navigation */}
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
            <div className="hidden md:flex md:space-x-8 md:items-center">
              <a href="#features" className="text-gray-700 hover:text-primary transition-colors">Features</a>
              <a href="#pricing" className="text-gray-700 hover:text-primary transition-colors">Pricing</a>
              <a href="#testimonials" className="text-gray-700 hover:text-primary transition-colors">Testimonials</a>
              <a href="#faq" className="text-gray-700 hover:text-primary transition-colors">FAQ</a>
              <div className="flex space-x-4 ml-4">
                <Link to="/login">
                  <Button variant="outline">Log in</Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign up</Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center md:hidden">
              <Button variant="outline" size="icon" className="mr-2">
                <span className="sr-only">Open menu</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-hero-gradient text-white pt-12 pb-20 px-4 sm:pt-16 sm:pb-28 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
                Grow Your Social Media Presence Fast & Affordably
              </h1>
              <p className="text-base sm:text-lg md:text-xl mb-8 opacity-90">
                Get real followers, likes, and engagement across all major social platforms. 
                Start seeing results within hours, not weeks. Prices start from just ₦1,500.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
                <Link to="/signup">
                  <Button size="lg" className="w-full sm:w-auto text-base bg-white text-primary hover:bg-gray-100">
                    Get Started
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/services">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto text-base border-white text-white hover:bg-white/10">
                    View Services
                  </Button>
                </Link>
              </div>
              <div className="mt-8 text-sm flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-2 sm:space-y-0 sm:space-x-6">
                <div className="flex items-center">
                  <Check className="h-5 w-5 mr-2" />
                  <span>No password required</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 mr-2" />
                  <span>Fast delivery</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 mr-2" />
                  <span>Secure payment</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="w-[450px] h-[450px] bg-white/10 backdrop-blur-sm rounded-full"></div>
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <img src="https://i.imgur.com/S256lQZ.png" alt="Social Media Dashboard" className="w-[380px] rounded-xl shadow-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-gray-500 uppercase mb-6">Trusted by users on these platforms</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            <img src="https://i.imgur.com/jIxLPYy.png" alt="Instagram" className="h-8 opacity-70" />
            <img src="https://i.imgur.com/Y8TzYgY.png" alt="Facebook" className="h-8 opacity-70" />
            <img src="https://i.imgur.com/rdP92bB.png" alt="TikTok" className="h-8 opacity-70" />
            <img src="https://i.imgur.com/z1Qmbge.png" alt="Twitter" className="h-8 opacity-70" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Why Choose Reachify Promotions?</h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              We provide top-quality social media promotion services designed to boost your online presence quickly and affordably.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 card-hover">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-5">
                <Layout className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Easy Dashboard</h3>
              <p className="text-gray-600">
                Track all your orders, manage your services, and monitor your growth with our intuitive dashboard.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 card-hover">
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-5">
                <CircleDollarSign className="h-6 w-6 text-brand-purple" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Affordable Pricing</h3>
              <p className="text-gray-600">
                Get premium social media services starting from just ₦1,500, with flexible packages for every budget.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 card-hover">
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-5">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Quality Guarantee</h3>
              <p className="text-gray-600">
                We guarantee authentic engagement from real accounts, ensuring sustainable growth for your profiles.
              </p>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">All Major Platforms Supported</h3>
              <p className="text-gray-600 mb-6">
                Whether you need followers on Instagram, likes on Facebook, views on TikTok, or engagement on Twitter,
                we've got you covered with comprehensive services for all major social media platforms.
              </p>
              <ul className="space-y-3">
                {['Instagram Followers & Likes', 'Facebook Page Likes & Shares', 'TikTok Followers & Views', 'Twitter Followers & Retweets'].map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link to="/services">
                  <Button variant="outline">
                    Explore All Services
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative p-4">
              <div className="bg-gray-100 rounded-lg p-2">
                <img 
                  src="https://i.imgur.com/NXfDYVU.png" 
                  alt="Service Options" 
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    <div className="h-8 w-8 rounded-full bg-blue-500"></div>
                    <div className="h-8 w-8 rounded-full bg-purple-500"></div>
                    <div className="h-8 w-8 rounded-full bg-pink-500"></div>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">+1,500 clients</p>
                    <p className="text-gray-500 text-xs">Growing daily</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Simple, Transparent Pricing</h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Choose the perfect package for your needs with our affordable pricing plans.
              All prices are in Nigerian Naira (₦).
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <Card className="border-2 border-gray-200 relative">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">Starter</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl sm:text-4xl font-extrabold">₦1,500</span>
                  <span className="ml-1 text-gray-500">/package</span>
                </div>
                <p className="mt-5 text-gray-500">Perfect for beginners looking to boost their social presence.</p>
              </div>
              <div className="border-t border-gray-200"></div>
              <CardContent className="pt-4">
                <ul className="space-y-3">
                  {[
                    '100 Instagram Followers',
                    '200 Instagram Likes',
                    '50 Facebook Page Likes',
                    'Fast Delivery (1-2 days)'
                  ].map((feature) => (
                    <li key={feature} className="flex">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Link to="/services" className="w-full">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            {/* Pro Plan */}
            <Card className="border-2 border-primary relative">
              <div className="absolute -top-4 inset-x-0 flex justify-center">
                <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider text-white bg-primary rounded-full">MOST POPULAR</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">Professional</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl sm:text-4xl font-extrabold">₦5,000</span>
                  <span className="ml-1 text-gray-500">/package</span>
                </div>
                <p className="mt-5 text-gray-500">Ideal for content creators and small businesses.</p>
              </div>
              <div className="border-t border-gray-200"></div>
              <CardContent className="pt-4">
                <ul className="space-y-3">
                  {[
                    '500 Instagram Followers',
                    '1,000 Instagram Likes',
                    '200 Facebook Page Likes',
                    '100 TikTok Followers',
                    'Express Delivery (24 hours)',
                    'Basic Analytics'
                  ].map((feature) => (
                    <li key={feature} className="flex">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Link to="/services" className="w-full">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            {/* Premium Plan */}
            <Card className="border-2 border-gray-200 relative">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">Enterprise</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl sm:text-4xl font-extrabold">₦15,000</span>
                  <span className="ml-1 text-gray-500">/package</span>
                </div>
                <p className="mt-5 text-gray-500">Comprehensive solution for influencers and businesses.</p>
              </div>
              <div className="border-t border-gray-200"></div>
              <CardContent className="pt-4">
                <ul className="space-y-3">
                  {[
                    '2,000 Instagram Followers',
                    '5,000 Instagram Likes',
                    '1,000 Facebook Page Likes',
                    '500 TikTok Followers',
                    '1,000 Twitter Followers',
                    'Priority Delivery (12 hours)',
                    'Advanced Analytics',
                    'Priority Support'
                  ].map((feature) => (
                    <li key={feature} className="flex">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Link to="/services" className="w-full">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-10 text-center">
            <p className="text-gray-500">Need a custom package? <Link to="/contact" className="text-primary font-medium">Contact us</Link> for personalized solutions.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">What Our Customers Say</h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our customers have to say about our services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border border-gray-200">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6">
                  "I was struggling to grow my Instagram account for months. After using Reachify, I gained 500+ real followers in just a week! The engagement on my posts has increased significantly too."
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                    <img src="https://i.imgur.com/JFHjdNr.jpg" alt="User" className="h-full w-full object-cover" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Chioma A.</p>
                    <p className="text-sm text-gray-500">Fashion Influencer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6">
                  "Reachify Promotions helped my small business reach a wider audience. The Facebook likes and engagement we received translated into real customers. Worth every naira spent!"
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                    <img src="https://i.imgur.com/Tlr4N5P.jpg" alt="User" className="h-full w-full object-cover" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Oluwaseun K.</p>
                    <p className="text-sm text-gray-500">Business Owner</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6">
                  "The customer service is exceptional! They helped me choose the right package for my TikTok account, and the results exceeded my expectations. Fast delivery and quality followers."
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                    <img src="https://i.imgur.com/yHvJbAC.jpg" alt="User" className="h-full w-full object-cover" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Emeka J.</p>
                    <p className="text-sm text-gray-500">Content Creator</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about our services.
            </p>
          </div>
          
          <div className="space-y-6">
            {[
              {
                question: "How long does it take to see results?",
                answer: "Most orders start processing within 30 minutes of payment confirmation. Depending on the package, you can see results within a few hours to 2 days."
              },
              {
                question: "Are the followers and likes from real accounts?",
                answer: "Yes, we provide engagement from real accounts. We don't use bots or fake accounts that could harm your profile's reputation."
              },
              {
                question: "Is it safe to use your services?",
                answer: "Absolutely! We never ask for your password or sensitive information. Our services comply with social media platforms' terms of service."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept various payment methods including bank transfers, credit/debit cards, and popular mobile payment options in Nigeria."
              },
              {
                question: "Do you offer refunds if I'm not satisfied?",
                answer: "Yes, we offer a money-back guarantee if we fail to deliver the promised service within the specified timeframe."
              },
              {
                question: "Can I order a custom package?",
                answer: "Definitely! Contact our support team for custom packages tailored to your specific needs and budget."
              }
            ].map((item, index) => (
              <div key={index} className="bg-white shadow-sm rounded-lg p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <HelpCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">{item.question}</h3>
                    <p className="mt-2 text-gray-600">{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-hero-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Boost Your Social Media Presence?</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Join thousands of content creators, businesses, and influencers who are already growing their audience with Reachify Promotions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto bg-white text-primary hover:bg-gray-100">
                Create Your Account Now
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                Browse Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Reachify Promotions</h3>
              <p className="text-gray-400">
                Boost your social media presence with our premium promotion services. Fast, reliable, and affordable.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">Services</Link></li>
                <li><Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/refund" className="text-gray-400 hover:text-white transition-colors">Refund Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">Email: support@reachify.com</li>
                <li className="text-gray-400">Phone: +234 812 345 6789</li>
                <li className="text-gray-400">Lagos, Nigeria</li>
              </ul>
              <div className="mt-4 flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} Reachify Promotions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
