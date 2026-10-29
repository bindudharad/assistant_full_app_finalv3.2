
'use client'
import React from 'react'
export default function ChatInput({value,onChange,onSend}) {
  return (
    <div>
      <textarea value={value} onChange={e=>onChange(e.target.value)} rows={3} />
      <button onClick={onSend}>Send</button>
    </div>
  )
}
