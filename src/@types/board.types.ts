import { Board } from "@prisma/client"

export type BoardType = Board

export type CreateBoardType = BoardType
export type UpdateBoardType = Omit<BoardType, "id">