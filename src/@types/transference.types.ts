import { Transference } from "@prisma/client"

export type TransferenceType = Transference
export type CreateTransferenceType = Omit<TransferenceType, "id">
export type UpdateTransferenceType = CreateTransferenceType