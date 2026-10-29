
export default function ChatMessage({m}) {
  return (
    <div>
      <div><strong>{m.role}</strong></div>
      <pre>{m.content}</pre>
    </div>
  )
}
