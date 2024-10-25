import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Login from './Pages/Login'
import Home from './Pages/Home'
import { useState, useEffect } from 'react'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch('/check-auth')
      const data = await response.json()
      setIsAuthenticated(data.isAuthenticated)
    }
    checkAuth()
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/Login" replace />} />
        <Route path="/Login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
