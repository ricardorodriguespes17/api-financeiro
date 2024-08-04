export interface IORM<T> {
  create(data: T): Promise<T>;
  update(id: string, data: T): Promise<T>;
  delete(id: string): Promise<T>;
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
}