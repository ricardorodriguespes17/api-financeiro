import { CreateBoardType, UpdateBoardType } from "../@types/board.types"
import BoardRepository from "../repositories/board.repository"

class BoardService {
  private boardRepository = new BoardRepository()

  async getAllBoards(userId: string) {
    return this.boardRepository.findAll(userId)
  }

  async getBoardById(id: string) {
    const board = await this.boardRepository.findById(id)

    if(!board) {
      throw new Error("Quadro não encontrado")
    }

    return board
  }

  async getBoardByName(name: string, userId: string) {
    const board = await this.boardRepository.findByName(name, userId)


    if(!board) {
      throw new Error("Quadro não encontrado")
    }

    return board
  }

  async createBoard(data: CreateBoardType) {
    return this.boardRepository.create(data)
  }

  async updateBoard(id: string, data: UpdateBoardType) {
    await this.getBoardById(id)

    return this.boardRepository.update(id, data)
  }

  async deleteBoard(id: string) {
    await this.getBoardById(id)

    return this.boardRepository.delete(id)
  }
}

export default BoardService