import { mockDeep, DeepMockProxy } from 'jest-mock-extended'
import TransferenceRepository from '../../../src/repositories/transference.repository'
import TransferenceService from '../../../src/services/transference.service'
import { CreateTransferenceType, TransferenceType, UpdateTransferenceType } from '../../../src/@types/transference.types'

describe('TransferenceService', () => {
  let transferenceService: TransferenceService
  let transferenceRepositoryMock: DeepMockProxy<TransferenceRepository>

  beforeEach(() => {
    transferenceRepositoryMock = mockDeep<TransferenceRepository>()
    transferenceService = new TransferenceService()
    transferenceService['transferenceRepository'] = transferenceRepositoryMock
  })

  it('should get all transferences by boardId', async () => {
    const boardId = 'board-123'
    const mockTransferences: TransferenceType[] = [
      { id: "1", value: 400, expireDay: 2, boardId: "2024-10", name: "Aluguel", description: "", type: "expense" },
    ]

    transferenceRepositoryMock.findAllByBoard.mockResolvedValue(mockTransferences)

    const result = await transferenceService.getTransferencesByBoard(boardId)

    expect(result).toEqual(mockTransferences)
    expect(transferenceRepositoryMock.findAllByBoard).toHaveBeenCalledWith(boardId)
  })

  it('should create a new transference', async () => {
    const newTransference: CreateTransferenceType = {
      value: 200, 
      expireDay: 2, 
      boardId: "2024-10", 
      name: "Aluguel", 
      description: "", 
      type: "expense"
    }
    const createdTransference: TransferenceType = { ...newTransference, id: "1" }

    transferenceRepositoryMock.create.mockResolvedValue(createdTransference)

    const result = await transferenceService.createTransference(newTransference)

    expect(result).toEqual(createdTransference)
    expect(transferenceRepositoryMock.create).toHaveBeenCalledWith(newTransference)
  })

  it('should update a transference by ID', async () => {
    const transferenceId = '1'
    const updateData: UpdateTransferenceType = {
      value: 200, 
      expireDay: 2, 
      boardId: "2024-10", 
      name: "Aluguel", 
      description: "", 
      type: "expense"
    }
    const mockTransference = { id: transferenceId, ...updateData }

    transferenceRepositoryMock.findById.mockResolvedValue(mockTransference)
    transferenceRepositoryMock.update.mockResolvedValue({ ...mockTransference, ...updateData })

    const result = await transferenceService.updateTransference(transferenceId, updateData)

    expect(result.value).toBe(200)
    expect(transferenceRepositoryMock.update).toHaveBeenCalledWith(transferenceId, updateData)
  })

  it('should throw an error if transference is not found when updating', async () => {
    const transferenceId = 'non-existent-id'
    const updateData: UpdateTransferenceType = {
      value: 200, 
      expireDay: 2, 
      boardId: "2024-10", 
      name: "Aluguel", 
      description: "", 
      type: "expense"
    }

    transferenceRepositoryMock.findById.mockResolvedValue(null)

    await expect(transferenceService.updateTransference(transferenceId, updateData)).rejects.toThrow('Transferência não encontrada')
  })

  it('should delete a transference by ID', async () => {
    const transferenceId = '1'
    const mockTransference = {
      id: "1",
      value: 200, 
      expireDay: 2, 
      boardId: "2024-10", 
      name: "Aluguel", 
      description: "", 
      type: "expense"
    }

    transferenceRepositoryMock.findById.mockResolvedValue(mockTransference)
    transferenceRepositoryMock.delete.mockResolvedValue(mockTransference)

    const result = await transferenceService.deleteTransference(transferenceId)

    expect(result).toEqual(mockTransference)
    expect(transferenceRepositoryMock.delete).toHaveBeenCalledWith(transferenceId)
  })

  it('should throw an error if transference is not found when deleting', async () => {
    const transferenceId = 'non-existent-id'

    transferenceRepositoryMock.findById.mockResolvedValue(null)

    await expect(transferenceService.deleteTransference(transferenceId)).rejects.toThrow('Transferência não encontrada')
  })
})
