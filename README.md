# Machhenarayan Mart

A display-only grocery website with complete content management capabilities.

## Features

- **User Features:**
  - Browse products by category
  - Search and filter products
  - View detailed product information
  - User registration and login
  - User dashboard

- **Admin Features:**
  - Manage products (CRUD)
  - Manage categories (CRUD)
  - Manage banners (CRUD)
  - Manage users (promote/demote)

## Tech Stack

- **Frontend:** React, Material-UI, Framer Motion
- **Backend:** Express.js, MongoDB, JWT
- **Hosting:** Vercel

## Prerequisites

- Node.js 14+
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

## Setup Instructions

### 1. Clone and Install

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Environment Variables

Create `backend/.env`:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=24h
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:5173
```

Create `frontend/.env`:
```env
VITE_API_URL=/api
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

### 3. Seed Database

```bash
cd backend
npm run seed
```

This creates:
- Admin user (admin@machhenarayanmart.com / Admin@123)
- 10 categories
- 50 products
- 5 banners

### 4. Run Development

```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Access at http://localhost:5173

## Deployment to Vercel

1. Push to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

Default Admin Credentials:
- Email: admin@machhenarayanmart.com
- Password: Admin@123

## Project Structure

```
machhenarayan-mart/
├── backend/           # Express.js API
│   ├── models/       # Mongoose models
│   ├── routes/       # API routes
│   ├── controllers/  # Route handlers
│   ├── middleware/  # Auth middleware
│   └── seed/        # Database seeder
├── frontend/         # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   └── theme/
│   └── public/
├── SPEC.md           # Project specification
└── README.md        # This file
```

## API Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me

### Products
- GET /api/products
- GET /api/products/featured
- GET /api/products/search
- POST /api/products (admin)
- PUT /api/products/:id (admin)
- DELETE /api/products/:id (admin)

### Categories
- GET /api/categories
- POST /api/categories (admin)
- PUT /api/categories/:id (admin)
- DELETE /api/categories/:id (admin)

### Banners
- GET /api/banners
- POST /api/banners (admin)
- PUT /api/banners/:id (admin)
- DELETE /api/banners/:id (admin)

### Users
- GET /api/users (admin)
- PUT /api/users/:id/promote (admin)

## License

MIT