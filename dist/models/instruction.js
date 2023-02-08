"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instruction = void 0;
const mongoose_1 = require("mongoose");
const InstructionSchema = new mongoose_1.Schema({
    instNumber: { type: String, required: true },
    title: { type: String, required: true },
    instType: { type: String, required: true, enum: ['compulsory', 'non-compulsory', 'information'] },
    subsystem: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    link: { type: String, required: true },
});
exports.Instruction = (0, mongoose_1.model)('Instruction', InstructionSchema);
