import { RequestHandler } from 'express';
import { Types } from 'mongoose';
import { StatusError } from '..';
import { IUnit, Unit, AffectedUnit, isStatus } from '../models/unit';

export const addAffectedUnit: RequestHandler = (req, res, next) => {
  const unitRequestBody = req.body as {
    unitNumber: string;
    instruction: Types.ObjectId;
  };

  const instructionId = unitRequestBody.instruction;

  Unit.findOne({ unitNumber: unitRequestBody.unitNumber })
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
  const unitNumber = req.params.unitnumber.toUpperCase();
  Unit.findOne({ unitNumber: unitNumber })
    .populate('instructions.instruction')
    .then(unit => {
      if (!unit) {
        const error = new Error('Could not find unit.') as StatusError;
        error.statusCode = 404;
        throw error; //to be catched up by .catch block
      }
      res.status(200).json({ message: 'Unit fetched.', unit });
    })
    .catch((err: { statusCode?: number }) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};

export const updateAffectedUnitStatus: RequestHandler = (req, res, next) => {
  const unitNumber = req.params.unitnumber.toUpperCase();
  const affectedUnitId = req.body.affectedUnitId as string;
  const affectedUnitStatus = req.body.affectedUnitStatus as string;

	Unit.findOne({ unitNumber })
    .exec()
    .then(unit => {
      if (!unit || !unit.instructions.id(affectedUnitId))  {
        const error = new Error('Could not find unit.') as StatusError;
        error.statusCode = 404;
        throw error; //to be catched up by .catch block
      }
       unit.instructions.id(affectedUnitId).status = affectedUnitStatus;
			 return unit.save()
    })
		.then ((updatedUnit) => {
			res.status(200).json({
        message: 'Affected unit updates succesfully',
				updatedAffectedUnit: updatedUnit.instructions.id(affectedUnitId) as AffectedUnit
      });
		})
    .catch((err: { statusCode?: number }) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });

  
};
