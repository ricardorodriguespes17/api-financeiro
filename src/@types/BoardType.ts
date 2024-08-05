namespace BoardProps {
  export type Model = {
    id: string
    title: string
    description: string
  }
  
  export type CreateModel = {
    title: string
    description: string
  }

  export type UpdateModel = {
    id: string
  } & BoardProps.CreateModel
}

export default BoardProps