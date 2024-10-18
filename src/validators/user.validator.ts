import { NextFunction, Request, Response } from "express"
import Joi from "joi"

const createUserSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  birthdate: Joi.string().required()
})

const updateUserSchema = Joi.object({
  name: Joi.string().min(3).message("Nome inválido"),
  email: Joi.string().email().message("Email inválido"),
  birthdate: Joi.string().message("Data de nascimento inválida")
})

class UserValidator {
  async createUser(req: Request, res: Response, next: NextFunction) {
    const { error } = createUserSchema.validate(req.body)

    if (error) {
      res.status(400).json({ message: error.details[0].message })
    } else {
      next()
    }
  }
  
  async updateUser(req: Request, res: Response, next: NextFunction) {
    const { error } = updateUserSchema.validate(req.body)

    if (error?.details) {
      res.status(400).json({ message: error.details[0].message })
    } else {
      next()
    }
  }
}

export default UserValidator