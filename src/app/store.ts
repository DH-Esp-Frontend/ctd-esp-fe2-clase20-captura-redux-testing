import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { moviesApi } from '../features/movies/moviesAPI';
import moviesSlice from '../features/movies/moviesSlice';

export const store = configureStore({
  reducer: {
    movies: moviesSlice,
    [moviesApi.reducerPath]: moviesApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(moviesApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
