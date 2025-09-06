import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

/* eslint-disable @typescript-eslint/no-explicit-any */

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log('=== LOGIN ATTEMPT ===')
        console.log('Email received:', credentials?.email)
        console.log('Password received:', credentials?.password)
        console.log('Email length:', credentials?.email?.length)
        console.log('Password length:', credentials?.password?.length)
        
        // Super simple check - just log everything
        if (credentials?.email === 'admin@ffwup.com' && credentials?.password === 'password123') {
          console.log('✅ LOGIN SUCCESS')
          return {
            id: "1",
            email: "admin@ffwup.com",
            name: "Admin User",
          }
        }
        
        console.log('❌ LOGIN FAILED')
        console.log('Expected email: admin@ffwup.com')
        console.log('Expected password: password123')
        return null
      }
    })
  ],
  
  session: {
    strategy: "jwt",
  },
  
  pages: {
    signIn: "/login",
  },
  
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
})

export { handler as GET, handler as POST }
