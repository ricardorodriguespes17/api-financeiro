import { PrismaClient } from '@prisma/client';
import PrismaORM from './PrismaORM';
import { IORM } from './IORM';
import { ORMType } from '../@types/ormType';

type Entity = 'User';

class ORMFactory {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  getORM<Model, CreateModel, UpdateModel>(ormType: ORMType, entity: Entity): IORM<Model, CreateModel, UpdateModel> {
    switch (ormType) {
      case 'Prisma':
        return this.getPrismaORM<Model, CreateModel, UpdateModel>(entity);
      default:
        throw new Error('ORM type not supported');
    }
  }

  private getPrismaORM<Model, CreateModel, UpdateModel>(entity: Entity): PrismaORM<Model, CreateModel, UpdateModel> {
    switch (entity) {
      case 'User':
        return new PrismaORM<Model, CreateModel, UpdateModel>(this.prisma.user);
      default:
        throw new Error('Entity not supported');
    }
  }
}

export default ORMFactory;