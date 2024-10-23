import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import BlacklistService from "../services/blacklist.service"

const jwtSecret = process.env.JWT_SECRET as string
const blacklistService = new BlacklistService()

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '')

  if (!token) {
    res.status(401).json({ message: "Token não enviado" })
  } else {
    try {
      const register = await blacklistService.getByToken(token)

      if (register) {
        res.status(401).json({ message: "Token inválido" })
      } else {
        const decoded = jwt.verify(token, jwtSecret)
        req.body.userId = (decoded as { userId: string }).userId
        next()
      }
    } catch (error) {
      res.status(401).json({ message: "Token inválido" })
    }

  }
}

export default authMiddleware