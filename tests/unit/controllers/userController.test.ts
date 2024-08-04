import request from 'supertest'
import express, { Application } from 'express'
import UserController from '../../../src/controllers/UserController'
import UserService from '../../../src/services/UserService'

jest.mock('../../../src/services/UserService')

const app: Application = express()
app.use(express.json())

const userController = new UserController()

const mockUserService = UserService as jest.MockedClass<typeof UserService>
mockUserService.prototype.create = jest.fn()
mockUserService.prototype.update = jest.fn()
mockUserService.prototype.delete = jest.fn()
mockUserService.prototype.findAll = jest.fn()
mockUserService.prototype.findById = jest.fn()

app.post('/users', userController.createUser)
app.put('/users/:id', userController.updateUser)
app.delete('/users/:id', userController.deleteUser)
app.get('/users', userController.findAllUsers)
app.get('/users/:id', userController.findUserById)

describe('UserController tests', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('createUser', () => {
    it('should create a new user and return status 201', async () => {
      mockUserService.prototype.create.mockResolvedValue({ id: '1', name: 'John Doe', email: 'john@example.com', password: 'password' })

      const response = await request(app)
        .post('/users')
        .send({ name: 'John Doe', email: 'john@example.com', password: 'password' })

      expect(response.status).toBe(201)
      expect(response.body).toEqual({ message: 'User created successfully' })
      expect(mockUserService.prototype.create).toHaveBeenCalledWith({ name: 'John Doe', email: 'john@example.com', password: 'password' })
    })

    it('should return status 500 on error', async () => {
      mockUserService.prototype.create.mockRejectedValue('Error creating user')

      const response = await request(app)
        .post('/users')
        .send({ name: 'John Doe', email: 'john@example.com', password: 'password' })

      expect(response.status).toBe(500)
      expect(response.body).toEqual({ error: 'Error creating user' })
    })
  })

  describe('updateUser', () => {
    it('should update an existing user and return status 201', async () => {
      mockUserService.prototype.update.mockResolvedValue({ id: '1', name: 'John Doe', email: 'john@example.com', password: 'password' })

      const response = await request(app)
        .put('/users/1')
        .send({ name: 'John Doe', email: 'john@example.com', password: 'newpassword' })

      expect(response.status).toBe(201)
      expect(response.body).toEqual({ message: 'User updated successfully' })
      expect(mockUserService.prototype.update).toHaveBeenCalledWith({ id: '1', name: 'John Doe', email: 'john@example.com', password: 'newpassword' })
    })

    it('should return status 500 on error', async () => {
      mockUserService.prototype.update.mockRejectedValue('Error updating user')

      const response = await request(app)
        .put('/users/1')
        .send({ name: 'John Doe', email: 'john@example.com', password: 'newpassword' })

      expect(response.status).toBe(500)
      expect(response.body).toEqual({ error: 'Error updating user' })
    })
  })

  describe('deleteUser', () => {
    it('should delete a user and return status 204', async () => {
      mockUserService.prototype.delete.mockResolvedValue(undefined)

      const response = await request(app)
        .delete('/users/1')

      expect(response.status).toBe(204)
      expect(mockUserService.prototype.delete).toHaveBeenCalledWith('1')
    })

    it('should return status 500 on error', async () => {
      mockUserService.prototype.delete.mockRejectedValue('Error deleting user')

      const response = await request(app)
        .delete('/users/1')

      expect(response.status).toBe(500)
      expect(response.body).toEqual({ error: 'Error deleting user' })
    })
  })

  describe('findAllUsers', () => {
    it('should return all users and status 200', async () => {
      const users = [{ id: '1', name: 'John Doe', email: 'john@example.com', password: 'password' }]
      mockUserService.prototype.findAll.mockResolvedValue(users)

      const response = await request(app)
        .get('/users')

      expect(response.status).toBe(200)
      expect(response.body).toEqual(users)
      expect(mockUserService.prototype.findAll).toHaveBeenCalled()
    })

    it('should return status 500 on error', async () => {
      mockUserService.prototype.findAll.mockRejectedValue('Error fetching users')

      const response = await request(app)
        .get('/users')

      expect(response.status).toBe(500)
      expect(response.body).toEqual({ error: 'Error fetching users' })
    })
  })

  describe('findUserById', () => {
    it('should return a user and status 200', async () => {
      const user = { id: '1', name: 'John Doe', email: 'john@example.com', password: 'password' }
      mockUserService.prototype.findById.mockResolvedValue(user)

      const response = await request(app)
        .get('/users/1')

      expect(response.status).toBe(200)
      expect(response.body).toEqual(user)
      expect(mockUserService.prototype.findById).toHaveBeenCalledWith('1')
    })

    it('should return status 500 on error', async () => {
      mockUserService.prototype.findById.mockRejectedValue('Error fetching user')

      const response = await request(app)
        .get('/users/1')

      expect(response.status).toBe(500)
      expect(response.body).toEqual({ error: 'Error fetching user' })
    })
  })
})