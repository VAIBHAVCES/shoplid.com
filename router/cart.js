const express = require('express');
const router = express.Router();
const {Products} = require("../models/products");
const {isLoggedIn} = require('../middleware');
const {Users} = require('../models/user');

router.post('/user/:id/cart', isLoggedIn , async(req,res)=>{
        try{
                const prod = await Products.findById(req.params.id);
                // console.log("Product found is :");      
                // console.log(prod);
                const user = await Users.findById(req.user._id);
                // const user = req.user;
                user.cart.push(prod);
                await user.save();
                req.flash('success',`${prod.name} has beeen added to cart`);``
                res.redirect(`/user/${req.user._id}/cart`);
        }catch(err){
                req.flash('error',err.message);
                res.redirect('/products');
        }


});

router.get("/user/:userId/cart",isLoggedIn,async(req,res)=>{
        try{
                const user  = await Users.findById(req.params.userId).populate('cart');
                res.render('cart/showCart',{user});
        }
        catch(err){
                req.flash('error',err.message);
                res.redirect("/products");
        }

});

router.delete("/user/:userId/product/:id",async(req,res)=>{
        
        await Users.findByIdAndUpdate(req.params.userId , {$pull : {cart:req.params.id } });
        res.redirect(`/user/${req.params.userId}/cart`);
});


module.exports = router; 