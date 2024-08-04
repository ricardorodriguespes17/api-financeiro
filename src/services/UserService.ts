import { UserType } from "../@types/UserType"
import ormConfig from "../config/orm.config"
import ORMFactory from "../orm/ORMFactory"
import { OrmInterface } from "../orm/ormInterface"

class UserService {
  private ormFactory: ORMFactory
  private userORM: OrmInterface<UserType>

  constructor() {
    this.ormFactory = new ORMFactory()
    this.userORM = this.ormFactory.getORM<UserType>(ormConfig.orm, "User")
  }

  create = async (data: UserType) => {
    return this.userORM.create(data)
  }

  update = (data: UserType) => {
    return this.userORM.update(data.id, data)
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