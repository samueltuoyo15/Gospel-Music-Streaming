import { useState, useEffect } from 'react'

interface ProfileData {
  username: string
  user_profile_picture: string
  recent_tracks?: Array<any>
  recommended_tracks?: Array<any>
}

function Header() {
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [period, setPeriod] = useState<string>('')

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/profile')
        const data = await response.json()
        setProfile(data)
        console.log(data)
      } catch (error) {
        console.error('Error fetching profile:', error)
      }
    }

    const updatePeriod = () => {
      const date = new Date()
      const hours = date.getHours()

      if (hours >= 18) {
        setPeriod('Good Evening')
      } else if (hours >= 12) {
        setPeriod('Good Afternoon')
      } else if (hours >= 6) {
        setPeriod('Good Morning')
      } else {
        setPeriod('Good Night')
      }
    }

    updatePeriod()
    fetchProfile()
    const intervalId = setInterval(updatePeriod, 1000)

    return () => clearInterval(intervalId)
  }, [])

  if (!profile) {
    return <p>Oops! No profile data available.</p>
  }

  return (
    <header className="select-none p-4 text-white flex justify-between items-center bg-gradient-to-r from-purple-500 to-blue-500">
      <h2 className="text-xl font-semibold">{period}</h2>
      <span className="inline">{profile.username || 'null'}</span>
      <div>
        <img
          src={profile.user_profile_picture || '/user.png'}
          className="rounded-full w-10 inline"
          alt="User Profile"
        />
      </div>
    </header>
  )
}

export default Header
