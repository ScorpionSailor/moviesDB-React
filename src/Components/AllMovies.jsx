import Card from './Card'

const AllMovies = ({ MovieList }) => {
  return (
    <div>
      {!MovieList.length ? (
        <p className='text-white'>No movies found.</p>
      ) : (
        <ul>
          {MovieList.map((movie)=>(
            <Card key={movie.id} movie = {movie} />
          ))}
        </ul>
      )}
    </div>
  )
}

export default AllMovies