import { Schema, model, Types, Date } from 'mongoose';


export interface IInstruction {
	instNumber: string,
	title: string,
	instType: 'compulsory' | 'non-compulsory' | 'information',
	subsystem: string,
	releaseDate: Date,
	link: string,

}

const InstructionSchema = new Schema<IInstruction>({
	instNumber: {type: String, required: true},
	title: {type: String, required: true},
	instType: {type: String, required: true, enum: ['compulsory', 'non-compulsory', 'information'] },
	subsystem: {type: String, required: true},
	releaseDate: {type: Date, required: true},
	link: {type: String, required: true},
	
})

export const Instruction = model<IInstruction>('Instruction', InstructionSchema);