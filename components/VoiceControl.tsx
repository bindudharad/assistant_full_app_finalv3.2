'use client'
import React, {useEffect, useState} from 'react'

export default function VoiceControl({onResult}) {
  const [listening, setListening] = useState(false);
  useEffect(()=>{
    // no-op
  },[]);

  const start = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert('SpeechRecognition not supported in this browser');
    const r = new SpeechRecognition();
    r.lang = 'en-US';
    r.onresult = (e) => {
      const text = Array.from(e.results).map(r=>r[0].transcript).join(' ');
      onResult(text);
    };
    r.onend = ()=> setListening(false);
    r.start();
    setListening(true);
  }

  const speak = (text) => {
    if (!('speechSynthesis' in window)) return alert('TTS not supported in this browser');
    const u = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(u);
  }

  return (
    <div>
      <button onClick={start}>{listening ? 'Listening...' : 'Start voice'}</button>
      <button onClick={()=>speak('Hello from assistant')}>Speak test</button>
    </div>
  )
}
