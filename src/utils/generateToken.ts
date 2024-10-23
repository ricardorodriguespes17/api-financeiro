import jwt from "jsonwebtoken"

const jwtSecret = process.env.JWT_SECRET as string

export const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, jwtSecret, {
    expiresIn: '1h',
  })
}

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, jwtSecret, {
    expiresIn: '15d',
  })
}