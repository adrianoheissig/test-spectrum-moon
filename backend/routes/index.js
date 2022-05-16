import express from "express";
import {
  getUserInformation,
  Register,
  Login,
  Logout,
} from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

router.get("/users", verifyToken, getUserInformation);
router.post("/users", Register);
router.post("/login", Login);
router.post("/logout", Logout);

export default router;
