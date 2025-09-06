import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { createClient } from '@supabase/supabase-js'

/* eslint-disable @typescript-eslint/no-explicit-any */

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          console.log('Auth attempt for:', credentials.email)

          const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', credentials.email)
            .single()

          if (error || !user) {
            console.log('User not found:', credentials.email)
            return null
          }

          if (!user.verified) {
            console.log('User not verified:', credentials.email)
            return null
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password_hash)
          
          if (!isPasswordValid) {
            console.log('Invalid password for:', credentials.email)
            return null
          }

          console.log('Login successful for:', credentials.email)
          
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  
  session: {
    strategy: "jwt",
  },
  
  pages: {
    signIn: "/login",
  },
  
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        (token as any).id = user.id
        (token as any).role = (user as any).role
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = (token as any).id
        (session.user as any).role = (token as any).role
      }
      return session
    },
  },
  
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
