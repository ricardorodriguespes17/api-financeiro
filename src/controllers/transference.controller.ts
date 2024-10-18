import { Request, Response } from "express"
import TransferenceService from "../services/transference.service"
import { CreateTransferenceType, UpdateTransferenceType } from "../@types/transference.types"

class TransferenceController {
  private transferenceService = new TransferenceService()

  async getTransferencesByBoard(req: Request, res: Response) {
    const { boardId } = req.body

    try {
      const transferences = await this.transferenceService.getTransferencesByBoard(boardId)
      res.status(200).json(transferences)
    } catch (error) {
      res.status(500).json({ message: "Internal Error" })
    }
  }

  async createTransference(req: Request, res: Response) {
    const { boardId, description, expireDay, name, type, value } = req.body

    const data: CreateTransferenceType = {
      boardId,
      description,
      expireDay,
      name,
      type,
      value
    }

    try {
      await this.transferenceService.createTransference(data)
    } catch (error) {
      res.status(500).json({ message: "Internal Error" })
    }
  }

  async updateTransference(req: Request, res: Response) {
    const id = req.params.id
    const { boardId, description, expireDay, name, type, value } = req.body

    const data: UpdateTransferenceType = {
      boardId,
      description,
      expireDay,
      name,
      type,
      value
    }

    try {
      await this.transferenceService.updateTransference(id, data)
    } catch (error) {
      const message = (error as Error).message

      if (message === "Transference not found") {
        res.status(404).json({ message })
      } else {
        res.status(500).json({ message: "Internal Error" })
      }
    }
  }

  async deleteTransference(req: Request, res: Response) {
    const id = req.params.id

    try {
      await this.transferenceService.deleteTransference(id)
    } catch (error) {
      const message = (error as Error).message

      if (message === "Transference not found") {
        res.status(404).json({ message })
      } else {
        res.status(500).json({ message: "Internal Error" })
      }
    }
  }
}

export default new TransferenceController()