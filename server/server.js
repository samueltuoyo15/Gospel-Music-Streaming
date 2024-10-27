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

app.get('/api', (req, res) => {
  const getAccessToken = async () => {
    const response = await axios.post('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(`${client_id}:${client_secret}`)
      },
      body: 'grant_type=client_credentials'
    })
    const data = await response.json()
    return data.access_token
  }

  const fetchGospelTracks = async () => {
    const token = await getAccessToken()
    const response = await fetch(
      'https://api.spotify.com/v1/search?q=genre:gospel&type=track&limit=30',
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    )
    const data = await response.json()
    console.log(data.tracks.items)
    setSongs(data.tracks.items)
  }
  res.send(data.tracks.items)
})

app.listen(process.env.PORT, () => {
  console.log('Server is running on http://localhost:' + process.env.PORT)
})
