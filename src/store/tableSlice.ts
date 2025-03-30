import { createSlice } from "@reduxjs/toolkit";
import { updateTableAsync, removeCardAsync } from "./asyncActions";
import { Players } from "../types";
import U from "./utils";
import C from "./constants";

const initialTableState: Players = C.TABLE;

const tableSlice = createSlice({
  name: "table",
  initialState: initialTableState,
  reducers: {
    reset: () => initialTableState,
  },
  extraReducers: (builder) => {
    builder.addCase(updateTableAsync.fulfilled, (state, action) => {
      const { position, slotIndex, card } = action.meta.arg;
      state[position][slotIndex] = card;
    });
    builder.addCase(removeCardAsync.fulfilled, (state, action) => {
      const { cardIndex } = action.meta.arg;
      U.removeCard(state, cardIndex);
    });
  },
});

export const tableActions = tableSlice.actions;
export default tableSlice.reducer;
