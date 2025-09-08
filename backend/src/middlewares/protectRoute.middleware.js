import jwt from "jsonwebtoken"
import {User} from "../models/user.models.js"

const protectRoute=async (req,res,next)=>{
    try {
        const token =req.cookies.jwt

        if(!token) 
            return res.status(401).json({message:"Unauthorized User"})

        const decodeUserId=jwt.verify(token,process.env.JWT_SECRET)

        if(!decodeUserId)
            return res.status(401).json({message:"Invalid Token"})

        const user=await User.findById(decodeUserId.userId).select("-password")

        if(!user)
            return res.status(404).json({message:"User not found"})

        req.user=user
        next()

    } catch (error) {
        console.log("Error in server");
        res.status(500).json({message:"Internal server error"})
    }
}

export default protectRoute