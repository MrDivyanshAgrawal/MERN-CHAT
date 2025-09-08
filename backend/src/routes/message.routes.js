import express from "express"
import protectRoute from "../middlewares/protectRoute.middleware.js";
import { getUsersForSidebar, getMessages,sendMessages } from "../controllers/message.controllers.js";


const router=express.Router();

router.get("/user",protectRoute,getUsersForSidebar)

router.get("/:id",protectRoute,getMessages)

router.post("/send/:id",protectRoute,sendMessages)

export default router