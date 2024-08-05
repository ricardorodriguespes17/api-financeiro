import BoardProps from "../@types/BoardType"
import ormConfig from "../config/orm.config"
import ORMFactory from "../orm/ORMFactory"
import { OrmInterface } from "../orm/ormInterface"

class BoardService {
  private ormFactory: ORMFactory
  private userORM: OrmInterface<BoardProps.Model>

  constructor() {
    this.ormFactory = new ORMFactory()
    this.userORM = this.ormFactory.getORM<BoardProps.Model>(ormConfig.orm, "Board")
  }

  create = async (data: BoardProps.CreateModel) => {
    return this.userORM.create(data)
  }

  update = (id: string, data: BoardProps.CreateModel) => {
    return this.userORM.update(id, data)
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

export default BoardService