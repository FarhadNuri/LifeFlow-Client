# LifeFlow - Blood Donation & Request Platform

A modern blood donation web application built with Next.js that connects donors, volunteers, and those in need of blood.

## Project Description

LifeFlow is a comprehensive full-stack platform designed to facilitate blood donations and requests. The application allows users to request blood, volunteers to respond to emergencies, and donors to contribute. The platform features role-based access control (Admin, Donor, Volunteer), secure authentication, real-time request tracking, and a responsive user interface.

## Live Application

> Explore LifeFlow in action:
>
> **🌐 https://lifeflow-client.vercel.app/**
>
> Browse blood requests, track emergencies, and manage volunteer activities.

## Backend Repo

> Explore LifeFlow backend:
>
> **🌐 https://github.com/FarhadNuri/LifeFlow-Server**
>
>

## Features

### Authentication & Roles
- Email and password registration and login
- Role-based access control for Admins, Donors, and Volunteers
- Secure authentication using Better Auth and JWT
- Protected routes and personalized user dashboards

### Blood Request Management
- Browse all pending blood requests with search and filter options (by blood type, urgency, location)
- View detailed request information including patient name and hospital
- Create new blood requests for emergencies
- Edit and delete your own requests
- Track the status and responses of each emergency request

### Volunteer & Donor System
- Volunteers can respond to blood requests and assist in emergencies
- Track the number of responses for each blood request
- Manage personal volunteer and donor profiles
- Integrated funding and donation system with Stripe

### Admin Dashboard
- Comprehensive user management (view users, update roles, change status, delete)
- Full control over all blood requests on the platform
- Monitor platform activity and engagement

### User Interface
- Responsive design for mobile, tablet, and desktop
- Modern UI components built with Tailwind CSS v4
- Fast page loads and intuitive navigation

## Tech Stack

### Frontend
- Next.js 16.2 (React 19)
- Tailwind CSS (v4) for styling
- Lucide React for icons
- Stripe.js for secure funding processing

### Backend
- Express.js server
- MongoDB with native driver
- JWT (jose) for token management
- Stripe for payment processing

### Authentication & Security
- Better Auth with MongoDB adapter
- JWT based verification
- Secure password hashing with bcryptjs
- Protected API endpoints with token and strict role verification

### Database
- MongoDB Atlas for cloud database
- Collections: users, bloodRequests, responses

## Installation

### Prerequisites
- Node.js 18 or higher
- MongoDB Atlas account
- Stripe account (for funding features)

### Setup

1. Clone the repository
```bash
git clone <repository-url>
cd lifeflow-client
```

2. Install dependencies
```bash
npm install
```

3. Create `.env.local` file
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-public-key
```

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Backend Setup

The backend server is built with Express.js. It requires the following environment variables:

```env
PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
STRIPE_SECRET_KEY=your-stripe-secret-key
```

## Deployment

The application is deployed on Vercel and can be accessed at:
```
https://lifeflow-client.vercel.app/ 
```

## Contact

For questions or support, contact: farhadnuri559@gmail.com
