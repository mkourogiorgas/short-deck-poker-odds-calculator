import { createSlice } from "@reduxjs/toolkit";
import { validateAsync } from "./asyncActions";
import { ValidationTable } from "../types";
import U from "./utils";
import C from "./constants";

const initialValidationState: ValidationTable = C.VALIDATION;

const validationSlice = createSlice({
  name: "validation",
  initialState: initialValidationState,
  reducers: {
    reset: () => initialValidationState,
  },
  extraReducers: (builder) => {
    builder.addCase(validateAsync.fulfilled, (state, action) => {
      U.runValidation(state, action.payload.table);
    });
  },
});

export const validationActions = validationSlice.actions;
export default validationSlice.reducer;
