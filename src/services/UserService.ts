import UserProps from "../@types/UserType"
import ormConfig from "../config/orm.config"
import ORMFactory from "../orm/ORMFactory"
import { OrmInterface } from "../orm/ormInterface"


class UserService {
  private ormFactory: ORMFactory
  private userORM: OrmInterface<UserProps.Model>

  constructor() {
    this.ormFactory = new ORMFactory()
    this.userORM = this.ormFactory.getORM<UserProps.Model>(ormConfig.orm, "User")
  }

  create = async (data: UserProps.CreateModel) => {
    return this.userORM.create(data)
  }

  update = (data: UserProps.UpdateModel) => {
    return this.userORM.update(data.id, { email: data.email, name: data.name, password: data.password })
  }

  delete = (id: string) => {
    return this.userORM.delete(id)
  }

  findAll = () => {
    return this.userORM.findAll()
  }

  findById = (id: string) => {
    return this.userORM.findById(id)
  }
}

export default UserService