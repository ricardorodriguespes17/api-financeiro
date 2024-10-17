import { mockDeep, DeepMockProxy } from 'jest-mock-extended'
import prisma from '../../../src/config/prisma'
import BoardRepository from '../../../src/repositories/board.repository'
import { BoardType, CreateBoardType, UpdateBoardType } from '../../../src/@types/board.types'

const boardRepository = new BoardRepository()

describe('BoardRepository', () => {
  let prismaMock: DeepMockProxy<typeof prisma>

  beforeEach(() => {
    prismaMock = mockDeep<typeof prisma>();
    (prisma as any) = prismaMock
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should find all boards for a given user ID', async () => {
    const userId = 'user-123'
    const mockBoards: BoardType[] = [{ id: '2024-10', initialValue: 5, userId }, { id: '2024-11', initialValue: 0, userId }]
    
    prismaMock.board.findMany.mockResolvedValue(mockBoards)

    const result = await boardRepository.findAll(userId)
    
    expect(result).toEqual(mockBoards)
    expect(prismaMock.board.findMany).toHaveBeenCalledWith({ where: { userId } })
  })

  it('should find a board by ID', async () => {
    const boardId = '2024-10'
    const mockBoard = { id: boardId, initialValue: 15, userId: 'user-123' }

    prismaMock.board.findUnique.mockResolvedValue(mockBoard)

    const result = await boardRepository.findById(boardId)

    expect(result).toEqual(mockBoard)
    expect(prismaMock.board.findUnique).toHaveBeenCalledWith({ where: { id: boardId } })
  })

  it('should create a new board', async () => {
    const mockBoard: CreateBoardType = { id: "2024-10", initialValue: 20, userId: 'user-123' }

    prismaMock.board.create.mockResolvedValue(mockBoard)

    const result = await boardRepository.create(mockBoard)

    expect(result).toEqual(mockBoard)
    expect(prismaMock.board.create).toHaveBeenCalledWith({ data: mockBoard })
  })

  it('should update a board by ID', async () => {
    const boardId = '2024-10'
    const updateData: UpdateBoardType = { initialValue: 10, userId: 'user-123' }
    const mockUpdatedBoard = { id: boardId, ...updateData }

    prismaMock.board.update.mockResolvedValue(mockUpdatedBoard)

    const result = await boardRepository.update(boardId, updateData)

    expect(result).toEqual(mockUpdatedBoard)
    expect(prismaMock.board.update).toHaveBeenCalledWith({ where: { id: boardId }, data: updateData })
  })

  it('should delete a board by ID', async () => {
    const boardId = 'board-123'

    prismaMock.board.delete.mockResolvedValue({ id: boardId, initialValue: 0, userId: 'user-123' })

    const result = await boardRepository.delete(boardId)

    expect(result.id).toBe(boardId)
    expect(prismaMock.board.delete).toHaveBeenCalledWith({ where: { id: boardId } })
  })
})
