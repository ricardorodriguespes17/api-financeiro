import { Installment, Transference } from "@prisma/client"

export type TransferenceType = Transference & { installments: Installment[] }
export type CreateTransferenceType = Omit<Omit<TransferenceType, "id">, "installments">
export type UpdateTransferenceType = CreateTransferenceType