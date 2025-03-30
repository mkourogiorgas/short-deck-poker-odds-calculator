import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Card } from "../types";
import U from "./utils";

const initialDeckState: Card[] = U.getDeck();

const deckSlice = createSlice({
  name: "deck",
  initialState: initialDeckState,
  reducers: {
    reset: () => initialDeckState,
    updateDeck(
      state,
      action: PayloadAction<{ cardIndex: number; isSelected: boolean }>
    ) {
      U.updateDeck(state, action.payload);
    },
  },
});

export const deckActions = deckSlice.actions;
export default deckSlice.reducer;
