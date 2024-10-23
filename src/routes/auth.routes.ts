import { Router } from "express"
import AuthController from "../controllers/auth.controller"

const authRouter = Router()
const authController = new AuthController()

authRouter.post("/login", authController.login)
authRouter.post("/auth/refresh", authController.refreshToken)

export default authRouter