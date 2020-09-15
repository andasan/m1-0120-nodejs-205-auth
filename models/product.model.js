const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', //tells mongoose to reference the userId to User model
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema);


/////////-------------- FROM MongoDB
// const Cart = require('./cart.model');
// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;

// module.exports = class Products {
//     constructor(userId, title, imageUrl, description, price) {
//         this.userId = userId;
//         this.title = title;
//         this.imageUrl = imageUrl;
//         this.description = description;
//         this.price = price;
//     }

//     //save
//     save() {
//         const db = getDb();
//         db.collection('products').insertOne(this); 
//     }

//     edit(id) {
//         const db = getDb();
//         console.log(id);
//         return db.collection('products').updateOne({_id: new mongodb.ObjectID(id)}, {$set: this});
//     }

//     //deletebyid
//     static deleteById(id) {
//         const db = getDb();
//         return db.collection('products').deleteOne({_id: new mongodb.ObjectID(id)});
//     }

//     //fetch all data
//     static fetchAll() {
//         const db = getDb();
//         return db.collection('products').find().toArray();
//     }

//     //find by id
//     static findById(id) {
//         const db = getDb();
//         //string !== objectID
//         return db.collection('products').find({_id: new mongodb.ObjectID(id)}).next();
//     }
// }

/////////-------------- FROM MYSQL
// module.exports = class Products {
//     constructor(id, title, imageUrl, description, price) {
//         this.id = id;
//         this.title = title;
//         this.imageUrl = imageUrl;
//         this.description = description;
//         this.price = price;
//     }
//     //save
//     save() {
//         return db.execute(
//             'INSERT INTO products (title, imageUrl, description, price) VALUES (?,?,?,?)', 
//             [this.title, this.imageUrl, this.description, this.price]
//         );
//     }

//     edit() {
//         return db.execute(
//             'UPDATE products SET title = ?, imageUrl = ?, description = ?, price = ? WHERE id = ?',
//             [this.title, this.imageUrl, this.description, this.price,  this.id]
//         );
//     }

//     //deletebyid
//     static deleteById(id){
//         return db.execute('DELETE FROM products WHERE products.id = ?', [id]);
//     }

//     //fetch all data
//     static fetchAll(){
//         return db.execute('SELECT * FROM products');
//     }

//     //find by id
//     static findById(id){
//         return db.execute('SELECT * FROM products WHERE products.id = ?',[id]);
//     }
// }


/////////-------------- FROM DUMMY DATA
// const fs = require('fs');
// const path = require('path');

// const Cart = require('./cart.model');

// //path to product.json
// const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

// const getProductsFromFile = cb => {
//     fs.readFile(p,  (err, fileContent) => {
//         if(err){
//             cb([]);
//         }else{
//             cb(JSON.parse(fileContent));
//         }
//     })
// }

// module.exports = class Products {
//     constructor(id, title, imageUrl, description, price) {
//         this.id = id;
//         this.title = title;
//         this.imageUrl = imageUrl;
//         this.description = description;
//         this.price = price;
//     }
//     //save
//     save() {
//         getProductsFromFile(products => {
//             if(this.id){
//                 const existingProductIndex = products.findIndex(prod => prod.id === this.id);
//                 const updatedProducts = [...products];
//                 updatedProducts[existingProductIndex] = this; //overwrite the element
//                 fs.writeFile(p, JSON.stringify(updatedProducts), err=>{
//                     console.log(err);
//                 })
//             }else{
//                 this.id = Math.random().toString();
//                 products.push(this);
//                 fs.writeFile(p, JSON.stringify(products), err => {
//                     console.log(err);
//                 })
//             }
//         })
//     }

//     //deletebyid
//     static deleteById(id){
//         getProductsFromFile(products => {
//             const productToDelete = products.find(prod => prod.id === id);
//             const updatedProducts = products.filter(prod => prod.id !== id);
//             fs.writeFile(p, JSON.stringify(updatedProducts), err=>{
//                 console.log(err);
//                 if(!err){
//                     Cart.deleteProduct(id, productToDelete.price);
//                 }
//             });
//         });
//     }

//     //fetch all data
//     static fetchAll(cb){
//         getProductsFromFile(cb);
//     }

//     //find by id
//     static findById(id, cb){
//         getProductsFromFile(products => {
//             const product = products.find(prod => prod.id ===  id);
//             cb(product);
//         })
//     }
// }
