
'use client'
import React, {useState} from 'react'
export default function Settings(){
  const [theme, setTheme] = useState('light')
  return (
    <div style={{padding:20}}>
      <h2>Settings</h2>
      <label>Theme: 
        <select value={theme} onChange={e=>setTheme(e.target.value)}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>
      <p>Other settings and personalization go here (memory, personas, model choice).</p>
    </div>
  )
}
