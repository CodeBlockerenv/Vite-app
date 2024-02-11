import User from "../models/user.model.js";



export const getUsersSidebar = async (req,res)=>{
    try{
    const loggerUser = req.userId.id;
    const users =await User.find({_id: {$ne: loggerUser}}).select("-password");
    res.json(users);
    }
    catch(error){
        console.log(error);
        res.status(500).json('error in getUsersSidebar controller',error);
    }
}