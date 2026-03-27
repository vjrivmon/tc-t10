export default function Question({ current, total, text }) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <p style={{ fontSize: '0.8rem', color: '#a7a9be', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>
        Question {current} of {total}
      </p>
      <div style={{
        background: '#1a1928',
        borderRadius: '12px',
        padding: '24px',
        border: '1px solid #2a2940'
      }}>
        <h2 style={{ fontSize: '1.15rem', lineHeight: '1.6', color: '#fffffe' }}>{text}</h2>
      </div>
    </div>
  )
}
