
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | Reachify Promotions</title>
        <meta name="description" content="Learn more about Reachify Promotions and our mission to boost your social media presence" />
      </Helmet>
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-12">
            {/* Hero section */}
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About Reachify Promotions</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We help creators and businesses amplify their social media presence with reliable, effective promotion services.
              </p>
            </div>

            {/* Mission section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-gray-600 mb-4">
                  At Reachify Promotions, we believe that everyone deserves the chance to be heard in the digital world. 
                  Our mission is to level the playing field by providing affordable, effective, and ethical promotion 
                  services that help creators and businesses reach their target audience.
                </p>
                <p className="text-gray-600">
                  We're committed to transparency, quality, and customer satisfaction. Our services are designed 
                  to boost your authentic presence, not just inflate numbers with low-quality engagement.
                </p>
              </div>
              <div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
                <img
                  src="/placeholder.svg"
                  alt="Team working together"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Values section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-primary mb-3">Quality</h3>
                  <p className="text-gray-600">
                    We focus on delivering high-quality promotion that brings real value to your social media presence.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-primary mb-3">Transparency</h3>
                  <p className="text-gray-600">
                    We're open about how our services work and what results you can expect from them.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-primary mb-3">Innovation</h3>
                  <p className="text-gray-600">
                    We continuously improve our methods to stay effective in the ever-changing social media landscape.
                  </p>
                </div>
              </div>
            </div>

            {/* Team section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Team</h2>
              <p className="text-center text-gray-600 max-w-3xl mx-auto mb-8">
                We're a dedicated team of social media experts, marketers, and tech enthusiasts committed to helping you grow your online presence.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Team member cards would go here */}
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4"></div>
                  <h3 className="text-lg font-semibold">Jane Doe</h3>
                  <p className="text-gray-500">Founder & CEO</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4"></div>
                  <h3 className="text-lg font-semibold">John Smith</h3>
                  <p className="text-gray-500">CTO</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4"></div>
                  <h3 className="text-lg font-semibold">Lisa Johnson</h3>
                  <p className="text-gray-500">Head of Marketing</p>
                </div>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="bg-primary bg-opacity-5 p-8 rounded-xl text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Have Questions?</h2>
              <p className="text-gray-600 mb-6">
                We'd love to hear from you! Contact our team for any questions about our services.
              </p>
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default About;
