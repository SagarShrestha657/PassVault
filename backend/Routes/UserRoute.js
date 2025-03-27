import express from "express";
import {
  emailAddressCheck,
  emailVerification,
  login,
  logout,
  signup,
  checkauth,
  resetpassword,
  checkOtp,
  changepassword,
  sendOtp,
} from "../Controller/UserController.js";
import { protectedRoute } from "../Middleware/ProtectedRoute.js";
import { trackUserActivity } from "../Middleware/TrackUserRoute.js";

const UserRouter = express.Router();

UserRouter.post("/signup", signup);

UserRouter.post("/emailverification", trackUserActivity, emailVerification);

UserRouter.post("/emailaddress", emailAddressCheck)

UserRouter.post("/login", trackUserActivity, login);

UserRouter.post("/logout", logout);

UserRouter.get("/checkauth", protectedRoute, checkauth);

UserRouter.post("/resetpassword", protectedRoute, trackUserActivity, resetpassword);

UserRouter.post("/sendotp", protectedRoute,sendOtp);

UserRouter.post("/checkotp", protectedRoute,checkOtp);

UserRouter.post("/changepassword", protectedRoute, trackUserActivity, changepassword);

export default UserRouter;