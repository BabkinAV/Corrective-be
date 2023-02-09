import { RequestHandler } from 'express';
import { Types } from 'mongoose';
import { StatusError } from '..';
import { IUnit, Unit } from '../models/unit';

export const addAffectedUnit: RequestHandler = (req, res, next) => {
  const unitRequestBody = req.body as {
    unitNumber: string;
    instruction: Types.ObjectId;
  };

	const instructionId = unitRequestBody.instruction;

  Unit.findOne({unitNumber: unitRequestBody.unitNumber})
    .then(unit => {
      if (unit) {
        return unit.addInstructionToArray(instructionId);
      }
      const unitItem = new Unit({
        unitNumber: unitRequestBody.unitNumber,
        instructions: [
          { instruction: unitRequestBody.instruction, status: 'open' },
        ],
      });
      return unitItem.save();
    })

    .then(result => {
      res.status(201).json({
        message: 'Affected unit added succesfully',
      });
    })
    .catch((err: { statusCode?: number }) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};
export const getAffectedUnit: RequestHandler = (req, res, next) => {
  const unitNumberBody = req.body.unitNumber as { unitNumber: string };
  Unit.findOne({ unitNumber: unitNumberBody })
    .populate('instructions.instruction')
    .then(unit => {
      if (!unit) {
        const error = new Error('Could not find unit.') as StatusError;
        error.statusCode = 404;
        throw error; //to be catched up by .catch block
      }
      res.status(200).json({ messate: 'Unit fetched.', unit });
    })
    .catch((err: { statusCode?: number }) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};
