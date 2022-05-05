import React from 'react'
import MovieCard from './MovieCard';
import { useGetMoviesQuery } from './moviesAPI';
import { IMovie } from './moviesSlice';

const Movies = () => {

  const {data, isLoading} = useGetMoviesQuery("avengers")

  if(isLoading) return <h2>Loading...</h2>

  return (
    <div>
      {isLoading ? <h3>Loading</h3> : 
      data.Search?.map((movie: IMovie) => <MovieCard data={movie}/>)
      }
    </div>
  )
}

export default Movies