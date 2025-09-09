import express from "express"
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import dotenv from "dotenv"
import connectDB from "./db/index.db.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import { app,server } from "./utils/socket.utils.js"

import path from "path"

dotenv.config()

const PORT=process.env.PORT || 4000
const __dirname=path.resolve()

app.use(express.json())

app.use(cookieParser())

app.use(cors({
    origin: ["http://localhost:5173",
        "https://mern-chat-5dg4.onrender.com",
    ],
    credentials:true
}))
app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
    connectDB()  
})