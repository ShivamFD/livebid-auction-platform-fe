import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from './store/authSlice';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AuctionList from './pages/auctions/AuctionList';
import AuctionDetail from './pages/auctions/AuctionDetail';
import Navbar from './components/layout/Navbar';
import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if user is already logged in from localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // In a real app, you would verify the token with a request
      // For now, we'll assume the token is valid
    }
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/auctions" element={<AuctionList />} />
            <Route path="/auctions/:id" element={<AuctionDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App
