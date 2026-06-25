import { AdminSidebar } from '@/components/admin/AdminSidebar'

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      {/* 
        The main content wrappers should have margin-left to offset the fixed sidebar.
        Each page should provide its own <main className="ml-64 flex-1 ..."> 
        or we can wrap it here. Let's wrap it here to keep pages clean!
      */}
      <div className="flex-1 w-full md:ml-64">
        {children}
      </div>
    </div>
  )
}
