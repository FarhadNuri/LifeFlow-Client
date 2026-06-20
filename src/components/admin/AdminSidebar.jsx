'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart3, Users, AlertCircle, Wallet, Droplet } from 'lucide-react'

export function AdminSidebar() {
    const pathname = usePathname()

    const navItems = [
        { href: '/admin', icon: BarChart3, label: 'Dashboard' },
        { href: '/admin/users', icon: Users, label: 'All Users' },
        { href: '/admin/requests', icon: AlertCircle, label: 'All Requests' },
        { href: '#', icon: Wallet, label: 'Content Management' },
        { href: '/admin/profile', icon: Users, label: 'Profile' },
    ]

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col py-6 px-4 z-50">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-red-700 rounded-lg flex items-center justify-center text-white">
                    <Droplet className="w-6 h-6" fill="currentColor" />
                </div>
                <div>
                    <h1 className="text-sm font-bold text-red-700">LifeFlow Admin</h1>
                    <p className="text-xs text-gray-600">System Control</p>
                </div>
            </div>

            <nav className="flex-grow space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link 
                            key={item.label}
                            href={item.href} 
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                isActive 
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
                <Link href="/login" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                    <Users className="w-5 h-5" />
                    Logout
                </Link>
            </div>
        </aside>
    )
}
