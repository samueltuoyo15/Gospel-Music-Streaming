function Login() {
  const Auth = () => {
    window.location.href = '/login'
  }

  return (
    <section className="p-4 text-4xl mt-20 text-white select-none text-center">
      Welcome To Spotify
      <button onClick={Auth} className="block w-full md:w-72 bg-green-900 rounded p-3 text-2xl">
        L<img src="/Spotify-logo.png" className="inline w-8 m-0 whitespace-nowrap align-middle" />gin
      </button>
    </section>
  )
}

export default Login
