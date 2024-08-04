import request from 'supertest'
import express, { Application } from 'express'
import UserController from '../../src/controllers/UserController'
import UserProps from '../../src/@types/UserType'

const app: Application = express()
app.use(express.json())

const userController = new UserController()
app.post('/users', userController.createUser)
app.put('/users/:id', userController.updateUser)
app.delete('/users/:id', userController.deleteUser)
app.get('/users', userController.findAllUsers)
app.get('/users/:id', userController.findUserById)

describe('User API Integration Tests', () => {
  let users: UserProps.Model[] = []

  describe('POST /users', () => {
    it('should create a new user and return status 201', async () => {
      const response = await request(app)
        .post('/users')
        .send({ name: 'Ricardo Rodrigues', email: 'ricardo@example.com', password: 'password' })

      expect(response.status).toBe(201)
      expect(response.body).toEqual({ message: 'User created successfully' })
    })
  })

  describe('GET /users', () => {
    it('should return all users and status 200', async () => {
      const response = await request(app).get('/users')

      users = response.body

      expect(response.status).toBe(200)
      expect(response.body).toHaveLength(1)
      expect(response.body[0]).toMatchObject({
        name: 'Ricardo Rodrigues',
        email: 'ricardo@example.com'
      })
    })
  })

  describe('GET /users/:id', () => {
    it('should return a user by ID and status 200', async () => {
      const userId = users[0].id
      const response = await request(app).get(`/users/${userId}`)

      expect(response.status).toBe(200)
      expect(response.body).toMatchObject({
        name: 'Ricardo Rodrigues',
        email: 'ricardo@example.com'
      })
    })
  })

  describe('PUT /users/:id', () => {
    it('should update an existing user and return status 201', async () => {
      const userId = users[0].id

      const response = await request(app)
        .put(`/users/${userId}`)
        .send({ name: 'Ricardo Rodrigues Neto', email: 'nilowiski@example.com', password: 'newpassword' })

      expect(response.status).toBe(201)
      expect(response.body).toEqual({ message: 'User updated successfully' })
    })
  })

  describe('DELETE /users/:id', () => {
    it('should delete a user and return status 204', async () => {
      const userId = users[0].id
      const response = await request(app).delete(`/users/${userId}`)

      expect(response.status).toBe(204)
    })
  })
})
