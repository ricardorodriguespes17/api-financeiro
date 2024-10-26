import { Request, Response } from "express"
import BoardService from "../services/board.service"
import { CreateBoardType, UpdateBoardType } from "../@types/board.types"

class BoardController {
  private boardService: BoardService

  constructor(boardService?: BoardService) {
    this.boardService = boardService || new BoardService()

    this.getAllBoards = this.getAllBoards.bind(this)
    this.getBoardById = this.getBoardById.bind(this)
    this.getBoardByName = this.getBoardByName.bind(this)
    this.createBoard = this.createBoard.bind(this)
    this.updateBoard = this.updateBoard.bind(this)
    this.deleteBoard = this.deleteBoard.bind(this)
  }

  async getAllBoards(req: Request, res: Response) {
    const { userId } = req.body

    try {
      const boards = await this.boardService.getAllBoards(userId)
      res.status(200).json(boards)
    } catch (error) {
      res.status(500).json({ message: "Erro interno" })
    }
  }

  async getBoardById(req: Request, res: Response) {
    const { id } = req.params

    try {
      const board = await this.boardService.getBoardById(id)
      res.status(200).json(board)
    } catch (error) {
      res.status(404).json({ message: "Quadro não encontrado" })
    }
  }

  async getBoardByName(req: Request, res: Response) {
    const { name } = req.params
    const { userId } = req.body

    try {
      const board = await this.boardService.getBoardByName(name, userId)
      res.status(200).json(board)
    } catch (error) {
      res.status(404).json({ message: "Quadro não encontrado" })
    }
  }

  async createBoard(req: Request, res: Response) {
    const { name, userId } = req.body

    const data: CreateBoardType = {
      name,
      userId,
      initialValue: 0
    }

    try {
      const createdBoard = await this.boardService.createBoard(data)
      res.status(201).json(createdBoard)
    } catch (error) {
      res.status(500).json({ message: "Falha ao criar o quadro" })
    }
  }

  async updateBoard(req: Request, res: Response) {
    const id = req.params.id
    const { initialValue, userId } = req.body

    const data: UpdateBoardType = {
      userId,
      initialValue
    }

    try {
      const updatedBoard = await this.boardService.updateBoard(id, data)
      res.status(200).json(updatedBoard)
    } catch (error) {
      const message = (error as Error).message

      if (message === "Quadro não encontrado") {
        res.status(404).json({ message })
      } else {
        res.status(500).json({ message: "Falha ao atualizar os dados do quadro" })
      }

    }
  }

  async deleteBoard(req: Request, res: Response) {
    const id = req.params.id

    try {
      await this.boardService.deleteBoard(id)
      res.status(204).send()
    } catch (error) {
      const message = (error as Error).message

      if (message === "Quadro não encontrado") {
        res.status(404).json({ message })
      } else {
        res.status(500).json({ message: "Erro interno" })
      }
    }
  }
}

export default BoardController