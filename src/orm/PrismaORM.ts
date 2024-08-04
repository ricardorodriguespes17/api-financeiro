import { IORM } from "./IORM";

class PrismaORM<Model, CreateModel> implements IORM<Model, CreateModel> {
  private model: any;

  constructor(model: any) {
    this.model = model;
  }

  async create(data: CreateModel): Promise<Model> {
    return this.model.create({ data });
  }

  async update(id: string, data: CreateModel): Promise<Model> {
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