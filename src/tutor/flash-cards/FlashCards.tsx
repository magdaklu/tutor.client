import { useEffect, useState } from "react";
import FlashCardCheck from "./FlashCardCheck";
import axios from "axios";

const apiUrl = "https://tutor-api-dev.azurewebsites.net/quiz/flashcards";

export default function FlashCards() {
  useEffect(() => {
    axios.get(apiUrl).then((response: any) => {
      setFlashCards(response.data);
    });
  }, []);
  const [flashCards, setFlashCards] = useState([]);

  return <FlashCardCheck flashCards={flashCards} />;
}
