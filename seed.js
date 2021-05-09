const {Products}= require('./models/products.js');
const pds = [
    {
        name:"Wahshing Machine",
        img:"https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        price:30000,
        desc:"The iPhone has a sleek, minimalist design, and differs from other smartphones in its lack of buttons. Most operations on the iPhone are performed using the touch screen display. The only physical buttons include a sleep/wake button, a mute switch, volume up/down buttons, and a home button. All versions of the iPhone have a rear-facing camera, but the iPhone 4 introduced a front-facing camera, which can be used for video calls made using the FaceTime feature "   
    },{
        name:"Smart TV",
        img:"https://images.unsplash.com/photo-1461151304267-38535e780c79?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1490&q=80" ,
        price:10000,
        desc:"a smart tv  is differnce in way from normal tv is that it has many several ports and also internet connectivity option "   
    },
    {
        name:"trimmer",
        img:"https://images.unsplash.com/photo-1461151304267-38535e780c79?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1490&q=80",
        price:5000,
        desc:"The iPhone has a sleek, minimalist design, and differs from other smartphones in its lack of buttons. Most operations on the iPhone are performed using the touch screen display. The only physical buttons include a sleep/wake button, a mute switch, volume up/down buttons, and a home button. All versions of the iPhone have a rear-facing camera, but the iPhone 4 introduced a front-facing camera, which can be used for video calls made using the FaceTime feature "   
    },
    {
        name:"iPhone",
        img:"https://images.unsplash.com/photo-1556656793-08538906a9f8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        price:100000,
        desc:"The iPhone has a sleek, minimalist design, and differs from other smartphones in its lack of buttons. Most operations on the iPhone are performed using the touch screen display. The only physical buttons include a sleep/wake button, a mute switch, volume up/down buttons, and a home button. All versions of the iPhone have a rear-facing camera, but the iPhone 4 introduced a front-facing camera, which can be used for video calls made using the FaceTime feature"   
    },
    {
        name:"macbook air ",
        img:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80",
        price:250000,
        desc:"The iPhone has a sleek, minimalist design, and differs from other smartphones in its lack of buttons. Most operations on the iPhone are performed using the touch screen display. The only physical buttons include a sleep/wake button, a mute switch, volume up/down buttons, and a home button. All versions of the iPhone have a rear-facing camera, but the iPhone 4 introduced a front-facing camera, which can be used for video calls made using the FaceTime feature"   
    }
    
];

const seedDB = async()=>{
    await Products.insertMany(pds);
    console.log("DB Seeded");
}
module.exports.seedDB=seedDB; 