import dotenv from 'dotenv'
import querystring from 'querystring'

dotenv.config()

const client_id = process.env.client_id
const client_secret = process.env.client_secret
const redirect_uri = `http://localhost:${process.env.PORT}`

function AuthorizeUsers(req, res) {
  const state = generateRandomString(16)
  const scope = 'user-read-private user-read-email'
  const authURL = 'https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    })
  res.redirect(authURL)
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

export default { AuthorizeUsers }
