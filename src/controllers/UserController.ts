import { Request, Response } from "express";
import UserService from "../services/UserService";

class UserController {
  private userService = new UserService()

  createUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body

    try {
      await this.userService.create({ email, name, password, id: "" })
      return res.status(201).json({ message: "User created successfully" })
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

  updateUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body
    const { id } = req.params

    try {
      await this.userService.update({ id, email, name, password })
      return res.status(201).json({ message: "User updated successfully" })
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

  deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
      await this.userService.delete(id)
      return res.status(204).send()
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

  findAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.userService.findAll()
      return res.status(200).json(users)
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

  findUserById = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
      const user = await this.userService.findById(id)
      return res.status(200).json(user)
    } catch (error) {
      return res.status(500).json({ error })
    }
  }
}

export default UserController