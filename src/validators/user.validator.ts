import { NextFunction, Request, Response } from "express"
import Joi from "joi"

class UserValidator {
  private createUserSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    birthdate: Joi.string().required()
  })

  private updateUserSchema = Joi.object({
    name: Joi.string().min(3),
    email: Joi.string().email(),
    birthdate: Joi.string()
  })

  async createUser(req: Request, res: Response, next: NextFunction) {
    const { error } = this.createUserSchema.validate(req.body)

    if (error) {
      res.status(400).json({ message: error.details[0].message })
    } else {
      next()
    }
  }
  
  async updateUser(req: Request, res: Response, next: NextFunction) {
    const { error } = this.updateUserSchema.validate(req.body)

    if (error) {
      res.status(400).json({ message: error.details[0].message })
    } else {
      next()
    }
  }
}

export default UserValidator