import { CreateTransferenceType, UpdateTransferenceType } from "../@types/transference.types"
import prisma from "../config/prisma"

class TransferenceRepository {
  async findAllByBoard(boardId: string) {
    return await prisma.transference.findMany({ where: { boardId } })
  }

  async findById(id: string) {
    return await prisma.transference.findUnique({ where: { id } })
  }

  async create(data: CreateTransferenceType) {
    return await prisma.transference.create({ data })
  }

  async update(id: string, data: UpdateTransferenceType) {
    return await prisma.transference.update({ where: { id }, data })
  }

  async delete(id: string) {
    return await prisma.transference.delete({ where: { id } })
  }
}

export default TransferenceRepository