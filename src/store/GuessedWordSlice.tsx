import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface GuessedWordState {
  value: string[];
  maxCount: number;
  wordToGuess: string;
}

const initialState: GuessedWordState = {
  value: [],
  maxCount: 0,
  wordToGuess: "Jab We Met",
};
export const guessedWordSlice = createSlice({
  name: "guessedWord",
  initialState,
  reducers: {
    addToGuessedWord: (state, action: PayloadAction<string>) => {
      if (state.wordToGuess.toLowerCase().includes(action.payload)) {
        state.value.push(action.payload);
      } else {
        state.maxCount += 1;
      }
    },
  },
});

export const { addToGuessedWord } = guessedWordSlice.actions;

export const guessedWord = (state: RootState) => state.guessedWordSlice.value;
export const maxCount = (state: RootState) => state.guessedWordSlice.maxCount;
export default guessedWordSlice.reducer;
