import { LoginType } from "../@types/auth.types"
import encryptPassword from "../utils/encryptPassword"
import { generateAccessToken } from "../utils/generateToken"
import verifyPassword from "../utils/verifyPassword"
import UserService from "./user.service"
import jwt from "jsonwebtoken"

const jwtSecret = process.env.JWT_SECRET as string

class AuthService {
  private userService = new UserService()

  async login(data: LoginType) {
    const user = await this.userService.getUserByEmail(data.email)

    if(!user) {
      throw new Error("Email não cadastrado")
    }

    const encryptedPassword = await encryptPassword(data.password)
    const isPasswordValid = await verifyPassword(user.password, encryptedPassword)

    if(isPasswordValid) {
      throw new Error("Senha incorreta")
    }

    const accessToken = generateAccessToken(user.id)
    const refreshToken = generateAccessToken(user.id)

    return {
      accessToken,
      refreshToken
    }
  }

  async verifyToken(token: string) {
    const decoded = jwt.verify(token, jwtSecret) as { userId: string }

    if(decoded.userId) {
      const accessToken = generateAccessToken(decoded.userId)
      return accessToken
    }

    throw new Error("Token inválido")
  }
}

export default AuthService