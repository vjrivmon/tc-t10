export default function Question({ current, total, text }) {
  return (
    <div>
      <p className="question-meta">Question {current} of {total}</p>
      <div className="question-box">
        <h2 className="question-text">{text}</h2>
      </div>
    </div>
  )
}
