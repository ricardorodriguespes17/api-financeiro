import { Installment } from "@prisma/client"

export type InstallmentType = Installment

export type CreateInstallmentType = Omit<InstallmentType, "id">