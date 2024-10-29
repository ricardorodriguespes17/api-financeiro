import { Router } from "express"
import UserController from "../controllers/user.controller"
import UserValidator from "../validators/user.validator"
import authMiddleware from "../middlewares/authMiddlewares"

const router = Router()
const userController = new UserController()
const userValidator = new UserValidator()

router.get("/users/profile", authMiddleware, userController.getUserById)
router.get("/users/:id", authMiddleware, userController.getUserById)
router.post("/users", userValidator.createUser, userController.createUser)
router.put("/users", authMiddleware, userValidator.updateUser, userController.updateUser)

export default router