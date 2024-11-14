import { Credit } from "@prisma/client"
import { TransferenceType } from "./transference.types"

export type CreditType = Credit & { transferences: TransferenceType[] }
export type CreateCreditType = Omit<Omit<CreditType, "id">, "transferences">
export type UpdateCreditType = CreateCreditType