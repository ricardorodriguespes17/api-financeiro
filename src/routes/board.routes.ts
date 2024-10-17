import { Router } from "express"
import BoardController from "../controllers/board.controller"
import BoardValidator from "../validators/board.validator"

const boardRouter = Router()
const boardController = new BoardController()
const boardValidator = new BoardValidator()

boardRouter.get("/boards", boardValidator.getAllBoards, boardController.getAllBoards)
boardRouter.get("/boards/:id", boardController.getBoardById)
boardRouter.post("/boards", boardValidator.createBoard, boardController.createBoard)
boardRouter.put("/boards/:id", boardValidator.updateBoard, boardController.updateBoard)
boardRouter.delete("/boards/:id", boardController.deleteBoard)

export default boardRouter