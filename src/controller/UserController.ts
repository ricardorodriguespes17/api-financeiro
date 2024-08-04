import { User, UserProps } from "../@types/UserType";
import ormConfig from "../config/orm.config";
import { IORM } from "../orm/IORM";
import ORMFactory from "../orm/ORMFactory";

class UserController implements User {
  private ormFactory: ORMFactory
  private userORM: IORM<UserProps.Model, UserProps.CreateModel>

  constructor() {
    this.ormFactory = new ORMFactory()
    this.userORM = this.ormFactory.getORM<UserProps.Model, UserProps.CreateModel>(ormConfig.orm, "User")
  }

  createUser(data: UserProps.CreateModel): Promise<UserProps.Model> {
    return this.userORM.create(data)
  }

  updateUser(data: UserProps.Model) {
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