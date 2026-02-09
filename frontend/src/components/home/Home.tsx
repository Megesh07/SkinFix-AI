import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Bot, ShoppingBag, Calendar, Clock, ArrowRight, ChevronLeft, ChevronRight, Heart, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const slides = [
  {
    url: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=1600&q=80",
    title: "Advanced Skincare Solutions"
  },
  {
    url: "https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=1600&q=80",
    title: "Personalized Treatment Plans"
  },
  {
    url: "https://images.unsplash.com/photo-1570554913382-80b23c13b19b?w=1600&q=80",
    title: "Expert Dermatologist Care"
  },
  {
    url: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=1600&q=80",
    title: "AI-Powered Analysis"
  },
  {
    url: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1600&q=80",
    title: "Premium Skincare Products"
  }
];

const features = [
  {
    icon: Bot,
    title: "Tholini AI",
    description: "Get personalized skincare advice from our AI assistant",
    link: "/chat",
    color: "bg-pink-100",
    textColor: "text-pink-600"
  },
  {
    icon: ShoppingBag,
    title: "SkinLuxe",
    description: "Shop for dermatologist-recommended products",
    link: "/emart",
    color: "bg-rose-100",
    textColor: "text-rose-600"
  },
  {
    icon: Clock,
    title: "Routine Tracker",
    description: "Track and maintain your daily skincare routine",
    link: "/routine",
    color: "bg-red-100",
    textColor: "text-red-600"
  },
  {
    icon: Calendar,
    title: "Expert Consultation",
    description: "Book appointments with certified dermatologists",
    link: "/dermatologist",
    color: "bg-pink-100",
    textColor: "text-pink-600"
  }
];

const containerVariants = {
  hidden: { 
    opacity: 0
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  show: { 
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  }
};

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF5EE] to-white">
      <div className="relative h-[50vh] md:h-[500px] mb-12 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-black/30 z-10" />
            <img
              src={slides[currentSlide].url}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center z-20 px-4">
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-5xl font-bold text-white text-center shadow-lg"
              >
                {slides[currentSlide].title}
              </motion.h2>
            </div>
          </motion.div>
        </AnimatePresence>
        
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/40 transition-all"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/40 transition-all"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentSlide === index ? 'bg-white w-6' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group"
            >
              <Link to={feature.link}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`${feature.color} rounded-2xl shadow-lg p-6 md:p-8 h-full transition-all duration-300 hover:shadow-xl`}
                >
                  <feature.icon className={`w-10 h-10 md:w-12 md:h-12 ${feature.textColor} mb-4`} />
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">{feature.title}</h3>
                  <p className="text-sm md:text-base text-gray-600">{feature.description}</p>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center bg-gradient-to-r from-pink-50 to-rose-50 p-6 md:p-12 rounded-3xl shadow-lg mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
            Ready to Transform Your Skincare Routine?
          </h2>
          <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto">
            Join thousands of users who have already discovered their perfect skincare journey with Skin AI.
          </p>
          <Link to={isAuthenticated ? "/routine" : "/auth"}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 md:px-12 py-3 md:py-4 rounded-full font-semibold text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isAuthenticated ? 'Go to Routine' : 'Get Started Now'}
            </motion.button>
          </Link>
        </motion.div>
      </div>

      <footer className="bg-gray-900 text-white mt-24">
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                SkinFix AI
              </h3>
              <p className="text-gray-400 mb-4 text-sm md:text-base">
                Transforming skincare with artificial intelligence and expert dermatological care.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5 md:w-6 md:h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5 md:w-6 md:h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="w-5 h-5 md:w-6 md:h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Youtube className="w-5 h-5 md:w-6 md:h-6" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/chat" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">
                    Tholini AI
                  </Link>
                </li>
                <li>
                  <Link to="/emart" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">
                    SkinLuxe
                  </Link>
                </li>
                <li>
                  <Link to="/routine" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">
                    Routine Tracker
                  </Link>
                </li>
                <li>
                  <Link to="/dermatologist" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">
                    Book Consultation
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4 text-sm md:text-base">
                Stay updated with the latest skincare tips and product launches.
              </p>
              <form className="space-y-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm md:text-base"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg hover:from-pink-600 hover:to-rose-600 transition-colors text-sm md:text-base"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          
          <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-800 text-center text-gray-400">
            <p className="text-sm md:text-base">© 2025 SkinFix AI. All rights reserved.</p>
            <p className="mt-2 flex items-center justify-center text-sm md:text-base">
              Made with <Heart className="w-4 h-4 mx-1 text-pink-500" /> by SkinFix AI Team
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;