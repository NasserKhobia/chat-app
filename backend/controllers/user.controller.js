import User from "../models/User.model.js";

export const getUsersForSidebar = async (req,res,next)=>{
    try {

        const loggedUserId = req.user._id

        const allUsers = await User.find({_id:{$ne:loggedUserId}}).select("-password");
        res.status(200).json(allUsers);
    } catch (error) {
        console.error("error in get user for sidebar controller ",error.message);
        res.status(500).json({error:"internal server error"})
    }
}