"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const instructionController_1 = require("../controllers/instructionController");
const router = (0, express_1.Router)();
router.post('/create', instructionController_1.createNewInstruction);
exports.default = router;
