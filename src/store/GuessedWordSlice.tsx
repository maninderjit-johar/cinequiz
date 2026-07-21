import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { RootState } from "./store";
import { randomNumberGenerator } from "../utils/randomNumberGenerator";

const FALLBACK_MOVIES = [
  "The Dark Knight",
  "The Dark Knight Rises",
  "Interstellar",
  "Inception",
  "Jurassic Park",
  "The Lost World Jurassic Park",
  "Black Panther",
  "Mad Max Fury Road",
  "The Matrix",
  "The Matrix Reloaded",
  "Spider Man Into the Spider Verse",
  "Top Gun Maverick",
  "Mission Impossible",
  "Mission Impossible Fallout",
  "Guardians of the Galaxy",
  "The Social Network",
  "The Grand Budapest Hotel",
  "Back to the Future",
  "Raiders of the Lost Ark",
  "The Shawshank Redemption",
  "Forrest Gump",
  "The Lion King",
  "Finding Nemo",
  "Toy Story",
  "The Avengers",
  "Captain America Civil War",
  "Wonder Woman",
  "The Batman",
  "Dune",
  "Oppenheimer",
  "The Prestige",
  "Avatar",
  "Blade Runner",
  "Casino Royale",
  "John Wick",
  "The Bourne Identity",
  "Indiana Jones",
  "Pirates of the Caribbean",
  "The Lord of the Rings",
  "Harry Potter",
];

const RECENT_TITLE_LIMIT = 10;

interface GuessedWordState {
  value: string[];
  maxCount: number;
  wordToGuess: string;
  usedLetters: string[];
  recentTitles: string[];
  status: "idle" | "loading" | "playing" | "won" | "lost";
  source: "tmdb" | "curated";
}

const initialState: GuessedWordState = {
  value: [],
  maxCount: 0,
  wordToGuess: "",
  usedLetters: [],
  recentTitles: [],
  status: "idle",
  source: "curated",
};

const normalizeTitle = (title: string) => title.trim().toLowerCase();

const pickMovieTitle = (titles: string[], excludeTitles: string[] = []) => {
  const excluded = new Set(excludeTitles.map(normalizeTitle));
  const availableTitles = titles.filter((title) => !excluded.has(normalizeTitle(title)));
  const titlePool = availableTitles.length > 0 ? availableTitles : titles;

  return titlePool[randomNumberGenerator(0, titlePool.length - 1)];
};

const pickFallbackMovie = (excludeTitles: string[] = []) =>
  pickMovieTitle(FALLBACK_MOVIES, excludeTitles);

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
  async ({
    excludeTitles = [],
  }: {
    excludeTitles?: string[];
  } = {}): Promise<{ title: string; source: "tmdb" | "curated" }> => {
    const baseUrl = import.meta.env.VITE_MOVIEDB_BASE_URL;
    const apiKey = import.meta.env.VITE_MOVIEDB;

    if (!baseUrl || !apiKey) {
      return { title: pickFallbackMovie(excludeTitles), source: "curated" };
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
      const movies = movieResponse.data.results
        ?.map((movie: { title?: string }) => movie.title)
        .filter(Boolean);
      const title = movies?.length ? pickMovieTitle(movies, excludeTitles) : "";

      return { title: title || pickFallbackMovie(excludeTitles), source: title ? "tmdb" : "curated" };
    } catch {
      return { title: pickFallbackMovie(excludeTitles), source: "curated" };
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
        state.recentTitles = [
          action.payload.title,
          ...state.recentTitles.filter((title) => normalizeTitle(title) !== normalizeTitle(action.payload.title)),
        ].slice(0, RECENT_TITLE_LIMIT);
        state.status = "playing";
      })
      .addCase(fetchMovieName.rejected, (state) => {
        const title = pickFallbackMovie(state.recentTitles);
        state.wordToGuess = title;
        state.source = "curated";
        state.recentTitles = [
          title,
          ...state.recentTitles.filter((recentTitle) => normalizeTitle(recentTitle) !== normalizeTitle(title)),
        ].slice(0, RECENT_TITLE_LIMIT);
        state.status = "playing";
      });
  },
});

export const { addToGuessedWord, resetGame, showAnswer } = guessedWordSlice.actions;

export const guessedWord = (state: RootState) => state.guessedWordSlice.value;
export const maxCount = (state: RootState) => state.guessedWordSlice.maxCount;
export const wordToGuess = (state: RootState) => state.guessedWordSlice.wordToGuess;
export default guessedWordSlice.reducer;
