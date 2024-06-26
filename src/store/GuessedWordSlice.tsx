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

const fetchForNumberOfPages = async (url: string) => {
  let response = await axios.get(url);
  return response.data.total_pages;
};

export const fetchMovieName = createAsyncThunk(
  "movieName/fetchMovieName",
  async () => {
    const base_url = import.meta.env.VITE_MOVIEDB_BASE_URL;
    const strict_filters = `api_key=${
      import.meta.env.VITE_MOVIEDB
    }&with_genres=28&include_adult=false&include_video=false&language=en-US&with_original_language=en`;

    const url = base_url + strict_filters;

    let total_pages = await fetchForNumberOfPages(url);

    console.log("Total Pages", total_pages);

    const page_num = randomNumberGenerator(
      1,
      total_pages
      //import.meta.env.VITE_MOVIEDB_TOTAL_PAGES
    );
    console.log("Page Num", page_num);

    let new_filters = `api_key=${
      import.meta.env.VITE_MOVIEDB
    }&page=${page_num}&with_genres=28&include_adult=false&include_video=false&language=en-US&with_original_language=en`;
    /* const base_url = import.meta.env.VITE_MOVIEDB_BASE_URL;
      const strict_filters = `api_key=${
        import.meta.env.VITE_MOVIEDB
      }&page=${page_num}&with_genres=28&include_adult=false&include_video=false&language=en-US&with_original_language=en`;*/

    const new_url = base_url + new_filters;

    const response = await axios.get(new_url);

    if (response) {
      let random_num = randomNumberGenerator(
        0,
        response.data.results.length - 1
      );

      // console.log("Movie Data", response, random_num);
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
          if (!state.value.includes(action.payload)) {
            state.value.push(action.payload);
          }
        } else {
          state.maxCount += 1;
        }
      } else {
        alert(state.wordToGuess + " is the correct word!");
      }
    },

    showAnswer: (state) => {
      state.wordToGuess
        .split("")
        .forEach(
          (item: string) =>
            /[a-zA-Z]/.test(item.toLowerCase()) &&
            !state.value.includes(item.toLowerCase()) &&
            state.value.push(item.toLowerCase())
        );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovieName.fulfilled, (state, action) => {
      state.wordToGuess = action.payload;
    });
  },
});

export const { addToGuessedWord, showAnswer } = guessedWordSlice.actions;

export const guessedWord = (state: RootState) => state.guessedWordSlice.value;
export const maxCount = (state: RootState) => state.guessedWordSlice.maxCount;
export const wordToGuess = (state: RootState) =>
  state.guessedWordSlice.wordToGuess;
export default guessedWordSlice.reducer;
