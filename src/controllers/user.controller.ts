import { Request, Response } from "express"
import UserService from "../services/user.service"
import { CreateUserType, UserType } from "../@types/user.types"

class UserController {
  private userService = new UserService()

  async getUserById(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.userService.getUserById(req.params.id)
      return res.status(200).json(user)
    } catch (error) {
      const message = (error as Error).message

      if (message === "User not found") {
        return res.status(404).json({ message })
      }

      return res.status(500).json({ message: error })
    }
  }

  async createUser(req: Request, res: Response): Promise<Response> {
    const { name, birthdate, email, password } = req.body

    const data: CreateUserType = {
      name,
      birthdate,
      email,
      password,
      createdAt: new Date(),
    }

    try {
      await this.userService.createUser(data)
      return res.status(201).json({ message: "User created successfully" })
    } catch (error) {
      return res.status(500).json({ message: error })
    }
  }
}

export default UserController