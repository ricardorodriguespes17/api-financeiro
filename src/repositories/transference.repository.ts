import { CreateTransferenceType, UpdateTransferenceType } from "../@types/transference.types"
import prisma from "../config/prisma"

class TransferenceRepository {
  async findAllByUser(userId: string) {
    return await prisma.transference.findMany({
      include: {
        installments: true
      },
      where: { userId }
    })
  }

  async findByMonth(month: string) {
    return await prisma.transference.findMany({
      where: {
        OR: [
          { month },
          { month: { lte: month } },
        ]
      },
      include: {
        installments: true
      },
    })
  }

  async findById(id: string, userId: string) {
    return await prisma.transference.findUnique({
      where: { id, userId },
      include: {
        installments: true
      },
    })
  }

  async create(data: CreateTransferenceType) {
    return await prisma.transference.create({ data, select: { installments: true } })
  }

  async update(id: string, userId: string, data: UpdateTransferenceType) {
    return await prisma.transference.update({
      where: { id, userId },
      data,
      include: { installments: true }
    })
  }

  async delete(id: string, userId: string) {
    return await prisma.transference.delete({ where: { id, userId } })
  }
}

export default TransferenceRepository