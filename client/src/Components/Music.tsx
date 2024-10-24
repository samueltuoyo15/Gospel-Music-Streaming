import {Link} from 'react-router-dom'
function Music(){
  return(
    <>
    <section className="select-none text-white mt-5 p-4 overflow-x-scroll">
      <h2 className="text-lg font-bold mb-2 ">Your Top mixes</h2>
      <div className="grid grid-cols-3 gap-2">
      <Link to="/panel">
        <img src="/album.jpeg" className="block w-full rounded" />
        <p className="text-gray-400 line-clamp-2 text-sm text-justify">non sunt excepteur sint adipisicing veniam voluptate id enim velit</p>
      </Link>
       <Link to="/panel" className="rounded">
        <img src="/album.jpeg" className="w-40 rounded" />
        <p className="text-gray-400 line-clamp-2 text-sm text-justify">non sunt excepteur sint adipisicing veniam voluptate id enim velit</p>
      </Link>
       <Link to="/panel" className="rounded">
        <img src="/album.jpeg" className="w-40 rounded" />
       <p className="text-gray-400 line-clamp-2 text-sm text-justify">non sunt excepteur sint adipisicing veniam voluptate id enim velit</p>
      </Link>
      </div>
    </section>
    
    <section className="select-none text-white mt-5 p-4 overflow-x-scroll">
      <h2 className="text-lg font-bold mb-2 ">Recommend for you</h2>
      <div className="grid grid-cols-3 gap-2">
      <Link to="/panel">
        <img src="/album.jpeg" className="block w-full rounded" />
        <p className="text-gray-400 line-clamp-2 text-sm text-justify">non sunt excepteur sint adipisicing veniam voluptate id enim velit</p>
      </Link>
       <Link to="/panel" className="rounded">
        <img src="/album.jpeg" className="w-40 rounded" />
        <p className="text-gray-400 line-clamp-2 text-sm text-justify">non sunt excepteur sint adipisicing veniam voluptate id enim velit</p>
      </Link>
       <Link to="/panel" className="rounded">
        <img src="/album.jpeg" className="w-40 rounded" />
        <p className="text-gray-400 line-clamp-2 text-sm text-justify">non sunt excepteur sint adipisicing veniam voluptate id enim velit</p>
      </Link>
      </div>
    </section>
    </>
    )
}

export default Music