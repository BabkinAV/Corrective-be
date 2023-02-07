import { Schema, model, Types, Date } from 'mongoose';


export interface Instruction {
	instNumber: string,
	title: string,
	instType: 'compulsory' | 'non-compulsory' | 'information',
	subsystem: string,
	releaseDate: Date,
	link: string,

}

const InstructionSchema = new Schema<Instruction>({
	instNumber: {type: String, required: true},
	title: {type: String, required: true},
	instType: {type: String, required: true},
	subsystem: {type: String, required: true},
	releaseDate: {type: Date, required: true},
	link: {type: String, required: true},
	
})

export const Instruction = model<Instruction>('Instruction', InstructionSchema);