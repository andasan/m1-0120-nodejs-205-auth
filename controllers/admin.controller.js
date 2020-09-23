const Product = require('../models/product.model');
const { getProducts } = require('./shop.controller');

exports.getAddProduct = (req,res,next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false,
        isAuth: req.session.isLoggedIn
    })
};

exports.postAddProduct = (req,res,next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    const product = new Product({
        title: title, 
        imageUrl: imageUrl, 
        description: description, 
        price: price,
        userId: req.user //mongoose will pick the id from the user object of request
    });
    product
        .save()
        .then(() => {
            console.log('Created Product');
            res.redirect('/');
        })
        .catch(err => console.log(err));
};

exports.getEditProduct = (req,res,next) => {
    const editMode = req.query.edit;
    if(!editMode){
        res.redirect('/');
    }

    const prodId = req.params.productId;
    Product.findById(prodId)
        .then((result) => {
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: editMode,
                product: result,
                isAuth: req.session.isLoggedIn
            });
        })
        .catch(err => console.log(err));
};

exports.postEditProduct = (req,res,next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
    const updatedPrice = req.body.price;
    // const updateProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedDesc, updatedPrice);
    Product
        .findById(prodId)
        .then((product) => {
            product.title = updatedTitle,
            product.imageUrl = updatedImageUrl,
            product.description = updatedDesc,
            product.price = updatedPrice
            return product.save();
        })
        .then(() => {
            console.log('Updated Product');
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));

    // updateProduct.edit(prodId) 
    //     .then(()=>{
    //         res.redirect('/admin/products');
    //     })
    //     .catch(err => console.log(err));
};

exports.getProducts = (req,res,next) => {
    Product.find()
        // .populate('userId', 'name')
        .then((products) => {
            // console.log(products);
            res.render('admin/products', {
                pageTitle: 'Admin Products',
                path: '/admin/products',
                prods: products,
                isAuth: req.session.isLoggedIn
            });
        })
        .catch(err => console.log(err))
}

exports.postDeleteProduct = (req,res,next) => {
    const prodId = req.body.productId;
    Product
        .findByIdAndRemove(prodId)
        .then(() => {
            console.log('Deleted Product');
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
}