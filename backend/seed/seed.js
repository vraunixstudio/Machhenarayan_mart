require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Category = require('../models/Category');
const Product = require('../models/Product');
const Banner = require('../models/Banner');

const categories = [
  { name: 'Fruits', description: 'Fresh fruits from local farms', order: 1 },
  { name: 'Vegetables', description: 'Fresh green vegetables', order: 2 },
  { name: 'Dairy', description: 'Milk, cheese, yogurt products', order: 3 },
  { name: 'Bakery', description: 'Fresh bread and pastries', order: 4 },
  { name: 'Meat & Poultry', description: 'Fresh meat and chicken', order: 5 },
  { name: 'Fish & Seafood', description: 'Fresh catches', order: 6 },
  { name: 'Beverages', description: 'Drinks and juices', order: 7 },
  { name: 'Snacks', description: 'Chips, cookies, crackers', order: 8 },
  { name: 'Grains & Pulses', description: 'Rice, wheat, dal', order: 9 },
  { name: 'Spices & Condiments', description: 'Herbs and spices', order: 10 }
];

const defaultImage = 'https://res.cloudinary.com/demo/image/upload/v1/samples/food/fruit-avatar';

const products = [
  { name: 'Fresh Apples', price: 120, description: 'Organic red apples, crisp and sweet', category: 'Fruits', isFeatured: true },
  { name: 'Bananas', price: 60, description: 'Fresh yellow bananas, perfect forBreakfast', category: 'Fruits', isFeatured: false },
  { name: 'Oranges', price: 80, description: 'Juicy navel oranges, rich in vitamin C', category: 'Fruits', isFeatured: true },
  { name: 'Mangoes', price: 150, description: 'Sweet alphonso mangoes', category: 'Fruits', isFeatured: true },
  { name: 'Grapes', price: 100, description: 'Seedless green grapes', category: 'Fruits', isFeatured: false },

  { name: 'Potatoes', price: 40, description: 'Fresh farm potatoes', category: 'Vegetables', isFeatured: false },
  { name: 'Onions', price: 50, description: 'Fresh red onions', category: 'Vegetables', isFeatured: false },
  { name: 'Tomatoes', price: 60, description: 'Red ripe tomatoes', category: 'Vegetables', isFeatured: true },
  { name: 'Spinach', price: 30, description: 'Fresh green spinach', category: 'Vegetables', isFeatured: false },
  { name: 'Carrots', price: 45, description: 'Organic carrots', category: 'Vegetables', isFeatured: false },

  { name: 'Milk', price: 55, description: 'Fresh cow milk 1L', category: 'Dairy', isFeatured: true },
  { name: 'Paneer', price: 180, description: 'Fresh cottage cheese 500g', category: 'Dairy', isFeatured: true },
  { name: 'Yogurt', price: 40, description: 'Creamy yogurt 500g', category: 'Dairy', isFeatured: false },
  { name: 'Butter', price: 200, description: 'Fresh butter 500g', category: 'Dairy', isFeatured: false },
  { name: 'Cheese', price: 250, description: 'Cheddar cheese 500g', category: 'Dairy', isFeatured: false },

  { name: 'Bread', price: 35, description: 'Fresh white bread 400g', category: 'Bakery', isFeatured: false },
  { name: 'Baguette', price: 80, description: 'French baguette', category: 'Bakery', isFeatured: false },
  { name: 'Croissant', price: 60, description: 'Buttery croissant', category: 'Bakery', isFeatured: true },
  { name: 'Donuts', price: 100, description: 'Chocolate glazed donuts (4 pcs)', category: 'Bakery', isFeatured: false },
  { name: 'Cake Slice', price: 50, description: 'Fresh cream cake slice', category: 'Bakery', isFeatured: false },

  { name: 'Chicken Breast', price: 280, description: 'Fresh chicken breast 1kg', category: 'Meat & Poultry', isFeatured: true },
  { name: 'Mutton', price: 450, description: 'Fresh mutton 1kg', category: 'Meat & Poultry', isFeatured: false },
  { name: 'Eggs', price: 80, description: 'Farm fresh eggs (12 pcs)', category: 'Meat & Poultry', isFeatured: true },
  { name: 'Chicken Wings', price: 220, description: 'Chicken wings 1kg', category: 'Meat & Poultry', isFeatured: false },
  { name: 'Liver', price: 150, description: 'Fresh chicken liver 500g', category: 'Meat & Poultry', isFeatured: false },

  { name: 'Fish', price: 350, description: 'Fresh rohu fish 1kg', category: 'Fish & Seafood', isFeatured: false },
  { name: 'Prawns', price: 450, description: 'Fresh prawns 500g', category: 'Fish & Seafood', isFeatured: true },
  { name: 'Crabs', price: 500, description: 'Fresh crabs 1kg', category: 'Fish & Seafood', isFeatured: false },
  { name: 'Squid', price: 380, description: 'Fresh squid 500g', category: 'Fish & Seafood', isFeatured: false },
  { name: 'Tuna', price: 400, description: 'Fresh tuna 1kg', category: 'Fish & Seafood', isFeatured: false },

  { name: 'Orange Juice', price: 90, description: 'Fresh orange juice 1L', category: 'Beverages', isFeatured: false },
  { name: 'Mango Lassi', price: 70, description: 'Traditional mango lassi 500ml', category: 'Beverages', isFeatured: true },
  { name: 'Water', price: 20, description: 'Mineral water 1L', category: 'Beverages', isFeatured: false },
  { name: 'Soft Drinks', price: 40, description: 'Soft drink 500ml', category: 'Beverages', isFeatured: false },
  { name: 'Tea', price: 150, description: 'Premium tea leaves 250g', category: 'Beverages', isFeatured: false },

  { name: 'Chips', price: 50, description: 'Crispy potato chips', category: 'Snacks', isFeatured: false },
  { name: 'Cookies', price: 80, description: 'Chocolate cookies (200g)', category: 'Snacks', isFeatured: true },
  { name: 'Crackers', price: 60, description: 'Saltine crackers', category: 'Snacks', isFeatured: false },
  { name: 'Nuts', price: 200, description: 'Mixed nuts 250g', category: 'Snacks', isFeatured: false },
  { name: 'Popcorn', price: 70, description: 'Butter popcorn', category: 'Snacks', isFeatured: false },

  { name: 'Rice', price: 180, description: 'Basmati rice 5kg', category: 'Grains & Pulses', isFeatured: true },
  { name: 'Wheat Atta', price: 350, description: 'Whole wheat flour 10kg', category: 'Grains & Pulses', isFeatured: true },
  { name: 'Daal Moong', price: 120, description: 'Yellow moong dal 1kg', category: 'Grains & Pulses', isFeatured: false },
  { name: 'Daal Arhar', price: 150, description: 'Arhar dal 1kg', category: 'Grains & Pulses', isFeatured: false },
  { name: 'Sugar', price: 45, description: 'Refined sugar 1kg', category: 'Grains & Pulses', isFeatured: false },

  { name: 'Black Pepper', price: 80, description: 'Whole black pepper 100g', category: 'Spices & Condiments', isFeatured: false },
  { name: 'Red Chilli', price: 60, description: 'Red chilli powder 100g', category: 'Spices & Condiments', isFeatured: false },
  { name: 'Turmeric', price: 70, description: 'Turmeric powder 100g', category: 'Spices & Condiments', isFeatured: false },
  { name: 'Cumin Seeds', price: 90, description: 'Cumin seeds 100g', category: 'Spices & Condiments', isFeatured: false },
  { name: 'Garam Masala', price: 100, description: 'Garam masala 100g', category: 'Spices & Condiments', isFeatured: false }
];

