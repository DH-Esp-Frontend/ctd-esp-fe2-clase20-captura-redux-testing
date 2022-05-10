import { screen } from '@testing-library/react'
import MovieCard from '../MovieCard'
import userEvent from '@testing-library/user-event'
import { renderRedux } from './test-utils'
import { IMovie } from '../moviesSlice'

const movie: IMovie = {Title: "Harry Potter", Poster:"any", imdbID:"5"}


describe("MovieCard", ()=>{
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