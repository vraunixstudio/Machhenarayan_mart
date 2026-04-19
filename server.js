require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { handleRequest } = require('@vercel/express');

const authRoutes = require('./backend/routes/auth');
const userRoutes = require('./backend/routes/users');
const categoryRoutes = require('./backend/routes/categories');
const productRoutes = require('./backend/routes/products');
const bannerRoutes = require('./backend/routes/banners');
const uploadRoutes = require('./backend/routes/upload');
const reviewRoutes = require('./backend/routes/reviews');
const messageRoutes = require('./backend/routes/messages');

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
app.use('/api/reviews', reviewRoutes);
app.use('/api/messages', messageRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/api/seed', async (req, res) => {
  try {
    const Category = require('./backend/models/Category');
    const Product = require('./backend/models/Product');
    const Banner = require('./backend/models/Banner');

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
      { name: 'Butter', slug: 'butter', price: 200, category: categoryMap['Dairy'], description: 'Fresh butter 500g', isFeatured: false, inStock: true, images: ['https://images.unsplash.com/photo-1589985270826334-36d1a1baa93a?w=400'] },
      { name: 'Cheese', slug: 'cheese', price: 250, category: categoryMap['Dairy'], description: 'Cheddar cheese 500g', isFeatured: false, inStock: true, images: ['https://images.unsplash.com/photo-1618160702438-9b02ab6515c3?w=400'] },
      { name: 'Bread', slug: 'bread', price: 35, category: categoryMap['Bakery'], description: 'Fresh white bread 400g', isFeatured: false, inStock: true, images: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400'] },
      { name: 'Croissant', slug: 'croissant', price: 60, category: categoryMap['Bakery'], description: 'Buttery croissant', isFeatured: true, inStock: true, images: ['https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400'] },
      { name: 'Chicken Breast', slug: 'chicken-breast', price: 280, category: categoryMap['Meat & Poultry'], description: 'Fresh chicken 1kg', isFeatured: true, inStock: true, images: ['https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400'] },
      { name: 'Eggs', slug: 'eggs', price: 80, category: categoryMap['Meat & Poultry'], description: 'Farm fresh eggs (12 pcs)', isFeatured: true, inStock: true, images: ['https://images.unsplash.com/photo-1582722872445-44dc5f7e4c9f?w=400'] },
      { name: 'Fish', slug: 'fish', price: 350, category: categoryMap['Fish & Seafood'], description: 'Fresh rohu fish 1kg', isFeatured: false, inStock: true, images: ['https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=400'] },
      { name: 'Prawns', slug: 'prawns', price: 450, category: categoryMap['Fish & Seafood'], description: 'Fresh prawns 500g', isFeatured: true, inStock: true, images: ['https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400'] },
      { name: 'Orange Juice', slug: 'orange-juice', price: 90, category: categoryMap['Beverages'], description: 'Fresh orange juice 1L', isFeatured: false, inStock: true, images: ['https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400'] },
      { name: 'Mango Lassi', slug: 'mango-lassi', price: 70, category: categoryMap['Beverages'], description: 'Traditional lassi', isFeatured: true, inStock: true, images: ['https://images.unsplash.com/photo-1527661592475-9bcb2d8d8c8d?w=400'] },
      { name: 'Chips', slug: 'chips', price: 50, category: categoryMap['Snacks'], description: 'Crispy potato chips', isFeatured: false, inStock: true, images: ['https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400'] },
      { name: 'Cookies', slug: 'cookies', price: 80, category: categoryMap['Snacks'], description: 'Chocolate cookies', isFeatured: true, inStock: true, images: ['https://images.unsplash.com/photo-1499636136210-6f4e015e00e3?w=400'] },
      { name: 'Basmati Rice', slug: 'basmati-rice', price: 180, category: categoryMap['Grains & Pulses'], description: 'Premium basmati 5kg', isFeatured: true, inStock: true, images: ['https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400'] },
      { name: 'Wheat Atta', slug: 'wheat-atta', price: 350, category: categoryMap['Grains & Pulses'], description: 'Whole wheat flour 10kg', isFeatured: true, inStock: true, images: ['https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400'] },
      { name: 'Daal Moong', slug: 'daal-moong', price: 120, category: categoryMap['Grains & Pulses'], description: 'Yellow moong dal 1kg', isFeatured: false, inStock: true, images: ['https://images.unsplash.com/photo-1594751919104-24b4d9cb4e95?w=400'] },
      { name: 'Black Pepper', slug: 'black-pepper', price: 80, category: categoryMap['Spices & Condiments'], description: 'Whole black pepper 100g', isFeatured: false, inStock: true, images: ['https://images.unsplash.com/photo-1506905925346-21bda4dcddfb?w=400'] },
      { name: 'Red Chilli', slug: 'red-chilli', price: 60, category: categoryMap['Spices & Condiments'], description: 'Red chilli powder 100g', isFeatured: false, inStock: true, images: ['https://images.unsplash.com/photo-1596040033229-1ed0db1c2f3c?w=400'] }
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
  res.status(500).json({ error: 'Internal Server Error' });
});

const MONGODB_URI = process.env.MONGODB_URI;

if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
}

module.exports = handleRequest(app);