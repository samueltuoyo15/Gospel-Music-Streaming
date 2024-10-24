import express from 'express'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import dotenv from 'dotenv'
import session from 'express-session'
import Auth from './auth/auth.js'
import { isAuthenticated } from './middleware/Authmiddleware.js'

dotenv.config()

const app = express()
app.use(express.json())

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}))

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(express.static(path.join(__dirname, '..', 'client', 'dist')))

app.get('/login', (req, res) => {
  Auth.AuthorizeUsers(req, res)
})

app.get('/callback', (req, res) => {
  req.session.isAuthenticated = true
  res.redirect('/home')
})

app.get('/home', isAuthenticated, (req, res) => {
  res.send('Welcome to Home, you are authenticated!')
})

app.get('/check-auth', (req, res) => {
  res.json({ isAuthenticated: !!req.session.isAuthenticated })
})

app.listen(process.env.PORT, () => {
  console.log('Server is running on http://localhost:' + process.env.PORT)
})
