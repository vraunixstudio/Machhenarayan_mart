# Machhenarayan Mart - Project Specification

## 1. Project Overview

- **Project Name**: Machhenarayan Mart
- **Project Type**: Display-only grocery e-commerce website (read-only platform)
- **Core Functionality**: A mobile-first grocery browsing platform with two user profiles (regular users for browsing, admins for content management). No cart, checkout, or payment integration.
- **Target Users**: Regular customers browsing grocery items, and administrators managing content.
- **Hosting**: Vercel (frontend + serverless backend functions)
- **Reference**: Based on provided logo for UI theming

## 2. Tech Stack

### Frontend
- React 18.x with React Router v6
- Material-UI (MUI) v5 with Material 3 design system
- Framer Motion for subtle animations
- Axios for API calls
- React Hot Toast for notifications

### Backend
- Express.js with Node.js
- MongoDB Atlas (MongoDB) for database
- Mongoose ODM
- JWT for authentication
- Cloudinary SDK for image uploads
- bcryptjs for password hashing

### Development Tools
- Vite for frontend build
- concurrently for running both servers
- dotenv for environment variables

## 3. UI/UX Specification

### Color Palette (Logo-derived)
Based on typical grocery mart logos with fresh, natural colors:
- **Primary**: `#2E7D32` (Forest Green - represents freshness)
- **Primary Light**: `#4CAF50`
- **Primary Dark**: `#1B5E20`
- **Secondary**: `#FF6F00` (Amber/Orange - represents warmth)
- **Secondary Light**: `#FFA726`
- **Secondary Dark**: `#E65100`
- **Background**: `#FAFAFA`
- **Surface**: `#FFFFFF`
- **Text Primary**: `#212121`
- **Text Secondary**: `#757575`
- **Error**: `#D32F2F`
- **Success**: `#388E3C`

### Typography
- **Headings**: "Poppins" (Google Fonts) - Modern, clean
- **Body**: "Inter" (Google Fonts) - Readable, professional
- **Font Sizes**:
  - H1: 2.5rem (40px)
  - H2: 2rem (32px)
  - H3: 1.5rem (24px)
  - H4: 1.25rem (20px)
  - Body: 1rem (16px)
  - Small: 0.875rem (14px)

### Layout Structure
- **Mobile-first**: Design starts with mobile, scales to desktop
- **Grid System**: 12-column grid
- **Breakpoints**:
  - Mobile: 0-599px
  - Tablet: 600-899px
  - Desktop: 900px+

### Spacing System
- Base unit: 8px
- XS: 4px, SM: 8px, MD: 16px, LG: 24px, XL: 32px, XXL: 48px

### Visual Effects
- **Card elevation**: 0 2px 8px rgba(0,0,0,0.1)
- **Hover elevation**: 0 4px 16px rgba(0,0,0,0.15)
- **Border radius**: 12px for cards, 8px for buttons
- **Transitions**: 200ms ease-in-out for all interactive elements

### Animations
- **Page transitions**: Fade in with slight slide (200ms)
- **Card hover**: Scale(1.02) with elevation increase
- **Button hover**: Background color shift with subtle bounce
- **Scroll animations**: Staggered fade-in for list items (50ms delay each)
- **Loading states**: Skeleton loaders matching content shape

## 4. Database Schema

### Collections

#### Users
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (hashed),
  role: String (enum: ['user', 'admin']),
  avatar: String (Cloudinary URL),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

#### Categories
```javascript
{
  _id: ObjectId,
  name: String (required),
  slug: String (unique),
  description: String,
  image: String (Cloudinary URL),
  isActive: Boolean (default: true),
  order: Number,
  createdAt: Date,
  updatedAt: Date
}
```

