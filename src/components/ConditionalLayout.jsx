'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

export function ConditionalLayout({ children }) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')
  const isDonorRoute = pathname?.startsWith('/donor')
  const isVolunteerRoute = pathname?.startsWith('/volunteer')

  if (isAdminRoute || isDonorRoute || isVolunteerRoute) {
    return <>{children}</>
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
