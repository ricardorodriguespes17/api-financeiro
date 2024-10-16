import { User } from "@prisma/client"
import prisma from "../config/prisma"

class UserRepository {
  async findAll() {
    return await prisma.user.findMany()
  }

  async findById(id: string) {
    return await prisma.user.findUnique({ where: { id } })
  }

  async findByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } })
  }

  async create(data: User) {
    return await prisma.user.create({ data })
  }

  async update(id: string, data: User) {
    return await prisma.user.update({
      where: { id },
      data
    })
  }

  async delete(id: string) {
    return await prisma.user.delete({ where: { id } })
  }
}

export default UserRepository