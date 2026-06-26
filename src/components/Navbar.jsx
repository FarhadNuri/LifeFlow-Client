'use client'

import Link from 'next/link'
import { Droplet, Menu, X, User } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'

export function Navbar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

  const isActive = (path) => {
    if (path === '/') return pathname === '/'
    return pathname.startsWith(path)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-gray-50 sticky top-0 z-50 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Droplet className="w-6 h-6 sm:w-8 sm:h-8 text-red-700" fill="currentColor" />
          <Link href="/" className="text-lg sm:text-xl font-bold text-red-700">LifeFlow</Link>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/requests"
            className={isActive('/requests') ? "text-red-700 font-bold border-b-2 border-red-700 pb-1" : "text-gray-600 hover:text-red-700 font-medium transition"}
          >
            Donation Requests
          </Link>
          <Link
            href="/search"
            className={isActive('/search') ? "text-red-700 font-bold border-b-2 border-red-700 pb-1" : "text-gray-600 hover:text-red-700 font-medium transition"}
          >
            Search Donors
          </Link>
          <Link
            href="/funding"
            className={isActive('/funding') ? "text-red-700 font-bold border-b-2 border-red-700 pb-1" : "text-gray-600 hover:text-red-700 font-medium transition"}
          >
            Funding
          </Link>
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center hover:bg-red-200 transition focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2"
              >
                <User className="w-5 h-5 text-red-700" />
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 flex flex-col overflow-hidden">
                  <Link
                    href={user.role === 'admin' ? '/admin' : user.role === 'volunteer' ? '/volunteer' : '/donor'}
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-700 font-medium"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => { setIsProfileMenuOpen(false); logout(); }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-700 font-medium"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className={isActive('/login') ? "text-red-700 font-bold border-b-2 border-red-700 pb-1" : "text-gray-600 hover:text-red-700 font-medium transition"}
            >
              Login
            </Link>
          )}
        </nav>

        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-gray-700 hover:text-red-700 transition"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isMenuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="flex flex-col py-4 px-4 space-y-4">
            <Link
              href="/search"
              onClick={closeMenu}
              className={isActive('/search') ? "text-red-700 font-bold py-2 border-l-4 border-red-700 pl-4" : "text-gray-600 hover:text-red-700 font-medium py-2 pl-4 transition"}
            >
              Search Donors
            </Link>
            <Link
              href="/requests"
              onClick={closeMenu}
              className={isActive('/requests') ? "text-red-700 font-bold py-2 border-l-4 border-red-700 pl-4" : "text-gray-600 hover:text-red-700 font-medium py-2 pl-4 transition"}
            >
              Donation Requests
            </Link>
            <Link
              href="/funding"
              onClick={closeMenu}
              className={isActive('/funding') ? "text-red-700 font-bold py-2 border-l-4 border-red-700 pl-4" : "text-gray-600 hover:text-red-700 font-medium py-2 pl-4 transition"}
            >
              Funding
            </Link>
            {user ? (
              <>
                <Link
                  href={user.role === 'admin' ? '/admin' : user.role === 'volunteer' ? '/volunteer' : '/donor'}
                  onClick={closeMenu}
                  className="text-gray-600 hover:text-red-700 font-medium py-2 pl-4 transition border-l-4 border-transparent"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => { closeMenu(); logout(); }}
                  className="text-left text-gray-600 hover:text-red-700 font-medium py-2 pl-4 transition border-l-4 border-transparent"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={closeMenu}
                className={isActive('/login') ? "text-red-700 font-bold py-2 border-l-4 border-red-700 pl-4" : "text-gray-600 hover:text-red-700 font-medium py-2 pl-4 transition"}
              >
                Login
              </Link>
            )}
            <Link
              href="/register"
              onClick={closeMenu}
              className="bg-red-700 text-white px-6 py-3 rounded-md font-medium hover:bg-red-800 transition text-center"
            >
              Join Now
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
