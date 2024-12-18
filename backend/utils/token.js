const jwt = require("jsonwebtoken");

const token=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:"21d",
    })
};

module.exports=token;