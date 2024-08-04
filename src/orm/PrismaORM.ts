import { PrismaClient } from "@prisma/client";
import { IORM } from "./IORM";

class PrismaORM<Model, CreateModel, UpdateModel> implements IORM<Model, CreateModel, UpdateModel> {
  private prisma: PrismaClient;
  private model: any;

  constructor(model: any) {
    this.prisma = new PrismaClient();
    this.model = model;
  }

  async create(data: CreateModel): Promise<Model> {
    return this.model.create({ data });
  }

  async update(id: string, data: UpdateModel): Promise<Model> {
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