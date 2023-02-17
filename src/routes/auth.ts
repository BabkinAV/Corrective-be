import { Router } from "express";
import { signup } from "../controllers/authController";

const router = Router();


// POST /auth/login
router.post('/signup', signup);

export default router;