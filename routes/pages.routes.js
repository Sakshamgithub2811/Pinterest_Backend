express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const auth = require('../middleware/auth.middleware');
const userModel = require('../models/user.model');

router.get('/test',(req,res)=>{
    res.send('This is a test route for userModel routes');
})

router.get('/profile',auth, async(req,res)=>{
    console.log("profile");
    const user = await userModel.findOne({name:req.user.name});
    console.log( "user",user);
    res.render('./pages/profile',{user});
})

router.post('/fileupload',auth,upload.single('profilePic'),async(req,res)=>{
    try{
        const user = await userModel.findOne({name:req.user.name});
        user.profileImage = req.file.filename;
        await user.save();
        res.redirect('./profile');
    }
    catch(error){
        res.status(500).json({
            message:"Internal Server error",
            error:error
        })
    }
})

router.get('/add',auth, async(req,res)=>{
    const user = await userModel.findOne({name:req.user.name});
    res.render('./pages/add',{user});
})

router.post('/createPost',auth, async(req,res)=>{
    const user = await userModel.findOne({name:req.userModel.name});
    const post = await postModel.create({
        user:user._id,
        title:req.body.title,
        description:req.body.description,
        image:req.file.filename
    });

    user.posts.push(post._id);
    await user.save();
    res.redirect("/profile");
   
})
module.exports = router;