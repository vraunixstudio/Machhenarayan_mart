require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const categories = [
  { _id: '1', name: 'Fruits', slug: 'fruits', description: 'Fresh fruits', isActive: true },
  { _id: '2', name: 'Vegetables', slug: 'vegetables', description: 'Fresh vegetables', isActive: true },
  { _id: '3', name: 'Dairy', slug: 'dairy', description: 'Milk & dairy products', isActive: true },
  { _id: '4', name: 'Bakery', slug: 'bakery', description: 'Fresh bread & pastries', isActive: true },
  { _id: '5', name: 'Meat & Poultry', slug: 'meat-poultry', description: 'Fresh meat & chicken', isActive: true },
  { _id: '6', name: 'Fish & Seafood', slug: 'fish-seafood', description: 'Fresh catches', isActive: true },
  { _id: '7', name: 'Beverages', slug: 'beverages', description: 'Drinks & juices', isActive: true },
  { _id: '8', name: 'Snacks', slug: 'snacks', description: 'Chips, cookies & crackers', isActive: true },
  { _id: '9', name: 'Grains & Pulses', slug: 'grains-pulses', description: 'Rice, wheat & dal', isActive: true },
  { _id: '10', name: 'Spices & Condiments', slug: 'spices-condiments', description: 'Herbs & spices', isActive: true }
];

