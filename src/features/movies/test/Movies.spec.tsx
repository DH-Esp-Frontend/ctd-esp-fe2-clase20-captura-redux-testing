import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import moviesReducer, { IMovie } from "../moviesSlice"
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux'
import Movies from '../Movies'
import { render, screen } from '@testing-library/react';


function renderRedux(component: React.ReactNode, { initialState = {favs: [], movies:[]} } = {}) {
  const store = configureStore({ reducer: {movies: moviesReducer} });
  return {
      ...render( <Provider store={store}>
        {component}
      </Provider>)
  }
}


const movie: IMovie = {Title: "End Game", Poster:"any", imdbID:"7"}

export const handlers = [
  rest.get('https://www.omdbapi.com/', (req, res, ctx) => {
    return res(ctx.json(movie), ctx.delay(200))
  })
]

const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

describe("Movies", ()=>{
  describe("Fetch data", ()=>{
    it("should initially show a loading state", ()=>{
        renderRedux(<Movies />)
        expect(screen.getByText("Loading....")).toBeInTheDocument()
    })
  })
})



