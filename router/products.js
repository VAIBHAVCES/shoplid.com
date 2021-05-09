const express = require('express');
const { isLoggedIn } = require('../middleware.js');
const router = express.Router();
const {Products} = require('../models/products.js');
const {Review}= require('../models/reviews.js')

router.get('/products' , async(req,res)=>{
    // getter for showing all products


    try{

        const pds = await Products.find({});
        
        let obj = {pds}
        res.render('products/index',obj);
    }catch(err){
        res.flash('error', 'Error in the get router of /products');
    }
});


router.get("/products/new",isLoggedIn,(req,res)=>{
    try{
        res.render('products/new');
    }catch(err){
        req.flash('error',"Error in products/new router of get request  "); 
        res.render("partials/error");
    }
}); 

router.get("/products/:id",async(req,res)=>{
    // getter to see a page from its id 
    try{

        let {id}=req.params;
        let product = await Products.findById(id).populate('reviews');
        res.render("products/show",{product});
    }catch(err){
        req.flash('error',"Error in products:id router of get request  "); 
        res.render("partials/error");
    }

});

router.delete("/products/:id",async(req,res)=>{
    // delete request on an id 
    let {id}=req.params;
    await Products.findByIdAndDelete(id);
    req.flash('success','Product has been deleted successfully ')
    res.redirect('/products');
});
router.get("/products/:id/edit",isLoggedIn,async(req,res)=>{

    // getter for update in the prodcuts page 
    try{
        let {id}=req.params;
        let product = await Products.findById(id);
        res.render("products/edit",{product});

    }catch(err){
        req.flash('error',"Error in products:id/edit router of get request  "); 
        res.render("partials/error");
    }

});

router.patch("/products/:id",async(req,res)=>{

    // patch request for updating the product via id 
    try{
        let {id}=req.params;
        let{name, price,desc,img}= req.body;
        await Products.findByIdAndUpdate(id, req.body);
        req.flash('success',"Product has been updated successfully  "); 
        res.redirect("/products");

    }catch(err){
        req.flash('error',"Error in products:id router of patch request  "); 
        res.render("partials/error");
    }
    
});
router.post("/products",async(req,res)=>{

    try{
        await Products.insertMany(req.body);
        req.flash('success',"Product has been added ");
        res.redirect("/products");  

    }catch(err){
        req.flash('error',"Error in products router of post request  "); 
        res.render("partials/error");
    }
    
});

router.post("/products/:id/reviews", isLoggedIn, async(req,res)=>{

    try{
        const pdReview= await Products.findById(req.params.id);
        const newObj = { user:req.user.username, ...req.body};
        const review = new Review(newObj);
        pdReview.reviews.push(review);
        await review.save();
        await pdReview.save();
        res.redirect(`/products/${pdReview._id}`);

    }catch(err){
        req.flash('error',"Error in products:id/reviews router of post request  "); 
        res.render("partials/error");
    }

});


module.exports.productsRouter = router;