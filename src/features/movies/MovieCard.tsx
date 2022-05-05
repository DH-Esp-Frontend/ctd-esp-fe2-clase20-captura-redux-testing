import React from 'react'
import { IMovie } from './moviesSlice'
import "./styles.css"

interface ICard{
  data: IMovie,
}

const MovieCard = ({data}: ICard) => {
  return (
    <div className='card'>
      <div className='card-header'>
        <h3>{data.Title} </h3>
        <button>🖤</button>
      </div>
      <img src={data.Poster} alt="movie-poster" />
    </div>
  )
}

export default MovieCard