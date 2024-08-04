import { UserType } from "../@types/UserType";
import ormConfig from "../config/orm.config";
import { CreateModel, IORM } from "../orm/IORM";
import ORMFactory from "../orm/ORMFactory";

class UserController {
  private ormFactory: ORMFactory
  private userORM: IORM<UserType>

  constructor() {
    this.ormFactory = new ORMFactory()
    this.userORM = this.ormFactory.getORM<UserType>(ormConfig.orm, "User")
  }

  createUser(data: CreateModel<UserType>): Promise<UserType> {
    return this.userORM.create(data)
  }

  updateUser(data: UserType) {
    return this.userORM.update(data.id, { email: data.email, name: data.name, password: data.password })
  }

  deleteUser(id: string) {
    return this.userORM.delete(id)
  }

  findAllUsers() {
    return this.userORM.findAll()
  }

  findUserById(id: string) {
    return this.userORM.findById(id)
  }
}

export default UserController