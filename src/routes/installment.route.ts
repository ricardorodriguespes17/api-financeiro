import { Router } from "express"
import authMiddleware from "../middlewares/authMiddlewares"
import InstallmentController from "../controllers/installment.controller"
import InstallmentValidator from "../validators/installment.validator"

const installmentRouter = Router()
const installmentController = new InstallmentController()
const installmentValidator = new InstallmentValidator()

installmentRouter.post(
  "/transference/installment",
  authMiddleware,
  installmentValidator.createInstallment,
  installmentController.createInstallment
)
installmentRouter.delete(
  "/transference/installment",
  authMiddleware,
  installmentController.deleteInstallment
)

export default installmentRouter