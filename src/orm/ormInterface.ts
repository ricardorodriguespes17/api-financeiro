export interface OrmInterface<Model> {
  create(data: CreateModel<Model>): Promise<Model>;
  update(id: string, data: CreateModel<Model>): Promise<Model>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Model>;
  findAll(): Promise<Model[]>;
}

export type CreateModel<T> = Omit<T, 'id'>;