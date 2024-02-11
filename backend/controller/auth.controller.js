import User from '../models/user.model.js';
import bycrpt from 'bcrypt';
import genJsonToken from '../utils/genJsonToken.js';

const salt = bycrpt.genSaltSync(10);
export const  signup = async (req, res) => {
        const { fullname, username, password,confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

       const user= await User.findOne({ username })
            
        if (user) {
           return res.status(400).json({ message: "Username already exists" });
        }
          

        const hashedPassword = bycrpt.hashSync(password, salt);

      const UserDet=await User.create({ fullname, username, password:hashedPassword })
      if(UserDet){
                genJsonToken(UserDet._id,res)
                res.json(UserDet);
      }
      
    };
    
export const login = async(req, res) => {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        // console.log(user.password);
        if (user) {
         const checkPass=   bycrpt.compareSync(password, user.password)
        }else{
            return res.status(400).json({ error: "Invalid username or password" });
        }
        genJsonToken(user._id,res)
        res.json(user);
       
    };

    export const logout = (req, res) => {
        try {
            res.cookie("jwt", "", { maxAge: 0 });
            res.status(200).json({ message: "Logged out successfully" });
        } catch (error) {
            console.log("Error in logout controller", error.message);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };