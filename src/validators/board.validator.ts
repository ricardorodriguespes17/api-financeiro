import { NextFunction, Request, Response } from "express"
import Joi from "joi"

const getAllBoardsSchema = Joi.object({
  userId: Joi
    .required()
    .messages({
      "any.required": "'userId' é obrigatório"
    })
})

const createBoardSchema = Joi.object({
  name: Joi.string()
    .length(7)
    .required()
    .messages({
      "string.length": "nome inválido",
      "any.required": "nome é obrigatório"
    }),
  userId: Joi
    .required()
    .messages({
      "any.required": "'userId' é obrigatório"
    })
})

const updateBoardSchema = Joi.object({
  initialValue: Joi.number()
    .min(0)
    .messages({
      "number.min": "Valor inválido",
      "any.required": "Valor é obrigatório"
    }),
  userId: Joi
    .required()
    .messages({
      "any.required": "'userId' é obrigatório"
    })
})


class BoardValidator {
  async getAllBoards(req: Request, res: Response, next: NextFunction) {
    const { error } = getAllBoardsSchema.validate(req.body)

    if (error) {
      res.status(400).json({ message: error.details[0].message })
    } else {
      next()
    }
  }

  async createBoard(req: Request, res: Response, next: NextFunction) {
    const { error } = createBoardSchema.validate(req.body)

    if (error?.details) {
      res.status(400).json({ message: error.details[0].message })
    } else {
      next()
    }
  }

  async updateBoard(req: Request, res: Response, next: NextFunction) {
    const { error } = updateBoardSchema.validate(req.body)

    if (error?.details) {
      res.status(400).json({ message: error.details[0].message })
    } else {
      next()
    }
  }
}

export default BoardValidator