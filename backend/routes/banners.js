const express = require('express');
const { body } = require('express-validator');
const bannerController = require('../controllers/bannerController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.get('/active', bannerController.getActiveBanners);
router.get('/', bannerController.getBanners);
router.get('/:id', bannerController.getBanner);

router.post('/', protect, admin, [
  body('image').notEmpty().withMessage('Banner image is required')
], bannerController.createBanner);

router.put('/:id', protect, admin, bannerController.updateBanner);
router.delete('/:id', protect, admin, bannerController.deleteBanner);

module.exports = router;