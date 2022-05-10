import React from 'react'
import {  render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import moviesReducer, { IMovie }  from "../moviesSlice"
import { moviesApi } from '../moviesAPI'


export function renderRedux(component: React.ReactNode, initialState = {movies: {favs: [] as IMovie[] , movies: [] as IMovie[]}}) {
  const store = configureStore({ reducer: {movies: moviesReducer, moviesApi: moviesApi.reducer},  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(moviesApi.middleware), preloadedState: initialState});
  return {
      ...render( <Provider store={store}>
        {component}
      </Provider>),
      store
  }
}