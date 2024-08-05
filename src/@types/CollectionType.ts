import TransactionProps from "./TransactionType"

namespace CollectionProps {
  export type Model = {
    id: string
    title: string
    description: string
    day: number
    isPaid: boolean
    type: CollectionTypeModel
    parentId: string | null
    collections: CollectionProps.Model[]
    transactions: TransactionProps.Model[]
  }
  
  export type CreateModel = {
    title: string
    description: string
  }

  export type CollectionTypeModel = "EXPENSE" | "INCOME"
}

export default CollectionProps