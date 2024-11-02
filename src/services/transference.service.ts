import { CreateTransferenceType, UpdateTransferenceType } from "../@types/transference.types"
import TransferenceRepository from "../repositories/transference.repository"

class TransferenceService {
  private transferenceRepository = new TransferenceRepository()

  async getTransferencesByUser(userId: string) {
    return this.transferenceRepository.findAllByUser(userId)
  }

  async getTransferencesByMonth(month: string) {
    const [targetYear, targerMonth] = month.split("-").map(Number)
    const monthValue = targerMonth + targetYear * 12
    const beforeTransferences = await this.transferenceRepository.findByMonth(month)

    return beforeTransferences.filter(item => {
      const [itemYear, itemMonth] = item.month.split("-").map(Number)
      const itemMonthValue = itemMonth + itemYear * 12

      if (item.month === month) return true
      if(item.recurrenceLimit)
        return (monthValue - itemMonthValue) < item.recurrenceLimit
      return true
    })
  }

  async createTransference(data: CreateTransferenceType) {
    return this.transferenceRepository.create(data)
  }

  async updateTransference(id: string, userId: string, data: UpdateTransferenceType) {
    const transference = await this.transferenceRepository.findById(id, userId)

    if (!transference) {
      throw new Error("Transferência não encontrada")
    }

    return this.transferenceRepository.update(id, userId, data)
  }

  async deleteTransference(id: string, userId: string) {
    const transference = await this.transferenceRepository.findById(id, userId)

    if (!transference) {
      throw new Error("Transferência não encontrada")
    }

    return this.transferenceRepository.delete(id, userId)
  }
}

export default TransferenceService