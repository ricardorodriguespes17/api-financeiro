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
}

export interface User {
  findAllUsers: () => Promise<UserProps.Model[]>
  findUserById: (id: string) => Promise<UserProps.Model | null>
  createUser: (data: UserProps.CreateModel) => Promise<UserProps.Model>
  updateUser: (data: UserProps.Model) => Promise<UserProps.Model>
  deleteUser: (id: string) => Promise<void>
}