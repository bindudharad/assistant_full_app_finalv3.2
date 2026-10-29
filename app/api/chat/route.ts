import { NextResponse } from 'next/server'
import { streamOpenAI } from '../../lib/openaiClient'

export async function POST(req) {
  try {
    const body = await req.json();
    const message = body.message || '';
    // If OPENAI_API_KEY exists, stream from OpenAI; otherwise send simulated reply.
    if (process.env.OPENAI_API_KEY) {
      const stream = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of streamOpenAI(message)) {
              const payload = `data: ${JSON.stringify({delta: chunk})}\n\n`;
              controller.enqueue(new TextEncoder().encode(payload));
            }
            controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'));
            controller.close();
          } catch (err) {
            controller.enqueue(new TextEncoder().encode('data: ' + JSON.stringify({error: String(err)}) + '\n\n'));
            controller.close();
          }
        }
      });
      return new Response(stream, { headers: { 'Content-Type': 'text/event-stream' } });
    } else {
      // Fallback: simulated reply
      const reply = `Simulated reply to: ${message}`;
      return NextResponse.json({ reply });
    }
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
