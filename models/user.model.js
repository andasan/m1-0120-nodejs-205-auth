const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        //nested schema
        items: [
            {
                productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
                quantity: { type: Number, required: true }
            }
        ]
    }
});

//add to cart

//remove from cart

module.exports = mongoose.model('User', userSchema);

// const mongodb = require('mongodb');
// const getDB = require('../util/database').getDb;

// module.exports = class User{
//     constructor(username, email){
//         this.username = username;
//         this.email = email;
//     };

//     save(){
//         const db = getDB();
//         return db.collection('users').insertOne(this);
//     }

//     edit(id){
//         const db = getDB();
//         return db.collection('users')
//             .updateOne({_id:  new mongodb.ObjectID(id)}, {$set: this})
//     }

//     static deleteById(id){
//         const db = getDB();
//         return db.collection('users').deleteOne({_id: new mongodb.ObjectID(id)});
//     }

//     static fetchAll(){
//         const db = getDB();
//         return db.collection('users').find().toArray();
//     }

//     static findById(id){
//         const db = getDB();
//         return db.collection('users').findOne({_id: new mongodb.ObjectID(id)});
//     }
// }