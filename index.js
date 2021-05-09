if(process.env.NODE_ENV!=='production'){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
var methodOverride = require('method-override');
const bodyParser = require('body-parser')
const port  = 3000 ; 
const path = require('path');
const session  =  require('express-session');
const flash = require('connect-flash');
//------------------ this file require to set a inital database-----------
const {seedDB} = require('./seed.js');
const passport = require('passport');
const LocalPassport = require('passport-local');
const {Users}= require('./models/user.js');
const authRouter = require('./router/auth.js');
const {isLoggedIn}= require('./middleware.js');
const cartRouter  = require('./router/cart.js');
// method overrider 
app.use(methodOverride('_method'));



app.set('view engine','ejs');
app.set('views' , path.join(__dirname ,'/views'));

app.use( express.static(path.join(__dirname,'/public')));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'secretIsNOSECRET',
    resave: false,
    saveUninitialized: true,
}));
app.use(flash());

//initialising the passportapp.
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalPassport(Users.authenticate()));
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());



// putting success in local of express so that dont have 
// to send it multiple timees using res.render
app.use((req,res,next)=>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    next();

})

//--------------------db connectivity------------------
console.log(process.env.DB_URL);
mongoose.connect(  process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true , useFindAndModify:false})
.then(()=>{
    console.log("successfully connected to db");
})
.catch((err)=>{
    console.log("error in db connectivity "+err.message);
});


// seedDB();

//----------------------- using routers
const {productsRouter} = require('./router/products.js');
app.use(productsRouter);
app.use(authRouter);
app.use(cartRouter);
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(port ,()=>{
    console.log("listening on "+port);
})