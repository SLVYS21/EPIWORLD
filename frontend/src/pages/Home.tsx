import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MessageSquare, Coffee, MapPin } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const LandingPage = () => {
  const features = [
    {
      icon: <Search className="w-8 h-8 text-blue-400" />,
      title: "Lost & Found",
      description: "Post lost items or help others find their belongings. Connect with your community to recover lost possessions.",
      image: "https://images.unsplash.com/photo-1586769852044-692d6e3703f0?auto=format&fit=crop&w=500&q=80",
      color: "from-blue-500/20 to-blue-600/20"
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-purple-400" />,
      title: "Student Forum",
      description: "Share information, discuss topics, and collect achievement flags through meaningful interactions.",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=500&q=80",
      color: "from-purple-500/20 to-purple-600/20"
    },
    {
      icon: <Coffee className="w-8 h-8 text-amber-400" />,
      title: "Campus Cafeteria",
      description: "Order food, track your delivery, and enjoy hassle-free dining with our cafeteria management system.",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=500&q=80",
      color: "from-amber-500/20 to-amber-600/20"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-black/30 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <MapPin className="w-8 h-8 text-blue-500" />
              <span className="text-2xl font-bold text-white">EpiWorld</span>
            </div>
            <Link
              to="/auth"
              className="bg-blue-500 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.6 }}
        className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold text-white mb-6"
            variants={fadeIn}
          >
            Welcome to <span className="text-blue-500">EpiWorld</span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto mb-8"
            variants={fadeIn}
          >
            Your all-in-one platform for campus life. Connect with fellow students,
            find lost items, and manage your dining experience.
          </motion.p>
        </div>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${feature.color} border border-white/10 p-6 hover:scale-105 transition-transform duration-300`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/20 z-0" />
              <div className="relative z-10">
                <div className="flex items-center space-x-4 mb-4">
                  {feature.icon}
                  <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                </div>
                <p className="text-gray-300 mb-6">{feature.description}</p>
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-48 object-cover rounded-lg shadow-lg"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-blue-500/10 border-t border-blue-500/20 py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Join Your Campus Community?
          </h2>
          <p className="text-gray-300 mb-8">
            Start exploring all the features EpiWorld has to offer.
          </p>
          <Link
            to="/auth"
            className="inline-flex items-center px-8 py-3 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
          >
            Join Now
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default LandingPage;