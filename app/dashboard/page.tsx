'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function Dashboard() {
  const { data: session, status } = useSession()

  // Debug logging to console
  console.log('Dashboard - Status:', status)
  console.log('Dashboard - Session:', session)
  console.log('Dashboard - Session User:', session?.user)

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading session...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Debug Information Display */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-bold mb-4">Session Debug Information</h2>
        <div className="space-y-2 text-sm">
          <p><strong>Status:</strong> {status}</p>
          <p><strong>Session exists:</strong> {session ? 'Yes' : 'No'}</p>
          <p><strong>User exists:</strong> {session?.user ? 'Yes' : 'No'}</p>
          {session?.user && (
            <>
              <p><strong>User Name:</strong> {session.user.name || 'Not provided'}</p>
              <p><strong>User Email:</strong> {session.user.email || 'Not provided'}</p>
              <p><strong>User ID:</strong> {(session.user as any)?.id || 'Not provided'}</p>
              <p><strong>User Role:</strong> {(session.user as any)?.role || 'Not provided'}</p>
            </>
          )}
          <div className="mt-4">
            <p><strong>Full Session Object:</strong></p>
            <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto">
              {JSON.stringify(session, null, 2)}
            </pre>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      {!session ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-red-900 mb-2">Access Denied - No Session Found</h2>
          <p className="text-red-700 mb-4">
            The authentication was successful, but no session data was received by the dashboard.
          </p>
          <Link 
            href="/login" 
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Try Logging In Again
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Success Message */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-green-900 mb-2">Login Successful!</h2>
            <p className="text-green-700">
              Welcome to the dashboard, {session.user?.name || 'User'}!
            </p>
          </div>

          {/* Navigation Bar */}
          <nav className="bg-white shadow rounded-lg">
            <div className="px-6 py-4">
              <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold">FFWUP Dashboard</h1>
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

          {/* User Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-900">User Information</h3>
              <p className="text-blue-700 mt-1">Email: {session.user?.email}</p>
              <p className="text-blue-700">Name: {session.user?.name}</p>
              <p className="text-blue-700">Role: {(session.user as any)?.role || 'user'}</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-medium text-green-900">Authentication Status</h3>
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
              </div>
            </div>
          </div>

          {/* Admin Section */}
          {(session.user as any)?.role === 'admin' && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="font-medium text-yellow-900">Administrator Access</h3>
              <p className="text-yellow-700 mt-1 mb-3">
                You have administrator privileges and can access the admin panel.
              </p>
              <Link 
                href="/admin"
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded text-sm"
              >
                Go to Admin Panel
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
