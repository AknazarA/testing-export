import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { fetchHealth } from '../lib/api'
import { CheckCircle2, Loader2, XCircle } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['health'],
    queryFn: fetchHealth,
  })

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900">
      {/* Geometric background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Hero content */}
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="space-y-4">
            <h1 className="text-7xl md:text-8xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-white via-indigo-200 to-white bg-clip-text text-transparent animate-in slide-in-from-top duration-700">
                Welcome to
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-in slide-in-from-bottom duration-700 delay-150">
                Your Sandbox
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-indigo-200/80 font-light tracking-wide max-w-2xl mx-auto animate-in fade-in duration-700 delay-300" style={{ fontFamily: 'Georgia, serif' }}>
              Chat with me to build your perfect application
            </p>
          </div>

          {/* Status card */}
          <div className="inline-block animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-indigo-500/20">
              {isLoading ? (
                <div className="flex items-center gap-3 text-indigo-300">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span className="text-lg font-medium">Connecting to backend...</span>
                </div>
              ) : null}

              {error ? (
                <div className="flex items-center gap-3 text-red-400">
                  <XCircle className="w-6 h-6" />
                  <span className="text-lg font-medium">Unable to connect to backend</span>
                </div>
              ) : null}

              {data ? (
                <div className="flex items-center gap-3 text-emerald-400">
                  <CheckCircle2 className="w-6 h-6" />
                  <span className="text-lg font-medium">Backend connected and ready</span>
                </div>
              ) : null}
            </div>
          </div>

          {/* Decorative elements */}
          <div className="flex items-center justify-center gap-2 pt-4 animate-in fade-in duration-700 delay-700">
            <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" style={{ animationDuration: '2s' }} />
            <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" style={{ animationDuration: '2s', animationDelay: '0.3s' }} />
            <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" style={{ animationDuration: '2s', animationDelay: '0.6s' }} />
          </div>
        </div>
      </div>
    </div>
  )
}
