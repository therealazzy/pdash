import express from "express";
import { launchProgram, launchFolder, launchById } from "../controllers/launchController.js";
export const launchRoutes = express.Router();

launchRoutes.post("/program", launchProgram);
launchRoutes.post("/folder", launchFolder);
launchRoutes.post('/id/:id', launchById);