export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Login successful! You are now logged in.</p>
      <a href="/login" className="text-blue-600 hover:underline">
        Back to Login
      </a>
    </div>
  )
}
