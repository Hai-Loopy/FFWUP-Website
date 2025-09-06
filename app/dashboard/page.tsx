'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function Dashboard() {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">FFWUP Community Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              {session ? (
                <>
                  <span className="text-gray-700">Welcome, {session.user?.name}</span>
                  {(session.user as any)?.role === 'admin' && (
                    <Link
                      href="/admin"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm"
                    >
                      Admin Panel
                    </Link>
                  )}
                </>
              ) : (
                <div className="text-sm text-gray-600">
                  <Link href="/login" className="text-blue-600 hover:text-blue-500">
                    Sign in
                  </Link>
                  to access more features
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 px-4">
        {/* Welcome Section */}
        <div className="bg-white overflow-hidden shadow rounded-lg mb-6">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Welcome to FFWUP Community
            </h2>
            <p className="text-gray-600 mb-4">
              Stay connected with our community through announcements, documents, and updates.
            </p>
            
            {!session && (
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">
                      Join Our Community
                    </h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>Register for an account to access exclusive content and stay updated with community news.</p>
                    </div>
                    <div className="mt-4">
                      <div className="-mx-2 -my-1.5 flex">
                        <Link
                          href="/register"
                          className="bg-blue-100 px-3 py-2 rounded-md text-sm font-medium text-blue-800 hover:bg-blue-200"
                        >
                          Register Now
                        </Link>
                        <Link
                          href="/login"
                          className="ml-3 bg-blue-100 px-3 py-2 rounded-md text-sm font-medium text-blue-800 hover:bg-blue-200"
                        >
                          Sign In
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Announcements Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                📢 Latest Announcements
              </h3>
              <div className="space-y-4">
                {/* Placeholder announcements */}
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-medium text-gray-900">Welcome to Our New Website</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    We are excited to launch our new community platform. Stay tuned for updates!
                  </p>
                  <p className="text-xs text-gray-500 mt-2">Posted by Admin • Just now</p>
                </div>
                
                <div className="text-center py-4">
                  <p className="text-gray-500 text-sm">More announcements coming soon...</p>
                </div>
              </div>
            </div>
          </div>

          {/* Documents Section */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                📄 Documents & Resources
              </h3>
              <div className="space-y-3">
                {session ? (
                  <div className="text-center py-4">
                    <p className="text-gray-500 text-sm">No documents available yet.</p>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-500 text-sm">
                      Please <Link href="/login" className="text-blue-600 hover:text-blue-500">sign in</Link> to access documents.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* User Status Section */}
        {session && (
          <div className="mt-6 bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Your Account
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-900">Status</h4>
                  <p className="text-green-700 mt-1">✅ Logged In</p>
                  <p className="text-green-700">📧 {session.user?.email}</p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900">Account Type</h4>
                  <p className="text-blue-700 mt-1">
                    {(session.user as any)?.role === 'admin' ? '👑 Administrator' : '👤 Member'}
                  </p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-medium text-purple-900">Quick Actions</h4>
                  <div className="mt-2 space-y-1">
                    {(session.user as any)?.role === 'admin' && (
                      <Link 
                        href="/admin"
                        className="block text-purple-700 hover:text-purple-900 text-sm"
                      >
                        → Admin Panel
                      </Link>
                    )}
                    <button 
                      onClick={() => window.location.reload()}
                      className="block text-purple-700 hover:text-purple-900 text-sm"
                    >
                      → Refresh Content
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
