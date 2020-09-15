const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shop.controller');

//shop index ------ in browser: /
router.get('/', shopController.getProducts);

// //get all products ------ in browser: /products
// router.get('/products', (req,res,next) => {

// })

//get one product
router.get('/products/:productId', shopController.getOneProduct);

// //go to cart page
// router.get('/cart', shopController.getCart);

// //post a product on cart ---or add to cart
// router.post('/cart', shopController.postCart);

// // delete a product from cart
// router.post('/cart-delete-item', shopController.postCartDeleteProduct);

// router.get('/orders', shopController.getOrders);

// router.get('/checkout', shopController.getCheckOut);

module.exports = router;
