
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { NextAuthOptions } from "next-auth"
import bcrypt from "bcryptjs"

// Simple user database (in production, use a real database)
const users = [
  {
    id: "1",
    email: "admin@ffwup.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj9/7kDNkEO2", // "password123"
    name: "Admin User",
    role: "admin"
  },
  {
    id: "2", 
    email: "user@ffwup.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj9/7kDNkEO2", // "password123"
    name: "Regular User",
    role: "user"
  }
]

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { 
          label: "Email", 
          type: "email",
          placeholder: "Enter your email"
        },
        password: { 
          label: "Password", 
          type: "password",
          placeholder: "Enter your password"
        }
      },
      async authorize(credentials) {
        // Check if credentials exist
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials")
          return null
        }

        // Find user in our "database"
        const user = users.find(u => u.email === credentials.email)
        
        if (!user) {
          console.log("User not found")
          return null
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

        if (!isPasswordValid) {
          console.log("Invalid password")
          return null
        }

        console.log("User authenticated successfully")
        
        // Return user object (this will be stored in the session)
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      }
    })
  ],
  
  // Configure session strategy
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  
  // Custom pages
  pages: {
    signIn: "/login",        // Custom login page
    error: "/login",         // Redirect errors to login page
  },
  
  // Callbacks to customize the authentication flow
  callbacks: {
    // JWT callback - runs whenever a JWT is created, updated, or accessed
    async jwt({ token, user }) {
      // If user object exists (first time login), add user data to token
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    
    // Session callback - runs whenever a session is checked
    async session({ session, token }) {
      // Add token data to session
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },
  
  // Secret for JWT encryption (from environment variable)
  secret: process.env.NEXTAUTH_SECRET,
  
  // Enable debug messages in development
  debug: process.env.NODE_ENV === "development",
}

// Create the handler
const handler = NextAuth(authOptions)

// Export the handler for both GET and POST requests
export { handler as GET, handler as POST }
