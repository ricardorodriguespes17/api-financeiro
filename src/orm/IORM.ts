export interface IORM<Model, CreateModel> {
  create(data: CreateModel): Promise<Model>;
  update(id: string, data: CreateModel): Promise<Model>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Model>;
  findAll(): Promise<Model[]>;
}