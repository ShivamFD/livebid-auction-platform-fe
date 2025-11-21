import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuctionById } from '../../store/auctionSlice';
import { useEffect } from 'react';
import { Clock, DollarSign, User, Heart, Share2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const AuctionDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentAuction, loading, error } = useSelector((state) => state.auctions);

  useEffect(() => {
    if (id) {
      dispatch(fetchAuctionById(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 text-lg">{error}</p>
        <Link to="/auctions" className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Auctions
        </Link>
      </div>
    );
  }

  if (!currentAuction) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 text-lg">Auction not found</p>
        <Link to="/auctions" className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Auctions
        </Link>
      </div>
    );
  }

  // Calculate time remaining
  const endTime = new Date(currentAuction.endTime);
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
    <div className="max-w-6xl mx-auto">
      <Link to="/auctions" className="flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Auctions
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Auction Images */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <img
            src={currentAuction.images?.[0] || 'https://via.placeholder.com/600x400'}
            alt={currentAuction.title}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>
        
        {/* Auction Details */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{currentAuction.title}</h1>
                <p className="text-gray-600 mt-2">{currentAuction.description}</p>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-500 hover:text-red-500">
                  <Heart className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-500 hover:text-blue-500">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Current Bid</p>
                <p className="text-2xl font-bold text-blue-600">
                  {formatCurrency(currentAuction.currentBid || currentAuction.startingBid)}
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Bid Increment</p>
                <p className="text-xl font-bold text-gray-900">
                  {formatCurrency(currentAuction.bidIncrement || 1)}
                </p>
              </div>
            </div>
            
            <div className="mt-6 flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              <span className="font-medium text-red-500">{timeLeft} left</span>
            </div>
          </div>
          
          {/* Bid Form */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Place Your Bid</h2>
            <div className="flex space-x-3">
              <input
                type="number"
                placeholder="Enter bid amount"
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Bid Now
              </button>
            </div>
            
            <div className="mt-4">
              <p className="text-sm text-gray-600">Quick bids:</p>
              <div className="flex space-x-2 mt-2">
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100">
                  +{formatCurrency(10)}
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100">
                  +{formatCurrency(25)}
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100">
                  +{formatCurrency(50)}
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100">
                  +{formatCurrency(100)}
                </button>
              </div>
            </div>
          </div>
          
          {/* Seller Info */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Seller Information</h2>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <User className="h-5 w-5" />
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-900">{currentAuction.seller?.username || 'Anonymous'}</p>
                <p className="text-sm text-gray-500">Member since 2023</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bid History Section */}
      <div className="mt-8 bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Bid History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bidder
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentAuction.bids && currentAuction.bids.length > 0 ? (
                currentAuction.bids.map((bid, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {bid.bidder?.username || 'Anonymous'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(bid.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(bid.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                    No bids yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AuctionDetail;