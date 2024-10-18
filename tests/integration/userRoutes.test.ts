import request from "supertest"
import app from "../../src/app"
import prisma from "../../src/config/prisma"

describe("User Routes", () => {
  beforeAll(async () => {
    await prisma.user.deleteMany({})
    await prisma.board.deleteMany({})
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  it("should create a new user", async () => {
    const response = await request(app)
      .post("/users")
      .send({
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        birthdate: "1999-01-01"
      })

    expect(response.status).toBe(201)
    expect(response.body).toEqual({ message: "User created successfully" })

    const user = await prisma.user.findUnique({
      where: { email: "john@example.com" },
    })
    expect(user).not.toBeNull()
  })

  it("should fetch a user by ID", async () => {
    const user = await prisma.user.findFirst()
    const response = await request(app).get(`/users/${user?.id}`)

    expect(response.status).toBe(200)
    expect(response.body.email).toEqual(user?.email)
    expect(response.body.name).toEqual(user?.name)
  })

  it("should return 404 for a non-existing user", async () => {
    const response = await request(app).get("/users/999")

    expect(response.status).toBe(404)
    expect(response.body.message).toBe("User not found")
  })

  it("should update the user data", async () => {
    const userToUpdate = await prisma.user.findFirst()
    const response = await request(app)
      .put(`/users/${userToUpdate?.id}`)
      .send({
        name: "Maria Smith",
        email: "maria@example.com",
        birthdate: "1998-01-01"
      })

    expect(response.status).toBe(200)
    expect(response.body).toEqual({ message: "User updated successfully" })

    const user = await prisma.user.findUnique({
      where: { email: "maria@example.com" },
    })
    expect(user).not.toBeNull()
  })
})
