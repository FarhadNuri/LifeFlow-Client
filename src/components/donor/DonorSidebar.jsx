'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Heart, Plus, User, LogOut, LayoutDashboard } from 'lucide-react'

export function DonorSidebar() {
    const pathname = usePathname()

    const navItems = [
        { href: '/donor', icon: LayoutDashboard, label: 'Dashboard' },
        { href: '/donor/my-requests', icon: Heart, label: 'My Requests' },
        { href: '/donor/create-request', icon: Plus, label: 'Create Request' },
        { href: '/donor/profile', icon: User, label: 'Profile' },
    ]

    return (
        <aside className="hidden md:flex md:w-64 bg-white border-r border-slate-200 flex-col p-6 fixed h-screen left-0 top-0 z-40">
            {/* Logo */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-red-700 rounded-lg flex items-center justify-center">
                        <Heart className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg text-red-700">LifeFlow</h1>
                        <p className="text-xs text-slate-600">Donor Portal</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link 
                            key={item.label}
                            href={item.href} 
                            className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                                isActive 
                                    ? 'bg-red-50 text-red-700 border-l-4 border-red-700 font-semibold rounded-r-lg' 
                                    : 'text-slate-600 hover:bg-slate-100 rounded-lg'
                            }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="text-sm">{item.label}</span>
                        </Link>
                    )
                })}
            </nav>

            {/* Logout */}
            <div className="border-t border-slate-200 pt-4">
                <Link href="/login" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-100 w-full rounded-lg transition-colors">
                    <LogOut className="w-5 h-5" />
                    <span className="text-sm">Logout</span>
                </Link>
            </div>
        </aside>
    )
}
