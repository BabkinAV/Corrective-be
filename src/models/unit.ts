import { Schema, model, Types } from 'mongoose';

export interface IUnit {
  unitNumber: string;
  instructions: {
    instructionId: Types.ObjectId;
    status: 'open' | 'confirmed' | 'refused';
  }[];
}

const UnitSchema = new Schema<IUnit>({
  unitNumber: { type: String, required: true, unique: true },
  instructions: [
    {
      instructionId: {
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

export const Unit = model<IUnit>('Unit', UnitSchema);
