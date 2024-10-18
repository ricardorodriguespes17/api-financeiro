import { Router } from "express"
import TransferenceController from "../controllers/transference.controller"

const transferenceRouter = Router()
const transferenceController = new TransferenceController()

transferenceRouter.get("/transferences/:boardId", transferenceController.getTransferencesByBoard)
transferenceRouter.post("/transferences", transferenceController.createTransference)
transferenceRouter.put("/transferences/:id", transferenceController.updateTransference)
transferenceRouter.delete("/transferences/:id", transferenceController.deleteTransference)

export default transferenceRouter