import { Router } from "express"
import BoardController from "../controllers/board.controller"
import BoardValidator from "../validators/board.validator"
import authMiddleware from "../middlewares/authMiddlewares"

const boardRouter = Router()
const boardController = new BoardController()
const boardValidator = new BoardValidator()

boardRouter.get("/boards", authMiddleware, boardValidator.getAllBoards, boardController.getAllBoards)
boardRouter.get("/boards/:id", authMiddleware, boardController.getBoardById)
boardRouter.get("/boards/name/:name", authMiddleware, boardController.getBoardByName)
boardRouter.post("/boards", authMiddleware, boardValidator.createBoard, boardController.createBoard)
boardRouter.put("/boards/:id", authMiddleware, boardValidator.updateBoard, boardController.updateBoard)
boardRouter.delete("/boards/:id", authMiddleware, boardController.deleteBoard)

export default boardRouter