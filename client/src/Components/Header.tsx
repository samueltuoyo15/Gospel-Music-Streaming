import { useState, useEffect } from 'react'

function Header() {
  const [period, setPeriod] = useState<string>('')

  useEffect(() => {

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
    const intervalId = setInterval(updatePeriod, 1000)

    return () => clearInterval(intervalId)
  }, [])


  return (
    <header className="select-none p-4 text-white flex justify-between items-center bg-gradient-to-r from-purple-500 to-blue-500">
      <h2 className="text-xl font-semibold">{period}</h2>
      <span className="inline">null</span>
      <div>
        <img
          src="/user.png"
          className="rounded-full w-10 inline"
          alt="User Profile"
        />
      </div>
    </header>
  )
}

export default Header
