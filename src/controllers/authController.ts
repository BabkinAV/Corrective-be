import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { Types } from 'mongoose';
import { StatusError } from '..';
import bcrypt from 'bcryptjs';

import { User } from '../models/user';

export const signup = (
  req: Request<{}, {}, { name: string; email: string; password: string }>,
  res: Response,
  next: NextFunction
) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error = new Error('Signup validation failed') as StatusError;
		error.statusCode = 422;
		error.data = errors.array();
		throw error; //to be catched up by .catch block
  }

  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;

  bcrypt
    .hash(password, 12)
    .then(hashedPw => {
      const user = new User({
        email,
        password: hashedPw,
        name,
      });
			return user.save()
    })
    .then(result => {
      res.status(201).json({ message: 'User created!',  userId: result._id});
    })
    .catch((err: { statusCode?: number }) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};
