import { Request, Response } from "express"
import UserService from "../services/user.service"
import { CreateUserType, UpdateUserType } from "../@types/user.types"

const userService = new UserService()

class UserController {

  async getUserById(req: Request, res: Response) {
    try {

      const user = await userService.getUserById(req.params.id)
      res.status(200).json(user)
    } catch (error) {
      const message = (error as Error).message

      if (message === "User not found") {
        res.status(404).json({ message })
      } else {
        res.status(500).json({ message: "Internal Error" })
      }
    }
  }

  async createUser(req: Request, res: Response) {
    const { name, birthdate, email, password } = req.body

    const data: CreateUserType = {
      name,
      birthdate,
      email,
      password,
      createdAt: new Date(),
    }

    try {

      await userService.createUser(data)
      res.status(201).json({ message: "User created successfully" })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Internal Error" })
    }
  }

  async updateUser(req: Request, res: Response) {
    const { name, birthdate, email } = req.body
    const id = req.params.id

    const data: UpdateUserType = {
      name,
      birthdate,
      email,
    }

    try {

      await userService.updateUser(id, data)
      res.status(201).json({ message: "User updated successfully" })
    } catch (error) {
      res.status(500).json({ message: "Internal Error" })
    }
  }
}

export default UserController