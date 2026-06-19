import Link from 'next/link'
import { Droplet, Mail, Lock, Building2 } from 'lucide-react'
import { Navbar } from '@/components/Navbar'

export default function LoginPage() {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4">
      
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Droplet className="w-10 h-10 text-red-700" fill="currentColor" />
          <span className="text-3xl font-bold text-red-700">LifeFlow</span>
        </div>
        <p className="text-gray-600 text-lg">Connecting donors to lives in need.</p>
      </div>

      
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back</h2>
        <p className="text-gray-600 mb-8">Please enter your details to sign in.</p>

        <form className="space-y-6">
          
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="email"
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent placeholder:text-gray-400"
              />
            </div>
          </div>

          
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-900">Password</label>
              <Link href="#" className="text-sm text-red-700 hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="password"
                placeholder="•••••••••"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent placeholder:text-gray-400"
              />
            </div>
          </div>

          
          <button
            type="submit"
            className="cursor-pointer w-full bg-red-700 text-white py-3 rounded-lg font-semibold hover:bg-red-800 transition flex items-center justify-center gap-2"
          >
            Login <span>→</span>
          </button>
        </form>

        
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500 font-medium">OR ACCESS PORTAL</span>
          </div>
        </div>

        
        <Link href="#" className="w-full border-2 border-gray-200 text-gray-900 py-3 rounded-lg font-semibold hover:border-gray-300 hover:bg-gray-50 transition flex items-center justify-center gap-3">
          <Building2 className="w-5 h-5" />
          Hospital Staff Login
        </Link>

        
        <p className="text-center mt-8 text-gray-600">
          New here?{' '}
          <Link href="/register" className="text-red-700 font-semibold hover:underline">
            Create an account
          </Link>
        </p>

        
        <div className="flex items-center justify-center gap-6 mt-8 pt-8 border-t border-gray-200 text-sm text-gray-600">
          <Link href="#" className="hover:text-gray-900">Privacy Policy</Link>
          <Link href="#" className="hover:text-gray-900">Terms of Service</Link>
          <Link href="#" className="hover:text-gray-900">Contact Support</Link>
        </div>
      </div>
    </div>
    </>
  )
}
