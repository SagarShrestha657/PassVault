import express from "express";
import { csv, json ,pdf} from "../Controller/ExportController.js";

const exportrouter = express.Router();

exportrouter.get("/csv", csv);

exportrouter.get("/json", json);

exportrouter.get("/pdf",pdf);

export default exportrouter