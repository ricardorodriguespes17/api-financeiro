import prisma from "../config/prisma"
import { CreateUserType, UpdateUserType } from "../@types/user.types"

class UserRepository {
  async findAll() {
    return await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        birthdate: true,
        createdAt: true,
        password: false,
      }
    })
  }

  async findById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        birthdate: true,
        createdAt: true,
        password: false,
      }
    })
  }

  async findByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } })
  }

  async create(data: CreateUserType) {
    return await prisma.user.create({ data })
  }

  async update(id: string, data: UpdateUserType) {
    return await prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        birthdate: true,
        createdAt: true,
        password: false,
      }
    })
  }

  async delete(id: string) {
    return await prisma.user.delete({ where: { id } })
  }
}

export default UserRepository