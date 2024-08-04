import { PrismaClient } from '@prisma/client';
import PrismaORM from './PrismaORM';
import { IORM } from './IORM';

type ORMType = 'Prisma';
type Entity = 'User';

class ORMFactory {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  getORM<T>(ormType: ORMType, entity: Entity): IORM<T> {
    switch (ormType) {
      case 'Prisma':
        return this.getPrismaORM<T>(entity);
      default:
        throw new Error('ORM type not supported');
    }
  }

  private getPrismaORM<T>(entity: Entity): PrismaORM<T> {
    switch (entity) {
      case 'User':
        return new PrismaORM<T>(this.prisma.user);
      default:
        throw new Error('Entity not supported');
    }
  }
}

export default ORMFactory;