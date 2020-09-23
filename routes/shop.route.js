const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shop.controller');

// @route   GET /
// @desc    Get all products
// @access  Public
router.get('/', shopController.getProducts);

// @route   GET /products
// @desc    Get a certain product by id
// @access  Public
router.get('/products/:productId', shopController.getOneProduct);

// @route   GET /cart
// @desc    Get products added in cart by a user
// @access  Public
router.get('/cart', shopController.getCart);

// @route   POST /cart
// @desc    For users to add a product in a cart
// @access  Public
router.post('/cart', shopController.postCart);

// @route   POST /cart
// @desc    Removes a product from the cart
// @access  Public
router.post('/cart-delete-item', shopController.postCartDeleteProduct);

// @route   POST /orders
// @desc    Consolidate all products in cart to orders collection
// @access  Public
router.get('/orders', shopController.getOrders);

// @route   GET /orders
// @desc    Get all products in orders collection by user id
// @access  Public
router.post('/create-order', shopController.postOrder);

// router.get('/checkout', shopController.getCheckOut);

module.exports = router;
