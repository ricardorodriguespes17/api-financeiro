import { mockDeep, DeepMockProxy } from 'jest-mock-extended'
import TransferenceRepository from '../../../src/repositories/transference.repository'
import TransferenceService from '../../../src/services/transference.service'
import { CreateTransferenceType, TransferenceType, UpdateTransferenceType } from '../../../src/@types/transference.types'

describe('TransferenceService', () => {
  let transferenceService: TransferenceService
  let transferenceRepositoryMock: DeepMockProxy<TransferenceRepository>
  const userId = "1"

  beforeEach(() => {
    transferenceRepositoryMock = mockDeep<TransferenceRepository>()
    transferenceService = new TransferenceService()
    transferenceService['transferenceRepository'] = transferenceRepositoryMock
  })

  it('should get all transferences by userId', async () => {
    const mockTransferences: TransferenceType[] = [
      {
        id: "1",
        value: 400,
        expireDay: 2,
        userId: "1",
        name: "Aluguel",
        description: "",
        type: "expense",
        isPaid: false,
        month: "2024-10",
        category: "casa",
        recurrence: "month",
        recurrenceTime: 1,
        recurrenceLimit: null
      },
    ]

    transferenceRepositoryMock.findAllByUser.mockResolvedValue(mockTransferences)

    const result = await transferenceService.getTransferencesByUser(userId)

    expect(result).toEqual(mockTransferences)
    expect(transferenceRepositoryMock.findAllByUser).toHaveBeenCalledWith(userId)
  })

  it('should create a new transference', async () => {
    const newTransference: CreateTransferenceType = {
      value: 400,
      expireDay: 2,
      userId: "1",
      name: "Aluguel",
      description: "",
      type: "expense",
      isPaid: false,
      month: "2024-10",
      category: "casa",
      recurrence: "month",
      recurrenceTime: 1,
      recurrenceLimit: null
    }
    const createdTransference: TransferenceType = { ...newTransference, id: "1" }

    transferenceRepositoryMock.create.mockResolvedValue(createdTransference)

    const result = await transferenceService.createTransference(newTransference)

    expect(result).toEqual(createdTransference)
    expect(transferenceRepositoryMock.create).toHaveBeenCalledWith(newTransference)
  })

  it('should update a transference by ID', async () => {
    const transferenceId = "1"
    const updateData: UpdateTransferenceType = {
      value: 400,
      expireDay: 2,
      userId: "1",
      name: "Aluguel",
      description: "",
      type: "expense",
      isPaid: false,
      month: "2024-10",
      category: "casa",
      recurrence: "month",
      recurrenceTime: 1,
      recurrenceLimit: null
    }
    const mockTransference: TransferenceType = { id: transferenceId, ...updateData }

    transferenceRepositoryMock.findById.mockResolvedValue(mockTransference)
    transferenceRepositoryMock.update.mockResolvedValue(mockTransference)

    const result =
      await transferenceService.updateTransference(transferenceId, userId, updateData)

    expect(result.value).toBe(400)
    expect(transferenceRepositoryMock.update).toHaveBeenCalledWith(transferenceId, userId, updateData)
  })

  it('should throw an error if transference is not found when updating', async () => {
    const transferenceId = 'non-existent-id'
    const updateData: UpdateTransferenceType = {
      value: 400,
      expireDay: 2,
      userId: "1",
      name: "Aluguel",
      description: "",
      type: "expense",
      isPaid: false,
      month: "2024-10",
      category: "casa",
      recurrence: "month",
      recurrenceTime: 1,
      recurrenceLimit: null
    }

    transferenceRepositoryMock.findById.mockResolvedValue(null)

    await expect(transferenceService.updateTransference(transferenceId, userId, updateData))
      .rejects.toThrow('Transferência não encontrada')
  })

  it('should delete a transference by ID', async () => {
    const transferenceId = "1"
    const mockTransference: TransferenceType = {
      id: transferenceId,
      value: 400,
      expireDay: 2,
      userId: "1",
      name: "Aluguel",
      description: "",
      type: "expense",
      isPaid: false,
      month: "2024-10",
      category: "casa",
      recurrence: "month",
      recurrenceTime: 1,
      recurrenceLimit: null
    }

    transferenceRepositoryMock.findById.mockResolvedValue(mockTransference)
    transferenceRepositoryMock.delete.mockResolvedValue(mockTransference)

    const result = await transferenceService.deleteTransference(transferenceId, userId)

    expect(transferenceRepositoryMock.delete).toHaveBeenCalledWith(transferenceId, userId)
  })

  it('should throw an error if transference is not found when deleting', async () => {
    const transferenceId = 'non-existent-id'

    transferenceRepositoryMock.findById.mockResolvedValue(null)

    await expect(transferenceService.deleteTransference(transferenceId, userId)).rejects.toThrow('Transferência não encontrada')
  })
})
