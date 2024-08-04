import express from 'express'
import routers from './routes'

const app = express()

app.use(express.json())
app.use(routers)

app.get('/', async (req, res) => {
  return res.send("API Financeiro")
})

export default app