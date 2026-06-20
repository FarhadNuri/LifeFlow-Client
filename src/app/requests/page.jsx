'use client'

import { MapPin, Calendar, Clock, Bookmark, ArrowRight, Heart, Filter, Plus } from 'lucide-react'
import { useState } from 'react'

const requests= [
  {
    id: 1,
    name: 'Rahat Khan',
    bloodType: 'A+',
    status: 'URGENT',
    statusColor: 'bg-red-700',
    location: 'Dhanmondi, Dhaka',
    date: 'Oct 24, 2024',
    time: '10:30 AM (Morning)',
    avatar: 'A+',
  },
  {
    id: 2,
    name: 'Sara Ahmed',
    bloodType: 'O-',
    status: 'PLANNED SURGERY',
    statusColor: 'bg-red-100',
    location: 'Panchlaish, Chittagong',
    date: 'Oct 26, 2024',
    time: '02:00 PM (Afternoon)',
    avatar: 'O-',
  },
  {
    id: 3,
    name: 'Imran Hossain',
    bloodType: 'B+',
    status: 'EMERGENCY APPEAL',
    statusColor: 'bg-red-700',
    location: 'Zindabazar, Sylhet',
    date: 'ASAP (Immediate)',
    time: 'Emergency Support',
    avatar: 'B+',
    highlighted: true,
  },
  {
    id: 4,
    name: 'Mila Rahman',
    bloodType: 'AB+',
    status: 'POST-OP CARE',
    statusColor: 'bg-blue-100',
    location: 'Gulshan 2, Dhaka',
    date: 'Oct 25, 2024',
    time: '09:00 AM (Morning)',
    avatar: 'AB+',
  },
  {
    id: 5,
    name: 'Arif Iqbal',
    bloodType: 'O+',
    status: 'DIALYSIS SUPPORT',
    statusColor: 'bg-yellow-100',
    location: 'Motijheel, Dhaka',
    date: 'Oct 28, 2024',
    time: '11:30 AM (Morning)',
    avatar: 'O+',
  },
  {
    id: 6,
    name: 'Nadia Sultana',
    bloodType: 'B-',
    status: 'ROUTINE NEED',
    statusColor: 'bg-purple-100',
    location: 'Khulshi, Chittagong',
    date: 'Oct 30, 2024',
    time: '04:00 PM (Afternoon)',
    avatar: 'B-',
  },
]

const bloodTypeColors= {
  'A+': 'bg-red-700 text-white',
  'A-': 'bg-red-100 text-red-700',
  'B+': 'bg-red-700 text-white',
  'B-': 'bg-purple-100 text-purple-700',
  'O+': 'bg-orange-100 text-orange-700',
  'O-': 'bg-red-100 text-red-700',
  'AB+': 'bg-blue-100 text-blue-700',
  'AB-': 'bg-purple-100 text-purple-700',
}

const statusTextColors= {
  'URGENT': 'text-red-700',
  'PLANNED SURGERY': 'text-gray-600',
  'EMERGENCY APPEAL': 'text-red-700 font-bold',
  'POST-OP CARE': 'text-gray-600',
  'DIALYSIS SUPPORT': 'text-gray-600',
  'ROUTINE NEED': 'text-gray-600',
}

export default function ActiveRequests() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  const totalPages = Math.ceil(requests.length / itemsPerPage)

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
              <div className="flex flex-wrap gap-3">
                <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full border border-gray-300 transition">
                  <Filter className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-600">Filter Group</span>
                </button>
                <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full border border-gray-300 transition">
                  <MapPin className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-600">Near Me</span>
                </button>
              </div>
            </div>

            <div className="bg-white border border-gray-300 rounded-xl p-4 mb-8 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent">
                    <option>All Blood Groups</option>
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
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent">
                    <option>All Districts</option>
                    <option>Dhaka</option>
                    <option>Chittagong</option>
                    <option>Sylhet</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Level</label>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-red-700 text-white py-2 rounded-lg font-medium text-sm hover:bg-red-800 transition">
                      High Priority
                    </button>
                    <button className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 rounded-lg font-medium text-sm hover:bg-gray-50 transition">
                      Recent
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {requests.slice(0, itemsPerPage).map((request) => (
                <div
                  key={request.id}
                  className={`bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition flex flex-col ${
                    request.highlighted ? 'border-l-4 border-l-red-700 lg:col-span-1' : ''
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 ${bloodTypeColors[request.bloodType]} rounded-full flex items-center justify-center font-bold text-center`}>
                        <span>{request.bloodType}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{request.name}</h3>
                        <span className={`text-xs font-bold uppercase tracking-wider ${statusTextColors[request.status]}`}>
                          {request.status}
                        </span>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-red-700 transition">
                      <Bookmark className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-3 mb-6 grow">
                    <div className="flex items-center gap-3 text-gray-600">
                      <MapPin className="w-4 h-4 text-red-700 shrink-0" />
                      <span className="text-sm">{request.location}</span>
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
                    {request.highlighted ? (
                      <button className="w-full bg-red-700 text-white py-3 rounded-lg font-bold hover:bg-red-800 transition flex items-center justify-center gap-2">
                        Donate Now
                        <Heart className="w-5 h-5" fill="currentColor" />
                      </button>
                    ) : (
                      <button className="w-full border-2 border-red-700 text-red-700 py-3 rounded-lg font-bold hover:bg-red-50 transition flex items-center justify-center gap-2">
                        View Details
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center items-center gap-2 mb-8">
              <button className="p-2 hover:bg-gray-100 rounded transition">
                <ArrowRight className="w-5 h-5 text-gray-400 rotate-180" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-lg font-semibold transition ${
                    currentPage === i + 1
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

      <button className="fixed bottom-8 right-8 bg-amber-900 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-amber-950 transition">
        <Plus className="w-6 h-6" />
        <span className="absolute bottom-16 right-0 bg-amber-900 text-white px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap">Post Request</span>
      </button>
    </div>
  )
}
