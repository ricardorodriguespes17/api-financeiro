import { Board } from "@prisma/client"

export type BoardType = Board

export type CreateBoardType = Omit<BoardType, "id">
export type UpdateBoardType = Omit<CreateBoardType, "name">