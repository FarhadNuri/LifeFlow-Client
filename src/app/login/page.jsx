'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Droplet, Mail, Lock, Building2 } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')

    const result = await login(email, password)

    if (result.success) {
      if (result.user?.role === 'admin') {
        router.push('/admin') // Redirect to admin dashboard
      } else {
        router.push('/donor') // Redirect to donor dashboard
      }
    } else {
      setError(result.error || 'Login failed. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-4 sm:py-8 px-4 sm:px-6">
      
      <div className="text-center mb-6 sm:mb-8">
        <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
          <Droplet className="w-8 h-8 sm:w-10 sm:h-10 text-red-700" fill="currentColor" />
          <span className="text-2xl sm:text-3xl font-bold text-red-700">LifeFlow</span>
        </div>
        <p className="text-gray-600 text-base sm:text-lg">Connecting donors to lives in need.</p>
      </div>

      
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 p-5 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Welcome back</h2>
        <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">Please enter your details to sign in.</p>

        {error && (
          <div className="mb-4 p-3 rounded-lg text-sm bg-red-50 text-red-600 border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                name="email"
                type="email"
                required
                placeholder="name@example.com"
                className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent placeholder:text-gray-400 text-sm sm:text-base text-gray-900"
              />
            </div>
          </div>

          
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-900">Password</label>
              <Link href="#" className="text-xs sm:text-sm text-red-700 hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                name="password"
                type="password"
                required
                placeholder="•••••••••"
                className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent placeholder:text-gray-400 text-sm sm:text-base text-gray-900"
              />
            </div>
          </div>

          
          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer w-full bg-red-700 text-white py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-red-800 transition flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'} <span>→</span>
          </button>
        </form>

        
        <div className="relative my-6 sm:my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-xs sm:text-sm">
            <span className="px-2 bg-white text-gray-500 font-medium">OR ACCESS PORTAL</span>
          </div>
        </div>

        
        <Link href="/admin" className="w-full border-2 border-gray-200 text-gray-900 py-2.5 sm:py-3 rounded-lg font-semibold hover:border-gray-300 hover:bg-gray-50 transition flex items-center justify-center gap-3 text-sm sm:text-base">
          <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
          Hospital Staff Login
        </Link>

        
        <p className="text-center mt-6 sm:mt-8 text-gray-600 text-sm sm:text-base">
          New here?{' '}
          <Link href="/register" className="text-red-700 font-semibold hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    
    </div>
  )
}
