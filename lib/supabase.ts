import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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