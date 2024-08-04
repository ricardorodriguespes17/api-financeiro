import { UserType } from "../../../src/@types/UserType"
import { OrmInterface } from "../../../src/orm/ormInterface"
import ORMFactory from "../../../src/orm/ORMFactory"
import UserService from "../../../src/services/UserService"

jest.mock("../../../src/orm/ORMFactory")

const mockUser: UserType = {
  id: "1",
  name: "Test User",
  email: "test@example.com",
  password: "password123"
}

describe("User Service tests", () => {
  let userService: UserService
  let userORM: jest.Mocked<OrmInterface<UserType>>

  beforeEach(() => {
    userORM = {
      create: jest.fn().mockResolvedValue(mockUser),
      update: jest.fn().mockResolvedValue(mockUser),
      delete: jest.fn().mockResolvedValue(mockUser),
      findById: jest.fn().mockResolvedValue(mockUser),
      findAll: jest.fn().mockResolvedValue([mockUser])
    };

    (ORMFactory.prototype.getORM as jest.Mock).mockReturnValue(userORM)

    userService = new UserService()
  })

  it("should create a user", async () => {
    const result = await userService.create(mockUser)
    expect(userORM.create).toHaveBeenCalledWith(mockUser)
    expect(result).toEqual(mockUser)
  })

  it("should update a user", async () => {
    const result = await userService.update(mockUser)
    expect(userORM.update).toHaveBeenCalledWith(mockUser.id, mockUser)
    expect(result).toEqual(mockUser)
  })

  it("should delete a user", async () => {
    const result = await userService.delete(mockUser.id.toString())
    expect(userORM.delete).toHaveBeenCalledWith(mockUser.id.toString())
    expect(result).toEqual(mockUser)
  })

  it("should find all users", async () => {
    const result = await userService.findAll()
    expect(userORM.findAll).toHaveBeenCalled()
    expect(result).toEqual([mockUser])
  })

  it("should find a user by id", async () => {
    const result = await userService.findById(mockUser.id.toString())
    expect(userORM.findById).toHaveBeenCalledWith(mockUser.id.toString())
    expect(result).toEqual(mockUser)
  })
})