import { generateToken } from "../utils/generateToken.utils.js";
import { User } from "../models/user.models.js";
import cloudinary from "../utils/cloudinary.utils.js"

export const signUp = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    const userExists = await User.findOne({ email });

    if (userExists)
      return res.status(400).json({ message: `User with this email : ${email} already Exists` });

    const newUser = new User({ fullName, email, password });
    await newUser.save();
    generateToken(newUser._id, res);
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      },
    });
  } catch (error) {
    console.error("Error in signup: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const login = async (req, res) => {
  const {email,password}=req.body
  const user=await User.findOne({email})
  try {
    if(!user){
        return res.status(400).json({message:"Invalid email"})
    }
    const isPasswordValid = await user.isPasswordCorrect(password)
    if(!isPasswordValid)
        return res.status(400).json({message:"Invalid password"})
    generateToken(user._id,res)
    res.status(200).json({
        message:"Login successfully",
        user:{
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic
        }
    })
  } catch (error) {
    console.log("Error in login credentials ",error.message);
    res.status(500).json({message:"Internal Server Error"})
  }
};
export const logout = (req, res) => {
  try {
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({message:"Logged out successfully"})
  } catch (error) {
    console.log("Error in logout ",error.message);
    res.status(500).json({message:"Internal Server Error"})
  }
};

export const updateProfile=async (req,res)=>{
    try {
        const {profilePic}=req.body
        const userId=req.user._id
        if(!profilePic) 
            return res.status(400).json({message:"Profile pic is required"})
        const uploadResponse=await cloudinary.uploader.upload(profilePic)
        const updatedUser=await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true})
        res.status(200).json(updatedUser)
    } catch (error) {
        console.log("error in update profile: ",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
};

export const checkAuth = (req,res)=>{
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("Error in checkAuth ",error.message);
        res.status(500).json({message:"Internal Server Error"})
    }
};