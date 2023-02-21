import { Request, Response, NextFunction } from 'express';
import { StatusError } from '..';
import jwt from 'jsonwebtoken';

type userToken = {
  userId: string
  email: string
  iat: number
  exp: number
}

export const isAuth  = (req: Request<{}, {}, {}, {'Authorization': string}>, res: Response, next: NextFunction) => {
	const authHeader = req.get('Authorization');
	if (!authHeader) {
		const error = new Error('Not authenticated.') as StatusError;
		error.statusCode = 401;
		throw error;
	}
	const token = authHeader.split(' ')[1];
	let decodedToken;
	try {
		decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as userToken
	} catch (err) {
		const error = new Error('token verification error') as StatusError;
    error.statusCode = 401;
    throw error;
	}
	if (!decodedToken) {
		const error = new Error('Not authenticated.') as StatusError;
		error.statusCode = 401;
		throw error;
	}
	req.userId = decodedToken.userId;
	next();
} 