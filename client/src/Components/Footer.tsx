import {NavLink} from 'react-router-dom'
import {IoMdHome} from 'react-icons/io'
import {FaDoorOpen, FaSearch, FaSpotify} from 'react-icons/fa'
function Footer(){
  return(
    <footer className="select-none shadow text-white fixed bottom-0 w-full p-4 flex justify-between items-center">
      <NavLink to="/" className="text-center">
        <IoMdHome className="inline text-2xl"/>
        <span className="block">Home</span>
      </NavLink>
       <NavLink to="/" className="text-center">
        <FaSearch className="inline text-2xl"/>
        <span className="block">Search</span>
      </NavLink>
       <NavLink to="/" className="text-center">
        <FaDoorOpen className="inline text-2xl"/>
        <span className="block">Your Libary</span>
      </NavLink>
       <NavLink to="/" className="text-center">
        <FaSpotify className="inline text-2xl"/>
        <span className="block">Premium</span>
      </NavLink>
    </footer>
    )
}
export default Footer