'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Home, BarChart3, Users, AlertCircle, Wallet, Droplet, Menu, X } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export function AdminSidebar() {
    const pathname = usePathname()
    const { logout } = useAuth()
    const [isOpen, setIsOpen] = useState(false)

    const navItems = [
        { href: '/', icon: Home, label: 'Home' },
        { href: '/admin', icon: BarChart3, label: 'Dashboard' },
        { href: '/admin/users', icon: Users, label: 'All Users' },
        { href: '/admin/requests', icon: AlertCircle, label: 'All Requests' },
        { href: '/admin/profile', icon: Users, label: 'Profile' },
    ]

    return (
        <>
            {/* Global Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-30">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-red-700 rounded-lg flex items-center justify-center text-white">
                        <Droplet className="w-5 h-5" fill="currentColor" />
                    </div>
                    <span className="font-bold text-red-700">LifeFlow Admin</span>
                </div>
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside className={`fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col py-6 px-4 z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-700 rounded-lg flex items-center justify-center text-white shrink-0">
                            <Droplet className="w-6 h-6" fill="currentColor" />
                        </div>
                        <div>
                            <h1 className="text-sm font-bold text-red-700 truncate">LifeFlow Admin</h1>
                            <p className="text-xs text-gray-600">System Control</p>
                        </div>
                    </div>
                    {/* Close button on mobile */}
                    <button onClick={() => setIsOpen(false)} className="md:hidden text-gray-400 hover:text-gray-600 p-1">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="flex-grow space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                        ? 'bg-red-50 text-red-700 border-l-4 border-red-700 rounded-r-lg font-semibold'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.label}
                            </Link>
                        )
                    })}
                </nav>

                <div className="border-t border-gray-200 pt-6">
                    <button onClick={() => { setIsOpen(false); logout(); }} className="flex w-full items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                        <Users className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </aside>
        </>
    )
}
