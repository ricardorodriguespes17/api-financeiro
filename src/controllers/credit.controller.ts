import { Request, Response } from "express"
import CreditService from "../services/credit.service"
import { CreateCreditType, UpdateCreditType } from "../@types/credit.types"

const creditService = new CreditService()

class CreditController {

  async getCreditByUser(req: Request, res: Response) {
    const { userId } = req.body

    try {
      const creditsData = await creditService.getCreditsByUser(userId)
      res.status(200).json(creditsData)
    } catch (error) {
      res.status(404).json({ message: "Usuário não encontrado" })
    }
  }

  async getCreditByMonth(req: Request, res: Response) {
    const { month } = req.params
    const { userId } = req.body

    try {
      const creditsData = await creditService.getCreditsByMonth(userId, month)
      res.status(200).json(creditsData)
    } catch (error) {
      res.status(404).json({ message: "Usuário não encontrado" })
    }
  }

  async createCredit(req: Request, res: Response) {
    const { name, color, expireDay, limit, userId } = req.body

    const data: CreateCreditType = {
      name,
      color,
      expireDay,
      limit,
      userId
    }

    try {
      const createdCredit = await creditService.createCredit(data)
      res.status(201).json(createdCredit)
    } catch (error) {
      const message = (error as Error).message

      if (message === "Já existe usuário com esse email") {
        res.status(400).json({ message })
      } else {
        res.status(500).json({ message: "Erro interno" })
      }
    }
  }

  async updateCredit(req: Request, res: Response) {
    const { name, userId, expireDay, color, limit } = req.body

    const data: UpdateCreditType = {
      name,
      expireDay,
      color,
      limit,
      userId
    }

    try {
      const updatedCredit = await creditService.updateCredit(userId, data)
      res.status(200).json(updatedCredit)
    } catch (error) {
      const message = (error as Error).message

      if (message) {
        res.status(400).json({ message })
      } else {
        res.status(500).json({ message: "Erro interno" })
      }
    }
  }
}

export default CreditController