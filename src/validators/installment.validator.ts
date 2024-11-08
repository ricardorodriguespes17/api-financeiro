import { NextFunction, Request, Response } from "express"
import Joi from "joi"

const createInstallmentSchema = Joi.object({
  dueMonth: Joi.string()
    .required()
    .messages({
      'any.required': 'O mês é obrigatório',
    }),
  transferenceId: Joi.string()
    .required()
    .messages({
      'any.required': 'O id da transferência é obrigatório',
    }),
  amount: Joi.number()
    .required()
    .messages({
      'any.required': 'O valor é obrigatório',
      'any.number': 'O valor deve ser númerico',
    }),
})

class InstallmentValidator {
  async createInstallment(req: Request, res: Response, next: NextFunction) {
    const { error } = createInstallmentSchema.validate(req.body)

    if (error) {
      res.status(400).json({ message: error.details[0].message })
    } else {
      next()
    }
  }

}

export default InstallmentValidator