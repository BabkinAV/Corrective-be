import {
  Schema,
  model,
  Types,
  HydratedDocument,
  Model,
  ObjectId,
} from 'mongoose';

export interface IUnit {
  unitNumber: string;
  instructions: {
    instruction: Types.ObjectId;
    status: 'open' | 'confirmed' | 'refused';
  }[];
}

export interface IUnitMethods {
  addInstructionToArray(
    instructionId: Types.ObjectId
  ): Promise<HydratedDocument<IUnit>>;
}

type UnitModel = Model<IUnit, {}, IUnitMethods>;

const UnitSchema = new Schema<IUnit, UnitModel, IUnitMethods>({
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
