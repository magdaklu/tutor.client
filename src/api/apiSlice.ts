import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FlashCard } from "../tutor/flash-cards/FlashCard.model";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_TUTOR_API }),
  endpoints: (builder) => ({
    getFlashcards: builder.query({
      query: () => "/quiz/flashcards",
    }),
    addFlashcard: builder.mutation<FlashCard, Partial<FlashCard>>({
      query: (body) => ({
        url: "/quiz/flashcards",
        method: "POST",
        body,
      }),
    }),
  }),
});

//Export the auto-generated hook for the `getFlashcards` query endpoint
export const { useGetFlashcardsQuery, useAddFlashcardMutation } = apiSlice;
