const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        minlength:[5,'Name must be at least 20 characters Long'],
        maxlength:50
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        minLength:[5,'Email must be at Least 40 characters Long'],
        maxlength:100
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minLength:[4,'Password must be at least 4 characters']
    },
    profileImage:{
        type:String
    }

});

module.exports = mongoose.model('user',userSchema);
