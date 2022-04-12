import { configureStore, Action } from '@reduxjs/toolkit';

import postsReducer from '../blog/slice'
import { ThunkAction } from 'redux-thunk'

export const store = configureStore({
  reducer: {
    posts: postsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk = ThunkAction<void, RootState, unknown, Action>;