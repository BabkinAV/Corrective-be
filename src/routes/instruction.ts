import { Router } from "express";
import { createNewInstruction } from "../controllers/instructionController";

const router = Router();

router.post('/create', createNewInstruction);

export default router;
