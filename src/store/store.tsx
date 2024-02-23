import { configureStore } from "@reduxjs/toolkit";
import guessedWordSlice from "./GuessedWordSlice.tsx";
import movieNameSlice from "./MovieNameSlice";
import playerInfoSlice from "./PlayerInfoSlice";

export const store = configureStore({
  reducer: {
    guessedWordSlice: guessedWordSlice,
    playerInfoSlice: playerInfoSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
