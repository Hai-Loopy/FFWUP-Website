import { createClient } from '@supabase/supabase-js'

// Server-side Supabase client (for API routes)
const supabaseUrl = process.env.SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

// Client-side helper functions
export async function authenticateUser(email: string, password: string) {
  // This will be called from the NextAuth provider
  const response = await fetch('/api/auth/validate-user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  return response.json()
}

// Types for our database tables
export interface User {
  id: string
  email: string
  name: string
  password_hash: string
  role: 'user' | 'admin'
  verified: boolean
  created_at: string
}

export interface Announcement {
  id: string
  title: string
  content: string
  image_url?: string
  author_id: string
  created_at: string
}