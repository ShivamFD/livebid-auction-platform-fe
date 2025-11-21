import React from 'react';
import { Link } from 'react-router-dom';
import { Auction, Users, TrendingUp, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Welcome to LiveBid
          </motion.h1>
          <motion.p
            className="text-xl mb-8 text-blue-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            The premier platform for real-time online auctions. Bid on unique items from the comfort of your home.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              to="/auctions"
              className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition duration-300"
            >
              Browse Live Auctions
            </Link>
            <Link
              to="/register"
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition duration-300"
            >
              Join Now
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div
          className="bg-white p-6 rounded-xl shadow-md"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <Auction className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Live Auctions</h3>
          <p className="text-gray-600">
            Participate in real-time auctions with instant bid updates and competitive bidding.
          </p>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-xl shadow-md"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <Users className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Global Community</h3>
          <p className="text-gray-600">
            Connect with thousands of collectors, sellers, and auction enthusiasts worldwide.
          </p>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-xl shadow-md"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <TrendingUp className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Smart Bidding</h3>
          <p className="text-gray-600">
            Use our proxy bidding system to automatically bid on your behalf up to your maximum limit.
          </p>
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Auction Platform at a Glance</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">5,000+</div>
            <div className="text-gray-600">Active Auctions</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">25,000+</div>
            <div className="text-gray-600">Registered Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">$2.4M+</div>
            <div className="text-gray-600">Items Sold</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">24/7</div>
            <div className="text-gray-600">Support</div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 rounded-2xl p-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Bidding?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Join thousands of satisfied users who have found unique items and made winning bids on our platform.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/auctions"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Explore Auctions
          </Link>
          <Link
            to="/register"
            className="px-6 py-3 bg-white text-blue-600 border border-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition duration-300"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;