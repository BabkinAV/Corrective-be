import { Schema, model, Date } from 'mongoose';

export interface IInstruction {
  instNumber:string;
  title: string;
  instType: string;
  subsystem: string;
  releaseDate: Date;
  link: string;
}

const InstructionSchema = new Schema<IInstruction>({
  instNumber: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  instType: {
    type: String,
  },
  subsystem: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  link: { type: String, required: true },
});

export const Instruction = model<IInstruction>(
  'Instruction',
  InstructionSchema
);
