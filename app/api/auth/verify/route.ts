import { NextRequest, NextResponse } from 'next/server'

/* eslint-disable @typescript-eslint/no-explicit-any */

// These should match the ones in register/route.ts
// In production, use a shared database
const users: any[] = []
const verificationTokens: { [key: string]: { email: string; expires: Date } } = {}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')

  if (!token) {
    return NextResponse.redirect(new URL('/login?error=invalid-token', request.url))
  }

  // Check if token exists and is not expired
  const tokenData = verificationTokens[token]
  if (!tokenData) {
    return NextResponse.redirect(new URL('/login?error=invalid-token', request.url))
  }

  if (new Date() > tokenData.expires) {
    delete verificationTokens[token]
    return NextResponse.redirect(new URL('/login?error=token-expired', request.url))
  }

  // Find user and verify
  const user = users.find(u => u.email === tokenData.email)
  if (user) {
    user.verified = true
    delete verificationTokens[token]
    return NextResponse.redirect(new URL('/login?success=email-verified', request.url))
  }

  return NextResponse.redirect(new URL('/login?error=user-not-found', request.url))
}
