import { Router } from "express"
import UserController from "../controllers/user.controller"
import UserValidator from "../validators/user.validator"

const router = Router()
const userController = new UserController()
const userValidator = new UserValidator()

router.get("/users/:id", userController.getUserById)
router.post("/users", userValidator.createUser, userController.createUser)
router.put("/users/:id", userValidator.updateUser, userController.updateUser)

export default router