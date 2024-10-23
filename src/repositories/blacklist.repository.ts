import prisma from "../config/prisma"

class BlacklistRepository {
  async findByToken(token: string) {
    return await prisma.blacklist.findFirst({ where: { token } })
  }

  async create(token: string) {
    return await prisma.blacklist.create({ data: { token } })
  }
}

export default BlacklistRepository