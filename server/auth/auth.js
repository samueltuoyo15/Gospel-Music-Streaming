import dotenv from 'dotenv'
import querystring from 'querystring'
import axios from 'axios'

dotenv.config()

const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET
const redirect_uri = 'http://localhost:10000/callback'

function AuthorizeUsers(req, res) {
  const state = generateRandomString(16)
  
  const authURL = 'https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: 'user-read-email user-top-read streaming user-read-private user-read-playback-state user-modify-playback-state user-read-recently-played',
      redirect_uri: redirect_uri,
      state: state
    })
  res.redirect(authURL)
}

async function handleCallback(req, res) {
  const code = req.query.code || null
  if (!code) return res.redirect('/login') // Redirect back to login if no code is provided

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirect_uri,
      client_id: client_id,
      client_secret: client_secret
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    const { access_token, refresh_token } = response.data
    req.session.access_token = access_token
    req.session.refresh_token = refresh_token
    req.session.isAuthenticated = true

    res.redirect('/home')
  } catch (error) {
    console.error('Error during token exchange:', error.message)
    res.redirect('/login')
  }
}

function generateRandomString(length) {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export default { AuthorizeUsers, handleCallback }
