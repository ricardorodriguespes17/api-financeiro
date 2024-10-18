import express from "express"
import userRouter from "./routes/user.routes"
import boardRouter from "./routes/board.routes"
import transferenceRouter from "./routes/transference.routes"

const app = express()
app.use(express.json())
app.use(userRouter)
app.use(boardRouter)
app.use(transferenceRouter)

export default app