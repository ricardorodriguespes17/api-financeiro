import { Request, Response } from "express"
import authService from "../services/auth.service"
import AuthService from "../services/auth.service"

class AuthController {
  private authService: AuthService

  constructor(authService?: AuthService) {
    this.authService = authService || new AuthService()

    this.login = this.login.bind(this)
    this.refreshToken = this.refreshToken.bind(this)
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body

    try {
      const tokens = await this.authService.login({ email, password })
      res.status(200).json(tokens)
    } catch (error) {
      const message = (error as Error).message

      if (message) {
        res.status(404).json({ message })
      } else {
        res.status(500).json({ message: "Erro interno" })
      }
    }
  }

  async refreshToken(req: Request, res: Response) {
    const { refreshToken } = req.body

    try {
      const accessToken = await this.authService.verifyToken(refreshToken)
      res.status(200).json({ accessToken })
    } catch (error) {
      const message = (error as Error).message

      if (message === "jwt expired") {
        res.status(404).json({ message: "Token expirado" })
      } else {
        res.status(500).json({ message: "Erro interno" })
      }
    }
  }
}

export default AuthController