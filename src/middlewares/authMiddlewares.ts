import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

const jwtSecret = process.env.JWT_SECRET as string

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '')

  if (!token) {
    res.status(403).json({ message: "Token não enviado" })
  } else {
    try {
      const decoded = jwt.verify(token, jwtSecret)

      req.body.userId = (decoded as { userId: string }).userId

      next()
    } catch (error) {
      res.status(403).json({ message: "Token inválido" })
    }
  }
}

export default authMiddleware