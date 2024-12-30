import express from "express"; 
import { register, login } from "../controllers/authController.js";

const router =express.Router();

//route for handling the get request at auth/registers endpoint
router.post("/register", register);

router.post("/login", login);

export default router;