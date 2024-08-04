import { Router } from "express"
import UserController from "../controllers/UserController"
import { 
  createUserValidators, 
  updateUserValidators 
} from "../validators/userValidators"

const router = Router()
const userController = new UserController()
const path = "users"

router.get(`/${path}`, userController.findAllUsers)

router.get(`/${path}/:id`, userController.findUserById)

router.post(`/${path}`, createUserValidators, userController.createUser)

router.put(`/${path}/:id`, updateUserValidators, userController.updateUser)

router.delete(`/${path}/:id`, userController.deleteUser)

export default router