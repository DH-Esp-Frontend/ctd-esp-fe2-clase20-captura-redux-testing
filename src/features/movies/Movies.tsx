import React from 'react'
import { useAppSelector } from '../../app/hooks';
import MovieCard from './MovieCard';
import { useGetMoviesQuery } from './moviesAPI';
import { IMovie } from './moviesSlice';
import "./styles.css"


const Movies = () => {
  const state = useAppSelector(state => state.movies.favs)
  const {data, isLoading, isError} = useGetMoviesQuery("avengers")

  if(isError) return <h2>Lo siento, no pudimos encotrar peliculas con ese titulo :(</h2>

  return (
    <div className='card-container'>
      {isLoading ? <h3>Loading</h3> : 
      data.Search?.map((movie: IMovie) => <MovieCard data={movie}/>)
      }
    </div>
  )
}

export default Movies