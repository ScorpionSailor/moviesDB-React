import { useState ,useEffect} from 'react'
import AllMovies from './AllMovies'
import Search from './Search'
import { useDebounce } from 'react-use'
import Pagination from './Pagination' 

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS ={
  method:'GET',
  headers:{
    accept:'application.json',
    authorization: `Bearer ${API_KEY}`
  }
}

const Home = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [ErrorMessage,setErrorMessage] = useState(null); 
  const [MovieList,setMovieList] = useState([]);
  const [IsLoading,setIsLoding] = useState(false);
  const [CurrentPage, setCurrentPage] = useState(1);
  const [DebounceSearchTerm,setDebounceScearchTerm] = useState('');
  
  const FetchMovies = async (query='')=>{
    try {
      const End_Point = query ? `${API_BASE_URL}/search/movie?page=${CurrentPage}&query=${encodeURIComponent(query)}&sort_by=popularity.desc` : `${API_BASE_URL}/discover/movie?page=${CurrentPage}&sort_by=popularity.desc`;
      const responce = await fetch(End_Point,API_OPTIONS);
      if(!responce.ok){
        throw new Error("Error fetching movies!!");
      }else{
        const data = await responce.json();
        if (data.responce =='False'){
          setErrorMessage(data.Error || 'Error fetching movies');
          setMovieList([]);
        }
        console.log(data);
        setMovieList(data.results || []);
      }

    }catch(e)
    {
        setErrorMessage(`Error fetching movies please try again ${e}`);
    }
    finally{
      setIsLoding(false);
    }
  }

  const [,cancel]= useDebounce(()=>{setDebounceScearchTerm(searchTerm)},500,[searchTerm]);

  useEffect( ()=> {
    setIsLoding(true);
    setCurrentPage(1);
    FetchMovies(DebounceSearchTerm);
  },[DebounceSearchTerm]) 
  
  useEffect( ()=>{
    setIsLoding(true);
    FetchMovies();
  },[CurrentPage])

  return (
    <main className='overflow-hidden'>
      <div className='pattern'/>
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="hero-image" />
          <h1>Find <span className='text-gradient'>Movies</span> you'll enjoy without any hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <section className='all-movies'>
          <div className="flex justify-between mt-10 ">
            <h2>All Movies</h2>
            <Pagination setCurrentPage = {setCurrentPage} CurrentPage = {CurrentPage} />
          </div>
          
          {IsLoading ? <div className="min-w-1/2 flex justify-center"><span className="loader w-full h-full text-center "></span></div>
          : ErrorMessage ? <p className='text-red-500'>{ErrorMessage}</p> 
          :<AllMovies MovieList = {MovieList} />
          }
          <Pagination setCurrentPage = {setCurrentPage} CurrentPage = {CurrentPage} />
        </section>
      </div>
    </main>
  )
}

export default Home