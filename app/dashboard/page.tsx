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
    if (status === 'loading') return // Still loading
    if (!session) router.push('/login') // Not logged in
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return null // Will redirect to login
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
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Login Successful!
            </h2>
            <p className="text-gray-600 mb-4">
              You are now logged into the FFWUP community dashboard.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-900">User Info</h3>
                <p className="text-blue-700 mt-1">Email: {session.user?.email}</p>
                <p className="text-blue-700">Name: {session.user?.name}</p>
                <p className="text-blue-700">Role: {(session.user as any)?.role}</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium text-green-900">Status</h3>
                <p className="text-green-700 mt-1">✅ Successfully Logged In</p>
                <p className="text-green-700">🔒 Dashboard Access Granted</p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-medium text-purple-900">Quick Actions</h3>
                <div className="mt-2 space-y-1">
                  {(session.user as any)?.role === 'admin' && (
                    <Link 
                      href="/admin"
                      className="block text-purple-700 hover:text-purple-900 text-sm"
                    >
                      → Admin Panel
                    </Link>
                  )}
                  <Link 
                    href="/"
                    className="block text-purple-700 hover:text-purple-900 text-sm"
                  >
                    → Back to Homepage
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
              <h3 className="font-medium text-yellow-900">Welcome Message</h3>
              <p className="text-yellow-700 mt-1">
                Welcome to the FFWUP community dashboard! This is a protected page that only logged-in users can access.
                {(session.user as any)?.role === 'admin' && 
                  ' As an admin, you have access to the admin panel where you can manage announcements and documents.'
                }
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
