import express from "express";
import {
  emailAddressCheck,
  emailVerification,
  login,
  logout,
  signup,
  addlogin,deletelogin,logins
} from "../Controller/UserController.js";
import { protectedRoute } from "../Middleware/UserMiddleware.js";

const UserRouter = express.Router();

UserRouter.post("/signup", signup);

UserRouter.post("/emailverification", emailVerification);

UserRouter.post("/emailaddress",emailAddressCheck)

UserRouter.post("/login", login);

UserRouter.post("/logout", logout);

UserRouter.get("/checkauth", protectedRoute);

UserRouter.post("/add",protectedRoute,addlogin);

UserRouter.delete("/delete",protectedRoute,deletelogin);

UserRouter.get("/getall",protectedRoute,logins);

export  default UserRouter;