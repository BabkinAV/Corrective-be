import {
  Schema,
  model,
  Types,
  HydratedDocument,
  Model,
  ObjectId,
} from 'mongoose';

const STATUSES = ['open', 'confirmed', 'refused'] as const;
type AffectedUnitStatus = typeof STATUSES[number];

// typeguard to define if string type is AffectedUnitStatus
export function isStatus(status: string): status is AffectedUnitStatus {
  return STATUSES.includes(status as AffectedUnitStatus);
}

export interface IUnit {
  unitNumber: string;
  instructions: {
    instruction: Types.ObjectId;
    status: AffectedUnitStatus;
  }[];
}

export interface AffectedUnit {
  instruction: Types.ObjectId;
  status: AffectedUnitStatus;
}

export interface IUnitMethodsAndProps {
  addInstructionToArray(
    instructionId: Types.ObjectId
  ): Promise<HydratedDocument<IUnit>>;
  // updateAffectedUnit(affectedUnitId: Types.ObjectId, updatedStatus: AffectedUnitStatus)
  instructions: Types.ArraySubdocument<AffectedUnit>;
}

type UnitModel = Model<IUnit, {}, IUnitMethodsAndProps>;

const UnitSchema = new Schema<IUnit, UnitModel, IUnitMethodsAndProps>({
  unitNumber: { type: String, required: true, unique: true },
  instructions: [
    {
      instruction: {
        type: Schema.Types.ObjectId,
        ref: 'Instruction',
        required: true,
      },
      status: {
        type: String,
        required: true,
        enum: ['open', 'confirmed', 'refused'],
        default: 'open',
      },
    },
  ],
});

UnitSchema.method(
  'addInstructionToArray',
  function addInstructionToArray(
    this: HydratedDocument<IUnit>,
    instructionId: Types.ObjectId
  ) {
    let updatedInstructionsArr = [...this.instructions];
    updatedInstructionsArr.push({
      instruction: instructionId,
      status: 'open',
    });
    this.instructions = updatedInstructionsArr;
    return this.save();
  }
);

export const Unit = model<IUnit, UnitModel>('Unit', UnitSchema);
