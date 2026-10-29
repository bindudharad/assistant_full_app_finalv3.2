/**
 * OpenAI streaming client (Node-compatible).
 * Uses OPENAI_API_KEY from environment.
 */
import fetch from 'node-fetch';

export async function* streamOpenAI(prompt, model='gpt-4o-mini', temperature=0.2) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY not set in environment');

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      temperature,
      messages: [{role:'user', content: prompt}],
      stream: true
    })
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error('OpenAI API error: ' + txt);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let buf = '';

  while (true) {
    const {done, value} = await reader.read();
    if (done) break;
    buf += decoder.decode(value, {stream: true});
    const parts = buf.split('\n');
    buf = parts.pop();
    for (const p of parts) {
      const line = p.trim();
      if (!line) continue;
      if (line === 'data: [DONE]') return;
      if (line.startsWith('data: ')) {
        try {
          const parsed = JSON.parse(line.replace(/^data: /,''));
          const delta = parsed.choices && parsed.choices[0] && parsed.choices[0].delta && parsed.choices[0].delta.content;
          if (delta) yield delta;
        } catch (err) {
          // ignore non-json
        }
      }
    }
  }
}
