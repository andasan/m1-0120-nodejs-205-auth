const Order = require('../models/order.model');
const Product = require('../models/product.model');

//getting all products
exports.getProducts = (req, res, next) => {
    //fetchAll
    Product.find()
        .then((products) => {
            res.render('shops/product-list', {
                pageTitle: 'All Products',
                products: products,
                path: '/' //for navigation bar's active button
            });
        })
        .catch(err => console.log(err));
};

//getting one product
exports.getOneProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then((result)=> {
            console.log(result);
            res.render('shops/product-detail', {
                pageTitle: result.title,
                product: result,
                path: '/products' //for navigation bar's active button
            });
        })
        .catch(err => console.log(err));
};

// exports.getCart = (req, res, next) => {
//     //access the getCart method with a callback function where we will eventually receive the cart items if there are any
//     Cart.getCart(cart => {
//         //we need a little information about the products too
//         Product.find(products => {
//             const cartProducts = [];
//             //filter out the products which are in the cart
//             for (product of products) {
//                 //check if this product from Products Data matches the product that is stored in the cart (if any)
//                 const cartProductData = cart.products.find(
//                     prod => prod.id === product.id
//                 );
//                 //, if it does exist, push the data to cartProducts array
//                 if (cartProductData) {
//                     cartProducts.push({
//                         productData: product, //holds all the filtered product data from Product model 
//                         qty: cartProductData.qty //there is not quantity property in Product Model, so we  take it from the cart's product data
//                     });
//                 }
//             }
//             res.render('shops/cart', {
//                 pageTitle: 'Your cart',
//                 products: cartProducts,
//                 path: '/cart'
//             });
//         })
//     })
// }

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product
        .findById(prodId)
        .then(product => {
            return req.user.addToCart(product);
        })
        .then(() => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
    // Cart.addProduct(prodId, product.price);
};

// exports.postCartDeleteProduct = (req, res, next) => {
//     const prodId = req.body.productId;
//     Product.findById(prodId, product => {
//         Cart.deleteProduct(prodId, product.price);
//         res.redirect('/cart');
//     });
// };

// exports.getOrders = (req, res, next) => {
//     res.render('shops/orders', {
//         pageTitle: 'Your Orders',
//         path: '/orders'
//     });
// };

// exports.getCheckOut = (req, res, next) => {
//     res.render('shops/checkout', {
//         pageTitle: 'Checkout',
//         path: '/checkout'
//     })
// }