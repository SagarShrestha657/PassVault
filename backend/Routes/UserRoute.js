import express from "express";
import {
  emailAddressCheck,
  emailVerification,
  login,
  logout,
  signup,
  checkauth,
} from "../Controller/UserController.js";
import { protectedRoute } from "../Middleware/ProtectedRoute.js";

const UserRouter = express.Router();

UserRouter.post("/signup", signup);

UserRouter.post("/emailverification", emailVerification);

UserRouter.post("/emailaddress",emailAddressCheck)

UserRouter.post("/login", login);

UserRouter.post("/logout", logout);

UserRouter.get("/checkauth", protectedRoute,checkauth);

export  default UserRouter;