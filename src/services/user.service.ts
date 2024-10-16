import { CreateUserType, UserType } from "../@types/user.types"
import UserRepository from "../repositories/user.repository"

class UserService {
  private userRepository = new UserRepository()

  async getAllUsers() {
    return this.userRepository.findAll()
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findById(id)

    if(!user) {
      throw new Error("User not found")
    }

    return user
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email)

    if(!user) {
      throw new Error("User not found")
    }

    return user
  }

  async createUser(data: CreateUserType) {
    return this.userRepository.create(data)
  }

  async updateUser(id: string, data: UserType) {
    return this.userRepository.update(id, data)
  }

  async deleteUser(id: string) {
    return this.userRepository.delete(id)
  }
}

export default UserService