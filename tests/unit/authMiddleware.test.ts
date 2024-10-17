import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import authMiddleware from "../../src/middlewares/authMiddlewares"

jest.mock("jsonwebtoken")

describe("authMiddleware", () => {
  let req: Partial<Request>
  let res: Partial<Response>
  let next: NextFunction

  beforeEach(() => {
    req = {
      header: jest.fn(),
      body: {}
    }
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    next = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should return 403 if token is not provided", () => {
    (req.header as jest.Mock).mockReturnValueOnce(null)

    authMiddleware(req as Request, res as Response, next)

    expect(res.status).toHaveBeenCalledWith(403)
    expect(res.json).toHaveBeenCalledWith({ message: "Token not provided" })
    expect(next).not.toHaveBeenCalled()
  })

  it("should return 403 if token is invalid", () => {
    (req.header as jest.Mock).mockReturnValueOnce("Bearer invalidToken");
    (jwt.verify as jest.Mock).mockImplementationOnce(() => {
      throw new Error("Invalid token")
    })

    authMiddleware(req as Request, res as Response, next)

    expect(res.status).toHaveBeenCalledWith(403)
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid token" })
    expect(next).not.toHaveBeenCalled()
  })

  it("should call next if token is valid", () => {
    (req.header as jest.Mock).mockReturnValueOnce("Bearer validToken");
    (jwt.verify as jest.Mock).mockReturnValueOnce({ userId: "user123" })

    authMiddleware(req as Request, res as Response, next)

    expect(req.body.userId).toBe("user123")
    expect(next).toHaveBeenCalled()
  })
})