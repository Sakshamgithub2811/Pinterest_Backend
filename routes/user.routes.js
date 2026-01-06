express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");



router.get('/test',(req,res)=>{
    res.send('This is a test route for user routes');
})

router.get('/register',(req,res)=>{
    res.render('./auth/register');
})

router.get('/',(req,res)=>{
    res.render('./auth/login');
})

router.post('/register',async(req,res)=>{
    try{
        const { name,email,password } = req.body;
        
        if(!name || !email || !password){
            return res.status(400).json({
                message:"Name "
            });
        }

        const existingUser = await User.findOne({name});

        if(existingUser){
            return res.status(409).json({
                message:"User already exists"
            });
        }

        const salt = await bcrypt.genSalt(15);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            name,
            email,
            password:hashedPassword,
            profileImage:null

        });

        await newUser.save();
        
        res.status(201).json({
            message:"user Registered Succesfully"
        });


    }
    catch(error){
        res.status(500).json({
            message:"Internal Server Error",
            error:error.message
        })

        console.log(error);
    }
})

router.post('/login',async(req,res)=>{
    try{
        const { name,password } = req.body;
        if( !name || !password ){
            return res.status(400).json({
                message:"name ans password are required"
            })
        }

        const user = await User.findOne({name});
        if(!user){
            return res.status(401).json({
                message:"Invalid credentials"
            })
        }

        const isMatch = await bcrypt.compare(password,user.password);
        
        if(!isMatch){
            return res.status(401).json({
                message:"invalid credentials"
            })
        }

        const token = jwt.sign({
            userId:user._id,
            email:user.email,
            name:user.name
        },process.env.JWT_SECRET);

        res.cookie("Token",token);
       
        res.render('./pages/profile')
    }
    catch(error){
        console.log("error",error);
        res.status(500).json({
            message:"Internal Server Error",
            error:error.message
        });
    }
})



module.exports = router;