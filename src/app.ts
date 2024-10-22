import express, { Request, Response } from "express"
import userRouter from "./routes/user.routes"
import boardRouter from "./routes/board.routes"
import transferenceRouter from "./routes/transference.routes"
import cors from "cors"

const app = express()
app.use(express.json())
app.use(cors())

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Bem-vindo à API Financeiro")
})

app.use(userRouter)
app.use(boardRouter)
app.use(transferenceRouter)


export default app