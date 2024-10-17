import express from "express"
import userRouter from "./routes/user.routes"
import boardRouter from "./routes/board.routes"

const app = express()
app.use(express.json())
app.use(userRouter)
app.use(boardRouter)

export default app