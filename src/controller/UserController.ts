import { User, UserProps } from "../@types/UserType";
import ormConfig from "../config/orm";
import { IORM } from "../orm/IORM";
import ORMFactory from "../orm/ORMFactory";

class UserController implements User {
  private ormFactory: ORMFactory
  private userORM: IORM<UserProps.Model, UserProps.CreateModel, UserProps.UpdateModel>

  constructor() {
    this.ormFactory = new ORMFactory()
    this.userORM = this.ormFactory.getORM<UserProps.Model, UserProps.CreateModel, UserProps.UpdateModel>(ormConfig.orm, "User")
  }

  createUser(data: UserProps.CreateModel): Promise<UserProps.Model> {
    return this.userORM.create(data)
  }

  updateUser(data: UserProps.UpdateModel) {
    return this.userORM.update(data.id, data)
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