import { CreateModel, OrmInterface } from "./ormInterface";

class PrismaORM<Model> implements OrmInterface<Model> {
  private model: any;

  constructor(model: any) {
    this.model = model;
  }

  async create(data: CreateModel<Model>): Promise<Model> {
    return this.model.create({ data });
  }

  async update(id: string, data: CreateModel<Model>): Promise<Model> {
    return this.model.update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    return this.model.delete({ where: { id } });
  }

  async findById(id: string): Promise<Model> {
    return this.model.findUnique({ where: { id } });
  }

  async findAll(): Promise<Model[]> {
    return this.model.findMany();
  }
}

export default PrismaORM