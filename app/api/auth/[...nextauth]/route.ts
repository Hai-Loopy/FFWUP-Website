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
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // Call our validation API route
          const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/validate-user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password
            })
          })

          if (!response.ok) {
            return null
          }

          const user = await response.json()
          return user

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
        token.id = user.id
        token.role = (user as any).role
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id as string
        (session.user as any).role = token.role as string
      }
      return session
    },
  },
  
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }