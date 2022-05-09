import React from 'react'
import {store} from "../../../app/store"
import {  render, screen, waitFor } from '@testing-library/react'
import MovieCard from '../MovieCard'
import { IMovie } from '../moviesSlice'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import moviesReducer from "../moviesSlice"
function renderRedux(component: React.ReactNode, { initialState = {favs: [], movies:[]} } = {}) {
  const store = configureStore({ reducer: {movies: moviesReducer} });
  return {
      ...render( <Provider store={store}>
        {component}
      </Provider>)
  }
}
const movie: IMovie = {Title: "Harry Potter", Poster:"any", imdbID:"5"}

describe("MoviesCard", ()=>{
    describe("onClick", ()=>{
        renderRedux(<MovieCard data={movie}/>)
        const state = store.getState().movies
        const button = screen.getByRole("button")
        it("should add the movie to the fav list correctly", async ()=>{
            expect(state.favs.length).toBe(0)
            await userEvent.click(button)
            await waitFor(()=>{
                expect(state.favs.length).toBe(1)})
        })
        it("should remove the movie to the fav list correctly", async ()=>{
            await userEvent.click(button)
            await waitFor(()=>{
                expect(state.favs.length).toBe(0)})
            })
        })
})