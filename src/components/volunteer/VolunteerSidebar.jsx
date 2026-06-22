'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart3, AlertCircle, User, Droplet } from 'lucide-react'

export function VolunteerSidebar() {
    const pathname = usePathname()

    const navItems = [
        { href: '/volunteer', icon: BarChart3, label: 'Dashboard' },
        { href: '/volunteer/all-blood-donation-request', icon: AlertCircle, label: 'All Requests' },
        { href: '/volunteer/profile', icon: User, label: 'Profile' },
    ]

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col py-6 px-4 z-50">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center text-white">
                    <Droplet className="w-6 h-6" fill="currentColor" />
                </div>
                <div>
                    <h1 className="text-sm font-bold text-amber-600">LifeFlow Volunteer</h1>
                    <p className="text-xs text-gray-600">Support Panel</p>
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
                                    ? 'bg-amber-50 text-amber-600 border-l-4 border-amber-500 rounded-r-lg font-semibold' 
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
                    <User className="w-5 h-5" />
                    Logout
                </Link>
            </div>
        </aside>
    )
}
