import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'Simple test route working!' })
}

export async function POST() {
  return NextResponse.json({ message: 'POST request received!' })
}
