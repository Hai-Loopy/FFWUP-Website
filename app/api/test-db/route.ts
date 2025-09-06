import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  try {
    console.log('Testing database connection...')
    
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('email, name, role, verified')
      .limit(5)

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log('Database query successful:', data)
    return NextResponse.json({ 
      success: true,
      users: data,
      message: 'Database connection working!'
    })
  } catch (error) {
    console.error('Connection failed:', error)
    return NextResponse.json({ 
      error: 'Connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}