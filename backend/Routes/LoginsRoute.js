import express from "express";
import { addlogin, deletelogin, logins, movetotrashlogin } from "../Controller/LoginsController.js";

const loginsRouter = express.Router();

loginsRouter.post("/add", addlogin);

loginsRouter.patch("/movetotrash", movetotrashlogin);

loginsRouter.get("/getall", logins);

loginsRouter.delete("/deletelogin",deletelogin);

export default loginsRouter;