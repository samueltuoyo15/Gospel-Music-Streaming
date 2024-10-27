import express from 'express'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import dotenv from 'dotenv'
import axios from 'axios'
dotenv.config()

const app = express()
app.use(express.json())

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')))

const getAccessToken = async () => {
  const response = await axios.post(
    'https://accounts.spotify.com/api/token',
    'grant_type=client_credentials',
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64')
      }
    }
  )
  return response.data.access_token
}

app.get('/api', async (req, res) => {
  try {
    const token = await getAccessToken()
    const response = await axios.get(
      'https://api.spotify.com/v1/search?q=genre:gospel+year:2019-2024&type=track&limit=50',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    const songs = response.data.tracks.items
    res.json(songs)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch songs' })
  }
})
app.listen(process.env.PORT, () => {
  console.log('Server is running on http://localhost:' + process.env.PORT)
})
