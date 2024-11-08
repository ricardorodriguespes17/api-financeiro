import { Request, Response } from "express"
import TransferenceService from "../../../src/services/transference.service"
import { CreateTransferenceType, TransferenceType, UpdateTransferenceType } from "../../../src/@types/transference.types"
import TransferenceController from "../../../src/controllers/transference.controller"

jest.mock("../../../src/services/transference.service")

describe("TransferenceController", () => {
  let transferenceServiceMock: jest.Mocked<TransferenceService>
  let transferenceController: TransferenceController
  let req: Partial<Request>
  let res: Partial<Response>

  beforeEach(() => {
    transferenceServiceMock = new TransferenceService() as jest.Mocked<TransferenceService>
    transferenceController = new TransferenceController(transferenceServiceMock)

    req = {
      body: {},
      params: {},
    }
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe("getTransferencesByUser", () => {
    it("should return transferences for user", async () => {
      const transferences: TransferenceType[] = [
        {
          id: "1",
          userId: "1",
          value: 100,
          expireDay: 2,
          name: "Internet",
          description: "",
          type: "expense",
          installments: [],
          month: "2024-10",
          category: "casa",
          recurrenceLimit: null
        }
      ]
      req.body = { userId: "1" }
      transferenceServiceMock.getTransferencesByUser.mockResolvedValue(transferences)

      await transferenceController.getTransferencesByUser(req as Request, res as Response)

      expect(transferenceServiceMock.getTransferencesByUser).toHaveBeenCalledWith("1")
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(transferences)
    })

    it("should handle internal error", async () => {
      req.body = { userId: "1" }
      transferenceServiceMock.getTransferencesByUser.mockRejectedValue(new Error())

      await transferenceController.getTransferencesByUser(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({ message: "Erro ao carregar as tranferências do 1" })
    })
  })

  describe("createTransference", () => {
    it("should create a new transference", async () => {
      const transferenceData: CreateTransferenceType = {
        value: 100,
        expireDay: 2,
        userId: "1",
        name: "Internet",
        description: "",
        type: "expense",
        month: "2024-10",
        category: "casa",
        recurrenceLimit: null
      }
      req.body = transferenceData
      const mockedData: TransferenceType = { id: "1", installments: [], ...transferenceData }

      transferenceServiceMock.createTransference.mockResolvedValue(mockedData)
      await transferenceController.createTransference(req as Request, res as Response)

      expect(transferenceServiceMock.createTransference).toHaveBeenCalledWith(transferenceData)
      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalledWith(mockedData)
    })

    it("should handle internal error on create", async () => {
      req.body = {
        boardId: "1",
        description: "Test",
        expireDay: 15,
        name: "Test Transference",
        type: "income",
        value: 100,
        isPaid: false
      }

      transferenceServiceMock.createTransference.mockRejectedValue(new Error("Falha ao criar a tranferência"))
      await transferenceController.createTransference(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({ message: "Falha ao criar a tranferência" })
    })
  })

  describe("updateTransference", () => {
    it("should update an existing transference", async () => {
      const id = "1"
      const userId = "1"
      const updateData: UpdateTransferenceType = {
        value: 100,
        expireDay: 2,
        userId,
        name: "Internet",
        description: "",
        type: "expense",
        month: "2024-10",
        category: "casa",
        recurrenceLimit: null
      }
      req.params = { id }
      req.body = updateData
      transferenceServiceMock.updateTransference.mockResolvedValue({
        id,
        installments: [],
        ...updateData
      })

      await transferenceController.updateTransference(req as Request, res as Response)

      expect(transferenceServiceMock.updateTransference).toHaveBeenCalledWith(id, userId, updateData)
      expect(res.status).not.toHaveBeenCalledWith(500)
    })

    it("should return 404 if transference is not found", async () => {
      const id = "1"
      req.params = { id }
      req.body = {
        boardId: "1",
        description: "Updated",
        expireDay: 10,
        name: "Updated Transference",
        type: "expense",
        value: 50,
      }
      transferenceServiceMock.updateTransference.mockRejectedValue(new Error("Transferência não encontrada"))

      await transferenceController.updateTransference(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(404)
      expect(res.json).toHaveBeenCalledWith({ message: "Transferência não encontrada" })
    })
  })

  describe("deleteTransference", () => {
    it("should delete a transference by ID", async () => {
      const id = "1"
      const userId = "1"
      req.params = { id }
      req.body = { userId }

      await transferenceController.deleteTransference(req as Request, res as Response)

      expect(transferenceServiceMock.deleteTransference).toHaveBeenCalledWith(id, userId)
      expect(res.status).toHaveBeenCalledWith(204)
    })

    it("should return 404 if transference to delete is not found", async () => {
      const id = "1"
      req.params = { id }
      transferenceServiceMock.deleteTransference.mockRejectedValue(new Error("Transferência não encontrada"))

      await transferenceController.deleteTransference(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(404)
      expect(res.json).toHaveBeenCalledWith({ message: "Transferência não encontrada" })
    })
  })
})
