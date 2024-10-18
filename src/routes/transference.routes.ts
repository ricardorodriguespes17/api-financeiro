import { Router } from "express"
import transferenceController from "../controllers/transference.controller"

const transferenceRouter = Router()

transferenceRouter.get("/transference", transferenceController.getTransferencesByBoard)
transferenceRouter.post("/transference", transferenceController.createTransference)
transferenceRouter.put("/transference/:id", transferenceController.updateTransference)
transferenceRouter.delete("/transference/:id", transferenceController.deleteTransference)

export default transferenceRouter