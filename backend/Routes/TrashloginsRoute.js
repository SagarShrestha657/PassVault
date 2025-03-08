import express from "express";
import { restorelogin,permanentlydeletelogin,trashlogins } from "../Controller/Trashloginscontroller.js";

const trashloginsRouter = express.Router();

trashloginsRouter.patch("/restore",  restorelogin);

trashloginsRouter.delete("/deletelogin", permanentlydeletelogin);

trashloginsRouter.get("/getall", trashlogins);

export default trashloginsRouter;
