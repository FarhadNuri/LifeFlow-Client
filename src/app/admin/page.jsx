'use client'

import Link from 'next/link'
import { Users, Wallet, Droplet, Loader2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
  const router = useRouter()
  const [requests, setRequests] = useState([])
  const [users, setUsers] = useState([])
  const [totalFunds, setTotalFunds] = useState(0)
  const [loading, setLoading] = useState(true)
  const [viewModalData, setViewModalData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')
        const headers = { 'Authorization': `Bearer ${token}` }
        
        const [requestsRes, usersRes, donationsRes] = await Promise.all([
          fetch(${process.env.NEXT_PUBLIC_API_URL}, { headers }),
          fetch(${process.env.NEXT_PUBLIC_API_URL}, { headers }),
          fetch(${process.env.NEXT_PUBLIC_API_URL})
        ])

        if (requestsRes.ok) {
          const reqData = await requestsRes.json()
          setRequests(reqData)
        }
        if (usersRes.ok) {
          const userData = await usersRes.json()
          setUsers(userData)
        }
        if (donationsRes.ok) {
          const donationsData = await donationsRes.json()
          const sum = donationsData.reduce((acc, curr) => acc + Number(curr.amount.replace(/[^0-9.-]+/g, "")), 0)
          setTotalFunds(sum + 20100)
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-amber-100 text-amber-700'
      case 'In Progress': return 'bg-blue-100 text-blue-700'
      case 'Completed': return 'bg-green-100 text-green-700'
      case 'Cancelled': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const activeRequestsCount = requests.filter(r => r.status === 'Pending' || r.status === 'In Progress').length
  const totalDonorsCount = users.filter(u => u.role === 'donor').length
  const recentRequests = requests.slice(0, 5)

  return (
    <main className="px-4 md:px-12 py-8 mt-16 md:mt-0">
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Administrative Overview</h2>
          <p className="text-gray-600 mt-1">Real-time insights into donor activity and resource distribution.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Total Donors */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm text-gray-600">Total Donors</span>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-bold text-gray-900">{loading ? '...' : totalDonorsCount}</span>
            <span className="text-sm text-green-600 font-semibold">Live</span>
          </div>
          <p className="text-sm text-gray-600">Registered donors</p>
        </div>

        {/* Total Funding */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <Wallet className="w-5 h-5 text-amber-600" />
            </div>
            <span className="text-sm text-gray-600">Total Funding</span>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-bold text-gray-900">
              {loading ? '...' : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalFunds)}
            </span>
          </div>
          <p className="text-sm text-gray-600">Life-saving contributions raised</p>
        </div>

        {/* Active Requests */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Droplet className="w-5 h-5 text-red-700" fill="currentColor" />
            </div>
            <span className="text-sm text-gray-600">Active Requests</span>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-bold text-gray-900">{loading ? '...' : activeRequestsCount}</span>
            <span className="text-sm text-red-600 font-semibold">Urgent</span>
          </div>
          <p className="text-sm text-gray-600">Emergency appeals pending</p>
        </div>
      </div>

      {/* Recent Requests Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900">Recent Requests</h3>
          <Link href="/admin/requests" className="text-sm font-semibold text-red-700 hover:text-red-800">
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 md:px-6 py-3 font-semibold text-gray-700">Requester</th>
                <th className="px-4 md:px-6 py-3 font-semibold text-gray-700 text-center md:text-left">Blood Group</th>
                <th className="hidden md:table-cell px-6 py-3 font-semibold text-gray-700">Location</th>
                <th className="hidden md:table-cell px-6 py-3 font-semibold text-gray-700">Date & Time</th>
                <th className="hidden md:table-cell px-6 py-3 font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    <div className="flex justify-center items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin text-red-700" />
                      <span>Loading requests...</span>
                    </div>
                  </td>
                </tr>
              ) : recentRequests.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    No recent requests found.
                  </td>
                </tr>
              ) : (
                recentRequests.map((req) => (
                  <tr
                    key={req._id}
                    className="hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100 last:border-0"
                    onClick={() => setViewModalData(req)}
                  >
                    <td className="px-4 md:px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center font-bold text-red-700 text-sm shrink-0">
                          {req.donorName ? req.donorName.substring(0, 2).toUpperCase() : 'U'}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{req.donorName || 'Unknown User'}</p>
                          <p className="text-xs text-gray-600">{req.donorEmail}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4 text-center md:text-left">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-red-700 text-white font-bold text-sm">
                        {req.bloodGroup || 'N/A'}
                      </span>
                    </td>
                    <td className="hidden md:table-cell px-6 py-4 text-gray-600 capitalize">
                      {req.upazila}, {req.district}
                    </td>
                    <td className="hidden md:table-cell px-6 py-4 text-gray-600">
                      <div className="flex flex-col">
                        <span>{req.date}</span>
                        <span className="text-xs text-gray-500">{req.time}</span>
                      </div>
                    </td>
                    <td className="hidden md:table-cell px-6 py-4">
                      <span className={`px-3 py-1 rounded-md font-semibold text-xs ${getStatusColor(req.status)}`}>
                        {req.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      {viewModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-lg animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Request Details</h3>
            <div className="space-y-3 text-sm">
              <p className="text-gray-900"><span className="font-semibold text-gray-700">Blood Group:</span> {viewModalData.bloodGroup}</p>
              <p className="text-gray-900"><span className="font-semibold text-gray-700">Location:</span> <span className="capitalize">{viewModalData.upazila}, {viewModalData.district}</span></p>
              <p className="text-gray-900"><span className="font-semibold text-gray-700">Date:</span> {viewModalData.date}</p>
              <p className="text-gray-900"><span className="font-semibold text-gray-700">Time:</span> {viewModalData.time}</p>
              <p className="text-gray-900">
                <span className="font-semibold text-gray-700">Status:</span> 
                <span className={`ml-2 px-3 py-1 rounded-md text-xs font-semibold ${getStatusColor(viewModalData.status)}`}>{viewModalData.status}</span>
              </p>
              <div>
                <span className="font-semibold text-gray-700 block mb-1">Message:</span>
                <p className="bg-gray-50 p-3 rounded-lg text-gray-900 border border-gray-200">{viewModalData.message || 'No message provided.'}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button onClick={() => setViewModalData(null)} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors">Close</button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
