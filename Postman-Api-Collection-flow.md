# 🧪 Auction Platform API - Postman Collection Guide

## 📋 Overview
Complete API documentation for the Live Bid Auction Platform backend APIs. This guide helps you test and understand all available endpoints.

## 🌐 Base URL
```
http://localhost:5000
```

## 🔐 Authentication Flow

### 1. Register New User
**Endpoint**: `POST /api/auth/register`
**Access**: Public

**Request Body**:
```json
{
  "username": "testuser123",
  "email": "test@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "653b8f2d4b1c2a4e8c9d2e4a",
    "username": "testuser123",
    "email": "test@example.com",
    "role": "buyer",
    "avatar": null
  }
}
```

### 2. Login User
**Endpoint**: `POST /api/auth/login`
**Access**: Public

**Request Body**:
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "653b8f2d4b1c2a4e8c9d2e4a",
    "username": "testuser123",
    "email": "test@example.com",
    "role": "buyer",
    "avatar": null,
    "rating": 0
  }
}
```

### 3. Get User Profile
**Endpoint**: `GET /api/auth/profile`
**Access**: Private (Bearer Token Required)

**Headers**:
- `Authorization: Bearer <your-jwt-token>`

**Response**:
```json
{
  "success": true,
  "user": {
    "id": "653b8f2d4b1c2a4e8c9d2e4a",
    "username": "testuser123",
    "email": "test@example.com",
    "role": "buyer",
    "avatar": null,
    "rating": 0,
    "totalBids": 0,
    "wonAuctions": 0,
    "isVerified": false
  }
}
```

## 📦 Auction Management APIs

### 4. Create New Auction
**Endpoint**: `POST /api/auctions`
**Access**: Private (Bearer Token Required)

**Headers**:
- `Authorization: Bearer <your-jwt-token>`
- `Content-Type: application/json`

**Request Body**:
```json
{
  "title": "Vintage Guitar",
  "description": "Rare vintage guitar in excellent condition",
  "images": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
  "category": "Musical Instruments",
  "startingBid": 500,
  "reservePrice": 1000,
  "bidIncrement": 25,
  "startTime": "2025-11-25T10:00:00Z",
  "endTime": "2025-12-05T18:00:00Z"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Auction created successfully",
  "auction": {
    "_id": "653b8f2d4b1c2a4e8c9d2e4b",
    "title": "Vintage Guitar",
    "description": "Rare vintage guitar in excellent condition",
    "images": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
    "category": "Musical Instruments",
    "startingBid": 500,
    "currentBid": 500,
    "reservePrice": 1000,
    "bidIncrement": 25,
    "startTime": "2025-11-25T10:00:00.000Z",
    "endTime": "2025-12-05T18:00:00.000Z",
    "status": "draft",
    "seller": "653b8f2d4b1c2a4e8c9d2e4a",
    "bids": [],
    "watchlist": [],
    "createdAt": "2025-11-20T10:30:00.000Z",
    "updatedAt": "2025-11-20T10:30:00.000Z"
  }
}
```

### 5. Get All Auctions
**Endpoint**: `GET /api/auctions`
**Access**: Public

**Query Parameters** (Optional):
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `category`: Filter by category
- `status`: Filter by status (draft/active/ended)
- `search`: Search in title or description

**Example**: `/api/auctions?page=1&limit=5&category=Electronics&status=active`

**Response**:
```json
{
  "success": true,
  "count": 2,
  "total": 25,
  "page": 1,
  "pages": 5,
  "auctions": [
    {
      "_id": "653b8f2d4b1c2a4e8c9d2e4b",
      "title": "Vintage Guitar",
      "description": "Rare vintage guitar in excellent condition",
      "images": ["https://example.com/image1.jpg"],
      "category": "Musical Instruments",
      "startingBid": 500,
      "currentBid": 650,
      "reservePrice": 1000,
      "bidIncrement": 25,
      "startTime": "2025-11-25T10:00:00.000Z",
      "endTime": "2025-12-05T18:00:00.000Z",
      "status": "active",
      "seller": {
        "username": "testuser123",
        "avatar": null
      },
      "currentBidder": {
        "username": "bidder123",
        "avatar": null
      }
    }
  ]
}
```

### 6. Get Auction by ID
**Endpoint**: `GET /api/auctions/:id`
**Access**: Public

**Response**:
```json
{
  "success": true,
  "auction": {
    "_id": "653b8f2d4b1c2a4e8c9d2e4b",
    "title": "Vintage Guitar",
    "description": "Rare vintage guitar in excellent condition",
    "images": ["https://example.com/image1.jpg"],
    "category": "Musical Instruments",
    "startingBid": 500,
    "currentBid": 650,
    "reservePrice": 1000,
    "bidIncrement": 25,
    "startTime": "2025-11-25T10:00:00.000Z",
    "endTime": "2025-12-05T18:00:00.000Z",
    "status": "active",
    "seller": {
      "username": "testuser123",
      "avatar": null,
      "rating": 4.5
    },
    "winner": null,
    "currentBidder": {
      "username": "bidder123",
      "avatar": null
    },
    "bids": [],
    "watchlist": [],
    "createdAt": "2025-11-20T10:30:00.000Z",
    "updatedAt": "2025-11-20T11:45:00.000Z"
  }
}
```

### 7. Update Auction
**Endpoint**: `PUT /api/auctions/:id`
**Access**: Private (Seller Only, Bearer Token Required)

**Headers**:
- `Authorization: Bearer <your-jwt-token>`
- `Content-Type: application/json`

**Request Body** (partial updates allowed):
```json
{
  "title": "Updated Vintage Guitar",
  "description": "Updated description for rare vintage guitar",
  "category": "Musical Instruments"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Auction updated successfully",
  "auction": {
    "_id": "653b8f2d4b1c2a4e8c9d2e4b",
    "title": "Updated Vintage Guitar",
    "description": "Updated description for rare vintage guitar",
    "category": "Musical Instruments"
  }
}
```

### 8. Delete Auction
**Endpoint**: `DELETE /api/auctions/:id`
**Access**: Private (Seller Only, Bearer Token Required)

**Headers**:
- `Authorization: Bearer <your-jwt-token>`

**Response**:
```json
{
  "success": true,
  "message": "Auction deleted successfully"
}
```

## 💰 Bid Management APIs

### 9. Place a Bid
**Endpoint**: `POST /api/auctions/:auctionId/bids`
**Access**: Private (Bearer Token Required)

**Headers**:
- `Authorization: Bearer <your-jwt-token>`
- `Content-Type: application/json`

**URL Parameter**:
- `auctionId`: ID of the auction to bid on

**Request Body**:
```json
{
  "amount": 675,
  "isProxyBid": false,
  "maxBid": null
}
```

**Response**:
```json
{
  "success": true,
  "message": "Bid placed successfully",
  "bid": {
    "_id": "653b8f2d4b1c2a4e8c9d2e4c",
    "auction": "653b8f2d4b1c2a4e8c9d2e4b",
    "bidder": "653b8f2d4b1c2a4e8c9d2e4a",
    "amount": 675,
    "timestamp": "2025-11-20T12:00:00.000Z",
    "isProxyBid": false,
    "maxBid": null,
    "bidder": {
      "username": "newbidder",
      "avatar": null
    }
  }
}
```

### 10. Get Bids for an Auction
**Endpoint**: `GET /api/auctions/:auctionId/bids`
**Access**: Public

**URL Parameter**:
- `auctionId`: ID of the auction

**Response**:
```json
{
  "success": true,
  "count": 3,
  "bids": [
    {
      "_id": "653b8f2d4b1c2a4e8c9d2e4c",
      "bidder": {
        "username": "bidder1",
        "avatar": null
      },
      "amount": 675,
      "timestamp": "2025-11-20T12:00:00.000Z"
    },
    {
      "_id": "653b8f2d4b1c2a4e8c9d2e4d",
      "bidder": {
        "username": "bidder2",
        "avatar": null
      },
      "amount": 700,
      "timestamp": "2025-11-20T12:05:00.000Z"
    }
  ]
}
```

### 11. Get User's Bid History
**Endpoint**: `GET /api/bids/my-bids`
**Access**: Private (Bearer Token Required)

**Headers**:
- `Authorization: Bearer <your-jwt-token>`

**Response**:
```json
{
  "success": true,
  "count": 2,
  "bids": [
    {
      "_id": "653b8f2d4b1c2a4e8c9d2e4c",
      "auction": {
        "title": "Vintage Guitar",
        "currentBid": 700,
        "endTime": "2025-12-05T18:00:00.000Z",
        "status": "active"
      },
      "bidder": {
        "username": "testuser123",
        "avatar": null
      },
      "amount": 675,
      "timestamp": "2025-11-20T12:00:00.000Z"
    }
  ]
}
```

## 🛡️ Error Handling

### Common Error Responses

**400 Bad Request**:
```json
{
  "success": false,
  "message": "Please provide all required fields: title, description, images, category, startingBid, startTime, endTime"
}
```

**401 Unauthorized**:
```json
{
  "success": false,
  "message": "Not authorized, no token"
}
```

**403 Forbidden**:
```json
{
  "success": false,
  "message": "Not authorized to update this auction"
}
```

**404 Not Found**:
```json
{
  "success": false,
  "message": "Auction not found"
}
```

**500 Server Error**:
```json
{
  "success": false,
  "message": "Server error during auction creation",
  "error": "Detailed error message"
}
```

## 🧪 Testing Workflow in Postman

### 1. Register User
- Create a `POST` request to `/api/auth/register`
- Set body to raw JSON with user details
- Save the returned token

### 2. Login User
- Create a `POST` request to `/api/auth/login`
- Set body to raw JSON with credentials
- Update the token if needed

### 3. Create Auction
- Create a `POST` request to `/api/auctions`
- Set Authorization header with Bearer token
- Set body to raw JSON with auction details

### 4. Test Bidding
- Create a `POST` request to `/api/auctions/{auctionId}/bids`
- Set Authorization header with Bearer token
- Set body with bid amount

### 5. Get Public Data
- Create `GET` requests without authentication
- Test filtering with query parameters

## ⚙️ Environment Variables for Postman
Create a Postman environment with:
- `base_url`: `http://localhost:5000`
- `auth_token`: Your JWT token

## 🔄 Common Testing Scenarios

### Scenario 1: Full Auction Lifecycle
1. Register user → Login → Create auction → Activate auction → Place bids → End auction

### Scenario 2: Authorization Testing
1. Try protected endpoints without token → Should return 401
2. Try to modify other's auction → Should return 403
3. Valid token access → Should return 200

### Scenario 3: Validation Testing
1. Create auction without required fields → Should return 400
2. Place bid less than current bid → Should return 400
3. Place bid on ended auction → Should return 400

---
**API Version**: 1.0  
**Last Updated**: November 20, 2025  
**Ready for Frontend Integration**: ✅