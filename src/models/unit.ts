import {
  Schema,
  model,
  Types,
  HydratedDocument,
  Model,
} from 'mongoose';
import { StatusError } from '..';

const STATUSES = ['open', 'confirmed', 'refused'] as const;
type AffectedUnitStatus = typeof STATUSES[number];

// typeguard to define if string  is of AffectedUnitStatus type
export function isStatus(status: string): status is AffectedUnitStatus {
  return STATUSES.includes(status as AffectedUnitStatus);
}


export interface AffectedUnit {
	instruction: Types.ObjectId;
  status: AffectedUnitStatus;
}

export interface IUnit {
	unitNumber: string;
	instructions: Types.DocumentArray<AffectedUnit>
	;
}
export interface IUnitMethodsAndProps {
  addInstructionToArray(
    instructionId: Types.ObjectId
  ): Promise<HydratedDocument<IUnit>>;
  updateAffectedUnits(
    updatesArr: { docId: string; status: string }[]
  ): Promise<HydratedDocument<IUnit>>;
  instructions: Types.DocumentArray<AffectedUnit>;
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
   
		this.instructions.push({instruction: instructionId, status: 'open'})
    return this.save();
  },
);

UnitSchema.method('updateAffectedUnits',
function updateAffectedUnits(
	this: HydratedDocument<IUnit>,
	updatesArr: { docId: string; status: string }[]
) {
	updatesArr.forEach(element => {

		let affectedUnit = this.instructions.id(element.docId)

		console.log('isStatus: ', isStatus(element.status));
		console.log('affectedUnit', affectedUnit);
		
		if (isStatus(element.status) && (affectedUnit !== null)) {
			affectedUnit.status = element.status

		} else {
			const error = new Error('Incorrect status or affected unit Id') as StatusError;
			error.statusCode = 404;
			throw error; //to be catche
		}

	});
	return this.save();
})


export const Unit = model<IUnit, UnitModel>('Unit', UnitSchema);
