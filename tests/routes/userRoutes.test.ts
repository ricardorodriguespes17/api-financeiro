import request from "supertest"
import app from "../../src/app"
import UserController from "../../src/controller/UserController"

jest.mock("../../src/controller/UserController")

describe('User Routes tests', () => {
  const mockedUserController = UserController as jest.MockedClass<typeof UserController>

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should get all users', async () => {
    const mockUsers = [{ id: '1', name: 'John Doe', email: 'john.doe@example.com', password: 'password123' }]
    mockedUserController.prototype.findAllUsers.mockResolvedValue(mockUsers)
    const response = await request(app).get('/users')
    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
  })

  it('should get a user by ID', async () => {
    const mockUser = { id: '1', name: 'John Doe', email: 'john@example.com', password: 'password123' }
    mockedUserController.prototype.findUserById.mockResolvedValue(mockUser)

    const response = await request(app).get('/users/1')

    expect(response.status).toBe(200)
    expect(response.body).toEqual(mockUser)
    expect(mockedUserController.prototype.findUserById).toHaveBeenCalledWith('1')
  })

  it('should create a new user', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123'
      })
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('message', 'User created successfully')
  })

  it('should return 400 if required fields are missing', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'john.doe@example.com'
      })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
  })

  it('should update a user', async () => {
    const updatedUser = { id: '1', name: 'John Smith', email: 'johnsmith@example.com', password: 'newpassword123' }
    mockedUserController.prototype.updateUser.mockResolvedValue(updatedUser)

    const response = await request(app).put('/users').send(updatedUser)

    expect(response.status).toBe(201)
    expect(response.body).toEqual({ message: 'User updated successfully' })
  })

  it('should return 400 if ID is missing in update', async () => {
    const response = await request(app)
      .put('/users')
      .send({
        name: 'John Doe Updated',
        email: 'john.doe.updated@example.com',
        password: 'newpassword123'
      })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
  })

  it('should delete a user', async () => {
    mockedUserController.prototype.deleteUser.mockResolvedValue(undefined)
    const response = await request(app).delete('/users').send({ id: '1' })

    expect(response.status).toBe(204)
  })

  it('should return 400 if ID is missing in delete', async () => {
    const response = await request(app)
      .delete('/users')
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
  })
})