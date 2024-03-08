import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface PlayerInfoState {
  value: string;
}

const initialState: PlayerInfoState = { value: "" };

export const playerInfoSlice = createSlice({
  name: "playerInfo",
  initialState,
  reducers: {
    setPlayerName: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setPlayerName } = playerInfoSlice.actions;

export const playerName = (state: RootState) => state.playerInfoSlice.value;

export default playerInfoSlice.reducer;
