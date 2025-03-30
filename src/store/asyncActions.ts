import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { Card } from "../types";

export const updateTableAsync = createAsyncThunk(
  "table/updateTableAsync",
  (args: { card: Card; position: string; slotIndex: number }) => {
    return args;
  }
);

export const removeCardAsync = createAsyncThunk(
  "table/removeCardAsync",
  (args: { cardIndex: number }) => {
    return args;
  }
);

export const validateAsync = createAsyncThunk(
  "validation/validateAsync",
  (_, { getState }) => {
    return getState() as RootState;
  }
);
