namespace UserProps {
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

export default UserProps