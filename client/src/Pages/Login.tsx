import { useState } from 'react'
import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const Loader = styled.span`
  border: 4px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  border-top: 4px solid rgba(255, 255, 255, 1);
  width: 24px;
  height: 24px;
  animation: ${spin} 1s linear infinite;
  margin-right: 10px;
`

function Login() {
  const [loading, setLoading] = useState<boolean>(false)

  const handleLogin = async () => {
    setLoading(true)
    window.location.href = '/auth'
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4">
      <h1 className="text-5xl font-bold mb-6">Welcome to Spotify</h1>
      <button 
        onClick={handleLogin} 
        className="bg-green-600 hover:bg-green-700 rounded-lg p-3 text-2xl transition duration-300 flex items-center"
      >
        {loading ? (
          <>
            <Loader />
            Logging in...
          </>
        ) : (
          <>
            Log in 
            <img src="/Spotify-logo.png" alt="Spotify Logo" className="inline w-8 ml-2" />
          </>
        )}
      </button>
    </section>
  )
}

export default Login
