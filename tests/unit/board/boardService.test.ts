import { mockDeep, DeepMockProxy } from 'jest-mock-extended'
import BoardRepository from '../../../src/repositories/board.repository'
import BoardService from '../../../src/services/board.service'
import { CreateBoardType, UpdateBoardType } from '../../../src/@types/board.types'

describe('BoardService', () => {
  let boardService: BoardService
  let boardRepositoryMock: DeepMockProxy<BoardRepository>

  beforeEach(() => {
    boardRepositoryMock = mockDeep<BoardRepository>()
    boardService = new BoardService()
    boardService['boardRepository'] = boardRepositoryMock
  })

  it('should get all boards for a user', async () => {
    const userId = 'user-123'
    const mockBoards = [{
      id: "1",
      name: '2024-10',
      initialValue: 0,
      userId
    }]

    boardRepositoryMock.findAll.mockResolvedValue(mockBoards)

    const result = await boardService.getAllBoards(userId)

    expect(result).toEqual(mockBoards)
    expect(boardRepositoryMock.findAll).toHaveBeenCalledWith(userId)
  })

  it('should get a board by ID', async () => {
    const boardId = '2024-10'
    const mockBoard = {
      id: "1",
      name: '2024-10',
      initialValue: 0,
      userId: 'user-123'
    }

    boardRepositoryMock.findById.mockResolvedValue(mockBoard)

    const result = await boardService.getBoardById(boardId)

    expect(result).toEqual(mockBoard)
    expect(boardRepositoryMock.findById).toHaveBeenCalledWith(boardId)
  })

  it('should throw an error if board is not found by ID', async () => {
    const boardId = '2024-10'

    boardRepositoryMock.findById.mockResolvedValue(null)

    await expect(boardService.getBoardById(boardId)).rejects.toThrow('Quadro não encontrado')
  })

  it('should create a new board', async () => {
    const boardData: CreateBoardType = {
      name: '2024-10',
      initialValue: 0,
      userId: 'user-123'
    }
    const mockedData = { id: "1", ...boardData }
    boardRepositoryMock.create.mockResolvedValue(mockedData)

    const result = await boardService.createBoard(boardData)

    expect(result).toEqual(mockedData)
    expect(boardRepositoryMock.create).toHaveBeenCalledWith(boardData)
  })

  it('should update a board by ID', async () => {
    const boardId = '2024-10'
    const updateData: UpdateBoardType = { initialValue: 10, userId: 'user-123' }
    const mockUpdatedBoard = {
      id: "1",
      name: '2024-10',
      initialValue: 0,
      userId: 'user-123'
    }

    boardRepositoryMock.findById.mockResolvedValue(mockUpdatedBoard)
    boardRepositoryMock.update.mockResolvedValue(mockUpdatedBoard)

    const result = await boardService.updateBoard(boardId, updateData)

    expect(result).toEqual(mockUpdatedBoard)
    expect(boardRepositoryMock.update).toHaveBeenCalledWith(boardId, updateData)
  })

  it('should throw an error when updating a non-existent board', async () => {
    const boardId = '2024-10'
    const updateData: UpdateBoardType = { initialValue: 40, userId: 'user-123' }

    boardRepositoryMock.findById.mockResolvedValue(null)

    await expect(boardService.updateBoard(boardId, updateData)).rejects.toThrow('Quadro não encontrado')
  })

  it('should delete a board by ID', async () => {
    const boardId = '2024-10'
    const mockBoard = {
      id: "1",
      name: '2024-10',
      initialValue: 0,
      userId: 'user-123'
    }

    boardRepositoryMock.findById.mockResolvedValue(mockBoard)
    boardRepositoryMock.delete.mockResolvedValue(mockBoard)

    const result = await boardService.deleteBoard(boardId)

    expect(result).toEqual(mockBoard)
    expect(boardRepositoryMock.delete).toHaveBeenCalledWith(boardId)
  })

  it('should throw an error when deleting a non-existent board', async () => {
    const boardId = '2024-11'

    boardRepositoryMock.findById.mockResolvedValue(null)

    await expect(boardService.deleteBoard(boardId)).rejects.toThrow('Quadro não encontrado')
  })
})
