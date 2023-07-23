import { configureStore, createSlice } from "@reduxjs/toolkit";

const intialMailState = { mails: [] };

const intialRecivedState = { mailRecieve: [] };

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

const mailRecieveSlice = createSlice({
  name: "mail-recieve",
  initialState: intialRecivedState,
  reducers: {
    fetchAddEmail(state, action) {
      state.mailRecieve = [...action.payload];
    },
  },
});

const store = configureStore({
  reducer: { mail: mailSlice.reducer, mailRecieve: mailRecieveSlice.reducer },
});

export const mailActions = mailSlice.actions;
export const recievedMailActions = mailRecieveSlice.actions;

export default store;
