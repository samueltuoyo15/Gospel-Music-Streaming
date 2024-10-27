import { useState, useEffect } from 'react'
import Header from '../Components/Header'
import Music from '../Components/Music'
import Footer from '../Components/Footer'
function Home() {
  const [songs, setSongs] = useState<any[]>([])

  const fetchGospelTracks = async () => {
    const response = await fetch('/api')
    const data = await response.json()
    console.log(data)
    setSongs(data)
  }

  useEffect(() => {
    fetchGospelTracks()
  }, [])

  return (
    <>
    <Header />
    <Music songs={songs}/>
    <Footer />
    </>
  )
}

export default Home
