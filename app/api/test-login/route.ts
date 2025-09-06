import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/validate-user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@ffwup.com',
        password: 'password123'
      })
    })

    const data = await response.json()
    
    return NextResponse.json({
      status: response.status,
      statusText: response.statusText,
      data: data,
      url: `${process.env.NEXTAUTH_URL}/api/validate-user`
    })
  } catch (error) {
    return NextResponse.json({ error: error.message })
  }
}
