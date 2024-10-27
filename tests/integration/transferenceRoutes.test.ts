import request from "supertest"
import app from "../../src/app"
import prisma from "../../src/config/prisma"
import jwt from "jsonwebtoken"
import { CreateUserType } from "../../src/@types/user.types"
import { CreateBoardType } from "../../src/@types/board.types"

jest.mock("jsonwebtoken")

describe("Transference Routes", () => {
  let boardId: string

  beforeAll(async () => {
    await prisma.board.deleteMany({})
    await prisma.user.deleteMany({})
    await prisma.transference.deleteMany({})

    const userData: CreateUserType = {
      birthdate: "1999-01-01",
      email: "jonh.smith@example.com",
      name: "Jonh Smith",
      password: "123456",
      createdAt: new Date()
    }

    const user = await prisma.user.create({ data: userData })

    const boardData: CreateBoardType = {
      name: "2024-10",
      initialValue: 10,
      userId: user.id,
    }

    const board = await prisma.board.create({ data: boardData })

    boardId = board.id;

    (jwt.verify as jest.Mock).mockReturnValue({ userId: user.id })
  })

  afterAll(async () => {
    await prisma.$disconnect()
    jest.clearAllMocks()
  })

  it("should get all transferences successfully", async () => {
    const response = await request(app)
      .get(`/transferences/${boardId}`)
      .set("Authorization", "Bearer validToken")

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
  })

  it("should create a new transference", async () => {
    const newTransference = {
      value: 400,
      expireDay: 2,
      name: "Aluguel",
      description: "",
      type: "expense",
      boardId,
    }

    const response = await request(app)
      .post("/transferences")
      .set("Authorization", "Bearer validToken")
      .send(newTransference)

    expect(response.status).toBe(201)
    expect(response.body.message).toBe("Transferência criada com sucesso")
  })

  it("should update an existing transference", async () => {
    const transference = await prisma.transference.findFirst()

    const updateTransference = {
      value: 300,
      expireDay: 3,
      name: "Aluguel",
      description: "",
      type: "expense",
      boardId,
    }

    const response = await request(app)
      .put(`/transferences/${transference?.id}`)
      .set("Authorization", "Bearer validToken")
      .send(updateTransference)

    expect(response.status).toBe(200)
    expect(response.body.message).toBe("Transferência atualizada com sucesso")
  })

  it("should delete a transference", async () => {
    const transference = await prisma.transference.findFirst()

    const response = await request(app)
      .delete(`/transferences/${transference?.id}`)
      .set("Authorization", "Bearer validToken")

    expect(response.status).toBe(200)
    expect(response.body.message).toBe("Transferência deletada com sucesso")
  })

  it("should return 403 if token is not provided", async () => {
    const response = await request(app).get("/transferences/2024-10")

    expect(response.status).toBe(403)
    expect(response.body.message).toBe("Token não enviado")
  })
})
