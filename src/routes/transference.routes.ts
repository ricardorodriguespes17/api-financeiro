import { Router } from "express"
import TransferenceController from "../controllers/transference.controller"
import authMiddleware from "../middlewares/authMiddlewares"

const transferenceRouter = Router()
const transferenceController = new TransferenceController()

transferenceRouter.get("/transferences/:boardId", authMiddleware, transferenceController.getTransferencesByBoard)
transferenceRouter.post("/transferences", authMiddleware, transferenceController.createTransference)
transferenceRouter.put("/transferences/:id", authMiddleware, transferenceController.updateTransference)
transferenceRouter.delete("/transferences/:id", authMiddleware, transferenceController.deleteTransference)

export default transferenceRouter