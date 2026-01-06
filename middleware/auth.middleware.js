const jwt = require('jsonwebtoken');

function auth(req,res,next){
    
    
    const Token = req.cookies.Token;
    // console.log("token",Token)
    // console.log(Token);
    if(!Token){
        return res.status(401).json({
            message:"Unauthorised"
        });
    }

    try{
        const decoded = jwt.verify(Token,process.env.JWT_SECRET);
        // console.log(decoded);
        req.user = decoded;
        return next();
    }catch(error){
        return res.status(401).json({
            message:"Unauthorized"
        });
    }
}

module.exports = auth;