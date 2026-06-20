import Link from 'next/link'
import { Droplet, Filter, Download, Search, ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react'

export default function AdminRequests() {
  return (
      <main className="px-12 py-8">
        {/* Header */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Global Donation Requests</h2>
            <p className="text-gray-600 mt-1">Reviewing all active and historical blood donation appeals across the network.</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-50">
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <Droplet className="w-6 h-6 text-red-700" />
              <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded">Active</span>
            </div>
            <p className="text-4xl font-bold text-gray-900 mb-1">142</p>
            <p className="text-sm text-gray-600">Pending Requests</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <Droplet className="w-6 h-6 text-blue-600" />
              <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded">Critical</span>
            </div>
            <p className="text-4xl font-bold text-gray-900 mb-1">28</p>
            <p className="text-sm text-gray-600">Emergency Appeals</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <Droplet className="w-6 h-6 text-orange-600" />
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">Fulfilled</span>
            </div>
            <p className="text-4xl font-bold text-gray-900 mb-1">1,048</p>
            <p className="text-sm text-gray-600">Total Successes</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <Droplet className="w-6 h-6 text-gray-400" />
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded">Expiring</span>
            </div>
            <p className="text-4xl font-bold text-gray-900 mb-1">12</p>
            <p className="text-sm text-gray-600">Due in 24h</p>
          </div>
        </div>

        {/* Search and Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or blood type..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-700"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Requester</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Blood Group</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Units Needed</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Deadline</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  {
                    name: 'David Henderson',
                    email: 'd.henderson@example.com',
                    blood: 'O-',
                    units: '3 Units',
                    location: 'St. Jude Medical Center',
                    deadline: 'Today, 5:00 PM',
                    status: 'Urgent',
                    statusColor: 'bg-amber-100 text-amber-700',
                  },
                  {
                    name: 'Elena Rodriguez',
                    email: 'e.rod@provider.net',
                    blood: 'A+',
                    units: '1 Unit',
                    location: 'City General Hospital',
                    deadline: 'Dec 15, 2024',
                    status: 'In Review',
                    statusColor: 'bg-blue-100 text-blue-700',
                  },
                  {
                    name: 'Marcus Thorne',
                    email: 'm.thorne@global.com',
                    blood: 'B-',
                    units: '2 Units',
                    location: 'Community Health Hub',
                    deadline: 'Dec 10, 2024',
                    status: 'Completed',
                    statusColor: 'bg-green-100 text-green-700',
                  },
                  {
                    name: 'Sarah Jenkins',
                    email: 'sarah.j@clinic.org',
                    blood: 'AB+',
                    units: '4 Units',
                    location: "Unity Children's Hospital",
                    deadline: 'Dec 01, 2024',
                    status: 'Expired',
                    statusColor: 'bg-gray-100 text-gray-700',
                  },
                ].map((req, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-400"></div>
                        <div>
                          <p className="font-semibold text-gray-900">{req.name}</p>
                          <p className="text-xs text-gray-600">{req.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-red-700 text-white font-bold text-sm">{req.blood}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{req.units}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{req.location}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{req.deadline}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-md text-xs font-semibold ${req.statusColor}`}>{req.status}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-center gap-2">
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-white">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 bg-red-700 text-white rounded-lg font-semibold">1</button>
            <button className="w-8 h-8 border border-gray-300 rounded-lg hover:bg-gray-100 font-semibold">2</button>
            <button className="w-8 h-8 border border-gray-300 rounded-lg hover:bg-gray-100 font-semibold">3</button>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-white">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>
    )
}
