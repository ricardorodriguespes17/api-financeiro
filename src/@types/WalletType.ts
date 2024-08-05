import CollectionProps from "./CollectionType"

namespace WalletProps {
  export type Model = {
    id: string
    title: string
    description: string
    value: number
    boardId: string
    collections: CollectionProps.Model[]
  }
  
  export type CreateModel = {
    title: string
    description: string
    value: number
    boardId: string
    collections: CollectionProps.Model[]
  }
}

export default WalletProps