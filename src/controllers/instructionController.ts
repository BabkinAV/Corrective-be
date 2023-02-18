import { RequestHandler } from 'express';
import { HydratedDocument, Types } from 'mongoose';

import { IInstruction, Instruction } from '../models/instruction';

export const createNewInstruction: RequestHandler = (req, res, next) => {
  const instructionRequestBody:IInstruction = req.body;
  const instructionItem = new Instruction({
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
    .catch((err: { statusCode?: number }) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
	
      next(err);
    });
};
