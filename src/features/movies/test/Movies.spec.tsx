import { screen } from '@testing-library/react'
import { rest  } from 'msw'
import { setupServer } from 'msw/node'  
import Movies from '../Movies'
import { IMovie }  from "../moviesSlice"
import { renderRedux } from './test-utils'

const handlers = [
  rest.get("https://www.omdbapi.com/", (req, res, ctx)=>{
      const movies: IMovie[] = [{Title: "Harry Potter", Poster:"any", imdbID:"8"}, {Title: "Facebook", Poster:"any", imdbID:"5"}]
      const mockResponse = {Search: movies}
      return res(ctx.json(mockResponse))
    })
  ]

const server = setupServer(...handlers)
// Establish API mocking before all tests.
beforeAll(() => server.listen())
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers())
// Clean up after the tests are finished.
afterAll(() => server.close())

jest.mock('../MovieCard', ()=>()=>{
  return <div>Movie Card</div>
})

describe("Movies", ()=>{
  describe("Initially", ()=>{
    it("should show a loading state", async()=>{
        renderRedux(<Movies />)
        expect(screen.getByText("Loading....")).toBeInTheDocument()
    })
  })
  describe("After a few seconds", ()=>{
    it("should render the show a loading state", async()=>{
      renderRedux(<Movies />)
      expect((await screen.findAllByText("Movie Card")).length).toBeGreaterThan(0)
      expect(screen.queryByText("Loading....")).not.toBeInTheDocument()
    })
  })
  describe("On error", ()=>{
    it("should handle the error", async()=>{
      server.use(
        rest.get("https://www.omdbapi.com/", (req, res, ctx) => {
         return res(ctx.status(500))
       })
       )
       renderRedux(<Movies />)
       expect(screen.getByText("Loading....")).toBeInTheDocument()
       expect(await screen.findByText("Oops... Algo salio mal :(")).toBeInTheDocument()
    })
  })
})





