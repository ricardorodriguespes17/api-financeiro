import { CreateBoardType, UpdateBoardType } from "../@types/board.types"
import prisma from "../config/prisma"

class BoardRepository {
  async findAll(userId: string) {
    return await prisma.board.findMany({
      where: { userId },
      select: {
        id: true,
        initialValue: true,
        name: true,
        userId: true,
        _count: true
      }
    })
  }

  async findById(id: string) {
    return await prisma.board.findUnique({
      where: { id },
      select: {
        id: true,
        initialValue: true,
        name: true,
        transferences: true,
        userId: true,
      }
    })
  }

  async findByName(name: string, userId: string) {
    return await prisma.board.findFirst({
      where: { name, userId },
      select: {
        id: true,
        initialValue: true,
        name: true,
        transferences: true,
        userId: true,
      }
    })
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