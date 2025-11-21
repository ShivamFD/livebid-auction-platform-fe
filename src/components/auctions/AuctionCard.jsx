import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, DollarSign, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const AuctionCard = ({ auction }) => {
  // Calculate time remaining
  const endTime = new Date(auction.endTime);
  const now = new Date();
  const timeDiff = endTime - now;
  
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  
  const timeLeft = `${days}d ${hours}h ${minutes}m`;
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative">
        <img
          src={auction.images?.[0] || 'https://via.placeholder.com/400x200'}
          alt={auction.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          {auction.status === 'active' ? 'LIVE' : auction.status}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">{auction.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{auction.description}</p>
        
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center text-sm text-gray-500">
            <DollarSign className="h-4 w-4 mr-1" />
            <span className="font-semibold text-gray-900">
              {formatCurrency(auction.currentBid || auction.startingBid)}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Eye className="h-4 w-4 mr-1" />
            <span>{auction.bidCount || 0} bids</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            <span className="text-red-500 font-medium">{timeLeft}</span>
          </div>
          <Link
            to={`/auctions/${auction._id}`}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            View
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default AuctionCard;