import { DonorSidebar } from '@/components/donor/DonorSidebar'

export default function DonorLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <DonorSidebar />
      <div className="flex-1 md:ml-64 w-full">
        {children}
      </div>
    </div>
  )
}
