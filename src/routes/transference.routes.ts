import { Router } from "express"
import TransferenceController from "../controllers/transference.controller"
import authMiddleware from "../middlewares/authMiddlewares"
import TransferenceValidator from "../validators/transference.validator"

const transferenceRouter = Router()
const transferenceController = new TransferenceController()
const transferenceValidator = new TransferenceValidator()

transferenceRouter.get(
  "/transferences/:boardId",
  authMiddleware,
  
  transferenceController.getTransferencesByBoard
)
transferenceRouter.post(
  "/transferences",
  authMiddleware,
  transferenceValidator.createAndUpdateTransference,
  transferenceController.createTransference
)
transferenceRouter.put("/transferences/:id",
  authMiddleware,
  transferenceValidator.createAndUpdateTransference,
  transferenceController.updateTransference
)
transferenceRouter.delete(
  "/transferences/:id",
  authMiddleware, transferenceController.deleteTransference
)

export default transferenceRouter