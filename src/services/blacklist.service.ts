import BlacklistRepository from "../repositories/blacklist.repository"

class BlacklistService {
  private blacklistRepostory = new BlacklistRepository()

  async getByToken(token: string) {
    return await this.blacklistRepostory.findByToken(token)
  }

  async createToken(token: string) {
    return await this.blacklistRepostory.create(token)
  }
}

export default BlacklistService