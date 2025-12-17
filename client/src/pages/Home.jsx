import React from 'react';
import { useState, useEffect } from 'react';
import { ChevronDown, Star, Code, Zap } from 'lucide-react';

const Home = () => {
  const [isVisible, setIsVisible] = useState({
    hero: true,
    features: false,
    about: false,
    contact: false
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'features', 'about', 'contact'];
      const newVisibility = {};
      
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          newVisibility[section] = rect.top < window.innerHeight * 0.75 && rect.bottom > 0;
        }
      });
      
      setIsVisible(newVisibility);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex flex-col items-center justify-center text-center p-8">
        <div className={`transform transition-all duration-1000 ${isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-6xl font-bold mb-6">Welcome to the Future</h1>
          <p className="text-xl text-gray-300 mb-8">Create something amazing with our innovative platform</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
            Get Started
          </button>
        </div>
        <ChevronDown className="animate-bounce mt-16 w-8 h-8" />
      </section>

      {/* Features Section */}
      <section id="features" className="min-h-screen flex flex-col items-center justify-center p-8">
        <div className={`grid md:grid-cols-3 gap-8 max-w-6xl transform transition-all duration-1000 ${isVisible.features ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <FeatureCard
            icon={<Star className="w-8 h-8 text-yellow-400" />}
            title="Premium Quality"
            description="Experience the best in class service with our premium features"
          />
          <FeatureCard
            icon={<Code className="w-8 h-8 text-green-400" />}
            title="Clean Code"
            description="Built with the latest technologies and best practices"
          />
          <FeatureCard
            icon={<Zap className="w-8 h-8 text-blue-400" />}
            title="Lightning Fast"
            description="Optimized for speed and performance"
          />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center p-8">
        <div className={`max-w-4xl transform transition-all duration-1000 ${isVisible.about ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl font-bold mb-8 text-center">Our Story</h2>
          <div className="bg-gray-800 p-8 rounded-lg shadow-xl">
            <p className="text-lg text-gray-300 leading-relaxed">
              We started with a simple idea: to create something extraordinary. Our journey began with
              a passion for innovation and a commitment to excellence. Today, we continue to push
              boundaries and redefine what's possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center p-8">
        <div className={`w-full max-w-md transform transition-all duration-1000 ${isVisible.contact ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl font-bold mb-8 text-center">Get in Touch</h2>
          <form className="space-y-6">
            <div>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors duration-300"
              />
            </div>
            <div>
              <textarea
                placeholder="Your message"
                rows="4"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors duration-300"
              ></textarea>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
    <div className="flex flex-col items-center text-center">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  </div>
);

export default Home;