const express=  require('express');
const passport = require('passport');
const router = express.Router();

const {Users} = require('../models/user.js');
// router.get('/fakeUser', async(req,res)=>{
//     const user = new Users({email:"vaibhav123@gmail.com",username:"vaibhav123"});
//     const newUser= await Users.register(user, 'vaibhav123');
//     res.send(newUser); 
// });



router.get("/register" ,async(req,res)=>{
    res.render("auth/signup.ejs");
});

router.post("/register",async(req,res)=>{
    try{
        const user = new Users({email:req.body.email,username:req.body.username});
        const newUser= await Users.register(user, req.body.password);
        req.flash('success','User Registered Successfully');
        res.redirect("/products");

    }catch(err){
        req.flash('error',err.message);
        res.redirect('/register');
    }

});

router.get('/login',(req,res)=>{
    res.render('auth/login.ejs');
});


router.post('/login' , passport.authenticate('local',{
    failureRedirect:'/login',
    failureFlash:true
}), (req,res)=>{
    req.flash('success', 'Logined succesfully do enjoy !');
    res.redirect('/products');
});


router.get('/logout' ,(req,res)=>{
    req.logout();
    req.flash('success','Logged Out Successfully');
    res.redirect('/login');
});
module.exports = router;