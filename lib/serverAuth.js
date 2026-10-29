/**
 * Server-side auth middleware scaffold.
 * Replace with actual @supabase/ssr code.
 */
export function requireUser(req) {
  // In a real app, verify cookie/session with Supabase
  // Here we just mock a user for dev
  return { id: 'user_demo', email: 'demo@example.com' }
}
