
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



export const moviesApi = createApi({
    reducerPath: "moviesApi",
    baseQuery: fetchBaseQuery({baseUrl: "https://www.omdbapi.com/"}),
    endpoints: builder =>({
        getMovies: builder.query({
            query: (movie: string)=> `?apikey=45a4b61b&s=${movie}`,
        })
    })
})      

export const { useGetMoviesQuery } = moviesApi