export default function Answers({ answers, selected, correct, onSelect }) {
  const getStyle = (answer) => {
    const base = {
      display: 'block',
      width: '100%',
      padding: '14px 20px',
      marginBottom: '10px',
      borderRadius: '8px',
      border: '2px solid #2a2940',
      background: '#0f0e17',
      color: '#fffffe',
      fontSize: '0.95rem',
      textAlign: 'left',
      cursor: selected ? 'default' : 'pointer',
      transition: 'all 0.2s',
    }

    if (!selected) return base

    if (answer === correct) {
      return { ...base, background: '#15803d30', border: '2px solid #4ade80', color: '#4ade80' }
    }
    if (answer === selected) {
      return { ...base, background: '#7f1d1d30', border: '2px solid #f87171', color: '#f87171' }
    }
    return { ...base, opacity: '0.4' }
  }

  return (
    <div>
      {answers.map((answer, i) => (
        <button
          key={i}
          style={getStyle(answer)}
          onClick={() => !selected && onSelect(answer)}
          disabled={!!selected}
        >
          {answer}
        </button>
      ))}
    </div>
  )
}
