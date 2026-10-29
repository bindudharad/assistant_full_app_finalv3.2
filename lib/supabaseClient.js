
/**
 * Supabase client placeholder
 * Replace with real client initialization and secure usage in production.
 */
export function getSupabase() {
  return {
    auth: {
      // Mock functions
      signIn: async ({email, password}) => ({user:{id:'user_1', email}}),
      signUp: async ({email, password}) => ({user:{id:'user_1', email}}),
    },
    from: () => ({insert: async ()=>({}), select: async ()=>({})})
  }
}
