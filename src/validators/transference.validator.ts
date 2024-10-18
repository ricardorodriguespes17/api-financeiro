import { NextFunction, Request, Response } from "express"
import Joi from "joi"

const createSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().min(0),
  value: Joi.number().min(0).required(),
  expireDay: Joi.number().min(0).max(31).required(),
  type: Joi.string().valid('income', 'expense').required(),
  boardId: Joi.string().required(),
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