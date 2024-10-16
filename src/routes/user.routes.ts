import { Request, Response, Router } from "express"
import UserController from "../controllers/user.controller"

const router = Router()
const userController = new UserController()

router.get("/users/:id", userController.getUserById)
router.post("/users", userController.createUser)
router.put("/users/:id", userController.updateUser)

export default router