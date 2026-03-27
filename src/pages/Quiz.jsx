import { useState, useEffect } from 'react'
import Question from '../components/Question'
import Answers from '../components/Answers'

const API_URL = 'https://the-trivia-api.com/api/questions?limit=10'

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5)

const styles = {
  page: {
    minHeight: '100vh',
    background: '#0f0e17',
    color: '#fffffe',
    fontFamily: "'Segoe UI', Arial, sans-serif",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  card: {
    width: '100%',
    maxWidth: '640px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '36px',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 800,
    letterSpacing: '-1px',
    marginBottom: '4px',
  },
  subtitle: {
    fontSize: '0.85rem',
    color: '#a7a9be',
    letterSpacing: '2px',
    textTransform: 'uppercase',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.1rem',
    color: '#a7a9be',
    padding: '60px 0',
  },
  loadingDot: {
    display: 'inline-block',
    animation: 'pulse 1.2s ease-in-out infinite',
  },
  btn: {
    width: '100%',
    padding: '14px',
    marginTop: '16px',
    background: '#e63946',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  progress: {
    height: '4px',
    background: '#2a2940',
    borderRadius: '99px',
    marginBottom: '28px',
    overflow: 'hidden',
  },
  error: {
    textAlign: 'center',
    color: '#f87171',
    padding: '40px 0',
  },
  result: {
    textAlign: 'center',
    padding: '20px 0',
  },
  score: {
    fontSize: '4rem',
    fontWeight: 800,
    color: '#e63946',
    lineHeight: 1,
    marginBottom: '8px',
  },
  scoreLabel: {
    fontSize: '0.9rem',
    color: '#a7a9be',
    marginBottom: '32px',
  },
  resultMsg: {
    fontSize: '1.2rem',
    marginBottom: '32px',
  }
}

export default function Quiz() {
  const [questions, setQuestions] = useState([])
  const [shuffledAnswers, setShuffledAnswers] = useState([])
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchQuestions = () => {
    setLoading(true)
    setError(null)
    setCurrent(0)
    setScore(0)
    setSelected(null)
    setFinished(false)

    fetch(API_URL)
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar preguntas')
        return res.json()
      })
      .then(data => {
        setQuestions(data)
        setShuffledAnswers(data.map(q =>
          shuffle([q.correctAnswer, ...q.incorrectAnswers])
        ))
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }

  useEffect(() => { fetchQuestions() }, [])

  const handleSelect = (answer) => {
    setSelected(answer)
    if (answer === questions[current].correctAnswer) {
      setScore(s => s + 1)
    }
  }

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setFinished(true)
    } else {
      setCurrent(c => c + 1)
      setSelected(null)
    }
  }

  const getResultMsg = () => {
    const pct = score / questions.length
    if (pct >= 0.9) return '🏆 Excellent! Outstanding performance!'
    if (pct >= 0.7) return '🎉 Great job! Well done!'
    if (pct >= 0.5) return '👍 Not bad! Keep practicing.'
    return '📚 Keep studying, you\'ll do better next time!'
  }

  if (loading) return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>⚡ Quiz App</h1>
          <p style={styles.subtitle}>Training Center SW</p>
        </div>
        <p style={styles.loading}>Loading...</p>
      </div>
    </div>
  )

  if (error) return (
    <div style={styles.page}>
      <div style={styles.card}>
        <p style={styles.error}>❌ {error}</p>
        <button style={styles.btn} onClick={fetchQuestions}>Retry</button>
      </div>
    </div>
  )

  if (finished) return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>⚡ Quiz App</h1>
          <p style={styles.subtitle}>Training Center SW</p>
        </div>
        <div style={styles.result}>
          <div style={styles.score}>{score}/{questions.length}</div>
          <p style={styles.scoreLabel}>correct answers</p>
          <p style={styles.resultMsg}>{getResultMsg()}</p>
          <button style={styles.btn} onClick={fetchQuestions}>Play again</button>
        </div>
      </div>
    </div>
  )

  const q = questions[current]
  const progress = ((current) / questions.length) * 100

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>⚡ Quiz App</h1>
          <p style={styles.subtitle}>Training Center SW</p>
        </div>

        <div style={styles.progress}>
          <div style={{ height: '100%', width: `${progress}%`, background: '#e63946', borderRadius: '99px', transition: 'width 0.4s' }} />
        </div>

        <Question current={current + 1} total={questions.length} text={q.question.text ?? q.question} />

        <Answers
          answers={shuffledAnswers[current]}
          selected={selected}
          correct={q.correctAnswer}
          onSelect={handleSelect}
        />

        {selected && (
          <button style={styles.btn} onClick={handleNext}>
            {current + 1 >= questions.length ? 'See results →' : 'Next question →'}
          </button>
        )}
      </div>
    </div>
  )
}
