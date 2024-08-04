import { UserProps } from "../../src/@types/UserType"
import UserController from "../../src/controller/UserController"
import { IORM } from "../../src/orm/IORM"
import ORMFactory from "../../src/orm/ORMFactory"

jest.mock("../../src/orm/ORMFactory")

const mockUser: UserProps.Model = {
  id: "1",
  name: "Test User",
  email: "test@example.com",
  password: "password123"
}

describe("UserController", () => {
  let userController: UserController
  let userORM: jest.Mocked<IORM<UserProps.Model, UserProps.CreateModel, UserProps.UpdateModel>>

  beforeEach(() => {
    userORM = {
      create: jest.fn().mockResolvedValue(mockUser),
      update: jest.fn().mockResolvedValue(mockUser),
      delete: jest.fn().mockResolvedValue(mockUser),
      findById: jest.fn().mockResolvedValue(mockUser),
      findAll: jest.fn().mockResolvedValue([mockUser])
    };

    (ORMFactory.prototype.getORM as jest.Mock).mockReturnValue(userORM)

    userController = new UserController()
  })

  it("should create a user", async () => {
    const result = await userController.createUser(mockUser)
    expect(userORM.create).toHaveBeenCalledWith(mockUser)
    expect(result).toEqual(mockUser)
  })

  it("should update a user", async () => {
    const result = await userController.updateUser(mockUser)
    expect(userORM.update).toHaveBeenCalledWith(mockUser.id, mockUser)
    expect(result).toEqual(mockUser)
  })

  it("should delete a user", async () => {
    const result = await userController.deleteUser(mockUser.id.toString())
    expect(userORM.delete).toHaveBeenCalledWith(mockUser.id.toString())
    expect(result).toEqual(mockUser)
  })

  it("should find all users", async () => {
    const result = await userController.findAllUsers()
    expect(userORM.findAll).toHaveBeenCalled()
    expect(result).toEqual([mockUser])
  })

  it("should find a user by id", async () => {
    const result = await userController.findUserById(mockUser.id.toString())
    expect(userORM.findById).toHaveBeenCalledWith(mockUser.id.toString())
    expect(result).toEqual(mockUser)
  })
})