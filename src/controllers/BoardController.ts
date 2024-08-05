import { Request, Response } from "express";
import BoardService from "../services/BoardService";

class BoardController {
  private boardService = new BoardService()

  createBoard = async (req: Request, res: Response) => {
    const { title, description } = req.body

    try {
      await this.boardService.create({ title, description })
      return res.status(201).json({ message: "Board created successfully" })
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

  updateBoard = async (req: Request, res: Response) => {
    const { title, description } = req.body
    const { id } = req.params

    try {
      await this.boardService.update({ id, title, description })
      return res.status(201).json({ message: "Board updated successfully" })
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

  deleteBoard = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
      await this.boardService.delete(id)
      return res.status(204).send()
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

  findAllBoards = async (req: Request, res: Response) => {
    try {
      const boards = await this.boardService.findAll()
      return res.status(200).json(boards)
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

  findBoardById = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
      const board = await this.boardService.findById(id)
      return res.status(200).json(board)
    } catch (error) {
      return res.status(500).json({ error })
    }
  }
}

export default BoardController