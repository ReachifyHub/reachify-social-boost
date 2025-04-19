import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { useIsMobile } from "@/hooks/use-mobile";

const About = () => {
  const isMobile = useIsMobile();
  
  return (
    <>
      <Helmet>
        <title>About Us | Reachify Promotions</title>
        <meta name="description" content="Learn more about Reachify Promotions and our mission to boost your social media presence" />
      </Helmet>
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
  <div className="space-y-8 sm:space-y-12">
    {/* Hero Section */}
    <div className="text-center">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
        About Reachify Promotions
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
        We help creators and businesses amplify their social media presence with reliable, effective promotion services.
      </p>
    </div>

    {/* Mission Section */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Our Mission</h2>
        <p className="text-gray-600 mb-3 sm:mb-4">
          At Reachify Promotions, we believe that everyone deserves the chance to be heard in the digital world.
          Our mission is to level the playing field by providing affordable, effective, and ethical promotion services
          that help creators and businesses reach their target audience.
        </p>
        <p className="text-gray-600">
          We're committed to transparency, quality, and customer satisfaction. Our services are designed
          to boost your authentic presence, not just inflate numbers with low-quality engagement.
        </p>
      </div>
      <div className="relative h-56 sm:h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
        <img
          src="https://i.postimg.cc/Y9n8WC08/premium-photo-1661310029767-e77bd6ef118e.jpg"
          alt="Team working together"
          className="w-full h-full object-cover"
        />
      </div>
    </div>

    {/* Values Section */}
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">Our Values</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h3 className="text-lg sm:text-xl font-semibold text-primary mb-2 sm:mb-3">Quality</h3>
          <p className="text-gray-600">
            We focus on delivering high-quality promotion that brings real value to your social media presence.
          </p>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h3 className="text-lg sm:text-xl font-semibold text-primary mb-2 sm:mb-3">Transparency</h3>
          <p className="text-gray-600">
            We're open about how our services work and what results you can expect from them.
          </p>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h3 className="text-lg sm:text-xl font-semibold text-primary mb-2 sm:mb-3">Innovation</h3>
          <p className="text-gray-600">
            We continuously improve our methods to stay effective in the ever-changing social media landscape.
          </p>
        </div>
      </div>
    </div>

    {/* Team Section */}
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">Our Team</h2>
      <p className="text-center text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8">
        We're a dedicated team of social media experts, marketers, and tech enthusiasts committed to helping you grow your online presence.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-200 mx-auto mb-3 sm:mb-4 overflow-hidden">
            <img
              src="https://i.postimg.cc/Mp25R4Zk/photo-1600275669439-14e40452d20b.jpg"
              alt="Mark Williams"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-base sm:text-lg font-semibold">Mark Williams</h3>
          <p className="text-gray-500">Founder & CEO</p>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-200 mx-auto mb-3 sm:mb-4 overflow-hidden">
            <img
              src="https://i.postimg.cc/qMCQN0TX/photo-1519085360753-af0119f7cbe7.jpg"
              alt="John Smith"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-base sm:text-lg font-semibold">John Smith</h3>
          <p className="text-gray-500">CTO</p>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-200 mx-auto mb-3 sm:mb-4 overflow-hidden">
            <img
              src="https://i.postimg.cc/placeholder-image.jpg"
              alt="Lisa Johnson"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-base sm:text-lg font-semibold">Lisa Johnson</h3>
          <p className="text-gray-500">Head of Marketing</p>
        </div>
      </div>
    </div>

    {/* Contact CTA */}
    <div className="bg-primary bg-opacity-5 p-6 sm:p-8 rounded-xl text-center">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Have Questions?</h2>
      <p className="text-gray-600 mb-4 sm:mb-6 max-w-3xl mx-auto">
        We'd love to hear from you! Contact our team for any questions about our services.
      </p>
      <a
        href="/contact"
        className="inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark"
      >
        Contact Us
      </a>
    </div>
  </div>
</div>
