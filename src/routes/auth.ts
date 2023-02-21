import { Router } from 'express';
import { body, CustomValidator } from 'express-validator';
import { signup, login } from '../controllers/authController';
import { User } from '../models/user';

const router = Router();

const isValidUser: CustomValidator = (value: string) => {
  return User.findOne({ email: value }).then(user => {
    if (user) {
      return Promise.reject('E-mail already in use');
    }
  });
};

// POST /auth/login
router.post(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email')
      .custom(isValidUser)
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 5 })
      .withMessage('Please enter a valid password'),
    body('name')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Please enter a valid name'),
  ],
  signup
);

// POST /auth/login
router.post(
  '/login',
  [
    body('email').trim().isEmail().withMessage('Please enter a valid email'),
    body('password')
      .trim()
      .isLength({ min: 5 })
      .withMessage('Please enter a valid password'),
  ],
  login
);

// TODO: logout route

export default router;
