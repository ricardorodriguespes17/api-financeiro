import request from "supertest"
import app from "../../src/app"
import prisma from "../../src/config/prisma"
import jwt from "jsonwebtoken"
import { CreateUserType } from "../../src/@types/user.types"

jest.mock("jsonwebtoken")

describe("Board Routes", () => {
  beforeAll(async () => {
    await prisma.board.deleteMany({})
    await prisma.user.deleteMany({})

    const userData: CreateUserType = {
      birthdate: "1999-01-01",
      email: "jonh.smith@example.com",
      name: "Jonh Smith",
      password: "123456",
      createdAt: new Date()
    }

    const user = await prisma.user.create({ data: userData });

    (jwt.verify as jest.Mock).mockReturnValue({ userId: user.id })
  })

  afterAll(async () => {
    await prisma.$disconnect()
    jest.clearAllMocks()
  })

  it("should get all boards successfully", async () => {
    const response = await request(app)
      .get("/boards")
      .set("Authorization", "Bearer validToken")

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
  })

  it("should create a new board", async () => {
    const newBoard = {
      id: "2024-10",
    }

    const response = await request(app)
      .post("/boards")
      .set("Authorization", "Bearer validToken")
      .send(newBoard)

    expect(response.status).toBe(201)
    expect(response.body.message).toBe("Board created successfully")
  })

  it("should get board by ID", async () => {
    const response = await request(app)
      .get("/boards/2024-10")
      .set("Authorization", "Bearer validToken")

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("id", "2024-10")
  })

  it("should update an existing board", async () => {
    const updatedBoard = {
      initialValue: 200,
    }

    const response = await request(app)
      .put("/boards/2024-10")
      .set("Authorization", "Bearer validToken")
      .send(updatedBoard)

    expect(response.status).toBe(200)
    expect(response.body.message).toBe("Board updated successfully")
  })

  it("should delete a board", async () => {
    const response = await request(app)
      .delete("/boards/2024-10")
      .set("Authorization", "Bearer validToken")

    expect(response.status).toBe(200)
    expect(response.body.message).toBe("Board deleted successfully")
  })

  it("should return 403 if token is not provided", async () => {
    const response = await request(app).get("/boards")

    expect(response.status).toBe(403)
    expect(response.body.message).toBe("Token not provided")
  })
})
