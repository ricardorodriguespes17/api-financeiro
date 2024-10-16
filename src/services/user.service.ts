import { CreateUserType, UpdateUserType, UserType } from "../@types/user.types"
import UserRepository from "../repositories/user.repository"
import encryptPassword from "../utils/encryptPassword"

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
    const encodePassword = await encryptPassword(data.password)

    return this.userRepository.create({
      ...data,
      password: encodePassword
    })
  }

  async updateUser(id: string, data: UpdateUserType) {
    return this.userRepository.update(id, data)
  }

  async updateUserPassword(id: string, password: string) {

  }

  async deleteUser(id: string) {
    return this.userRepository.delete(id)
  }
}

export default UserService