const products = [
  { _id: '1', name: 'Fresh Apples', price: 120, category: { _id: '1', name: 'Fruits', slug: 'fruits' }, description: 'Organic red apples', isFeatured: true, inStock: true, images: ['https://images.unsplash.com/photo-1560806887-1e4cd0b6bdce?w=400'] },
  { _id: '2', name: 'Bananas', price: 60, category: { _id: '1', name: 'Fruits', slug: 'fruits' }, description: 'Fresh yellow bananas', isFeatured: false, inStock: true, images: ['https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400'] },
  { _id: '3', name: 'Oranges', price: 80, category: { _id: '1', name: 'Fruits', slug: 'fruits' }, description: 'Juicy navel oranges', isFeatured: true, inStock: true, images: ['https://images.unsplash.com/photo-1547514701-427329315e76?w=400'] },
  { _id: '4', name: 'Mangoes', price: 150, category: { _id: '1', name: 'Fruits', slug: 'fruits' }, description: 'Sweet alphonso mangoes', isFeatured: true, inStock: true, images: ['https://images.unsplash.com/photo-1553279768-865429fa0078?w=400'] },
  { _id: '5', name: 'Grapes', price: 100, category: { _id: '1', name: 'Fruits', slug: 'fruits' }, description: 'Seedless green grapes', isFeatured: false, inStock: true, images: ['https://images.unsplash.com/photo-1559563458-527698bf5295?w=400'] },
  { _id: '6', name: 'Potatoes', price: 40, category: { _id: '2', name: 'Vegetables', slug: 'vegetables' }, description: 'Fresh farm potatoes', isFeatured: false, inStock: true, images: ['https://images.unsplash.com/photo-1518977676601-b53f82b65594?w=400'] },
  { _id: '7', name: 'Onions', price: 50, category: { _id: '2', name: 'Vegetables', slug: 'vegetables' }, description: 'Fresh red onions', isFeatured: false, inStock: true, images: ['https://images.unsplash.com/photo-1557401612-0a2f03562933?w=400'] },
  { _id: '8', name: 'Tomatoes', price: 60, category: { _id: '2', name: 'Vegetables', slug: 'vegetables' }, description: 'Red ripe tomatoes', isFeatured: true, inStock: true, images: ['https://images.unsplash.com/photo-1546470425-277a4c64eb52?w=400'] },
  { _id: '9', name: 'Spinach', price: 30, category: { _id: '2', name: 'Vegetables', slug: 'vegetables' }, description: 'Fresh green spinach', isFeatured: false, inStock: true, images: ['https://images.unsplash.com/photo-1576045057995-568f588f82b1?w=400'] },
  { _id: '10', name: 'Carrots', price: 45, category: { _id: '2', name: 'Vegetables', slug: 'vegetables' }, description: 'Organic carrots', isFeatured: false, inStock: true, images: ['https://images.unsplash.com/photo-1598170845058-32b9aeb5e8ae?w=400'] },
  { _id: '11', name: 'Milk', price: 55, category: { _id: '3', name: 'Dairy', slug: 'dairy' }, description: 'Fresh cow milk 1L', isFeatured: true, inStock: true, images: ['https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400'] },
  { _id: '12', name: 'Paneer', price: 180, category: { _id: '3', name: 'Dairy', slug: 'dairy' }, description: 'Fresh cottage cheese', isFeatured: true, inStock: true, images: ['https://images.unsplash.com/photo-1559599238-308793b4270d?w=400'] },
  { _id: '13', name: 'Yogurt', price: 40, category: { _id: '3', name: 'Dairy', slug: 'dairy' }, description: 'Creamy yogurt 500g', isFeatured: false, inStock: true, images: ['https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400'] },
  { _id: '14', name: 'Butter', price: 200, category: { _id: '3', name: 'Dairy', slug: 'dairy' }, description: 'Fresh butter 500g', isFeatured: false, inStock: true, images: ['https://images.unsplash.com/photo-1589985270826334-36d1a1baa93a?w=400'] },
  { _id: '15', name: 'Cheese', price: 250, category: { _id: '3', name: 'Dairy', slug: 'dairy' }, description: 'Cheddar cheese 500g', isFeatured: false, inStock: true, images: ['https://images.unsplash.com/photo-1618160702438-9b02ab6515c3?w=400'] },
  { _id: '16', name: 'Bread', price: 35, category: { _id: '4', name: 'Bakery', slug: 'bakery' }, description: 'Fresh white bread 400g', isFeatured: false, inStock: true, images: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400'] },
  { _id: '17', name: 'Croissant', price: 60, category: { _id: '4', name: 'Bakery', slug: 'bakery' }, description: 'Buttery croissant', isFeatured: true, inStock: true, images: ['https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400'] },
  { _id: '18', name: 'Chicken Breast', price: 280, category: { _id: '5', name: 'Meat & Poultry', slug: 'meat-poultry' }, description: 'Fresh chicken 1kg', isFeatured: true, inStock: true, images: ['https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400'] },
  { _id: '19', name: 'Eggs', price: 80, category: { _id: '5', name: 'Meat & Poultry', slug: 'meat-poultry' }, description: 'Farm fresh eggs (12 pcs)', isFeatured: true, inStock: true, images: ['https://images.unsplash.com/photo-1582722872445-44dc5f7e4c9f?w=400'] },
  { _id: '20', name: 'Fish', price: 350, category: { _id: '6', name: 'Fish & Seafood', slug: 'fish-seafood' }, description: 'Fresh rohu fish 1kg', isFeatured: false, inStock: true, images: ['https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=400'] },
  { _id: '21', name: 'Prawns', price: 450, category: { _id: '6', name: 'Fish & Seafood', slug: 'fish-seafood' }, description: 'Fresh prawns 500g', isFeatured: true, inStock: true, images: ['https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400'] },
  { _id: '22', name: 'Orange Juice', price: 90, category: { _id: '7', name: 'Beverages', slug: 'beverages' }, description: 'Fresh orange juice 1L', isFeatured: false, inStock: true, images: ['https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400'] },
  { _id: '23', name: 'Mango Lassi', price: 70, category: { _id: '7', name: 'Beverages', slug: 'beverages' }, description: 'Traditional lassi', isFeatured: true, inStock: true, images: ['https://images.unsplash.com/photo-1527661592475-9bcb2d8d8c8d?w=400'] },
  { _id: '24', name: 'Chips', price: 50, category: { _id: '8', name: 'Snacks', slug: 'snacks' }, description: 'Crispy potato chips', isFeatured: false, inStock: true, images: ['https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400'] },
  { _id: '25', name: 'Cookies', price: 80, category: { _id: '8', name: 'Snacks', slug: 'snacks' }, description: 'Chocolate cookies', isFeatured: true, inStock: true, images: ['https://images.unsplash.com/photo-1499636136210-6f4e015e00e3?w=400'] },
  { _id: '26', name: 'Basmati Rice', price: 180, category: { _id: '9', name: 'Grains & Pulses', slug: 'grains-pulses' }, description: 'Premium basmati 5kg', isFeatured: true, inStock: true, images: ['https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400'] },
  { _id: '27', name: 'Wheat Atta', price: 350, category: { _id: '9', name: 'Grains & Pulses', slug: 'grains-pulses' }, description: 'Whole wheat flour 10kg', isFeatured: true, inStock: true, images: ['https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400'] },
  { _id: '28', name: 'Daal Moong', price: 120, category: { _id: '9', name: 'Grains & Pulses', slug: 'grains-pulses' }, description: 'Yellow moong dal 1kg', isFeatured: false, inStock: true, images: ['https://images.unsplash.com/photo-1594751919104-24b4d9cb4e95?w=400'] },
  { _id: '29', name: 'Black Pepper', price: 80, category: { _id: '10', name: 'Spices & Condiments', slug: 'spices-condiments' }, description: 'Whole black pepper 100g', isFeatured: false, inStock: true, images: ['https://images.unsplash.com/photo-1506905925346-21bda4dcddfb?w=400'] },
  { _id: '30', name: 'Red Chilli', price: 60, category: { _id: '10', name: 'Spices & Condiments', slug: 'spices-condiments' }, description: 'Red chilli powder 100g', isFeatured: false, inStock: true, images: ['https://images.unsplash.com/photo-1596040033229-1ed0db1c2f3c?w=400'] }
];

const banners = [
  { _id: '1', title: 'Fresh Fruits Sale', subtitle: 'Get 20% off on all fruits', image: 'https://images.unsplash.com/photo-1610832958506-aa56368184cf?w=800', position: 'hero', isActive: true, order: 1 },
  { _id: '2', title: 'Vegetables Special', subtitle: 'Fresh vegetables at best prices', image: 'https://images.unsplash.com/photo-1540420773420-3396a661769b?w=800', position: 'hero', isActive: true, order: 2 },
  { _id: '3', title: 'Daily Essentials', subtitle: 'Everything you need', image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800', position: 'hero', isActive: true, order: 3 }
];

// Categories
app.get('/api/categories', (req, res) => {
  res.json({ success: true, count: categories.length, categories: categories.filter(c => c.isActive) });
});

app.get('/api/categories/:id', (req, res) => {
  const cat = categories.find(c => c._id === req.params.id);
  if (!cat) return res.status(404).json({ error: 'Category not found' });
  res.json({ success: true, category: cat });
});

app.get('/api/categories/slug/:slug', (req, res) => {
  const cat = categories.find(c => c.slug === req.params.slug);
  if (!cat) return res.status(404).json({ error: 'Category not found' });
  res.json({ success: true, category: cat });
});

// Products
app.get('/api/products', (req, res) => {
  const { category, search, featured, sort, page = 1, limit = 20 } = req.query;
  let filtered = [...products];
  
  if (category) {
    filtered = filtered.filter(p => p.category.slug === category);
  }
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(p => p.name.toLowerCase().includes(q));
  }
  if (featured === 'true') {
    filtered = filtered.filter(p => p.isFeatured);
  }
  
  const skip = (page - 1) * limit;
  filtered = filtered.slice(skip, skip + Number(limit));
  
  res.json({ success: true, count: filtered.length, total: products.length, page: Number(page), products: filtered });
});

app.get('/api/products/featured', (req, res) => {
  const featured = products.filter(p => p.isFeatured);
  res.json({ success: true, count: featured.length, products: featured });
});

app.get('/api/products/search', (req, res) => {
  const { q, category, minPrice, maxPrice } = req.query;
  let filtered = [...products];
  
  if (q) {
    const search = q.toLowerCase();
    filtered = filtered.filter(p => p.name.toLowerCase().includes(search) || p.description?.toLowerCase().includes(search));
  }
  if (category) {
    filtered = filtered.filter(p => p.category.slug === category);
  }
  
  res.json({ success: true, count: filtered.length, products: filtered });
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p._id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json({ success: true, product });
});

app.get('/api/products/slug/:slug', (req, res) => {
  const product = products.find(p => p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === req.params.slug);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json({ success: true, product });
});

// Banners
app.get('/api/banners', (req, res) => {
  res.json({ success: true, count: banners.length, banners });
});

app.get('/api/banners/active', (req, res) => {
  const active = banners.filter(b => b.isActive);
  res.json({ success: true, count: active.length, banners: active });
});

// Auth (mock)
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin@machhenarayanmart.com' && password === 'Admin@123') {
    res.json({
      success: true,
      token: 'mock-jwt-token',
      user: { id: '1', name: 'Admin', email: 'admin@machhenarayanmart.com', role: 'admin' }
    });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  res.json({
    success: true,
    token: 'mock-jwt-token',
    user: { id: Date.now().toString(), name, email, role: 'user' }
  });
});

app.get('/api/auth/me', (req, res) => {
  const token = req.headers.authorization;
  if (token) {
    res.json({ success: true, user: { id: '1', name: 'Admin', email: 'admin@machhenarayanmart.com', role: 'admin' } });
  } else {
    res.status(401).json({ error: 'Not authorized' });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;