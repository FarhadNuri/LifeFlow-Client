'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Home, Heart, Plus, User, LogOut, LayoutDashboard, Menu, X } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export function DonorSidebar() {
    const pathname = usePathname()
    const { logout } = useAuth()
    const [isOpen, setIsOpen] = useState(false)

    const navItems = [
        { href: '/', icon: Home, label: 'Home' },
        { href: '/donor', icon: LayoutDashboard, label: 'Dashboard' },
        { href: '/donor/my-requests', icon: Heart, label: 'My Requests' },
        { href: '/donor/create-request', icon: Plus, label: 'Create Request' },
        { href: '/donor/profile', icon: User, label: 'Profile' },
    ]

    return (
        <>
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 z-30">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-red-700 rounded-lg flex items-center justify-center">
                        <Heart className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-red-700">LifeFlow Donor</span>
                </div>
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside className={`fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 flex flex-col p-6 z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>

                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-700 rounded-lg flex items-center justify-center">
                            <Heart className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="font-bold text-lg text-red-700">LifeFlow</h1>
                            <p className="text-xs text-slate-600">Donor Portal</p>
                        </div>
                    </div>

                    <button onClick={() => setIsOpen(false)} className="md:hidden text-slate-400 hover:text-slate-600 p-1">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="flex-1 space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 transition-colors ${isActive
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

                <div className="border-t border-slate-200 pt-4">
                    <button onClick={() => { setIsOpen(false); logout(); }} className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-100 w-full rounded-lg transition-colors">
                        <LogOut className="w-5 h-5" />
                        <span className="text-sm">Logout</span>
                    </button>
                </div>
            </aside>
        </>
    )
}
