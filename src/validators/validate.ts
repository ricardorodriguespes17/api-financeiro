import { Request, Response } from "express"
import { validationResult } from "express-validator"

const validate = (validations: any[]) => {
  return async (req: Request, res: Response, next: any) => {
    await Promise.all(validations.map((validation) => validation.run(req)))
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    return res.status(400).json({ errors: errors.array() })
  }
}

export default validate