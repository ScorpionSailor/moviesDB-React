import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link , useParams } from 'react-router-dom'
import no_movie from '/no-movie.png';
import No_Poster from '/No-Poster.png';
import star from '/star.svg';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS ={
  method:'GET',
  headers:{
    accept:'application.json',
    authorization: `Bearer ${API_KEY}`
  }
}

const DetailedCard = () => {
  
  const { id } = useParams();
  const [ErrorMessage,setErrorMessage] = useState(null); 
  const [MovieDetails,setMovieDetails] = useState([]);
  const [IsLoading,setIsLoding] = useState(false);

  const formatToNearestUnit = (value) => {
    if(value >=1000 && value < 1000000){
      return `${(value / 1000).toFixed(1)}K`;
    }else if(value>=10000000 && value<10000000000){
      return `${(value / 1000000).toFixed(1)}M`;
    }else if(value>=1000000000 && value<10000000000){
      return `${(value / 1000000000).toFixed(1)}B`;
    }else{
      return value;
    }
  }

  const FetchMovieDetails = async ()=>{  
    try {
      const End_Point = `${API_BASE_URL}/movie/${id}?language=en-US`;
      const responce = await fetch(End_Point,API_OPTIONS);
      if(!responce.ok){
        throw new Error("Error fetching movie Details!!");
      }else{
        const data = await responce.json();
        if (data.responce =='False'){
          setErrorMessage(data.Error || 'Error fetching movie details');
          setMovieDetails([]);
        }else{
          console.log(data);
          setMovieDetails(data || []);
        }
      }

    }catch(e)
    {
        setErrorMessage(`Error fetching movie detailes please try again ${e}`);
    }
    finally{
      setIsLoding(false);
    }
  }
  useEffect(()=>{
    setIsLoding(true);
    FetchMovieDetails();
  },[id])
    

  return (
    <div className='p-10'>
      <Link to={'/moviesDB-React/'}><button className='mb-5'>Back</button></Link>
      <div className='text-white'>
        {IsLoading? <div className="min-w-1/2 flex justify-center">Loading</div>
        :ErrorMessage? <div className="min-w-1/2 flex justify-center"><p className='text-red-500'>{ErrorMessage}</p></div>
        :<div className='movie-details'>
          <div className="Header">
            <div className="">
              <h2>{MovieDetails.title}</h2>
              <div className="content">
                <p className='year'>{MovieDetails.release_date ? MovieDetails.release_date.split('-')[0] : 'Yet to be released'}</p>
                <span>•</span>
                <p className='lang'>{MovieDetails.original_language ? MovieDetails.original_language : "NaN"}</p>
              </div>
            </div>
            <div className="rating">
              <img src={star} alt="star" />
              <p>{MovieDetails.vote_average ? MovieDetails.vote_average.toFixed(1) : "NaN"}</p>
            </div>
          </div>

          <div className="posters">
            <img className='col-span-1' src={MovieDetails.poster_path ? 'https://image.tmdb.org/t/p/w500/'+MovieDetails.poster_path : no_movie} alt='poster'/>
            <img className='col-span-3' src={MovieDetails.backdrop_path ? 'https://image.tmdb.org/t/p/w500/'+MovieDetails.backdrop_path : No_Poster} alt='poster'/>
          </div>
          <div className="Details">
            <div className="Genres flex gap-14 md:gap-20">
              <h4>Genres</h4>
              <div className="flex flex-wrap max-md:text-xs gap-1 md:gap-5">
                {Array.isArray(MovieDetails.genres) && MovieDetails.genres.map(({name})=>(
                  <p key={name}>{name}</p>
                ))}
              </div>
            </div>
            <div className="Overview flex gap-12 md:gap-16">
              <h4>Overview</h4>
              <h5 className='max-md:text-sm'>{MovieDetails.overview ? MovieDetails.overview : "No overview available"}</h5>
            </div>
            <div className="Release flex gap-5 md:gap-9">
              <h4>Release Date</h4>
              <h5 className='max-md:text-sm'>{MovieDetails.release_date ? MovieDetails.release_date : "No release date available"}</h5>
            </div>
            <div className="Status flex gap-17 md:gap-21">
              <h4>Status</h4>
              <h5 className='max-md:text-sm'>{MovieDetails.status ? MovieDetails.status : "No status available"}</h5>
            </div>
            <div className="Budget flex gap-16 md:gap-19.5">
              <h4>Budget</h4>
              <h5 className='max-md:text-sm'>{MovieDetails.budget ? formatToNearestUnit(MovieDetails.budget) : "No budget available"}</h5>
            </div>
            <div className="Revenue flex gap-13.5 md:gap-17">
              <h4>Revenue</h4>
              <h5 className='max-md:text-sm'>{MovieDetails.revenue ? formatToNearestUnit(MovieDetails.revenue) : "No revenue available"}</h5>
            </div>
            <div className="Tagline flex gap-16.5 md:gap-20">
              <h4>Tagline</h4>
              <h5 className='max-md:text-sm'>{MovieDetails.tagline ? MovieDetails.tagline : "No tagline available"}</h5>
            </div>
            <div className="ProductionCompanies flex gap-10 md:gap-13">
              <h4 className='flex-wrap max-w-20'>Production Companies</h4>
              <div className=" flex flex-wrap gap-1 md:gap-5">
                {Array.isArray(MovieDetails.production_companies) && MovieDetails.production_companies.map(({name},index)=>(
                  (index != MovieDetails.production_companies.length && index != 0)? 
                    <>
                      <span>•</span> 
                      <h6 key={name}>{name}</h6>
                    </>
                   : <h6 key={name}>{name}</h6>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      }
      </div>
    </div>
  )
}

export default DetailedCard