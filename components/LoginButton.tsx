'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'

export default function LoginButton() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="px-4 py-2 text-sm text-white">
        Loading...
      </div>
    )
  }

  if (session) {
    // User is logged in
    return (
      <div className="flex items-center space-x-2">
        <span className="text-white text-sm hidden sm:block">
          {session.user?.name}
        </span>
        
        {/* Show admin panel link if user is admin */}
        {(session.user as any)?.role === 'admin' && (
          <Link 
            href="/admin"
            className="text-white hover:text-black py-2 px-3 hover:bg-white transition rounded-md text-sm"
          >
            Admin
          </Link>
        )}
        
        <Link 
          href="/dashboard"
          className="text-white hover:text-black py-2 px-3 hover:bg-white transition rounded-md text-sm"
        >
          Dashboard
        </Link>
        
        <button
          onClick={() => signOut()}
          className="text-white hover:text-black py-2 px-3 hover:bg-white transition rounded-md text-sm"
        >
          Sign Out
        </button>
      </div>
    )
  }

  // User is not logged in
  return (
    <div className="flex items-center space-x-2">
      <Link
        href="/login"
        className="text-white hover:text-black py-2 px-4 hover:bg-white transition rounded-md text-sm"
      >
        Login
      </Link>
      <Link
        href="/register"
        className="text-white border border-white hover:text-black py-2 px-4 hover:bg-white transition rounded-md text-sm"
      >
        Register
      </Link>
    </div>
  )
}
