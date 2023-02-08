"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewInstruction = void 0;
const instruction_1 = require("../models/instruction");
const createNewInstruction = (req, res, next) => {
    const instructionRequestBody = req.body;
    const instructionItem = new instruction_1.Instruction({
        instNumber: instructionRequestBody.instNumber,
        title: instructionRequestBody.title,
        instType: instructionRequestBody.instType,
        subsystem: instructionRequestBody.subsystem,
        releaseDate: instructionRequestBody.releaseDate,
        link: instructionRequestBody.link,
    });
    instructionItem
        .save()
        .then(result => {
        res.status(201).json({
            message: 'instruction created succesfully',
            instructionItem,
        });
    })
        .catch((err) => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};
exports.createNewInstruction = createNewInstruction;
