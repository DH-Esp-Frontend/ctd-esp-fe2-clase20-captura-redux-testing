import { screen } from '@testing-library/react'
import MovieCard from '../MovieCard'
import userEvent from '@testing-library/user-event'
import { renderRedux } from './test-utils'
import { IMovie } from '../moviesSlice'

const movie: IMovie = {Title: "Harry Potter", Poster:"any", imdbID:"5"}


describe("MovieCard", ()=>{
    describe("if the movie is not added", ()=>{
      it("should show the fav botton", ()=>{
          renderRedux(<MovieCard data={movie}/>)
          expect(screen.getByTestId("fav")).toBeInTheDocument()
          })
    })
    describe("if the movie is added", ()=>{
      it("should show the un-fav botton", async ()=>{
          renderRedux(<MovieCard data={movie}/>, {movies: {favs: [movie], movies: []}})
          expect(screen.getByTestId("un-fav")).toBeInTheDocument()
        })
    })
    describe("OnClick", ()=>{
      it("should change the botton", async()=>{
        renderRedux(<MovieCard data={movie}/>)
        expect(screen.getByTestId("fav")).toBeInTheDocument()
        await userEvent.click(screen.getByTestId("fav"))
        expect(screen.getByTestId("un-fav")).toBeInTheDocument()
      })
    })
})