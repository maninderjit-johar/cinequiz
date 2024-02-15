import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { randomNumberGenerator } from "../utils/randomNumberGenerator";
import axios from "axios";

interface GuessedWordState {
  value: string[];
  maxCount: number;
  wordToGuess: string;
}

const initialState: GuessedWordState = {
  value: [],
  maxCount: 0,
  wordToGuess: "",
};

export const fetchMovieName = createAsyncThunk(
  "movieName/fetchMovieName",
  async () => {
    const page_num = randomNumberGenerator(
      1,
      import.meta.env.VITE_MOVIEDB_TOTAL_PAGES
    );
    const base_url = import.meta.env.VITE_MOVIEDB_BASE_URL;
    const strict_filters = `api_key=${
      import.meta.env.VITE_MOVIEDB
    }&import movieNameSlice from './MovieNameSlice';
page=${page_num}&with_genres=28&include_adult=false&include_video=false&language=en-US&with_original_language=en`;

    const url = base_url + strict_filters;

    const response = await axios.get(url);

    if (response) {
      let random_num = randomNumberGenerator(
        0,
        response.data.results.length - 1
      );

      console.log("Movie Data", response, random_num);
      return response.data.results[random_num].title;
    } else {
      return "Error Getting Movie";
    }
  }
);
export const guessedWordSlice = createSlice({
  name: "guessedWord",
  initialState,
  reducers: {
    addToGuessedWord: (state, action: PayloadAction<string>) => {
      if (state.maxCount <= 6) {
        if (state.wordToGuess.toLowerCase().includes(action.payload)) {
          state.value.push(action.payload);
        } else {
          state.maxCount += 1;
        }
      } else {
        alert(state.wordToGuess + " is the correct word!");
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovieName.fulfilled, (state, action) => {
      state.wordToGuess = action.payload;
    });
  },
});

export const { addToGuessedWord } = guessedWordSlice.actions;

export const guessedWord = (state: RootState) => state.guessedWordSlice.value;
export const maxCount = (state: RootState) => state.guessedWordSlice.maxCount;
export const wordToGuess = (state: RootState) =>
  state.guessedWordSlice.wordToGuess;
export default guessedWordSlice.reducer;
