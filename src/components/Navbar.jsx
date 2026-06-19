'use client'

import Link from 'next/link'
import { Droplet } from 'lucide-react'
import { usePathname } from 'next/navigation'

export function Navbar() {
  const pathname = usePathname()

  const isActive = (path) => {
    if (path === '/') return pathname === '/'
    return pathname.startsWith(path)
  }

  return (
    <header className="bg-gray-50 sticky top-0 z-50 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Droplet className="w-8 h-8 text-red-700" fill="currentColor" />
          <Link href="/" className="text-xl font-bold text-red-700">LifeFlow</Link>
        </div>
        <nav className="flex items-center gap-8">
          <Link
            href="/requests"
            className={isActive('/requests') ? "text-red-700 font-bold border-b-2 border-red-700 pb-1" : "text-gray-600 hover:text-red-700 font-medium transition"}
          >
            Donation Requests
          </Link>
          <Link
            href="/funding"
            className={isActive('/funding') ? "text-red-700 font-bold border-b-2 border-red-700 pb-1" : "text-gray-600 hover:text-red-700 font-medium transition"}
          >
            Funding
          </Link>
          <Link
            href="/login"
            className={isActive('/login') ? "text-red-700 font-bold border-b-2 border-red-700 pb-1" : "text-gray-600 hover:text-red-700 font-medium transition"}
          >
            Login
          </Link>
          <Link
            href="/register"
            className="bg-red-700 text-white px-6 py-2 rounded-md font-medium hover:bg-red-800 transition"
          >
            Join Now
          </Link>
        </nav>
      </div>
    </header>
  )
}
