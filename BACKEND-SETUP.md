# LifeFlow Backend Setup Guide

## Overview
This backend provides REST API endpoints for the LifeFlow blood donation management system with role-based access control (Admin, Donor, Volunteer).

## Setup Instructions

### 1. Create Backend Folder
```bash
mkdir LifeFlow-Backend
cd LifeFlow-Backend
```

### 2. Copy Files
Copy the following files from the client folder to your backend folder:
- `backend-index.js` → rename to `index.js`
- `backend-package.json` → rename to `package.json`
- `backend-env-example.txt` → create `.env` and add your configuration

### 3. Install Dependencies
```bash
npm install
```

This will install:
- **express** - Web framework
- **mongodb** - MongoDB driver
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variable management
- **jose** - JWT verification using JWKS
- **nodemon** (dev) - Auto-restart on file changes

### 4. Environment Configuration
Create a `.env` file in the backend root with:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

### 5. MongoDB Collections Required
The backend uses the following collections:
- **users** - User accounts (admin, donor, volunteer)
- **bloodRequests** - Blood donation requests
- **responses** - Volunteer responses to requests

### 6. Run the Server

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will run at `http://localhost:5000`

## API Endpoints

### Admin Routes
- `GET /admin/users` - Get all users (with optional search & role filter)
- `GET /admin/users/:userId` - Get user by ID
- `PATCH /admin/users/:userId` - Update user status/role
- `DELETE /admin/users/:userId` - Delete user
- `GET /admin/requests` - Get all blood requests (with filters)
- `PATCH /admin/requests/:requestId` - Update request status
- `GET /admin/profile/:userId` - Get admin profile

### Donor Routes
- `POST /donor/requests` - Create new blood donation request
- `GET /donor/my-requests/:userId` - Get donor's own requests
- `PATCH /donor/requests/:requestId` - Update own request
- `DELETE /donor/requests/:requestId` - Delete own request
- `GET /donor/profile/:userId` - Get donor profile
- `PATCH /donor/profile/:userId` - Update donor profile

### Volunteer Routes
- `GET /volunteer/requests` - Get all blood requests (with filters)
- `GET /volunteer/profile/:userId` - Get volunteer profile
- `PATCH /volunteer/profile/:userId` - Update volunteer profile
- `POST /volunteer/respond/:requestId` - Respond to blood request

### Public Routes
- `GET /` - API health check
- `GET /requests` - Get public blood requests (with filters)
- `GET /requests/:requestId` - Get single request details

## Authentication & Authorization

### Headers Required
All protected routes require:
```
Authorization: Bearer <jwt_token>
```

### Role-Based Access
- **Admin**: Full access to all routes
- **Donor**: Can manage own requests and profile
- **Volunteer**: Can view requests and respond

### Token Verification
- Uses JWKS (JSON Web Key Set) from your Next.js client
- Validates tokens via `CLIENT_URL/api/auth/jwks`
- Extracts user info (sub, email, name, role) from JWT payload

## Request/Response Examples

### Create Blood Request (Donor)
```http
POST /donor/requests
Authorization: Bearer <token>
Content-Type: application/json

{
  "patientName": "John Doe",
  "bloodType": "A+",
  "urgency": "High",
  "unitsNeeded": 2,
  "hospital": "City Hospital",
  "location": "New York",
  "contactNumber": "+1234567890",
  "requiredDate": "2024-01-20"
}
```

### Update User Status (Admin)
```http
PATCH /admin/users/507f1f77bcf86cd799439011
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "active",
  "role": "volunteer"
}
```

### Volunteer Respond to Request
```http
POST /volunteer/respond/507f1f77bcf86cd799439012
Authorization: Bearer <token>
Content-Type: application/json

{
  "message": "I can donate blood tomorrow at 10 AM"
}
```

## Error Handling

The API returns standard HTTP status codes:
- **200** - Success
- **400** - Bad Request (invalid data)
- **401** - Unauthorized (no token/invalid token)
- **403** - Forbidden (insufficient permissions)
- **404** - Not Found
- **500** - Internal Server Error

## Security Features

1. **JWT Authentication** - All protected routes require valid JWT
2. **Role-Based Authorization** - Middleware checks user roles
3. **CORS Protection** - Whitelisted origins only
4. **Input Validation** - ObjectId validation
5. **Password Exclusion** - User passwords never returned in responses
6. **Ownership Verification** - Users can only modify their own resources

## Database Schema Examples

### User Document
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String, // hashed
  role: "admin" | "donor" | "volunteer",
  bloodType: String,
  phone: String,
  location: String,
  status: "active" | "inactive",
  createdAt: Date,
  updatedAt: Date
}
```

### Blood Request Document
```javascript
{
  _id: ObjectId,
  donorId: String,
  donorEmail: String,
  donorName: String,
  patientName: String,
  bloodType: String,
  urgency: "Low" | "Medium" | "High" | "Critical",
  unitsNeeded: Number,
  hospital: String,
  location: String,
  contactNumber: String,
  requiredDate: Date,
  status: "Pending" | "In Progress" | "Completed" | "Cancelled",
  responseCount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

## Production Deployment

1. Set `NODE_ENV=production` in environment
2. Update `CLIENT_URL` to production domain
3. Add production client URL to CORS origins
4. Use MongoDB Atlas for production database
5. Deploy to Vercel, Heroku, Railway, or similar platforms

## Notes

- The server exports the app for serverless deployment compatibility
- Database connection is cached to improve performance
- All routes include logging middleware
- Token verification uses JWKS for better security than static secrets
