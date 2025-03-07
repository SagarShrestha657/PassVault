import express from "express";
import { addlogin, logins, movetotrashlogin } from "../Controller/LoginsControlller";

const loginsRouter = express.Router();

loginsRouter.post("/add", addlogin);

loginsRouter.patch("/movetotrash", movetotrashlogin);

loginsRouter.get("/getall", logins);

export default loginsRouter;