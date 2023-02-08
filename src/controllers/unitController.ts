import { RequestHandler } from "express"



export const addAffectedUnit : RequestHandler = (req, res, next) => {
	res.json({
		message: `Added affected unit ${req.params.unit}`
	})
}
export const getAffectedUnit: RequestHandler = (req, res, next) => {
	res.json({
		message: `Got affected unit ${req.params.unit}`

	})
}