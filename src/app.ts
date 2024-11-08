import express, { Request, Response } from "express"
import userRouter from "./routes/user.routes"
import transferenceRouter from "./routes/transference.routes"
import authRouter from "./routes/auth.routes"
import installmentRouter from "./routes/installment.route"
import cors from "cors"

const app = express()
app.use(express.json())
app.use(cors())

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Bem-vindo à API Financeiro")
})

app.use(userRouter)
app.use(transferenceRouter)
app.use(authRouter)
app.use(installmentRouter)

export default app