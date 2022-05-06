import {  createSlice,  PayloadAction } from '@reduxjs/toolkit';


export interface IMovie { 
    Title: string,
    Poster: string
    imdbID: string
}

interface IState {
    favs:  IMovie[],
    movies: IMovie[]

}

const initialState: IState = { 
    favs: [],
    movies: []
}

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addFav(state, action: PayloadAction<IMovie>){
        state.favs.push(action.payload)
    },
    deleteFav(state, action: PayloadAction<string>){
            const filterMovies =  state.favs.filter(movie => movie.imdbID !== action.payload)
            state.favs = filterMovies
    }
  } 
 });

 export const { addFav, deleteFav } = moviesSlice.actions

export default moviesSlice.reducer;
