import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer'

// In production, this would be a database
const users: any[] = []

// Simple email verification storage (in production, use database)
const verificationTokens: { [key: string]: { email: string; expires: Date } } = {}

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = users.find(u => u.email === email)
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Generate verification token
    const verificationToken = Math.random().toString(36).substring(2) + Date.now().toString(36)
    
    // Create user (unverified)
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      role: 'user',
      verified: false,
      createdAt: new Date()
    }

    users.push(newUser)

    // Store verification token (expires in 24 hours)
    verificationTokens[verificationToken] = {
      email,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
    }

    // Send verification email
    await sendVerificationEmail(email, name, verificationToken)

    return NextResponse.json(
      { message: 'Registration successful! Please check your email to verify your account.' },
      { status: 201 }
    )

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function sendVerificationEmail(email: string, name: string, token: string) {
  // Email configuration (you'll need to set these environment variables)
  const transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  })

  const verificationUrl = `${process.env.NEXTAUTH_URL}/api/auth/verify?token=${token}`

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Verify Your FFWUP Account',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Welcome to FFWUP, ${name}!</h2>
        <p>Thank you for registering. Please click the button below to verify your email address:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" 
             style="background-color: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Verify Email Address
          </a>
        </div>
        <p>Or copy and paste this link in your browser:</p>
        <p style="color: #666; word-break: break-all;">${verificationUrl}</p>
        <p>This link will expire in 24 hours.</p>
        <p>If you didn't create this account, please ignore this email.</p>
      </div>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('Verification email sent to:', email)
  } catch (error) {
    console.error('Failed to send verification email:', error)
    // Don't throw error - user is still registered, just email failed
  }
}
