import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT || 3001

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' })
})

// Products route (sample data)
app.get('/api/products', (req, res) => {
  const products = [
    {
      id: 1,
      name: 'Washing Machine',
      price: 399.99,
      description: 'High-capacity washing machine with smart features',
    },
    {
      id: 2,
      name: 'Refrigerator',
      price: 799.99,
      description: 'Energy-efficient refrigerator with ice maker',
    },
    {
      id: 3,
      name: 'Microwave',
      price: 199.99,
      description: 'Compact microwave oven with multiple settings',
    },
  ]
  res.json(products)
})

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err)
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' })
})

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`)
  console.log(`Health check: http://localhost:${port}/api/health`)
})
