const jwt = require('jsonwebtoken');
const JWT_Secret ='good$dayone'


const fetchuser = (req,res,next)=>{
 //fetch the user from the jwt token and add id to req object
 const token = req.header('auth-token');
 if(!token){
    res.status(401).send({error: "Token not found"})
 }  
 try{
 const data = jwt.verify(token,JWT_Secret);
 req.user = data.user;
 next();
 } catch(error){
    
    console.error(error.message);
    res.status(500).send("Please authentitace using valid token")
 }

}

module.exports =fetchuser;