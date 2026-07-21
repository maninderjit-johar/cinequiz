import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { RootState } from "./store";
import { randomNumberGenerator } from "../utils/randomNumberGenerator";

const FALLBACK_MOVIES = [
  "The Dark Knight",
  "Interstellar",
  "Inception",
  "Jurassic Park",
  "Black Panther",
  "Mad Max Fury Road",
  "The Matrix",
  "Spider Man",
  "Top Gun Maverick",
  "Mission Impossible",
  "Guardians of the Galaxy",
  "The Social Network",
];

interface GuessedWordState {
  value: string[];
  maxCount: number;
  wordToGuess: string;
  usedLetters: string[];
  status: "idle" | "loading" | "playing" | "won" | "lost";
  source: "tmdb" | "curated";
}

const initialState: GuessedWordState = {
  value: [],
  maxCount: 0,
  wordToGuess: "",
  usedLetters: [],
  status: "idle",
  source: "curated",
};

const pickFallbackMovie = () =>
  FALLBACK_MOVIES[randomNumberGenerator(0, FALLBACK_MOVIES.length - 1)];

const isSolved = (title: string, guesses: string[]) =>
  title
    .split("")
    .every((char) => !/[a-zA-Z]/.test(char) || guesses.includes(char.toLowerCase()));

const revealTitleLetters = (state: GuessedWordState) => {
  state.wordToGuess.split("").forEach((item: string) => {
    const letter = item.toLowerCase();

    if (/[a-z]/.test(letter)) {
      if (!state.value.includes(letter)) {
        state.value.push(letter);
      }

      if (!state.usedLetters.includes(letter)) {
        state.usedLetters.push(letter);
      }
    }
  });
};

export const fetchMovieName = createAsyncThunk(
  "movieName/fetchMovieName",
  async (): Promise<{ title: string; source: "tmdb" | "curated" }> => {
    const baseUrl = import.meta.env.VITE_MOVIEDB_BASE_URL;
    const apiKey = import.meta.env.VITE_MOVIEDB;

    if (!baseUrl || !apiKey) {
      return { title: pickFallbackMovie(), source: "curated" };
    }

    try {
      const filters = new URLSearchParams({
        api_key: apiKey,
        with_genres: "28",
        include_adult: "false",
        include_video: "false",
        language: "en-US",
        with_original_language: "en",
      });

      const firstResponse = await axios.get(`${baseUrl}${filters.toString()}`);
      const totalPages = Math.min(firstResponse.data.total_pages || 1, 500);
      filters.set("page", String(randomNumberGenerator(1, totalPages)));

      const movieResponse = await axios.get(`${baseUrl}${filters.toString()}`);
      const movies = movieResponse.data.results?.filter((movie: { title?: string }) => movie.title);
      const movie = movies?.[randomNumberGenerator(0, movies.length - 1)];

      return { title: movie?.title || pickFallbackMovie(), source: movie?.title ? "tmdb" : "curated" };
    } catch {
      return { title: pickFallbackMovie(), source: "curated" };
    }
  }
);

export const guessedWordSlice = createSlice({
  name: "guessedWord",
  initialState,
  reducers: {
    addToGuessedWord: (state, action: PayloadAction<string>) => {
      if (state.status !== "playing") return;

      const letter = action.payload.toLowerCase();

      if (!/[a-z]/.test(letter) || state.usedLetters.includes(letter)) return;

      state.usedLetters.push(letter);

      if (state.wordToGuess.toLowerCase().includes(letter)) {
        state.value.push(letter);

        if (isSolved(state.wordToGuess, state.value)) {
          state.status = "won";
        }
      } else {
        state.maxCount += 1;

        if (state.maxCount >= 6) {
          state.status = "lost";
          revealTitleLetters(state);
        }
      }
    },
    showAnswer: (state) => {
      revealTitleLetters(state);
      state.status = "lost";
    },
    resetGame: (state) => {
      state.value = [];
      state.maxCount = 0;
      state.wordToGuess = "";
      state.usedLetters = [];
      state.status = "loading";
      state.source = "curated";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieName.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovieName.fulfilled, (state, action) => {
        state.wordToGuess = action.payload.title;
        state.source = action.payload.source;
        state.status = "playing";
      })
      .addCase(fetchMovieName.rejected, (state) => {
        state.wordToGuess = pickFallbackMovie();
        state.source = "curated";
        state.status = "playing";
      });
  },
});

export const { addToGuessedWord, resetGame, showAnswer } = guessedWordSlice.actions;

export const guessedWord = (state: RootState) => state.guessedWordSlice.value;
export const maxCount = (state: RootState) => state.guessedWordSlice.maxCount;
export const wordToGuess = (state: RootState) => state.guessedWordSlice.wordToGuess;
export default guessedWordSlice.reducer;
