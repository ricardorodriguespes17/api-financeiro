namespace TransactionProps {
  export type Model = {
    id: string
    title: string
    description: string
    value: number
    day: number
    isPaid: boolean
    categoryId: string
    collectionId: string
  }
  
  export type CreateModel = {
    title: string
    description: string
    value: number
    day: number
    isPaid: boolean
    categoryId: string
    collectionId: string
  }
}

export default TransactionProps