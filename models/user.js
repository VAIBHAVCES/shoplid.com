const mongoose = require('mongoose');
const Products = require('./products.js')
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
   
    email:{
        type:String,
        required:true,
        unique:true
    },
    cart:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }
    ]
});

userSchema.plugin(passportLocalMongoose);
const Users= new mongoose.model('User',userSchema); 
module.exports.Users = Users;