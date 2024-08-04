import { check } from 'express-validator'
import validate from './validate'

export const createUserValidators = validate([
  check('name').notEmpty().withMessage('Name is required'),
  check('email').isEmail().withMessage('Email is required'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
])

export const updateUserValidators = validate([
  check('name').notEmpty().withMessage('Name is required'),
  check('email').isEmail().withMessage('Email is required'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
])