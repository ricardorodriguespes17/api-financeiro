import { Request, Response } from "express"
import InstallmentService from "../services/installment.service"
import { CreateInstallmentType } from "../@types/installment.types"

const installmentService = new InstallmentService()

class InstallmentController {

  async createInstallment(req: Request, res: Response) {
    const { dueMonth, amount, transferenceId } = req.body

    const data: CreateInstallmentType = {
      dueMonth,
      amount,
      transferenceId,
      isPaid: true
    }

    try {
      const reponse = await installmentService.createInstallment(data)
      res.status(201).json(reponse)
    } catch (error) {
      const message = (error as Error).message

      if (message) {
        res.status(400).json({ message })
      } else {
        res.status(500).json({ message: "Erro ao criar o pagamento" })
      }
    }
  }

  async deleteInstallment(req: Request, res: Response) {
    const { id } = req.params

    try {
      await installmentService.deleteInstallment(id)
      res.status(201).json({ message: "Pagamento deletado com sucesso" })
    } catch (error) {
      const message = (error as Error).message

      if (message) {
        res.status(400).json({ message })
      } else {
        res.status(500).json({ message: "Erro ao deletar o pagamento" })
      }
    }
  }

}

export default InstallmentController