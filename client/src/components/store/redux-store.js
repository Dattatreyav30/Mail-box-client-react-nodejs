import { configureStore, createSlice } from "@reduxjs/toolkit";

const intialMailState = { mails: [] };

const mailSlice = createSlice({
  name: "email",
  initialState: intialMailState,
  reducers: {
    addEmail(state, action) {
      state.mails = [action.payload, ...state.mails];
    },
    fetchAdd(state, action) {
      state.mails = [...action.payload];
    },
  },
});

const store = configureStore({
  reducer: { mail: mailSlice.reducer },
});

export const mailActions = mailSlice.actions;

export default store;
