import FlashCardCheck from "./FlashCardCheck";
import { useGetFlashcardsQuery } from "../../api/apiSlice";

export default function FlashCards() {
  const {
    data: flashcards,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetFlashcardsQuery();

  return (
    <FlashCardCheck
      flashCards={flashcards}
      isLoading={isLoading}
      error={error}
    />
  );
}
