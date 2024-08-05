import CollectionProps from "./CollectionType"
import TransactionProps from "./TransactionType"
import WalletProps from "./WalletType"

namespace BoardProps {
  export type Model = {
    id: string
    title: string
    description: string
    transactions: TransactionProps.Model[]
    wallets: WalletProps.Model[]
    collections: CollectionProps.Model[]
  }
  
  export type CreateModel = {
    title: string
    description: string
    transactions: TransactionProps.Model[]
    wallets: WalletProps.Model[]
    collections: CollectionProps.Model[]
  }

  export type UpdateModel = {
    id: string
  } & BoardProps.CreateModel
}

export default BoardProps