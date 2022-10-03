import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import flashCardsReducer from "../tutor/flash-cards/flashCardsSlice";

export default configureStore({
  reducer: {
    flashCards: flashCardsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
