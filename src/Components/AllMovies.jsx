import Card from './Card'
import { Link } from 'react-router-dom'


const AllMovies = ({ MovieList }) => {
  return (
    <div>
      {!MovieList.length ? (
        <p className='text-white'>No movies found.</p>
      ) : (
        <ul>
          {MovieList.map((movie)=>(
            <Link key={movie.id} to={`/DetailedCard/${movie.id}`}>
              <Card key={movie.id} movie = {movie} />
            </Link>
          ))}
        </ul>
      )}
    </div>
  )
}

export default AllMovies