import { PrismaClient } from "@prisma/client";
import { IORM } from "./IORM";

class PrismaORM<T> implements IORM<T> {
  private prisma: PrismaClient;
  private model: any;

  constructor(model: any) {
    this.prisma = new PrismaClient();
    this.model = model;
  }

  async create(data: T): Promise<T> {
    return this.model.create({ data });
  }

  async update(id: string, data: T): Promise<T> {
    return this.model.update({ where: { id }, data });
  }

  async delete(id: string): Promise<T> {
    return this.model.delete({ where: { id } });
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findUnique({ where: { id } });
  }

  async findAll(): Promise<T[]> {
    return this.model.findMany();
  }
}

export default PrismaORM