import {useState, useEffect} from 'react'
function Header(){
  const [Period, setPeriod] = useState<string>('')
  useEffect(() => {
    setInterval(() => {
    const date = new Date()
    const currentTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
    const hours = date.getHours()
    setPeriod(currentTime)

    if (hours >= 18) {
        setPeriod('Good Evening')
    } else if (hours >= 12) {
        setPeriod('Good Afternoon')
    } else if (hours >= 6) {
        setPeriod('Good Morning')
    } else {
        setPeriod('Good Night')
    }
}, 100)
  }, [])
  return(
    <>
      <header className="select-none p-4 text-white flex justify-between items-center">
       <h2>{Period}</h2>
        <div>
          <img src="/user.png" className="rounded-full w-10 inline"/>
        </div>
      </header>
    </>
    )
}

export default Header