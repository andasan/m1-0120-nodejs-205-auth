// const fs = require('fs');
// const path = require('path');

// //path to cart.json
// const p = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json');

// module.exports = class Cart{
//     //adding product to cart
//     static addProduct(id, productPrice){
//         //fetching of previous cart
//         fs.readFile(p, (err, fileContent)=>{
//             let cart = { products: [], totalPrice: 0};
//             if(!err){
//                 cart = JSON.parse(fileContent);
//             }
//             //analyze product to add and return the index
//             const exisitingProductIndex = cart.products.findIndex(prod => prod.id === id);

//             const existingProduct = cart.products[exisitingProductIndex];
            
//             let updatedProduct;
//             // Increase quantity
//             if(existingProduct){
//                 updatedProduct = { ...existingProduct };
//                 updatedProduct.qty = updatedProduct.qty + 1;
//                 cart.products = [...cart.products]; //an array with the old cart products
//                 cart.products[exisitingProductIndex] = updatedProduct; //overwrite with updateProduct
//             }else{ // Add new product
//                 updatedProduct = { id, qty: 1 }; //new additional product
//                 cart.products  = [...cart.products, updatedProduct]; 
//             }
//             cart.totalPrice = cart.totalPrice + parseInt(productPrice); // +productPrice is the same as parseInt(productPrice)
//             fs.writeFile(p, JSON.stringify(cart), err => {
//                 console.log(err);
//             });
//         });
//     }

//     //deleting a product in cart
//     static deleteProduct(id, productPrice){
//         fs.readFile(p, (err, fileContent)=>{
//             if(err) return;

//             //start updating the cart
//             const updatedCart = { ...JSON.parse(fileContent) };
//             //need the product to find out what the quantity is
//             const product = updatedCart.products.find(prod => prod.id === id);
//             if(!product) return;
//             const productQty = product.qty;
//             updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
//             updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;
//             fs.writeFile(p, JSON.stringify(updatedCart), err => {
//                 console.log(err);
//             });
//         })
//     }

//     //getCart
//     static getCart(cb){
//         fs.readFile(p, (err, fileContent) => {
//             const cart = JSON.parse(fileContent);
//             if(err){
//                 cb(null);
//             }else{
//                 cb(cart);
//             }
//         })
//     }
// }