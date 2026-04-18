require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const MONGODB_URI = process.env.MONGODB_URI;

const Category = mongoose.models.Category || mongoose.model('Category', new mongoose.Schema({
  name: String, slug: String, description: String, image: String, isActive: Boolean, order: Number
}, { timestamps: true }));

const Product = mongoose.models.Product || mongoose.model('Product', new mongoose.Schema({
  name: String, slug: String, description: String, price: Number, category: mongoose.Schema.Types.ObjectId, images: [String], inStock: Boolean, isFeatured: Boolean, isActive: Boolean
}, { timestamps: true }));

const Banner = mongoose.models.Banner || mongoose.model('Banner', new mongoose.Schema({
  title: String, subtitle: String, image: String, position: String, isActive: Boolean, order: Number
}, { timestamps: true }));

const User = mongoose.models.User || mongoose.model('User', new mongoose.Schema({
  name: String, email: String, password: String, role: String, isActive: Boolean
}, { timestamps: true }));

const seedDB = async () => {
  if (await Category.countDocuments() > 0) return;
  const cats = await Category.insertMany([
    { name: 'Fruits', slug: 'fruits', description: 'Fresh fruits', order: 1 },
    { name: 'Vegetables', slug: 'vegetables', description: 'Fresh vegetables', order: 2 },
    { name: 'Dairy', slug: 'dairy', description: 'Dairy products', order: 3 },
    { name: 'Bakery', slug: 'bakery', description: 'Fresh bakery', order: 4 },
    { name: 'Meat & Poultry', slug: 'meat-poultry', description: 'Fresh meat', order: 5 },
    { name: 'Fish & Seafood', slug: 'fish-seafood', description: 'Fresh seafood', order: 6 },
    { name: 'Beverages', slug: 'beverages', description: 'Drinks', order: 7 },
    { name: 'Snacks', slug: 'snacks', description: 'Snacks', order: 8 },
    { name: 'Grains & Pulses', slug: 'grains-pulses', description: 'Grains', order: 9 },
    { name: 'Spices & Condiments', slug: 'spices-condiments', description: 'Spices', order: 10 }
  ]);
  const catMap = {};
  cats.forEach(c => catMap[c.slug] = c._id);
  
  const bcrypt = require('bcryptjs');
  await User.create({ name: 'Admin', email: 'admin@machhenarayanmart.com', password: await bcrypt.hash('Admin@123', 10), role: 'admin' });

  await Product.insertMany([
    { name: 'Fresh Apples', slug: 'fresh-apples', description: 'Organic red apples', price: 120, category: catMap.fruits, images: ['https://images.unsplash.com/photo-1560806887-1e4cd0b6bdce?w=400'], isFeatured: true },
    { name: 'Bananas', slug: 'bananas', description: 'Fresh bananas', price: 60, category: catMap.fruits, images: ['https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400'] },
    { name: 'Oranges', slug: 'oranges', description: 'Juicy oranges', price: 80, category: catMap.fruits, images: ['https://images.unsplash.com/photo-1547514701-427329315e76?w=400'], isFeatured: true },
    { name: 'Mangoes', slug: 'mangoes', description: 'Sweet mangoes', price: 150, category: catMap.fruits, images: ['https://images.unsplash.com/photo-1553279768-865429fa0078?w=400'], isFeatured: true },
    { name: 'Potatoes', slug: 'potatoes', description: 'Fresh potatoes', price: 40, category: catMap.vegetables, images: ['https://images.unsplash.com/photo-1518977676601-b53f82b65594?w=400'] },
    { name: 'Onions', slug: 'onions', description: 'Fresh onions', price: 50, category: catMap.vegetables, images: ['https://images.unsplash.com/photo-1557401612-0a2f03562933?w=400'] },
    { name: 'Tomatoes', slug: 'tomatoes', description: 'Red tomatoes', price: 60, category: catMap.vegetables, images: ['https://images.unsplash.com/photo-1546470425-277a4c64eb52?w=400'], isFeatured: true },
    { name: 'Spinach', slug: 'spinach', description: 'Fresh spinach', price: 30, category: catMap.vegetables, images: ['https://images.unsplash.com/photo-1576045057995-568f588f82b1?w=400'] },
    { name: 'Milk', slug: 'milk', description: 'Fresh cow milk 1L', price: 55, category: catMap.dairy, images: ['https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400'], isFeatured: true },
    { name: 'Paneer', slug: 'paneer', description: 'Fresh cottage cheese', price: 180, category: catMap.dairy, images: ['https://images.unsplash.com/photo-1559599238-308793b4270d?w=400'], isFeatured: true },
    { name: 'Yogurt', slug: 'yogurt', description: 'Creamy yogurt', price: 40, category: catMap.dairy, images: ['https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400'] },
    { name: 'Butter', slug: 'butter', description: 'Fresh butter', price: 200, category: catMap.dairy, images: ['https://images.unsplash.com/photo-1589985270826334-36d1a1baa93a?w=400'] },
    { name: 'Bread', slug: 'bread', description: 'Fresh bread', price: 35, category: catMap.bakery, images: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400'] },
    { name: 'Croissant', slug: 'croissant', description: 'Buttery croissant', price: 60, category: catMap.bakery, images: ['https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400'], isFeatured: true },
    { name: 'Chicken Breast', slug: 'chicken-breast', description: 'Fresh chicken 1kg', price: 280, category: catMap['meat-poultry'], images: ['https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400'], isFeatured: true },
    { name: 'Eggs', slug: 'eggs', description: 'Farm eggs (12 pcs)', price: 80, category: catMap['meat-poultry'], images: ['https://images.unsplash.com/photo-1582722872445-44dc5f7e4c9f?w=400'], isFeatured: true },
    { name: 'Fish', slug: 'fish', description: 'Fresh fish 1kg', price: 350, category: catMap['fish-seafood'], images: ['https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=400'] },
    { name: 'Prawns', slug: 'prawns', description: 'Fresh prawns', price: 450, category: catMap['fish-seafood'], images: ['https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400'], isFeatured: true },
    { name: 'Orange Juice', slug: 'orange-juice', description: 'Fresh juice 1L', price: 90, category: catMap.beverages, images: ['https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400'] },
    { name: 'Chips', slug: 'chips', description: 'Crispy chips', price: 50, category: catMap.snacks, images: ['https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400'] },
    { name: 'Cookies', slug: 'cookies', description: 'Chocolate cookies', price: 80, category: catMap.snacks, images: ['https://images.unsplash.com/photo-1499636136210-6f4e015e00e3?w=400'], isFeatured: true },
    { name: 'Basmati Rice', slug: 'basmati-rice', description: 'Premium rice 5kg', price: 180, category: catMap['grains-pulses'], images: ['https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400'], isFeatured: true },
    { name: 'Wheat Atta', slug: 'wheat-atta', description: 'Wheat flour 10kg', price: 350, category: catMap['grains-pulses'], images: ['https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400'], isFeatured: true }
  ]);

  await Banner.insertMany([
    { title: 'Fresh Sale', subtitle: '20% off', image: 'https://images.unsplash.com/photo-1610832958506-aa56368184cf?w=800', order: 1 },
    { title: 'Vegetables', subtitle: 'Fresh deals', image: 'https://images.unsplash.com/photo-1540420773420-3396a661769b?w=800', order: 2 }
  ]);
  console.log('Seeded!');
};

if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI).then(() => seedDB()).catch(console.error);
}

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.get('/api/categories', async (req, res) => {
  try { const c = await Category.find({ isActive: true }).sort({ order: 1 }); res.json({ success: true, categories: c }); }
  catch(e) { res.status(500).json({ error: e.message }); }
});
app.get('/api/categories/slug/:slug', async (req, res) => {
  try { const c = await Category.findOne({ slug: req.params.slug }); res.json({ success: true, category: c }); }
  catch(e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/products', async (req, res) => {
  try {
    const { category, featured, page=1, limit=20 } = req.query;
    let q = { isActive: true };
    if (featured === 'true') q.isFeatured = true;
    const p = await Product.find(q).populate('category','name slug').skip((page-1)*limit).limit(Number(limit));
    res.json({ success: true, products: p });
  } catch(e) { res.status(500).json({ error: e.message }); }
});
app.get('/api/products/featured', async (req, res) => {
  try { const p = await Product.find({ isFeatured: true, isActive: true }).populate('category','name slug'); res.json({ success: true, products: p }); }
  catch(e) { res.status(500).json({ error: e.message }); }
});
app.get('/api/products/slug/:slug', async (req, res) => {
  try { const p = await Product.findOne({ slug: req.params.slug }).populate('category','name slug'); res.json({ success: true, product: p }); }
  catch(e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/banners/active', async (req, res) => {
  try { const b = await Banner.find({ isActive: true }).sort({ order: 1 }); res.json({ success: true, banners: b }); }
  catch(e) { res.status(500).json({ error: e.message }); }
});

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ error: 'Invalid' });
    res.json({ success: true, token: jwt.sign({ id: user._id }, JWT_SECRET), user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch(e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password: await bcrypt.hash(password, 10) });
    res.json({ success: true, token: jwt.sign({ id: user._id }, JWT_SECRET), user: { id: user._id, name: user.name, email: user.email } });
  } catch(e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/auth/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ','');
    if (!token) return res.status(401).json({ error: 'Not authorized' });
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    res.json({ success: true, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch(e) { res.status(401).json({ error: 'Invalid' }); }
});

module.exports = app;