import { Router, Request, Response } from "express"
import UserController from "../controller/UserController"
import validate from "../validators/validate"
import { 
  createUserValidators, 
  deleteUserValidators, 
  updateUserValidators 
} from "../validators/userValidators"

const router = Router()
const userController = new UserController()
const path = "users"

router.get(`/${path}`, async (req: Request, res: Response) => {
  try {
    const users = await userController.findAllUsers()
    return res.status(200).json(users)
  } catch (error) {
    return res.status(500).json({ error })
  }
})

router.get(`/${path}/:id`, async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const user = await userController.findUserById(id)
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({ error })
  }
})

router.post(`/${path}`, validate(createUserValidators), async (req: Request, res: Response) => {
  const { name, email, password } = req.body

  try {
    await userController.createUser({ email, name, password })
    return res.status(201).json({ message: "User created successfully"})
  } catch (error) {
    return res.status(500).json({ error })
  }
})

router.put(`/${path}/:id`, validate(updateUserValidators), async (req: Request, res: Response) => {
  const { name, email, password } = req.body
  const { id } = req.params

  try {
    await userController.updateUser({ id, email, name, password })
    return res.status(201).json({ message: "User updated successfully"})
  } catch (error) {
    return res.status(500).json({ error })
  }
})

router.delete(`/${path}/:id`, validate(deleteUserValidators), async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    await userController.deleteUser(id)
    return res.status(204).send()
  } catch (error) {
    return res.status(500).json({ error })
  }
})

export default router