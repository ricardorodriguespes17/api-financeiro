import { NextFunction, Request, Response } from "express"
import Joi from "joi"

const getAllBoardsSchema = Joi.object({
  userId: Joi.string().required().message("'userId' é obrigatório")
})

const createBoardSchema = Joi.object({
  id: Joi.string().length(7).required().message("'id' é obrigatório"),
  userId: Joi.string().required().message("'userId' é obrigatório")
})

const updateBoardSchema = Joi.object({
  initialValue: Joi.number().min(0).message("Valo inválido"),
  userId: Joi.string().required().message("'userId' é obrigatório")
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