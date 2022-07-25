import express from "express";
import {
  signup,
  login,
  confirmUser,
  recoverPassword,
  checkToken,
  newPassword,
  profile,
} from "../controllers/user.controller";
import checkAuthLoggin from "../services/logged.service";

// set router
const router = express.Router();

// autenticate, register and confirm users
router.post("/", signup);
router.post("/signin", login);
router.get("/confirm/:token", confirmUser);
router.post("/forgot-password", recoverPassword);
router.route("/forgot-password/:token").get(checkToken).post(newPassword);
router.get("/profile", checkAuthLoggin, profile);

export default router;
