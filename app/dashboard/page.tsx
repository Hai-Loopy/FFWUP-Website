'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function Dashboard() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-4">Please log in to access the dashboard.</p>
          <Link 
            href="/login" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Go to Login
          </Link>
        </div>
      </div>
    )
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
          <p className="text-gray-600 mb-6">
            You are successfully logged into the FFWUP community dashboard.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-900">User Information</h3>
              <p className="text-blue-700 mt-1">Email: {session.user?.email}</p>
              <p className="text-blue-700">Name: {session.user?.name}</p>
              <p className="text-blue-700">Role: {(session.user as any)?.role || 'user'}</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-medium text-green-900">Status</h3>
              <p className="text-green-700 mt-1">✅ Successfully Logged In</p>
              <p className="text-green-700">🔒 Dashboard Access Granted</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-medium text-purple-900">Quick Actions</h3>
              <div className="mt-2 space-y-2">
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
                <button
                  onClick={() => window.location.reload()}
                  className="block text-purple-700 hover:text-purple-900 text-sm text-left"
                >
                  → Refresh Dashboard
                </button>
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

          {(session.user as any)?.role === 'admin' && (
            <div className="mt-6 p-4 bg-red-50 rounded-lg">
              <h3 className="font-medium text-red-900">Admin Features</h3>
              <p className="text-red-700 mt-1 mb-3">
                You have administrator privileges. You can manage content and users.
              </p>
              <Link 
                href="/admin"
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
              >
                Go to Admin Panel
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
