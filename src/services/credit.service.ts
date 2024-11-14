import { CreateCreditType, UpdateCreditType } from "../@types/credit.types"
import { CreateUserType, UpdateUserType, UserType } from "../@types/user.types"
import CreditRepository from "../repositories/credit.repository"
import encryptPassword from "../utils/encryptPassword"

class CreditService {
  private creditRepository = new CreditRepository()

  async getCreditsByUser(userId: string) {
    return this.creditRepository.findByUser(userId)
  }

  async getCreditsByMonth(userId: string, month: string) {
    return this.creditRepository.findByMonth(userId, month)
  }

  async createCredit(data: CreateCreditType) {
    return this.creditRepository.create(data)
  }

  async updateCredit(id: string, data: UpdateCreditType) {
    return this.creditRepository.update(id, data)
  }

  async deleteUser(id: string) {
    return this.creditRepository.delete(id)
  }
}

export default CreditService