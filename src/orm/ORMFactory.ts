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

  getORM<Model, CreateModel>(ormType: ORMType, entity: Entity): IORM<Model, CreateModel> {
    switch (ormType) {
      case 'Prisma':
        return this.getPrismaORM<Model, CreateModel>(entity);
      default:
        throw new Error('ORM type not supported');
    }
  }

  private getPrismaORM<Model, CreateModel>(entity: Entity): PrismaORM<Model, CreateModel> {
    switch (entity) {
      case 'User':
        return new PrismaORM<Model, CreateModel>(this.prisma.user);
      default:
        throw new Error('Entity not supported');
    }
  }
}

export default ORMFactory;