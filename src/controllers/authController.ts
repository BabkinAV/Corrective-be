import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import { HydratedDocument } from 'mongoose';
import { StatusError } from '..';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { IUser, User } from '../models/user';



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
      return user.save();
    })
    .then(result => {

			const token = jwt.sign(
        {
          email,
					name,
          userId: result._id.toString(),
        },
        process.env.JWT_SECRET!,
        { expiresIn: '1d' }
      );

      res.status(201).json({token, message: 'User created!', userId: result._id.toString() });
    })
    .catch((err: { statusCode?: number }) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};

export const login = (
  req: Request<{}, {}, { email: string; password: string }>,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Login validation failed') as StatusError;
    error.statusCode = 422;
    error.data = errors.array();
    throw error; //to be catched up by .catch block
  }
  let email = req.body.email;
  let password = req.body.password;
  let loadedUser: HydratedDocument<IUser>;
  User.findOne({ email })
    .then(user => {
      if (!user) {
        const error = new Error(
          'A user with this email could not be found'
        ) as StatusError;
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error('Wrong password') as StatusError;
        error.statusCode = 401;
        throw error;
      }

      const token = jwt.sign(
        {
          email: loadedUser.email,
					name: loadedUser.name,
          userId: loadedUser._id.toString(),
        },
        process.env.JWT_SECRET!,
        { expiresIn: '1d' }
      );
      res.status(200).json({ token, userId: loadedUser._id.toString() });
    })
    .catch((err: { statusCode?: number }) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};
