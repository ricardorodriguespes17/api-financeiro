import { CreateCreditType, UpdateCreditType } from "../@types/credit.types"
import prisma from "../config/prisma"

class CreditRepository {
  async findByUser(userId: string) {
    return await prisma.credit.findMany({ where: { userId } })
  }

  async findByMonth(userId: string, month: string) {
    return await prisma.credit.findMany({
      where: { userId, transferences: { some: { month } } }
    })
  }

  async create(data: CreateCreditType) {
    return await prisma.credit.create({ data })
  }

  async update(id: string, data: UpdateCreditType) {
    return await prisma.credit.update({ data, where: { id } })
  }

  async delete(id: string) {
    return await prisma.credit.delete({ where: { id } })
  }
}

export default CreditRepository