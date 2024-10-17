import request from "supertest"
import app from "../../src/app"
import prisma from "../../src/config/prisma"
import jwt from "jsonwebtoken"

jest.mock("jsonwebtoken")

describe("Board Routes", () => {
  beforeAll(async () => {
    await prisma.user.deleteMany({});
    (jwt.verify as jest.Mock).mockReturnValue({ userId: "ad186021-c201-466b-a8a6-8a5ff3d16820" })
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

  // it("should get board by ID", async () => {
  //   const response = await request(app)
  //     .get("/boards/1")
  //     .set("Authorization", "Bearer validToken")

  //   expect(response.status).toBe(200)
  //   expect(response.body).toHaveProperty("id", "1")
  // })

  // it("should create a new board", async () => {
  //   const newBoard = {
  //     id: "1",
  //     userId: "user123",
  //     initialValue: 100,
  //   }

  //   const response = await request(app)
  //     .post("/boards")
  //     .set("Authorization", "Bearer validToken")
  //     .send(newBoard)

  //   expect(response.status).toBe(201)
  //   expect(response.body.message).toBe("Board created successfully")
  // })

  // it("should update an existing board", async () => {
  //   const updatedBoard = {
  //     initialValue: 200,
  //     userId: "user123",
  //   }

  //   const response = await request(app)
  //     .put("/boards/1")
  //     .set("Authorization", "Bearer validToken")
  //     .send(updatedBoard)

  //   expect(response.status).toBe(200)
  //   expect(response.body.message).toBe("Board updated successfully")
  // })

  // it("should delete a board", async () => {
  //   const response = await request(app)
  //     .delete("/boards/1")
  //     .set("Authorization", "Bearer validToken")

  //   expect(response.status).toBe(200)
  //   expect(response.body.message).toBe("Board deleted successfully")
  // })

  // it("should return 403 if token is not provided", async () => {
  //   const response = await request(app).get("/boards")

  //   expect(response.status).toBe(403)
  //   expect(response.body.message).toBe("Token not provided")
  // })
})
