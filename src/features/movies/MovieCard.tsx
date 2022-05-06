import { AiFillHeart as Fav, AiOutlineHeart as UnFav } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { addFav, deleteFav, IMovie } from './moviesSlice'
import "./styles.css"

interface ICard{
  data: IMovie,
}

const MovieCard = ({data}: ICard) => {
  
  const favs = useAppSelector(state => state.movies.favs)
  const dispatch = useAppDispatch()

  const isFav = favs.find(movie => movie.imdbID === data.imdbID)
  const handleFav = ()=>{
    if(!isFav) dispatch(addFav(data))
    if(isFav) dispatch(deleteFav(data.imdbID))
  }

  return (
    <div className='card'>
      <div className='card-header'>
        <h3>{data.Title} </h3>
        <button onClick={handleFav} >
          {isFav ? <Fav /> : <UnFav/> } 
        </button>
      </div>
      <img src={data.Poster} alt="movie-poster" />
    </div>
  )
}

export default MovieCard