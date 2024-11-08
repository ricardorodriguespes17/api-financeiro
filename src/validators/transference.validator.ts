import { NextFunction, Request, Response } from "express"
import Joi from "joi"

const createSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({
      "any.required": "O nome é obrigatório"
    }),
  description: Joi.string().min(0),
  value: Joi.number()
    .min(0)
    .required()
    .messages({
      "any.required": "Valor inválido",
      "number.min": "O valor deve ser maior ou igual a 0"
    }),
  expireDay: Joi.number()
    .min(0)
    .max(31)
    .required()
    .messages({
      "any.required": "Dia de vencimento inválido",
      "number.min": "O dia de vencimento deve ser maior ou igual a 0",
      "number.max": "O dia de vencimento deve ser menor ou igual a 31"
    }),
  type: Joi.string()
    .valid('income', 'expense')
    .required()
    .messages({
      "any.required": "Tipo inválido",
      "any.only": "O tipo deve ser 'income' ou 'expense'"
    }),
  userId: Joi.string()
    .required()
    .messages({
      "any.required": "userId é obrigatório",
    }),
  month: Joi.string()
    .required()
    .messages({
      "any.required": "O mês é obrigatório"
    }),
  recurrenceLimit: Joi.number().allow(null),
  category: Joi.string().allow(null),
})


class TransferenceValidator {
  async createAndUpdateTransference(req: Request, res: Response, next: NextFunction) {
    const { error } = createSchema.validate(req.body)

    if (error?.details) {
      res.status(400).json({ message: error.details[0].message })
    } else {
      next()
    }
  }
}

export default TransferenceValidator