import { configureStore } from "@reduxjs/toolkit";
import deckReducer from "./deckSlice";
import tableReducer from "./tableSlice";
import validationReducer from "./validationSlice";
import resultsReducer from "./resultsSlice";

const store = configureStore({
  reducer: {
    deck: deckReducer,
    table: tableReducer,
    validation: validationReducer,
    results: resultsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type PokerDispatch = typeof store.dispatch;

export default store;
