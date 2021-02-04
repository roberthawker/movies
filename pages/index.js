import Link from 'next/link'
import dbConnect from '../utils/dbConnect'
import Movie from '../models/Movie'

const Index = ({ movies }) => (
  <>
    {movies.map((movie) => (
      <div key={movie._id}>
        <div className="card">
        <img src={movie.poster} />
        <h5 className="movie-name">{movie.title}</h5>
        <p>{movie.year}</p>
          <div className="main-content">
            <div className="btn-container">
              <Link href="/[id]/edit" as={`/${movie._id}/edit`}>
                <button className="btn edit">Edit</button>
              </Link>
              <Link href="/[id]" as={`/${movie._id}`}>
                <button className="btn view">View</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    ))}
  </>
)

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect()

  /* find all the data in our database */
  const result = await Movie.find({})
  const movies = result.map((doc) => {
    const movie = doc.toObject()
    movie._id = movie._id.toString()
    return movie
  })

  return { props: { movies: movies } }
}

export default Index
