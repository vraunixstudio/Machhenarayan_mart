const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'backend', '.env') });

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./backend/routes/auth');
const userRoutes = require('./backend/routes/users');
const categoryRoutes = require('./backend/routes/categories');
const productRoutes = require('./backend/routes/products');
const bannerRoutes = require('./backend/routes/banners');
const uploadRoutes = require('./backend/routes/upload');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const MONGODB_URI = process.env.MONGODB_URI;

if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
}

module.exports = app;