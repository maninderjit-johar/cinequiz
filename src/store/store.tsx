import { configureStore } from "@reduxjs/toolkit";
import guessedWordSlice from "./GuessedWordSlice.tsx";
import movieNameSlice from "./MovieNameSlice";

export const store = configureStore({
  reducer: {
    guessedWordSlice: guessedWordSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
