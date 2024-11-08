import { CreateInstallmentType } from "../@types/installment.types"
import prisma from "../config/prisma"

class InstallmentRepository {
  async findAll() {
    return await prisma.installment.findMany()
  }

  async findById(id: string) {
    return await prisma.installment.findUnique({
      where: { id },
      include: { transference: true }
    })
  }

  async findByMonth(month: string, transferenceId: string) {
    return await prisma.installment.findFirst({
      where: { dueMonth: month, transferenceId }
    })
  }

  async create(data: CreateInstallmentType) {
    return await prisma.installment.create({ data })
  }

  async delete(id: string) {
    return await prisma.installment.delete({ where: { id } })
  }
}

export default InstallmentRepository