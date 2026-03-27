import { useState, useEffect } from 'react'
import Question from '../components/Question'
import Answers from '../components/Answers'

const API_URL = 'https://the-trivia-api.com/api/questions?limit=10'

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5)

export default function Quiz() {
  const [questions, setQuestions]         = useState([])
  const [shuffledAnswers, setShuffled]    = useState([])
  const [current, setCurrent]             = useState(0)
  const [selected, setSelected]           = useState(null)
  const [score, setScore]                 = useState(0)
  const [finished, setFinished]           = useState(false)
  const [loading, setLoading]             = useState(true)
  const [error, setError]                 = useState(null)

  const fetchQuestions = () => {
    setLoading(true)
    setError(null)
    setCurrent(0)
    setScore(0)
    setSelected(null)
    setFinished(false)

    fetch(API_URL)
      .then(res => { if (!res.ok) throw new Error('Error loading questions'); return res.json() })
      .then(data => {
        setQuestions(data)
        setShuffled(data.map(q => shuffle([q.correctAnswer, ...q.incorrectAnswers])))
        setLoading(false)
      })
      .catch(err => { setError(err.message); setLoading(false) })
  }

  useEffect(() => { fetchQuestions() }, [])

  const handleSelect = (answer) => {
    setSelected(answer)
    if (answer === questions[current].correctAnswer) setScore(s => s + 1)
  }

  const handleNext = () => {
    if (current + 1 >= questions.length) { setFinished(true) }
    else { setCurrent(c => c + 1); setSelected(null) }
  }

  const getResultMsg = () => {
    const pct = score / questions.length
    if (pct >= 0.9) return '🏆 Outstanding! You nailed it!'
    if (pct >= 0.7) return '🎉 Great job! Well done!'
    if (pct >= 0.5) return '👍 Not bad! Keep practicing.'
    return '📚 Keep studying, you\'ll do better next time!'
  }

  // ── Loading ──
  if (loading) return (
    <div className="quiz-page">
      <div className="quiz-card">
        <div className="quiz-header">
          <h1 className="quiz-title">⚡ Quiz App</h1>
          <p className="quiz-subtitle">Training Center SW</p>
        </div>
        <div className="loading-state">Loading...</div>
      </div>
    </div>
  )

  // ── Error ──
  if (error) return (
    <div className="quiz-page">
      <div className="quiz-card">
        <div className="quiz-header">
          <h1 className="quiz-title">⚡ Quiz App</h1>
          <p className="quiz-subtitle">Training Center SW</p>
        </div>
        <div className="error-state">
          <p>❌ {error}</p>
          <button className="next-btn" onClick={fetchQuestions}>Retry</button>
        </div>
      </div>
    </div>
  )

  // ── Finished ──
  if (finished) return (
    <div className="quiz-page">
      <div className="quiz-card">
        <div className="quiz-header">
          <h1 className="quiz-title">⚡ Quiz App</h1>
          <p className="quiz-subtitle">Training Center SW</p>
        </div>
        <div className="result-state">
          <div className="score-number">{score}/{questions.length}</div>
          <p className="score-label">correct answers</p>
          <p className="result-msg">{getResultMsg()}</p>
          <button className="next-btn" onClick={fetchQuestions}>Play again</button>
        </div>
      </div>
    </div>
  )

  // ── Quiz ──
  const q = questions[current]
  const progress = (current / questions.length) * 100

  return (
    <div className="quiz-page">
      <div className="quiz-card">
        <div className="quiz-header">
          <h1 className="quiz-title">⚡ Quiz App</h1>
          <p className="quiz-subtitle">Training Center SW</p>
        </div>

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <Question current={current + 1} total={questions.length} text={q.question.text ?? q.question} />

        <Answers
          answers={shuffledAnswers[current]}
          selected={selected}
          correct={q.correctAnswer}
          onSelect={handleSelect}
        />

        {selected && (
          <button className="next-btn" onClick={handleNext}>
            {current + 1 >= questions.length ? 'See results →' : 'Next question →'}
          </button>
        )}
      </div>
    </div>
  )
}
