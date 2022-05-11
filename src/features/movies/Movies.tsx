import React from 'react'
import MovieCard from './MovieCard';
import { useGetMoviesQuery } from './moviesAPI';
import { IMovie } from './moviesSlice';
import "./styles.css"


const Movies = () => {
  const {data, isLoading, error } = useGetMoviesQuery("avengers") 

  return (
    <div className='card-container'>
        {  
        error ? <h3>Oops... Algo salio mal :(</h3> :
        isLoading ? <h3>Loading....</h3> :
        data.Search?.map((movie: IMovie) => <MovieCard key={movie.imdbID} data={movie}/>)
        }
      
    </div>
  )
}

export default Movies