import {Link} from 'react-router-dom'
type MusicProps = {
  songs: any[]
}
function Music({songs}: MusicProps){
  return(
    <>
    <section className="select-none text-white mt-5 p-4 overflow-x-scroll mb-20">
      <h2 className="text-lg font-bold mb-2 ">Your Top mixes</h2>
      <div className="grid grid-cols-3 gap-2">
      {songs.map((track: any) => (
       <Link to="/panel" key={track.id}>
       <img src={track.album.images[0]?.url} className="block w-full rounded" />
        <p className="text-gray-400 line-clamp-2 text-sm text-justify">{track.artists[0].name}</p>
        <p>{track.name}</p>
      </Link>
       ))}
      </div>
    </section>
    </>
    )
}

export default Music