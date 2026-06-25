'use client'

import { MapPin, Calendar, Clock, Bookmark, ArrowRight, Heart, Filter, Plus } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

const bloodTypeColors = {
  'A+': 'bg-red-700 text-white',
  'A-': 'bg-red-100 text-red-700',
  'B+': 'bg-red-700 text-white',
  'B-': 'bg-purple-100 text-purple-700',
  'O+': 'bg-orange-100 text-orange-700',
  'O-': 'bg-red-100 text-red-700',
  'AB+': 'bg-blue-100 text-blue-700',
  'AB-': 'bg-purple-100 text-purple-700',
}

const statusTextColors = {
  'Critical': 'text-red-700 font-bold',
  'High': 'text-orange-600',
  'Medium': 'text-yellow-600',
  'Low': 'text-gray-600',
}

export default function ActiveRequests() {
  const { user } = useAuth()
  const router = useRouter()
  const [requests, setRequests] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const [filterBloodGroup, setFilterBloodGroup] = useState('All Groups')
  const [filterDistrict, setFilterDistrict] = useState('All Districts')
  const [filterUpazila, setFilterUpazila] = useState('All Upazilas')

  const handlePostRequestClick = () => {
    if (!user) {
      router.push('/login')
    } else {
      if (user.role === 'admin') router.push('/admin/requests')
      else if (user.role === 'volunteer') router.push('/volunteer/create-request')
      else router.push('/donor/create-request')
    }
  }

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch(${process.env.NEXT_PUBLIC_API_URL})
        if (res.ok) {
          const data = await res.json()
          setRequests(data)
        }
      } catch (error) {
        console.error("Failed to fetch requests:", error)
      }
    }
    fetchRequests()
  }, [])

  const filteredRequests = requests.filter(req => {
    if (filterBloodGroup !== 'All Groups' && req.bloodGroup !== filterBloodGroup) return false;
    if (filterDistrict !== 'All Districts' && req.district !== filterDistrict) return false;
    if (filterUpazila !== 'All Upazilas' && req.upazila !== filterUpazila) return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filteredRequests.length / itemsPerPage))
  const startIndex = (currentPage - 1) * itemsPerPage
  const displayedRequests = filteredRequests.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="grow">
        <section className="py-8 md:py-12 px-4 md:px-12 bg-white">
          <div className="max-w-6xl mx-auto">

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Active Donation Requests</h1>
                <p className="text-lg text-gray-600">
                  Real-time emergency blood requests from your community. Filter by blood group or location to find where your help is needed most.
                </p>
              </div>

            </div>

            <div className="bg-white border border-gray-300 rounded-xl p-4 mb-8 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
                  <select 
                    value={filterBloodGroup}
                    onChange={(e) => { setFilterBloodGroup(e.target.value); setCurrentPage(1); }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent"
                  >
                    <option>All Groups</option>
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>O+</option>
                    <option>O-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
                  <select 
                    value={filterDistrict}
                    onChange={(e) => { setFilterDistrict(e.target.value); setCurrentPage(1); }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent"
                  >
                    <option>All Districts</option>
                    <option>Dhaka</option>
                    <option>Chittagong</option>
                    <option>Sylhet</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upazila</label>
                  <select 
                    value={filterUpazila}
                    onChange={(e) => { setFilterUpazila(e.target.value); setCurrentPage(1); }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent"
                  >
                    <option>All Upazilas</option>
                    <option>Dhaka</option>
                    <option>Chittagong</option>
                    <option>Sylhet</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {displayedRequests.length > 0 ? displayedRequests.map((request) => {
                const location = `${request.upazila}, ${request.district}`;
                const urgencyText = request.message?.substring(0, 20) || request.status;

                return (
                  <div
                    key={request._id}
                    className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition flex flex-col"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 ${bloodTypeColors[request.bloodGroup] || 'bg-gray-100 text-gray-700'} rounded-full flex items-center justify-center font-bold text-center`}>
                          <span>{request.bloodGroup}</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{request.donorName}</h3>
                          <span className={`text-xs font-bold uppercase tracking-wider ${statusTextColors[request.status] || 'text-gray-600'}`}>
                            {urgencyText}
                          </span>
                        </div>
                      </div>

                    </div>

                    <div className="space-y-3 mb-6 grow">
                      <div className="flex items-center gap-3 text-gray-600">
                        <MapPin className="w-4 h-4 text-red-700 shrink-0" />
                        <span className="text-sm capitalize">{location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600">
                        <Calendar className="w-4 h-4 text-red-700 shrink-0" />
                        <span className="text-sm">{request.date}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600">
                        <Clock className="w-4 h-4 text-red-700 shrink-0" />
                        <span className="text-sm">{request.time}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <button className="w-full border-2 border-red-700 text-red-700 py-3 rounded-lg font-bold hover:bg-red-50 transition flex items-center justify-center gap-2">
                        View Details
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )
              }) : (
                <div className="col-span-full text-center py-12 text-gray-500">
                  No active requests found.
                </div>
              )}
            </div>

            <div className="flex justify-center items-center gap-2 mb-8">
              <button className="p-2 hover:bg-gray-100 rounded transition">
                <ArrowRight className="w-5 h-5 text-gray-400 rotate-180" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-lg font-semibold transition ${currentPage === i + 1
                    ? 'bg-red-700 text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  {i + 1}
                </button>
              ))}
              <button className="p-2 hover:bg-gray-100 rounded transition">
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        </section>
      </main>

      <button onClick={handlePostRequestClick} className="fixed bottom-8 right-8 bg-amber-900 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-amber-950 transition">
        <Plus className="w-6 h-6" />
        <span className="absolute bottom-16 right-0 bg-amber-900 text-white px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap">Post Request</span>
      </button>
    </div>
  )
}
