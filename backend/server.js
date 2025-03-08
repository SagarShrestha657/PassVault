import express from "express";
import dotenv from "dotenv";
import { ConnectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import loginsRouter from "./Routes/LoginsRoute.js";
import UserRouter from "./Routes/UserRoute.js";
import trashloginsRouter from "./Routes/TrashloginsRoute.js";
import { protectedRoute } from "./Middleware/ProtectedRoute.js";
import cors from 'cors';

// Configuration of dotenv 
dotenv.config();

// Creating variables
const app = express();
const PORT = process.env.PORT;

// All middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173 ",
    credentials: true,
  }))

// Creating All API's
app.use("/",UserRouter );
app.use("/logins",protectedRoute,loginsRouter);
app.use("/trashlogins",protectedRoute,trashloginsRouter)


app.listen(PORT, () =>{
    ConnectDB()
    console.log("Server is running on port: " + PORT);
})
   