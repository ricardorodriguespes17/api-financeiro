import express from 'express'

const app = express()

app.use(express.json())

app.get('/', async (req, res) => {
  return res.send("API Financeiro")
})

export default app