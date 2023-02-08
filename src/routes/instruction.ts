import { Router } from "express";
import { createNewInstruction } from "../controllers/instructionController";

const router = Router();

router.post('/', createNewInstruction);

export default router;
