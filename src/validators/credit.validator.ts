import { NextFunction, Request, Response } from "express"
import Joi from "joi"

const createCreditSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({
      'any.required': 'O nome é obrigatório'
    }),
  color: Joi.string()
    .required()
    .messages({
      'any.required': 'A cor é obrigatória'
    }),
  expireDay: Joi.number()
    .required()
    .min(1)
    .max(31)
    .messages({
      'any.required': 'O dia de vencimento é obrigatório',
      'any.number': 'O dia de vencimento deve ser númerico',
      'number.min': 'O dia de vencimento deve maior ou igual a 1',
      'number.max': 'O dia de vencimento deve ser menor ou igual a 31'
    }),
  limit: Joi.number()
    .required()
    .min(1)
    .messages({
      'any.required': 'O limite é obrigatório',
      'any.number': 'O limite deve ser númerico',
      'number.min': 'O dia de vencimento deve maior ou igual a 1',
    }),
  userId: Joi.string()
    .required()
    .messages({
      'any.required': 'O userId é obrigatório'
    })
})

class CreditValidator {
  async create(req: Request, res: Response, next: NextFunction) {
    const { error } = createCreditSchema.validate(req.body)

    if (error) {
      res.status(400).json({ message: error.details[0].message })
    } else {
      next()
    }
  }

}

export default CreditValidator