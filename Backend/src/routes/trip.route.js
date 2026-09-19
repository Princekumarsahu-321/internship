import express from "express";
import {createTripPlan} from "../controllers/trip.controller.js";

const tripRouter=express.Router();

tripRouter.post("/plan", createTripPlan);
// tripRouter.post("/description", writeDescription);

export default tripRouter;
