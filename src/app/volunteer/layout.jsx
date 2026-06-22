import { VolunteerSidebar } from '@/components/volunteer/VolunteerSidebar'

export default function VolunteerLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <VolunteerSidebar />
      <div className="ml-64 flex-1">
        {children}
      </div>
    </div>
  )
}
