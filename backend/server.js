require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/products');
const bannerRoutes = require('./routes/banners');
const uploadRoutes = require('./routes/upload');

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/health', (req, res) => {
  const dbState = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  const uriSet = !!process.env.MONGODB_URI;
  res.json({ status: 'ok', db: dbState, uriSet, timestamp: new Date().toISOString() });
});

app.all('/api/seed-admin', async (req, res) => {
  try {
    const User = require('./models/User');
    const email = 'admin@machhenarayanmart.com';
    const existingAdmin = await User.findOne({ email });
    
    if (existingAdmin) {
      return res.json({ success: true, message: 'Admin already exists', admin: { email: existingAdmin.email, role: existingAdmin.role } });
    }
    
    const admin = await User.create({
      name: 'Admin',
      email: email,
      password: 'admin123',
      role: 'admin'
    });
    
    res.json({ success: true, message: 'Admin created', admin: { email: admin.email, role: admin.role } });
  } catch (error) {
    console.error('Admin seed error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.all('/api/seed', async (req, res) => {
  try {
    const Category = require('./models/Category');
    const Product = require('./models/Product');
    const Banner = require('./models/Banner');

    await Category.deleteMany({});
    await Product.deleteMany({});
    await Banner.deleteMany({});

    const categories = await Category.insertMany([
      { name: 'Fruits', slug: 'fruits', description: 'Fresh fruits', isActive: true, order: 1 },
      { name: 'Vegetables', slug: 'vegetables', description: 'Fresh vegetables', isActive: true, order: 2 },
      { name: 'Dairy', slug: 'dairy', description: 'Milk & dairy products', isActive: true, order: 3 },
      { name: 'Bakery', slug: 'bakery', description: 'Fresh bread & pastries', isActive: true, order: 4 },
      { name: 'Meat & Poultry', slug: 'meat-poultry', description: 'Fresh meat & chicken', isActive: true, order: 5 },
      { name: 'Fish & Seafood', slug: 'fish-seafood', description: 'Fresh catches', isActive: true, order: 6 },
      { name: 'Beverages', slug: 'beverages', description: 'Drinks & juices', isActive: true, order: 7 },
      { name: 'Snacks', slug: 'snacks', description: 'Chips, cookies & crackers', isActive: true, order: 8 },
      { name: 'Grains & Pulses', slug: 'grains-pulses', description: 'Rice, wheat & dal', isActive: true, order: 9 },
      { name: 'Spices & Condiments', slug: 'spices-condiments', description: 'Herbs & spices', isActive: true, order: 10 }
    ]);

    const categoryMap = {};
    categories.forEach(c => { categoryMap[c.name] = c._id; });

    await Product.insertMany([
      { name: 'Fresh Apples', slug: 'fresh-apples', price: 120, category: categoryMap['Fruits'], description: 'Organic red apples', isFeatured: true, inStock: true, images: ['https://images.unsplash.com/photo-1560806887-1e4cd0b6bdce?w=400'] },
      { name: 'Bananas', slug: 'bananas', price: 60, category: categoryMap['Fruits'], description: 'Fresh yellow bananas', isFeatured: false, inStock: true, images: ['https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400'] },
      { name: 'Oranges', slug: 'oranges', price: 80, category: categoryMap['Fruits'], description: 'Juicy navel oranges', isFeatured: true, inStock: true, images: ['https://images.unsplash.com/photo-1547514701-427329315e76?w=400'] },
      { name: 'Mangoes', slug: 'mangoes', price: 150, category: categoryMap['Fruits'], description: 'Sweet alphonso mangoes', isFeatured: true, inStock: true, images: ['https://images.unsplash.com/photo-1553279768-865429fa0078?w=400'] },
      { name: 'Grapes', slug: 'grapes', price: 100, category: categoryMap['Fruits'], description: 'Seedless green grapes', isFeatured: false, inStock: true, images: ['https://images.unsplash.com/photo-1559563458-527698bf5295?w=400'] },
      { name: 'Potatoes', slug: 'potatoes', price: 40, category: categoryMap['Vegetables'], description: 'Fresh farm potatoes', isFeatured: false, inStock: true, images: ['https://images.unsplash.com/photo-1518977676601-b53f82b65594?w=400'] },
      { name: 'Onions', slug: 'onions', price: 50, category: categoryMap['Vegetables'], description: 'Fresh red onions', isFeatured: false, inStock: true, images: ['https://images.unsplash.com/photo-1557401612-0a2f03562933?w=400'] },
      { name: 'Tomatoes', slug: 'tomatoes', price: 60, category: categoryMap['Vegetables'], description: 'Red ripe tomatoes', isFeatured: true, inStock: true, images: ['https://images.unsplash.com/photo-1546470425-277a4c64eb52?w=400'] },
      { name: 'Spinach', slug: 'spinach', price: 30, category: categoryMap['Vegetables'], description: 'Fresh green spinach', isFeatured: false, inStock: true, images: ['https://images.unsplash.com/photo-1576045057995-568f588f82b1?w=400'] },
      { name: 'Carrots', slug: 'carrots', price: 45, category: categoryMap['Vegetables'], description: 'Organic carrots', isFeatured: false, inStock: true, images: ['https://images.unsplash.com/photo-1598170845058-32b9aeb5e8ae?w=400'] },
      { name: 'Milk', slug: 'milk', price: 55, category: categoryMap['Dairy'], description: 'Fresh cow milk 1L', isFeatured: true, inStock: true, images: ['https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400'] },
      { name: 'Paneer', slug: 'paneer', price: 180, category: categoryMap['Dairy'], description: 'Fresh cottage cheese', isFeatured: true, inStock: true, images: ['https://images.unsplash.com/photo-1559599238-308793b4270d?w=400'] },
      { name: 'Yogurt', slug: 'yogurt', price: 40, category: categoryMap['Dairy'], description: 'Creamy yogurt 500g', isFeatured: false, inStock: true, images: ['https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400'] },
      { name: 'Bread', slug: 'bread', price: 35, category: categoryMap['Bakery'], description: 'Fresh white bread 400g', isFeatured: false, inStock: true, images: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400'] },
      { name: 'Croissant', slug: 'croissant', price: 60, category: categoryMap['Bakery'], description: 'Buttery croissant', isFeatured: true, inStock: true, images: ['https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400'] }
    ]);

    await Banner.insertMany([
      { title: 'Fresh Fruits Sale', subtitle: 'Get 20% off on all fruits', image: 'https://images.unsplash.com/photo-1610832958506-aa56368184cf?w=800', position: 'hero', isActive: true, order: 1 },
      { title: 'Vegetables Special', subtitle: 'Fresh vegetables at best prices', image: 'https://images.unsplash.com/photo-1540420773420-3396a661769b?w=800', position: 'hero', isActive: true, order: 2 },
      { title: 'Daily Essentials', subtitle: 'Everything you need', image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800', position: 'hero', isActive: true, order: 3 }
    ]);

    res.json({ success: true, message: 'Database seeded successfully', categories: categories.length });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || process.env.RENDER_EXTERNAL_PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

app.get('/api/test-db', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      return res.json({ success: true, message: 'Already connected' });
    }
    await mongoose.connect(MONGODB_URI);
    res.json({ success: true, message: 'Connected now' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB error:', err.message));
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;