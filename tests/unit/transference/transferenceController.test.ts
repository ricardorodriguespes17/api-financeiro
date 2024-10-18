import { Request, Response } from "express"
import { createTransferenceController } from "../../../src/controllers/transference.controller"
import TransferenceService from "../../../src/services/transference.service"
import { CreateTransferenceType, TransferenceType, UpdateTransferenceType } from "../../../src/@types/transference.types"

jest.mock("../../../src/services/transference.service")

describe("TransferenceController", () => {
  let transferenceServiceMock: jest.Mocked<TransferenceService>
  let transferenceController: ReturnType<typeof createTransferenceController>
  let req: Partial<Request>
  let res: Partial<Response>

  beforeEach(() => {
    transferenceServiceMock = new TransferenceService() as jest.Mocked<TransferenceService>
    transferenceController = createTransferenceController(transferenceServiceMock)

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

  describe("getTransferencesByBoard", () => {
    it("should return transferences for a board", async () => {
      const transferences: TransferenceType[] = [
        { id: "1", value: 400, expireDay: 2, boardId: "2024-10", name: "Aluguel", description: "", type: "expense" }
      ]
      req.params = { boardId: "2024-10" }
      transferenceServiceMock.getTransferencesByBoard.mockResolvedValue(transferences)

      await transferenceController.getTransferencesByBoard(req as Request, res as Response)

      expect(transferenceServiceMock.getTransferencesByBoard).toHaveBeenCalledWith("2024-10")
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(transferences)
    })

    it("should handle internal error", async () => {
      req.params = { boardId: "2024-10" }
      transferenceServiceMock.getTransferencesByBoard.mockRejectedValue(new Error("Internal Error"))

      await transferenceController.getTransferencesByBoard(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({ message: "Internal Error" })
    })
  })

  describe("createTransference", () => {
    it("should create a new transference", async () => {
      const transferenceData: CreateTransferenceType = {
        boardId: "2024-10",
        description: "Test",
        expireDay: 15,
        name: "Test Transference",
        type: "income",
        value: 100,
      }
      req.body = transferenceData

      await transferenceController.createTransference(req as Request, res as Response)

      expect(transferenceServiceMock.createTransference).toHaveBeenCalledWith(transferenceData)
      expect(res.status).not.toHaveBeenCalledWith(500) // No error response
    })

    it("should handle internal error on create", async () => {
      req.body = {
        boardId: "2024-10",
        description: "Test",
        expireDay: 15,
        name: "Test Transference",
        type: "income",
        value: 100,
      }
      transferenceServiceMock.createTransference.mockRejectedValue(new Error("Internal Error"))

      await transferenceController.createTransference(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({ message: "Internal Error" })
    })
  })

  describe("updateTransference", () => {
    it("should update an existing transference", async () => {
      const id = "1"
      const updateData: UpdateTransferenceType = {
        boardId: "2024-10",
        description: "Updated",
        expireDay: 10,
        name: "Updated Transference",
        type: "expense",
        value: 50,
      }
      req.params = { id }
      req.body = updateData
      transferenceServiceMock.updateTransference.mockResolvedValue({
        id: "1",
        boardId: "2024-10",
        description: "Updated",
        expireDay: 10,
        name: "Updated Transference",
        type: "expense",
        value: 50,
      })

      await transferenceController.updateTransference(req as Request, res as Response)

      expect(transferenceServiceMock.updateTransference).toHaveBeenCalledWith(id, updateData)
      expect(res.status).not.toHaveBeenCalledWith(500)
    })

    it("should return 404 if transference is not found", async () => {
      const id = "1"
      req.params = { id }
      req.body = {
        boardId: "2024-10",
        description: "Updated",
        expireDay: 10,
        name: "Updated Transference",
        type: "expense",
        value: 50,
      }
      transferenceServiceMock.updateTransference.mockRejectedValue(new Error("Transference not found"))

      await transferenceController.updateTransference(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(404)
      expect(res.json).toHaveBeenCalledWith({ message: "Transference not found" })
    })
  })

  describe("deleteTransference", () => {
    it("should delete a transference by ID", async () => {
      const id = "1"
      req.params = { id }

      await transferenceController.deleteTransference(req as Request, res as Response)

      expect(transferenceServiceMock.deleteTransference).toHaveBeenCalledWith(id)
      expect(res.status).not.toHaveBeenCalledWith(500)
    })

    it("should return 404 if transference to delete is not found", async () => {
      const id = "1"
      req.params = { id }
      transferenceServiceMock.deleteTransference.mockRejectedValue(new Error("Transference not found"))

      await transferenceController.deleteTransference(req as Request, res as Response)

      expect(res.status).toHaveBeenCalledWith(404)
      expect(res.json).toHaveBeenCalledWith({ message: "Transference not found" })
    })
  })
})
