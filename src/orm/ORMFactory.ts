import { PrismaClient } from '@prisma/client';
import PrismaORM from './PrismaORM';
import { OrmInterface } from './ormInterface';
import { ORMType } from '../@types/ormType';

type Entity = 'User' | 'Board';

class ORMFactory {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  getORM<Model>(ormType: ORMType, entity: Entity): OrmInterface<Model> {
    switch (ormType) {
      case 'Prisma':
        return this.getPrismaORM<Model>(entity);
      default:
        throw new Error('ORM type not supported');
    }
  }

  private getPrismaORM<Model>(entity: Entity): PrismaORM<Model> {
    switch (entity) {
      case 'User':
        return new PrismaORM<Model>(this.prisma.user);
      default:
        throw new Error('Entity not supported');
    }
  }
}

export default ORMFactory;