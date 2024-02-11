import jwt from 'jsonwebtoken';


const verifyJWToken = (req,res,next) => {
    const token = req.cookies.jwt;
    if(token){
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  
        req.userId = decoded;
        next();
    }else{
        res.status(401).json({ error: "Unauthorized - No Token Provided" });
    }
    
}


export default verifyJWToken;