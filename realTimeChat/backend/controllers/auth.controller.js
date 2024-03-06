import User from "../models/User.model.js";
import bcryptjs from 'bcryptjs';
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const login = async (req,res,next)=>{
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        const isPassword = await bcryptjs.compare(password , user?.password || "")
        if(!user || !isPassword){
            return res.status(400).json({error:"invalid username or password"});
        }
        generateTokenAndSetCookie(user._id , res);
        res.status(201).json({
            _id : user._id,
            username : user.username,
            fullname : user.fullname,
            profilePic : user.profilePic
        })
    } catch (error) {
        console.log("error in login controller",error.message);
        res.status(500).json({error: "internal server error"});
    }
}
export const logout = async (req,res,next)=>{
    try {
        res.cookie('token',"",{maxAge:0});
        res.status(200).json({message:"logged out successfully"});
    } catch (error) {
        console.log("error in logout controller",error.message);
        res.status(500).json({error: "internal server error"});
    }
}
export const signup = async (req,res,next)=>{
    try {
        const {fullname ,username, password, confirmPassword, gender} = req.body;
        if(password !== confirmPassword){
            return res.status(400).json({error:"password don`t match"});
        }
        const user = await User.findOne({username});
        if(user){
            return res.status(400).json({error:"username has been exit"});
        }

        const salt = await bcryptjs.genSalt(10);
        const hashed = await bcryptjs.hash(password,salt)

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`
        
        const newUser =  new User({
            fullname,
            username,
            password : hashed,
            gender,
            profilePic : gender === 'male' ? boyProfilePic : girlProfilePic
        })

        if(newUser){
            //jwt
            generateTokenAndSetCookie(newUser._id,res);
            await newUser.save();
            res.status(201).json({
                _id : newUser._id,
                username : newUser.username,
                fullname : newUser.fullname,
                profilePic : newUser.profilePic
            })
        }else{
            res.status(409).json({error:'invaled user data'})
        }
    } catch (error) {
        console.log("error in signup controller",error.message);
        res.status(500).json({error: "internal server error"});
    }
}