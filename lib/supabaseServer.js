/**
 * Supabase SSR scaffold using @supabase/ssr
 * Replace NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY in .env.local
 */
import { createServerSupabaseClient } from '@supabase/ssr'

export function getServerSupabase(req) {
  // In Next.js app-router, you'll call this in route handlers that have access to cookies
  // This is a scaffold showing typical usage; adapt for your environment.
  const supabase = createServerSupabaseClient({ req })
  return supabase
}
