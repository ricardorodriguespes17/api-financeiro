import { CreateBoardType, UpdateBoardType } from "../@types/board.types"
import prisma from "../config/prisma"

class BoardRepository {
  async findAll(userId: string) {
    return await prisma.board.findMany({ where: { userId } })
  }

  async findById(id: string) {
    return await prisma.board.findUnique({ where: { id } })
  }

  async findByName(name: string, userId: string) {
    return await prisma.board.findFirst({ where: { name, userId } })
  }

  async create(data: CreateBoardType) {
    return await prisma.board.create({ data })
  }

  async update(id: string, data: UpdateBoardType) {
    return await prisma.board.update({ where: { id }, data })
  }

  async delete(id: string) {
    return await prisma.board.delete({ where: { id } })
  }
}

export default BoardRepository