export interface IORM<Model, CreateModel, UpdateModel> {
  create(data: CreateModel): Promise<Model>;
  update(id: string, data: UpdateModel): Promise<Model>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Model>;
  findAll(): Promise<Model[]>;
}