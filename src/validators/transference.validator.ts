import { NextFunction, Request, Response } from "express"
import Joi from "joi"

const createSchema = Joi.object({
  name: Joi.string().required().message("O nome é obrigatório"),
  description: Joi.string().min(0),
  value: Joi.number().min(0).required().message("Valor inválido"),
  expireDay: Joi.number().min(0).max(31).required().message("Dia de vencimento inválido"),
  type: Joi.string().valid('income', 'expense').required().message("Tipo inválido"),
  boardId: Joi.string().required().message("'boardId' é obrigatório"),
  userId: Joi.string()
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