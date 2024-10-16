import { CreateTransferenceType, UpdateTransferenceType } from "../@types/transference.types"
import TransferenceRepository from "../repositories/transference.repository"

class TransferenceService {
  private transferenceRepository = new TransferenceRepository()

  async getTransferencesByBoard(boardId: string) {
    return this.transferenceRepository.findAllByBoard(boardId)
  }

  async createTransference(data: CreateTransferenceType) {
    return this.transferenceRepository.create(data)
  }

  async updateTransference(id: string, data: UpdateTransferenceType) {
    const transference = await this.transferenceRepository.findById(id)

    if(!transference) {
      throw new Error("Transferência não encontrada")
    }

    return this.transferenceRepository.update(id, data)
  }

  async deleteTransference(id: string) {
    const transference = await this.transferenceRepository.findById(id)

    if(!transference) {
      throw new Error("Transferência não encontrada")
    }

    return this.transferenceRepository.delete(id)
  }
}

export default TransferenceService