import express from 'express'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import dotenv from 'dotenv'
import axios from 'axios'
import cors from 'cors'
import session from 'express-session'
import Auth from './auth/auth.js'
import { isAuthenticated } from './middleware/Authmiddleware.js'

dotenv.config()

const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET
const redirect_uri = 'http://localhost:10000/callback'

const app = express()
app.use(express.json())
app.use(cors())
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true
}))

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(express.static(path.join(__dirname, '..', 'client', 'dist')))

app.get('/auth', (req, res) => {
  Auth.AuthorizeUsers(req, res)
})

app.get('/callback', async (req, res) => {
  const { code } = req.query
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirect_uri,
    client_id: client_id,
    client_secret: client_secret
  })

try {
  const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', body)
  console.log('Token Response:', tokenResponse.data)
  const accessToken = tokenResponse.data.access_token

  req.session.accessToken = accessToken
  req.session.isAuthenticated = true
  res.redirect('/')
} catch (error) {
  console.error('Error retrieving access token:', error.response?.data || error.message)
  res.redirect('/login')
}
})

app.get('/profile', async (req, res) => {
  if (!req.session.accessToken) {
    return res.status(401).json({ message: 'User not authenticated' })
  }
  try {
    console.log('Access Token:', req.session.accessToken);
    
    const profileResponse = await axios.get('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${req.session.accessToken}` }
    })
    console.log('Profile Response:', profileResponse.data);
    
    const recentTracksResponse = await axios.get('https://api.spotify.com/v1/me/player/recently-played', {
      headers: { Authorization: `Bearer ${req.session.accessToken}` }
    })
    console.log('Recent Tracks Response:', recentTracksResponse.data);
    
    const recommendedTracksResponse = await axios.get('https://api.spotify.com/v1/recommendations', {
      headers: { Authorization: `Bearer ${req.session.accessToken}` },
      params: { limit: 3}
    })
    console.log('Recommended Tracks Response:', recommendedTracksResponse.data);
    
    const data = {
      username: profileResponse.data.display_name,
      user_profile_picture: profileResponse.data.images[0]?.url,
      recent_tracks: recentTracksResponse.data.items.map(item => ({
        songName: item.track.name,
        artist: item.track.artists.map(artist => artist.name).join(', '),
        album: item.track.album.name,
        albumCover: item.track.album.images[0]?.url
      })),
      recommended_tracks: recommendedTracksResponse.data.tracks.map(track => ({
        trackName: track.name,
        artist: track.artists.map(artist => artist.name).join(', '),
        album: track.album.name,
        albumCover: track.album.images[0]?.url
      }))
    }

    res.json(data)
  } catch (error) {
    console.error('Error fetching profile or recent songs:', error.response?.data || error.message);
    res.status(500).json({ message: 'Error fetching profile or recent songs' });
  }
});


app.get('/check-auth', (req, res) => {
  res.json({ isAuthenticated: !!req.session.isAuthenticated })
})

app.listen(process.env.PORT, () => {
  console.log('Server is running on http://localhost:' + process.env.PORT)
})
