import { createSlice } from "@reduxjs/toolkit";

export const flashCardsSlice = createSlice({
  name: "flashCards",
  initialState: {
    flashCards: [],
    error: undefined,
  },
  reducers: {
    flashCardsLoadSuccess: (state, action) => {
      state.flashCards = action.payload;
    },
    flashCardsLoadError: (state, action) => {
      state.flashCards = [];
      state.error = action.payload;
    },
    flashCardsLoadRequest: () => {},
    flashCardAdded(state, action) {
      // state.flashCards.unshift(action.payload);
    },
  },
});

export const {
  flashCardsLoadRequest,
  flashCardsLoadSuccess,
  flashCardsLoadError,
  flashCardAdded,
} = flashCardsSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const flashCardsLoadRequestAsync = () => (dispatch) => {
  // setTimeout(() => {
  //   dispatch(incrementByAmount(amount));
  // }, 1000);
};

export const selectFlashCards = (state) => state.flashCards;

export default flashCardsSlice.reducer;
