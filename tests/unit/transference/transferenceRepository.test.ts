import { DeepMockProxy, mockDeep } from "jest-mock-extended"
import { CreateTransferenceType, TransferenceType, UpdateTransferenceType } from "../../../src/@types/transference.types"
import TransferenceRepository from "../../../src/repositories/transference.repository"
import prisma from "../../../src/config/prisma"

const transferenceRepository = new TransferenceRepository()

describe("TransferenceRepository", () => {
  let prismaMock: DeepMockProxy<typeof prisma>

  beforeEach(() => {
    prismaMock = mockDeep<typeof prisma>();
    (prisma as any) = prismaMock
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should find all transferences by boardId", async () => {
    const mockTransferences: TransferenceType[] = [
      { id: "1", value: 400, expireDay: 2, boardId: "2024-10", name: "Aluguel", description: "", type: "expense", isPaid: false },
      { id: "2", value: 100, expireDay: 2, boardId: "2024-10", name: "Luz", description: "", type: "expense", isPaid: true },
    ]

    prismaMock.transference.findMany.mockResolvedValue(mockTransferences)

    const result = await transferenceRepository.findAllByBoard("2024-10")

    expect(prisma.transference.findMany).toHaveBeenCalledWith({
      where: { boardId: "2024-10" },
    })
    expect(result).toEqual(mockTransferences)
  })

  it("should find a transference by ID", async () => {
    const mockTransference: TransferenceType = {
      id: "1", value: 400, expireDay: 2, boardId: "2024-10", name: "Aluguel", description: "", type: "expense", isPaid: false
    }

    prismaMock.transference.findUnique.mockResolvedValue(mockTransference)

    const result = await transferenceRepository.findById("1")

    expect(prisma.transference.findUnique).toHaveBeenCalledWith({
      where: { id: "1" },
    })
    expect(result).toEqual(mockTransference)
  })

  it("should create a new transference", async () => {
    const newTransference: CreateTransferenceType = {
      value: 200, expireDay: 2, boardId: "2024-10", name: "Aluguel", description: "", type: "expense", isPaid: false
    }
    const createdTransference: TransferenceType = { ...newTransference, id: "1" }

    prismaMock.transference.create.mockResolvedValue(createdTransference)

    const result = await transferenceRepository.create(newTransference)

    expect(prisma.transference.create).toHaveBeenCalledWith({
      data: newTransference,
    })
    expect(result).toEqual(createdTransference)
  })

  it("should update a transference", async () => {
    const updateData: UpdateTransferenceType = {
      value: 200, expireDay: 2, boardId: "2024-10", name: "Aluguel", description: "", type: "expense", isPaid: true
    }
    const updatedTransference = { id: "1", ...updateData }

    prismaMock.transference.update.mockResolvedValueOnce(updatedTransference)

    const result = await transferenceRepository.update("1", updateData)

    expect(prisma.transference.update).toHaveBeenCalledWith({
      where: { id: "1" },
      data: updateData,
    })
    expect(result).toEqual(updatedTransference)
  })

  it("should delete a transference", async () => {
    const deletedTransference = {
      id: "1",
      value: 200, 
      expireDay: 2, 
      boardId: "2024-10", 
      name: "Aluguel", 
      description: "", 
      type: "expense",
      isPaid: false,
    }

    prismaMock.transference.delete.mockResolvedValueOnce(deletedTransference)

    const result = await transferenceRepository.delete("1")

    expect(prisma.transference.delete).toHaveBeenCalledWith({
      where: { id: "1" },
    })
    expect(result).toEqual(deletedTransference)
  })
})
