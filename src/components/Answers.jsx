export default function Answers({ answers, selected, correct, onSelect }) {
  const getClass = (answer) => {
    if (!selected) return 'answer-btn'
    if (answer === correct)  return 'answer-btn correct'
    if (answer === selected) return 'answer-btn wrong'
    return 'answer-btn dimmed'
  }

  return (
    <div>
      {answers.map((answer, i) => (
        <button
          key={i}
          className={getClass(answer)}
          onClick={() => !selected && onSelect(answer)}
          disabled={!!selected}
        >
          {answer}
        </button>
      ))}
    </div>
  )
}
