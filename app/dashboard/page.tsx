'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Still loading
    if (!session) router.push('/admin'); // Not logged in
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">FFWUP Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Welcome, {session.user?.email}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {(session.user as any)?.role || 'user'}
              </span>
              <button
                onClick={() => signOut()}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Dashboard Content
              </h2>
              <p className="text-gray-600 mb-6">
                You are successfully logged in as {(session.user as any)?.role || 'user'}!
              </p>
              
              {/* User Info Card */}
              <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
                <h3 className="text-lg font-medium text-gray-900 mb-4">User Information</h3>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium text-gray-500">ID:</dt>
                    <dd className="text-sm text-gray-900">{(session.user as any)?.id}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium text-gray-500">Email:</dt>
                    <dd className="text-sm text-gray-900">{session.user?.email}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium text-gray-500">Role:</dt>
                    <dd className="text-sm text-gray-900">{(session.user as any)?.role || 'user'}</dd>
                  </div>
                </dl>
              </div>

              {/* Admin Only Section */}
              {(session.user as any)?.role === 'admin' && (
                <div className="mt-8 bg-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-blue-900 mb-2">
                    Admin Section
                  </h3>
                  <p className="text-blue-700">
                    You have admin privileges and can access additional features.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}