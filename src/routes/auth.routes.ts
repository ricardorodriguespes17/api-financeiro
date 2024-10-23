import { Router } from "express"
import AuthController from "../controllers/auth.controller"
import authMiddleware from "../middlewares/authMiddlewares"

const authRouter = Router()
const authController = new AuthController()

authRouter.post("/auth/login", authController.login)
authRouter.post("/auth/logout", authMiddleware, authController.logout)
authRouter.post("/auth/refresh", authController.refreshToken)

export default authRouter