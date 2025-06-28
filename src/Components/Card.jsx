import no_movie from '/no-movie.png';
import star from '/star.svg';

const Card = ({ movie : {title ,id , original_language , vote_average , poster_path ,release_date}}) => {
  return (
      <div  className='movie-card text-amber-50'>
        <img src={poster_path? `https://image.tmdb.org/t/p/w500/${poster_path}`: no_movie } alt="Poster" />

        <div className="mt-4">
          <h3>{title}</h3>
          <div className="content">
            <div className="rating">
              <img src={star} alt="star-img" />
              <p>{vote_average? vote_average.toFixed(1) : "NaN"}</p>
            </div>
            <span>•</span>
            <p className="lang">{original_language}</p>
            <span>•</span>
            <p className="year">{release_date? release_date.split('-')[0] : "NaN"}</p>
          </div>
        </div>
      </div>
  )
}

export default Card