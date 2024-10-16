import { User } from "@prisma/client"

export type UserType = User

export type CreateUserType = Omit<UserType, "id">
export type UpdateUserType = Omit<Omit<CreateUserType, "createdAt">, "password">