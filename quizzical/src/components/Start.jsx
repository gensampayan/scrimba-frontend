
export default function Start({inClick}) {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1>Quizzical</h1>
      <h3>test your knowledge and wit</h3>
      <button onClick={inClick}>Start Quiz</button>
    </div>
  )
}
