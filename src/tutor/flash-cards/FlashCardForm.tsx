export default function FlashCardForm() {
  const handleQuestionChange = (event: any) => {
    const card = { question: event.target.value };
  };
  const handleAnswerChange = (event: any) => {
    const card = { answer: event.target.value };
  };
  return (
    <form>
      <h2>Flash Cards</h2>
      <h3>Add Flash Card</h3>
      <input type="text" onChange={handleQuestionChange} />
      <input type="text" onChange={handleAnswerChange} />
      <input type="submit" value="Save" />
    </form>
  );
}
