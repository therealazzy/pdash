import express from "express";
import { launchProgram, launchFolder } from "../controllers/launchController.js";
export const launchRoutes = express.Router();

launchRoutes.post("/program", launchProgram);
launchRoutes.post("/folder", launchFolder);


