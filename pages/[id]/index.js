import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dbConnect from '../../utils/dbConnect'
import Movie from '../../models/Movie'

/* Allows you to view pet card info and delete pet card*/
const MoviePage = ({ movie }) => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const handleDelete = async () => {
    const movieID = router.query.id

    try {
      await fetch(`/api/movies/${movieID}`, {
        method: 'Delete',
      })
      router.push('/')
    } catch (error) {
      setMessage('Failed to delete the movie.')
    }
  }

  return (
    <div key={movie._id}>
      <div className="card">
        <img src={movie.poster} />
        <h5 className="movie-name">{movie.title}</h5>
        <div className="main-content">
          <div className="btn-container">
            <Link href="/[id]/edit" as={`/${movie._id}/edit`}>
              <button className="btn edit">Edit</button>
            </Link>
            <button className="btn delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
      {message && <p>{message}</p>}
    </div>
  )
}

export async function getServerSideProps({ params }) {
  await dbConnect()

  const movie = await Movie.findById(params.id).lean()
  movie._id = movie._id.toString()

  return { props: { movie } }
}

export default MoviePage
