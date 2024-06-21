
const jwt = require('jsonwebtoken');



try {
    const decoded = jwt.verify(token, secretKey);
    console.log('Token is valid:', decoded);
} catch (err) {
    console.log('Invalid Token:', err.message);
}


module.exports = (req,res,next)=>{
    const token = req.header("Authorization").split(' ')[1]
    console.log("token",token);
    if(!token){
        return res.status(401).json({message:'Access Denied'})
    }

    try {
        
        const decoded = jwt.verify(token,'jwt-secret-key')
        req.user = decoded
        next()
    }
    catch(err) {
        res.status(401).json({message:"Invalid Token"})
    }
}