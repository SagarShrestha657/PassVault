import express from "express";
import dotenv from "dotenv";
import { ConnectDB } from "./lib/DB.js";
import cookieParser from "cookie-parser";
import loginsRouter from "./Routes/LoginsRoute.js";
import UserRouter from "./Routes/UserRoute.js";
import trashloginsRouter from "./Routes/TrashloginsRoute.js";
import { protectedRoute } from "./Middleware/AuthMiddleware.js";
import cors from 'cors';
import cron from "node-cron";
import User from "./Models/UserModel.js";
import exportrouter from "./Routes/ExportRoute.js";


// Configuration of dotenv 
dotenv.config();

// Creating variables
const app = express();
const PORT = process.env.PORT;

const allowedOrigins = [
  'http://localhost:5173',
  'https://pass-vault-black.vercel.app',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

//deleting logins after 30days of being in trash page
cron.schedule("0 0 * * *", async () => {
  console.log("Running cleanup job...");

  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const result = await User.updateMany(
      {},
      { $pull: { logins: { trash: true, trashedAt: { $lte: thirtyDaysAgo } } } }
    );

    console.log("Cleanup complete. Removed logins:", result.modifiedCount);
  } catch (error) {
    console.error("Cleanup job failed:", error);
  }
});

// All middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());



// Creating All API's
app.use("/", UserRouter);
app.use("/logins", protectedRoute, loginsRouter);
app.use("/trashlogins", protectedRoute, trashloginsRouter)
app.use("/export",protectedRoute,exportrouter)




app.listen(PORT, () => {
  ConnectDB()
  console.log("Server is running on port: " + PORT);
})
