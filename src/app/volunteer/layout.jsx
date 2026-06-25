import { VolunteerSidebar } from '@/components/volunteer/VolunteerSidebar'

export default function VolunteerLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <VolunteerSidebar />
      <div className="flex-1 w-full md:ml-64">
        {children}
      </div>
    </div>
  )
}
