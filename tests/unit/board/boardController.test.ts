import { Request, Response } from 'express'
import BoardController from '../../../src/controllers/board.controller'
import BoardService from '../../../src/services/board.service'
import { BoardType } from '../../../src/@types/board.types'

jest.mock('../../../src/services/board.service')

describe('BoardController', () => {
  let boardController: BoardController
  let boardServiceMock: jest.Mocked<BoardService>
  let req: Partial<Request>
  let res: Partial<Response>

  beforeEach(() => {
    boardServiceMock = new BoardService() as jest.Mocked<BoardService>
    boardController = new BoardController(boardServiceMock)

    req = {
      body: {},
      params: {}
    }
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getAllBoards', () => {
    it('should return all boards for a user', async () => {
      const boards: BoardType[] = [
        { id: "1", name: '2024-10', initialValue: 0, userId: 'user-123' },
        { id: "2", name: '2024-10', initialValue: 10, userId: 'user-123' },
      ]
      req.body.userId = 'user-123'
      boardServiceMock.getAllBoards.mockResolvedValue(boards)

      await boardController.getAllBoards(req as Request, res as Response)

      expect(boardServiceMock.getAllBoards).toHaveBeenCalledWith('user-123')
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(boards)
    })

    it('should handle internal error', async () => {
      req.body.userId = 'user-123'
      boardServiceMock.getAllBoards.mockRejectedValue(new Error("Erro interno"))

      await boardController.getAllBoards(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({ message: "Erro interno" })
    })
  })

  describe('getBoardById', () => {
    it('should return a board by id', async () => {
      const board: BoardType = { id: "1", name: '2024-10', initialValue: 0, userId: 'user-123' }
      req.params = { id: '2024-10' }
      boardServiceMock.getBoardById.mockResolvedValue(board)

      await boardController.getBoardById(req as Request, res as Response)

      expect(boardServiceMock.getBoardById).toHaveBeenCalledWith('2024-10')
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(board)
    })

    it('should return 404 if board is not found', async () => {
      req.params = { id: '2024-10' }
      boardServiceMock.getBoardById.mockRejectedValue(new Error("Quadro não encontrado"))

      await boardController.getBoardById(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(404)
      expect(res.json).toHaveBeenCalledWith({ message: "Quadro não encontrado" })
    })
  })

  describe('createBoard', () => {
    it('should create a new board', async () => {
      req.body = { id: '2024-10', userId: 'user-123' }
      boardServiceMock.createBoard.mockResolvedValue({
        id: "1",
        name: '2024-10',
        initialValue: 0,
        userId: 'user-123'
      })

      await boardController.createBoard(req as Request, res as Response)

      expect(boardServiceMock.createBoard).toHaveBeenCalledWith({
        id: '2024-10',
        userId: 'user-123',
        initialValue: 0
      })
      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalledWith({ message: "Quadro criado com sucesso" })
    })

    it('should handle internal error on create', async () => {
      req.body = { id: '2024-10', userId: 'user-123' }
      boardServiceMock.createBoard.mockRejectedValue(new Error("Erro interno"))

      await boardController.createBoard(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({ message: "Erro interno" })
    })
  })

  describe('updateBoard', () => {
    it('should update an existing board', async () => {
      req.params = { id: '2024-10' }
      req.body = { initialValue: 500, userId: 'user-123' }
      boardServiceMock.updateBoard.mockResolvedValue({ 
        id: "1", 
        name: '2024-10', 
        initialValue: 0, 
        userId: 'user-123' 
      })

      await boardController.updateBoard(req as Request, res as Response)

      expect(boardServiceMock.updateBoard).toHaveBeenCalledWith('2024-10', {
        initialValue: 500,
        userId: 'user-123'
      })
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({ message: "Quadro atualizado com sucesso" })
    })

    it('should return 404 if board to update is not found', async () => {
      req.params = { id: '2024-10' }
      req.body = { initialValue: 500, userId: 'user-123' }
      boardServiceMock.updateBoard.mockRejectedValue(new Error("Quadro não encontrado"))

      await boardController.updateBoard(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(404)
      expect(res.json).toHaveBeenCalledWith({ message: "Quadro não encontrado" })
    })
  })

  describe('deleteBoard', () => {
    it('should delete a board by id', async () => {
      req.params = { id: '2024-10' }
      boardServiceMock.deleteBoard.mockResolvedValue({ 
        id: "1", 
        name: '2024-10', 
        initialValue: 0, 
        userId: 'user-123' 
      })

      await boardController.deleteBoard(req as Request, res as Response)

      expect(boardServiceMock.deleteBoard).toHaveBeenCalledWith('2024-10')
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({ message: "Quadro deletado com sucesso" })
    })

    it('should return 404 if board to delete is not found', async () => {
      req.params = { id: '2024-10' }
      boardServiceMock.deleteBoard.mockRejectedValue(new Error("Quadro não encontrado"))

      await boardController.deleteBoard(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(404)
      expect(res.json).toHaveBeenCalledWith({ message: "Quadro não encontrado" })
    })
  })
})