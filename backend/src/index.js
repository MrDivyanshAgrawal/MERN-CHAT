import express from "express"
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import dotenv from "dotenv"
import connectDB from "./db/index.db.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import { app,server } from "./utils/socket.utils.js"

dotenv.config()

const PORT=process.env.PORT || 4000

app.use(express.json())

app.use(cookieParser())

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)

server.listen(PORT,"0.0.0.0",()=>{
    console.log(`server is running on ${PORT}`);
    connectDB()  
})