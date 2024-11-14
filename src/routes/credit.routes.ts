import { Router } from "express"
import authMiddleware from "../middlewares/authMiddlewares"
import CreditController from "../controllers/credit.controller"
import CreditValidator from "../validators/credit.validator"

const creditRouter = Router()
const creditController = new CreditController()
const creditValidator = new CreditValidator()

creditRouter.get("/credits/month/:month", authMiddleware, creditController.getCreditByMonth)
creditRouter.get("/credits", authMiddleware, creditController.getCreditByUser)
creditRouter.post("/credits", authMiddleware, creditValidator.create, creditController.createCredit)
creditRouter.put("/credits", authMiddleware, creditValidator.create, creditController.updateCredit)

export default creditRouter