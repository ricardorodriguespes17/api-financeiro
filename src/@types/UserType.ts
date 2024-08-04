export namespace UserProps {
  export type Model = {
    id: string
    name: string
    email: string
    password: string
  }
  
  export type CreateModel = {
    name: string
    email: string
    password: string
  }

  export type UpdateModel = {
    id: string
  } & UserProps.CreateModel
}

export interface User {
  findAllUsers: () => Promise<UserProps.Model[]>
  findUserById: (id: string) => Promise<UserProps.Model | null>
  createUser: (data: UserProps.CreateModel) => Promise<UserProps.Model>
  updateUser: (data: UserProps.UpdateModel) => Promise<UserProps.Model>
  deleteUser: (id: string) => Promise<void>
}