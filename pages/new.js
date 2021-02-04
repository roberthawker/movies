import Form from '../components/Form'

const NewMovie = () => {
  const movieForm = {
    title: '',
    poster: '',
    year: 0,
  }

  return <Form formId="add-movie-form" movieForm={movieForm} />
}

export default NewMovie
