import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { fetchHealth } from '../lib/api'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['health'],
    queryFn: fetchHealth,
  })

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Welcome to your Sandbox!
        </h1>
        <p className="text-gray-600 mb-6">Chat with Cayu to build your perfect app!</p>
        <div className="bg-white rounded-lg shadow p-6">
          {isLoading && <p className="text-gray-600">Loading...</p>}
          {error && <p className="text-red-600">Error connecting to backend</p>}
          {data && (
            <p className="text-green-600 font-medium">Backend connected!</p>
          )}
        </div>
      </div>
    </div>
  )
}
