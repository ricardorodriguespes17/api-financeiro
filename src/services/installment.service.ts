import { CreateInstallmentType } from "../@types/installment.types"
import InstallmentRepository from "../repositories/installment.repository"

class InstallmentService {
  private installmentRepository = new InstallmentRepository()

  async createInstallment(data: CreateInstallmentType) {
    const installmentData =
      await this.installmentRepository
        .findByMonth(data.dueMonth, data.transferenceId)

    if (installmentData) {
      throw new Error("Pagamento já registrado")
    }

    return this.installmentRepository.create(data)
  }

  async deleteInstallment(id: string) {
    const installmentData = await this.installmentRepository.findById(id)

    if (!installmentData) {
      throw new Error("Pagamento não encontrado")
    }

    return this.installmentRepository.delete(id)
  }
}

export default InstallmentService