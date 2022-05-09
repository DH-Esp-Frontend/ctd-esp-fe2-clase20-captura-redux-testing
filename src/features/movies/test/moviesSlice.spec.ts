import moviesReducer, { addFav, deleteFav, IMovie, IState } from "../moviesSlice"


describe("movies reducer", ()=>{
    const initialState: IState = { 
        favs: [],
        movies: []
    }
    const movie: IMovie = {Poster: "any", Title: "fast and furious", imdbID: "5"}
    describe("As default state", ()=>{
        it("should return the initial state", ()=>{ 
            expect(moviesReducer(initialState, {type: "any"})).toEqual({ 
                favs: [],
                movies: []
            })
        })
    })
    describe("On addFav", ()=>{
        it("should add the movie to the fav list", ()=>{
            const actual =  moviesReducer(initialState, addFav(movie))
            expect(actual.favs).toEqual([movie])
        })
        it("should add another movie to an existing list", ()=>{
            const prevState: IState = {
                favs: [movie],
                movies: []
            }
            const newMovie: IMovie = {Poster: "any", Title: "Imitation game", imdbID:"6"}
            const actual =  moviesReducer(prevState, addFav(newMovie))
            expect(actual.favs).toEqual([movie, newMovie])
        })
    })
    describe("On deleteFav", ()=>{
        it("should remove the passed movie to the list", ()=>{
            const prevState: IState = {
                favs: [movie],
                movies: []
            }
            const actual = moviesReducer(prevState, deleteFav("5"))
            expect(actual.favs.length).toBe(0)
        })
    })
})
