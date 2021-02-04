import { useRouter } from 'next/router'
import useSWR from 'swr'
import Form from '../../components/Form'

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)

const EditMovie = () => {
  const router = useRouter()
  const { id } = router.query
  const { data: movie, error } = useSWR(id ? `/api/movies/${id}` : null, fetcher)

  if (error) return <p>Failed to load</p>
  if (!movie) return <p>Loading...</p>

  const movieForm = {
    title: movie.title,
    year: movie.year,
    poster: movie.poster,
  }

  return <Form formId="edit-movie-form" movieForm={movieForm} forNewMovie={false} />
}

export default EditMovie
