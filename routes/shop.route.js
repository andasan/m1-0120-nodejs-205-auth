const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shop.controller');

// @route   GET /
// @desc    Get all products
// @access  Public
router.get('/', shopController.getProducts);

//get one product
router.get('/products/:productId', shopController.getOneProduct);

//go to cart page
router.get('/cart', shopController.getCart);

//post a product on cart ---or add to cart
router.post('/cart', shopController.postCart);

// // delete a product from cart
router.post('/cart-delete-item', shopController.postCartDeleteProduct);

router.get('/orders', shopController.getOrders);

router.post('/create-order', shopController.postOrder);

// router.get('/checkout', shopController.getCheckOut);

module.exports = router;