#### Products
```javascript
{
  _id: ObjectId,
  name: String (required),
  slug: String (unique),
  description: String,
  price: Number (required),
  originalPrice: Number,
  category: ObjectId (ref: Categories),
  images: [String] (Cloudinary URLs),
  inStock: Boolean (default: true),
  isFeatured: Boolean (default: false),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

#### Banners
```javascript
{
  _id: ObjectId,
  title: String,
  subtitle: String,
  image: String (Cloudinary URL),
  link: String (URL),
  position: String (enum: ['hero', 'promo', 'sidebar']),
  isActive: Boolean (default: true),
  order: Number,
  startDate: Date,
  endDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## 5. API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset

### Users
- `GET /api/users` - List all users (admin)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (admin)
- `PUT /api/users/:id/promote` - Promote user to admin (admin)

### Categories
- `GET /api/categories` - List all categories
- `GET /api/categories/:id` - Get category by ID
- `GET /api/categories/:slug` - Get category by slug
- `POST /api/categories` - Create category (admin)
- `PUT /api/categories/:id` - Update category (admin)
- `DELETE /api/categories/:id` - Delete category (admin)

### Products
- `GET /api/products` - List all products
- `GET /api/products/featured` - List featured products
- `GET /api/products/search` - Search products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/:slug` - Get product by slug
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Banners
- `GET /api/banners` - List all banners
- `GET /api/banners/active` - List active banners
- `GET /api/banners/:id` - Get banner by ID
- `POST /api/banners` - Create banner (admin)
- `PUT /api/banners/:id` - Update banner (admin)
- `DELETE /api/banners/:id` - Delete banner (admin)

### Upload
- `POST /api/upload/image` - Upload image to Cloudinary

## 6. Pages and Components

### Public Pages

#### Home Page (`/`)
- Hero banner slider (auto-swipe, 5 second interval)
- Featured products section (horizontal scroll on mobile)
- Category quick links (icon + name grid)
- Promo banners (2-column grid)
- New arrivals section

#### Categories Page (`/categories`)
- Category grid with images
- Category cards with product count
- Search/filter categories

#### Category Products Page (`/category/:slug`)
- Category header with image
- Product grid (2-3-4 columns responsive)
- Sort/filter sidebar on desktop
- Quick view modal on mobile

#### Product Detail Page (`/product/:slug`)
- Product image gallery
- Product name, description
- Price display (no add to cart)
- Related products section

#### Search Results (`/search`)
- Search bar at top
- Filter sidebar
- Product grid with results

#### User Dashboard (`/dashboard`)
- Profile information
- browsing history
- Account settings

#### About Page (`/about`)
- Store information
- Mission statement
- Contact details

#### Contact Page (`/contact`)
- Contact form
- Store location map
- Contact information

#### Login Page (`/login`)
- Login form
- Register link
- Forgot password link

#### Register Page (`/register`)
- Registration form
- Login link

### Admin Pages

#### Admin Dashboard (`/admin`)
- Statistics cards (total products, categories, users)
- Recent activity
- Quick actions

#### Manage Products (`/admin/products`)
- Product table with search
- Add/Edit/Delete actions
- Bulk operations

#### Manage Categories (`/admin/categories`)
- Category list with drag-to-reorder
- Add/Edit/Delete actions

#### Manage Banners (`/admin/banners`)
- Banner list with preview
- Add/Edit/Delete actions

#### Manage Users (`/admin/users`)
- User table
- Promote/Demote actions
- Deactivate/Activate actions

## 7. Components Library

### Common Components
- `Layout` - Main layout wrapper with header/footer
- `Header` - Navigation header
- `Footer` - Footer with links
- `ProductCard` - Product display card
- `CategoryCard` - Category display card
- `Banner` - Banner display
- `SearchBar` - Search input
- `Loader` - Loading spinner
- `PrivateRoute` - Protected route wrapper
- `AdminRoute` - Admin-only route wrapper

### Form Components
- `Input` - Text input
- `Select` - Dropdown select
- `TextArea` - Multi-line text
- `FileUpload` - Image upload
- `Button` - Action button

## 8. Seed Data

### Initial Categories (10)
1. Fruits - Fresh fruits from local farms
2. Vegetables - Fresh green vegetables
3. Dairy - Milk, cheese, yogurt products
4. Bakery - Fresh bread and pastries
5. Meat & Poultry - Fresh meat and chicken
6. Fish & Seafood - Fresh catches
7. Beverages - Drinks and juices
8. Snacks - Chips, cookies, crackers
9. Grains & Pulses - Rice, wheat, dal
10. Spices & Condiments - Herbs and spices

### Initial Products (30)
4 products per category with:
- Name, description, price
- Cloudinary images (real URLs or placeholders)
- isFeatured: true for 8 products

### Initial Banners (5)
- 3 Hero banners
- 2 Promo banners

### Admin Account
- Email: admin@machhenarayanmart.com
- Password: Admin@123

## 9. Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:5173
```

## 10. Security Measures

- Input sanitization on all endpoints
- JWT token expiration (24 hours)
- Password hashing with bcrypt
- Rate limiting on auth endpoints
- CORS configuration
- Helmet for security headers
- Express validator for inputs

## 11. Deployment (Vercel)

### Frontend
- Deploy from `/frontend` directory
- Vercel automatically detects Vite config
- Build command: `npm run build`
- Output directory: `dist`

### Backend
- Deploy as Vercel Serverless Functions
- Uses vercel.json configuration
- API routes in `/api` directory

## 12. Project Structure

```
machhenarayan-mart/
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React contexts
│   │   ├── hooks/       # Custom hooks
│   │   ├── services/   # API services
│   │   ├── theme/      # MUI theme
│   │   ├── utils/      # Utility functions
│   │   ├── App.jsx     # Main app
│   │   └── main.jsx    # Entry point
│   ├── public/          # Static assets
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── backend/              # Express backend
│   ├── config/          # Configuration
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Custom middleware
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes
│   ├── utils/          # Utility functions
│   ├── seed/           # Seed data
│   ├── server.js        # Entry point
│   └── package.json
├── vercel.json          # Vercel config
├── SPEC.md
└── README.md
```

## 13. Acceptance Criteria

### Functional Requirements
- [ ] User can browse all products without authentication
- [ ] User can search and filter products
- [ ] User can view detailed product information
- [ ] User can register and login
- [ ] User can access their dashboard
- [ ] Admin can manage all content (CRUD)
- [ ] Image uploads work via Cloudinary
- [ ] All changes reflect immediately on frontend

### Technical Requirements
- [ ] Mobile-first responsive design works on all devices
- [ ] Page load time < 3 seconds
- [ ] No console errors on any page
- [ ] JWT authentication works correctly
- [ ] API endpoints return proper status codes
- [ ] Database seeded with initial data

### Visual Requirements
- [ ] Logo-derived colors applied consistently
- [ ] Animations smooth and subtle
- [ ] High contrast for accessibility
- [ ] Images lazy loaded
- [ ] Loading states shown during fetch

### Deployment Requirements
- [ ] Frontend deploys to Vercel
- [ ] Backend deploys to Vercel
- [ ] MongoDB Atlas connected
- [ ] Cloudinary configured
- [ ] Environment variables set