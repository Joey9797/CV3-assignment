import cors from 'cors'
import express from 'express'
import type { ErrorRequestHandler } from 'express'
import broadcastsRouter from './routes/broadcasts.js'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/broadcasts', broadcastsRouter)

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  const statusCode =
    typeof error === 'object' &&
    error !== null &&
    'statusCode' in error &&
    typeof error.statusCode === 'number'
      ? error.statusCode
      : 500

  const message =
    error instanceof Error ? error.message : 'Internal Server Error'

  console.error('[Error]', message)

  res.status(statusCode).json({
    error: { message },
  })
}

app.use(errorHandler)

export default app
