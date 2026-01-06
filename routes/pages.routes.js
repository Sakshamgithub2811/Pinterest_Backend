express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const auth = require('../middleware/auth.middleware');
const User = require('../models/user.model');

router.get('/test',(req,res)=>{
    res.send('This is a test route for user routes');
})

router.get('/profile',auth, async(req,res)=>{
    const user = await User.findOne({name:req.user.name});
    res.render('./pages/profile',{user});
})

router.post('/fileupload',auth,upload.single('profilePic'),async(req,res)=>{
    console.log("fileuplaod");  
    console.log("User",User.body);
    console.log(req.user.name);

    try{
    const user = await User.findOne({name:req.user.name});
    console.log("heloooooooooooooo");
    user.profileImage = req.file.filename;
    console.log("user",user);
    console.log(req.body);
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
module.exports = router;