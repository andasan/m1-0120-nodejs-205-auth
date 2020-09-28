const Product = require('../models/product.model');
const {validationResult} = require('express-validator');

exports.getAddProduct = (req,res,next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
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

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).render('admin/edit-product', {
            pageTitle: 'Add Product',
            path: '/admin/add-product',
            editing: false,
            errorMessage: errors.array()[0].msg
        })
    }

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
                product: result
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

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: true,
            errorMessage: errors.array()[0].msg
        })
    }

    Product
        .findById(prodId)
        .then((product) => {
            if(product.userId.toString() !== req.user._id.toString()){
                return res.redirect('/');
            }
            product.title = updatedTitle,
            product.imageUrl = updatedImageUrl,
            product.description = updatedDesc,
            product.price = updatedPrice
            return product.save().then(() => {
                console.log('Updated Product');
                res.redirect('/admin/products');
            });
        })
        .catch(err => console.log(err));
};

exports.getProducts = (req,res,next) => {
    Product.find({userId: req.user._id})
        .then((products) => {
            res.render('admin/products', {
                pageTitle: 'Admin Products',
                path: '/admin/products',
                prods: products
            });
        })
        .catch(err => console.log(err))
}

exports.postDeleteProduct = (req,res,next) => {
    const prodId = req.body.productId;
    Product
        .deleteOne({_id: prodId, userId: req.user._id})
        .then(() => {
            console.log('Deleted Product');
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
}