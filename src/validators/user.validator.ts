import { NextFunction, Request, Response } from "express"
import Joi from "joi"

const createUserSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .required()
    .messages({
      'string.min': 'Nome deve ter pelo menos 3 letras',
      'any.required': 'Nome é obrigatório',
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Email inválido',
      'any.required': 'Email é obrigatório',
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': 'Senha deve ter no mínimo 6 caracteres',
      'any.required': 'Senha é obrigatória',
    }),
  birthdate: Joi.string()
    .required()
    .messages({
      'any.required': 'Data de nascimento é obrigatória',
      'string.base': 'Data de nascimento inválida',
    }),
})

const updateUserSchema = Joi.object({
  userId: Joi.string()
    .required()
    .messages({
      'string.userId': 'userId inválido',
      'any.required': 'userId é obrigatório',
    }),
  name: Joi.string()
    .min(3)
    .required()
    .messages({
      'string.min': 'Nome deve ter pelo menos 3 letras',
      'any.required': 'Nome é obrigatório',
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Email inválido',
      'any.required': 'Email é obrigatório',
    }),
  birthdate: Joi.string()
    .required()
    .messages({
      "any.required": "Data de nascimento é obrigatória",
      "string.base": "Data de nascimento inválida"
    })
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