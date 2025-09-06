'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return
    if (!session) router.push('/login')
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">FFWUP Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {session.user?.name}</span>
              {(session.user as any)?.role === 'admin' && (
                <Link
                  href="/admin"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm"
                >
                  Admin Panel
                </Link>
              )}
              <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 px-4">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Dashboard - Login Successful!
          </h2>
          <p className="text-gray-600 mb-4">
            You are logged in as {session.user?.name} ({(session.user as any)?.role})
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded">
              <h3 className="font-medium text-blue-900">User Info</h3>
              <p className="text-blue-700 mt-1">Email: {session.user?.email}</p>
              <p className="text-blue-700">Role: {(session.user as any)?.role}</p>
            </div>
            
            {(session.user as any)?.role === 'admin' && (
              <div className="bg-green-50 p-4 rounded">
                <h3 className="font-medium text-green-900">Admin Actions</h3>
                <Link 
                  href="/admin"
                  className="text-green-700 hover:text-green-900 text-sm"
                >
                  → Go to Admin Panel
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
