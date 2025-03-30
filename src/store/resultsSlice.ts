import { createSlice } from "@reduxjs/toolkit";
import { Results } from "../types";
import C from "./constants";

const initialResultState: Results = C.INITIAL_RESULT_STATE;

const resultsSlice = createSlice({
  name: "results",
  initialState: initialResultState,
  reducers: {
    reset: () => initialResultState,
    updateResults: (state, action) => {
      const { hero, villain, ranking, rounds } = action.payload.results;
      state.hero = hero;
      state.villain = villain;
      state.ranking = ranking;
      state.rounds = rounds;
    },
  },
});

export const resultsActions = resultsSlice.actions;
export default resultsSlice.reducer;
