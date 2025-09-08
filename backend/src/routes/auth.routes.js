import express from "express";
import {signUp, login, logout, updateProfile, checkAuth} from "../controllers/auth.controllers.js"
import protectRoute from "../middlewares/protectRoute.middleware.js"
const router = express.Router();

router.post("/signup",signUp);

router.post("/login",login);

router.post("/logout",logout);

router.put("/update-profile",protectRoute,updateProfile);

router.get("/check-auth",protectRoute,checkAuth);

export default router;
