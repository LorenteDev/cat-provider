import './Home.css'

import { useEffect, useState } from 'react'

const Home = () => {
  const url = 'https://api.thecatapi.com/v1/images/search'

  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)

  const getImage = (url) => {
    setIsPending(true)
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw Error("Couldn't load the image")
        }
        return res.json()
      })
      .then((data) => {
        setData(data)
        setIsPending(false)
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
        } else {
          setIsPending(false)
          setError(err.message)
        }
      })
  }

  useEffect(() => {
    getImage(url)
    // eslint-disable-next-line
  }, [])

  const handleClick = () => {
    getImage(url)
  }

  return (
    <div className="home">
      <h1 className="title">Cat Provider</h1>
      <div>
        <button
          onClick={handleClick}
          disabled={isPending}
          className={isPending ? 'disabled-button' : 'active-button'}
        >
          {!isPending ? 'Give me a new cat' : 'Fetching a cat...'}
        </button>
      </div>
      <div className="img-container">
        {data && !isPending && <img src={data[0].url} alt="A cute cat" />}
        {isPending && <div className="loader" />}
        {error && <p>{error}</p>}
      </div>
    </div>
  )
}

export default Home
