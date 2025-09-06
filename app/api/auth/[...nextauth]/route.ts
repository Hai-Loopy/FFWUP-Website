import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

// In production, this would be a database
const users = [
  {
    id: "1",
    email: "admin@ffwup.com",
    password: "password123", // In production, use bcrypt hash
    name: "Admin User",
    role: "admin",
    verified: true
  }
  // User accounts will be added through registration
]

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

        // Find user (in production, query database)
        const user = users.find(u => u.email === credentials.email)
        
        if (!user) {
          return null
        }

        // Check if user is verified
        if (!user.verified) {
          throw new Error('Please verify your email before logging in')
        }

        // Check password (in production, use bcrypt.compare)
        if (credentials.password !== user.password) {
          return null
        }
        
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
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
