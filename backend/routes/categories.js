const express = require('express');
const { body } = require('express-validator');
const categoryController = require('../controllers/categoryController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.get('/', categoryController.getCategories);
router.get('/all', categoryController.getCategories);
router.get('/:id', categoryController.getCategory);
router.get('/slug/:slug', categoryController.getCategoryBySlug);

router.post('/', protect, admin, [
  body('name').trim().notEmpty().withMessage('Category name is required')
], categoryController.createCategory);

router.put('/:id', protect, admin, categoryController.updateCategory);
router.delete('/:id', protect, admin, categoryController.deleteCategory);

module.exports = router;