const banners = [
  {
    title: 'Fresh Fruits Sale',
    subtitle: 'Get 20% off on all fruits',
    position: 'hero',
    order: 1,
    isActive: true
  },
  {
    title: 'Vegetables Special',
    subtitle: 'Fresh vegetables at best prices',
    position: 'hero',
    order: 2,
    isActive: true
  },
  {
    title: 'Daily Essentials',
    subtitle: 'Everything you need',
    position: 'hero',
    order: 3,
    isActive: true
  },
  {
    title: 'Dairy Products',
    subtitle: 'Up to 15% off',
    position: 'promo',
    order: 1,
    isActive: true
  },
  {
    title: 'Bakery Fresh',
    subtitle: 'Hot and fresh every morning',
    position: 'promo',
    order: 2,
    isActive: true
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await User.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Banner.deleteMany({});
    console.log('Cleared existing data');

    const adminUser = await User.create({
      name: 'Admin',
      email: 'machhenarayanmart@gmail.com',
      password: 'admin123',
      role: 'admin'
    });
    console.log('Created admin user');

    const categoryDocs = {};
    for (const cat of categories) {
      const category = await Category.create({
        name: cat.name,
        slug: cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
        description: cat.description,
        image: defaultImage,
        order: cat.order
      });
      categoryDocs[cat.name] = category;
      console.log(`Created category: ${cat.name}`);
    }

    for (const product of products) {
      const category = categoryDocs[product.category];
      await Product.create({
        name: product.name,
        slug: product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
        description: product.description,
        price: product.price,
        category: category._id,
        images: [defaultImage],
        inStock: true,
        isFeatured: product.isFeatured
      });
      console.log(`Created product: ${product.name}`);
    }

    for (const banner of banners) {
      await Banner.create({
        ...banner,
        image: defaultImage
      });
      console.log(`Created banner: ${banner.title}`);
    }

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedDatabase();