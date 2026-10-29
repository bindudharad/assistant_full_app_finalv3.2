
# Assistant Web App (Skeleton)

This is a generated, merged skeleton that includes implemented core features and placeholders for many planned features.

## What is included
- Next.js App Router skeleton (`app/`)
- Basic chat UI and simulated API endpoints
- Supabase client placeholder
- File upload endpoint (stores files locally in the zip)
- Simple workers folder with scripts
- Implemented features: message send, edit, delete, folders, search, theme toggle, message reactions placeholder
- Incomplete features have clear TODOs and scaffolding

## How to run (locally)
1. Install dependencies: `npm install`
2. Run dev: `npm run dev`

The OpenAI and Supabase integrations are stubbed to avoid live keys being required. Replace lib/openaiClient.js and lib/supabaseClient.js with real credentials & secure usage for production.
\n\n## Recent enhancements\n- Streaming OpenAI client scaffold (lib/openaiClient.js).\n- Local DB messages API and persistence (app/api/messages).\n- Chunked uploads and PDF viewer.\n- Voice input & TTS controls.\n- Stripe & Supabase scaffolding.\n

## Finalization: What I implemented now
- Streaming /api/chat that serves Server-Sent Events when OPENAI_API_KEY is set.
- Stripe Checkout session creation and webhook handler.
- Supabase SSR scaffolding with @supabase/ssr.

### Required environment variables (add to .env.local)
```
OPENAI_API_KEY=sk-...
NEXT_PUBLIC_SUPABASE_URL=https://xxx
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID=price_xxx
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### How to run
1. `npm install`
2. Add .env.local with the variables above.
3. `npm run dev`
4. Visit http://localhost:3000/main/chat

### Security notes
- Never commit your secret keys to git. Use environment variables.
- Configure Stripe webhook endpoint in the dashboard to point at /api/stripe/webhook
