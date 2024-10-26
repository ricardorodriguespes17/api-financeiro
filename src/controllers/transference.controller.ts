import { Request, Response } from "express"
import TransferenceService from "../services/transference.service"
import { CreateTransferenceType, UpdateTransferenceType } from "../@types/transference.types"

class TransferenceController {
  private transferenceService: TransferenceService

  constructor(transferenceService?: TransferenceService) {
    this.transferenceService = transferenceService || new TransferenceService()

    this.getTransferencesByBoard = this.getTransferencesByBoard.bind(this)
    this.createTransference = this.createTransference.bind(this)
    this.updateTransference = this.updateTransference.bind(this)
    this.deleteTransference = this.deleteTransference.bind(this)
  }

  async getTransferencesByBoard(req: Request, res: Response) {
    const { boardId } = req.params

    try {
      const transferences = await this.transferenceService.getTransferencesByBoard(boardId)
      res.status(200).json(transferences)
    } catch (error) {
      res.status(500).json({ message: "Erro interno" })
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
      const createdTransference = await this.transferenceService.createTransference(data)
      res.status(201).json(createdTransference)
    } catch (error) {
      res.status(500).json({ message: "Falha ao criar a tranferência" })
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
      const updatedTransference = await this.transferenceService.updateTransference(id, data)
      res.status(200).json(updatedTransference)
    } catch (error) {
      const message = (error as Error).message

      if (message === "Transferência não encontrada") {
        res.status(404).json({ message })
      } else {
        res.status(500).json({ message: "Falha ao atualizar os dados da tranferência" })
      }
    }
  }

  async deleteTransference(req: Request, res: Response) {
    const id = req.params.id

    try {
      await this.transferenceService.deleteTransference(id)
      res.status(204).send()
    } catch (error) {
      const message = (error as Error).message

      if (message === "Transferência não encontrada") {
        res.status(404).json({ message })
      } else {
        res.status(500).json({ message: "Falha ao deletar a transferência" })
      }
    }
  }
}

export default TransferenceController