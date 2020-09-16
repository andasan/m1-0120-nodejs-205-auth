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

exports.getCart = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .execPopulate() //to enable our populate() to return a promise
        .then((user) => {
            const products = user.cart.items
            // console.log(products);
            res.render('shops/cart', {
                pageTitle: 'Your cart',
                products: products,
                path: '/cart'
            });
        })
        .catch(err => console.log(err))

}

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

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
        .removeFromCart(prodId)
        .then(() => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
    // Cart.deleteProduct(prodId, product.price);
};

exports.postOrder = (req,res,next) => {
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then()
        .catch()
}

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