import express from "express";

import {
  getProperties,
  getProperty,
  generateDescription,
} from "../controllers/property.controller.js";

const propertyRouter = express.Router();

// GET all properties
propertyRouter.post("/generate-description", generateDescription);
propertyRouter.get("/", getProperties);

// GET single property by ID
propertyRouter.get("/:id", getProperty);

export default propertyRouter;