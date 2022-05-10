import React from 'react'
import {  render, screen } from '@testing-library/react'
import MovieCard from '../MovieCard'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import moviesReducer, { IMovie }  from "../moviesSlice"
import { moviesApi } from '../moviesAPI'


function renderRedux(component: React.ReactNode, initialState = {movies: {favs: [] as IMovie[] , movies: [] as IMovie[]}}) {
  const store = configureStore({ reducer: {movies: moviesReducer, moviesApi: moviesApi.reducer},  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(moviesApi.middleware), preloadedState: initialState});
  return {
      ...render( <Provider store={store}>
        {component}
      </Provider>),
      store
  }
}
const movie: IMovie = {Title: "Harry Potter", Poster:"any", imdbID:"5"}


describe("MoviesCard", ()=>{
    describe("if the movie is not added", ()=>{
      it("should add it to the fav list correctly", async ()=>{
        const { store } =  renderRedux(<MovieCard data={movie}/>)
          const button = screen.getByRole("button")
          await userEvent.click(button)
          expect(store.getState().movies.favs.length).toBe(1)
          })
    })
    describe("if the movie is added", ()=>{
      it("should remove it to the fav list correctly", async ()=>{
        const { store } =  renderRedux(<MovieCard data={movie}/>, {movies: {favs: [movie], movies: []}})
          const button = screen.getByRole("button")
          await userEvent.click(button)
          expect(store.getState().movies.favs.length).toBe(0)
        })
    })
})