import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching all auctions
export const fetchAuctions = createAsyncThunk(
  'auctions/fetchAuctions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5000/api/auctions');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for creating an auction
export const createAuction = createAsyncThunk(
  'auctions/createAuction',
  async (auctionData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/auctions',
        auctionData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching auction by ID
export const fetchAuctionById = createAsyncThunk(
  'auctions/fetchAuctionById',
  async (auctionId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/auctions/${auctionId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const auctionSlice = createSlice({
  name: 'auctions',
  initialState: {
    auctions: [],
    currentAuction: null,
    loading: false,
    error: null,
    filters: {
      category: '',
      minPrice: '',
      maxPrice: '',
      search: ''
    }
  },
  reducers: {
    setCurrentAuction: (state, action) => {
      state.currentAuction = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        category: '',
        minPrice: '',
        maxPrice: '',
        search: ''
      };
    },
    updateBid: (state, action) => {
      const { auctionId, newBid, bidder } = action.payload;
      const auctionIndex = state.auctions.findIndex(auction => auction._id === auctionId);
      if (auctionIndex !== -1) {
        state.auctions[auctionIndex].currentBid = newBid;
        state.auctions[auctionIndex].currentBidder = bidder;
      }
      
      // Update current auction if it matches
      if (state.currentAuction && state.currentAuction._id === auctionId) {
        state.currentAuction.currentBid = newBid;
        state.currentAuction.currentBidder = bidder;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch auctions cases
      .addCase(fetchAuctions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAuctions.fulfilled, (state, action) => {
        state.loading = false;
        state.auctions = action.payload;
      })
      .addCase(fetchAuctions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch auctions';
      })
      // Create auction cases
      .addCase(createAuction.fulfilled, (state, action) => {
        state.auctions.push(action.payload);
      })
      // Fetch auction by ID cases
      .addCase(fetchAuctionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAuctionById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAuction = action.payload;
      })
      .addCase(fetchAuctionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch auction';
      });
  }
});

export const { setCurrentAuction, setFilters, clearFilters, updateBid } = auctionSlice.actions;
export default auctionSlice.reducer;