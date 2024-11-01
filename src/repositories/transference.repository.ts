import { CreateTransferenceType, UpdateTransferenceType } from "../@types/transference.types"
import prisma from "../config/prisma"

class TransferenceRepository {
  async findAllByUser(userId: string) {
    return await prisma.transference.findMany({ where: { userId } })
  }

  async findById(id: string, userId: string) {
    return await prisma.transference.findUnique({ where: { id, userId } })
  }

  async create(data: CreateTransferenceType) {
    return await prisma.transference.create({ data })
  }

  async update(id: string, userId: string, data: UpdateTransferenceType) {
    return await prisma.transference.update({ where: { id, userId }, data })
  }

  async delete(id: string, userId: string) {
    return await prisma.transference.delete({ where: { id, userId } })
  }
}

export default TransferenceRepository