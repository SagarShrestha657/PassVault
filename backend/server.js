import express from "express";
import dotenv from "dotenv";
import { ConnectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import {UserRoute,LoginsRoute,TrashloginsRoute} from "./Routes"
import cors from 'cors';
import { protectedRoute } from "../Middleware/ProtectedRoute";

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
    origin: "http://localhost:5174 ",
    credentials: true,
  }))

// Creating All API's
app.use("/",UserRoute );
app.use("/logins",protectedRoute,LoginsRoute);
app.use("/trashlogins",protectedRoute,TrashloginsRoute);


app.listen(PORT, () =>{
    ConnectDB()
    console.log("Server is running on port: " + PORT);
})
   