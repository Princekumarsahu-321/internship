import express from "express";
import { generateDescription } from "../controllers/property.controller.js";

import {
  check,
  forgotPassword,
  googleLogin,
  login,
  logout,
  protect,
  resetPassword,
  signup,
  updateMe,
  updatePassword,
} from "../controllers/auth.controller.js";
import {writeDescription} from "../controllers/trip.controller.js";

const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/google").post(googleLogin);
router.route("/logout").get(logout);
router.route("/updateMe").patch(protect, updateMe);
router.route("/updateMyPassword").patch(protect, updatePassword);
router.route("/forgotPassword").post(forgotPassword);
router.route("/resetPassword/:token").patch(resetPassword);
router.route("/me").get(protect, check);
router.route("/generateDescription").post(protect, writeDescription);


export { router };
