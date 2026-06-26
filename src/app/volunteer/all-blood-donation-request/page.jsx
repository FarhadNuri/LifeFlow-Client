'use client'

import { useState, useEffect } from 'react'
import { Droplet, Filter, Search, ChevronLeft, ChevronRight, Loader2, X } from 'lucide-react'
import { useLocationData } from '@/hooks/useLocationData'

export default function VolunteerRequests() {
  const [selectedStatus, setSelectedStatus] = useState({})
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [toastMessage, setToastMessage] = useState('')
  const [filterBloodGroup, setFilterBloodGroup] = useState('')
  const [filterDivision, setFilterDivision] = useState('')
  const [filterDistrict, setFilterDistrict] = useState('')
  const [filterUpazila, setFilterUpazila] = useState('')
  const { divisions, districts, upazilas } = useLocationData()

  const showToast = (message) => {
    setToastMessage(message)
    setTimeout(() => setToastMessage(''), 5000)
  }

  const itemsPerPage = 3

  const filteredRequests = requests.filter(req => {
    if (filterBloodGroup && (req.bloodGroup || req.bloodType) !== filterBloodGroup) return false;
    const loc = (req.district || req.location || '').toLowerCase();
    if (filterDivision && !filterDistrict) {
      const validDistricts = districts.filter(d => d.division_id === filterDivision).map(d => d.name.toLowerCase());
      if (!validDistricts.includes(loc)) return false;
    }
    if (filterDistrict && loc !== filterDistrict.toLowerCase()) return false;
    if (filterUpazila && (req.upazila || '').toLowerCase() !== filterUpazila.toLowerCase()) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage)
  const currentRequests = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/volunteer/requests`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setRequests(data)
      } else {
        setError('Failed to fetch requests')
      }
    } catch (err) {
      console.error(err)
      setError('Server error')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (requestId, newStatus) => {
    setSelectedStatus(prev => ({
      ...prev,
      [requestId]: newStatus
    }))

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/volunteer/update-status/${requestId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      })

      if (!response.ok) {
        console.error('Failed to update status')
      } else {
        showToast(`Request status updated to ${newStatus}`)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <main className="w-full px-4 md:px-12 py-6 md:py-8 pb-24 md:pb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Blood Donation Requests</h2>
          <p className="text-gray-600 mt-1">Monitor and update donation request statuses.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <Droplet className="w-6 h-6 text-red-700" />
            <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded">Total</span>
          </div>
          <p className="text-4xl font-bold text-gray-900 mb-1">{requests.length}</p>
          <p className="text-sm text-gray-600">All Requests</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <Droplet className="w-6 h-6 text-blue-600" />
            <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded">Pending</span>
          </div>
          <p className="text-4xl font-bold text-gray-900 mb-1">{requests.filter(r => r.status === 'Pending').length}</p>
          <p className="text-sm text-gray-600">Pending Requests</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <Droplet className="w-6 h-6 text-orange-600" />
            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">In Progress</span>
          </div>
          <p className="text-4xl font-bold text-gray-900 mb-1">{requests.filter(r => r.status === 'In Progress').length}</p>
          <p className="text-sm text-gray-600">Being processed</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <Droplet className="w-6 h-6 text-green-600" />
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">Completed</span>
          </div>
          <p className="text-4xl font-bold text-gray-900 mb-1">{requests.filter(r => r.status === 'Completed').length}</p>
          <p className="text-sm text-gray-600">Successfully handled</p>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="text-lg font-bold text-gray-900">All Requests</h3>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <select
              value={filterBloodGroup}
              onChange={(e) => { setFilterBloodGroup(e.target.value); setCurrentPage(1); }}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
            >
              <option value="">All Blood Groups</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
            <select
              value={filterDivision}
              onChange={(e) => {
                setFilterDivision(e.target.value);
                setFilterDistrict('');
                setFilterUpazila('');
                setCurrentPage(1);
              }}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white capitalize"
            >
              <option value="">All Divisions</option>
              {divisions.map(div => (
                <option key={div.id} value={div.id}>{div.name}</option>
              ))}
            </select>
            <select
              value={filterDistrict}
              onChange={(e) => {
                setFilterDistrict(e.target.value);
                setFilterUpazila('');
                setCurrentPage(1);
              }}
              disabled={!filterDivision}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white capitalize disabled:bg-gray-100 disabled:text-gray-400"
            >
              <option value="">All Districts</option>
              {districts
                .filter(dist => dist.division_id === filterDivision)
                .map(dist => (
                  <option key={dist.id} value={dist.name}>{dist.name}</option>
                ))}
            </select>
            <select
              value={filterUpazila}
              onChange={(e) => { setFilterUpazila(e.target.value); setCurrentPage(1); }}
              disabled={!filterDistrict}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white capitalize disabled:bg-gray-100 disabled:text-gray-400"
            >
              <option value="">All Upazilas</option>
              {upazilas
                .filter(upa => upa.district_id === districts.find(d => d.name === filterDistrict)?.id)
                .map(upa => (
                  <option key={upa.id} value={upa.name}>{upa.name}</option>
                ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto md:overflow-visible">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Requester</th>
                <th className="px-4 md:px-6 py-3 text-center md:text-left text-xs font-semibold text-gray-700 uppercase">Blood Group</th>

                <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Location</th>
                <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Deadline</th>
                <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                    <Loader2 className="w-8 h-8 animate-spin text-amber-500 mx-auto mb-2" />
                    Loading requests...
                  </td>
                </tr>
              ) : requests.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                    No blood donation requests found.
                  </td>
                </tr>
              ) : currentRequests.map((req) => {

                const name = req.donorName || req.volunteerName || req.patientName || 'Unknown';
                const email = req.donorEmail || req.volunteerEmail || 'N/A';
                const bloodGroup = req.bloodGroup || req.bloodType || 'N/A';
                const location = req.upazila ? `${req.upazila}, ${req.district}` : req.location || req.district || 'Unknown';

                const getStatusColor = (status) => {
                  switch (status) {
                    case 'Pending': return 'bg-amber-100 text-amber-700';
                    case 'In Progress': return 'bg-blue-100 text-blue-700';
                    case 'Completed': return 'bg-green-100 text-green-700';
                    case 'Cancelled': return 'bg-red-100 text-red-700';
                    case 'Urgent': return 'bg-red-100 text-red-700';
                    default: return 'bg-gray-100 text-gray-700';
                  }
                }

                return (
                  <tr
                    key={req._id}
                    className="hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0"
                    onClick={() => setSelectedRequest(req)}
                  >
                    <td className="px-4 md:px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-200 to-amber-400 flex items-center justify-center font-bold text-amber-800 shrink-0">
                          {name.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900 truncate">{name}</p>
                          <p className="text-xs text-gray-600 truncate">{email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4 text-center md:text-left">
                      <span className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-red-700 text-white font-bold text-sm">{bloodGroup}</span>
                    </td>

                    <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-900 capitalize">{location}</td>
                    <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-900">
                      {req.date ? `${req.date} ${req.time || ''}` : req.deadline || 'No deadline'}
                    </td>
                    <td className="hidden md:table-cell px-6 py-4">
                      <span className={`px-3 py-1 rounded-md text-xs font-semibold ${getStatusColor(selectedStatus[req._id] || req.status)}`}>
                        {selectedStatus[req._id] || req.status}
                      </span>
                    </td>
                    <td className="hidden md:table-cell px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={selectedStatus[req._id] || req.status || 'Pending'}
                        onChange={(e) => handleStatusChange(req._id, e.target.value)}
                        className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="Urgent">Urgent</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Pending">Pending</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 border border-gray-300 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`w-8 h-8 rounded-lg font-semibold ${currentPage === idx + 1 ? 'bg-amber-500 text-white' : 'border border-gray-300 hover:bg-gray-100 text-gray-700'}`}
            >
              {idx + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="p-2 border border-gray-300 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex gap-3">
          <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-white text-xs font-bold">i</span>
          </div>
          <div>
            <p className="font-semibold text-amber-900 mb-1">Volunteer Permissions</p>
            <p className="text-sm text-amber-800">
              As a volunteer, you can view all blood donation requests and update their status.
              You do not have permission to delete requests or modify other details.
              For additional actions, please contact an administrator.
            </p>
          </div>
        </div>
      </div>

      {selectedRequest && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-gray-50">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Request Details</h3>
                <p className="text-sm text-gray-500">Full donation information</p>
              </div>
              <button
                onClick={() => setSelectedRequest(null)}
                className="text-gray-400 hover:text-gray-900 p-1 rounded-md hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-200 to-amber-400 flex items-center justify-center font-bold text-amber-800 text-lg shrink-0">
                  {(selectedRequest.donorName || selectedRequest.volunteerName || selectedRequest.patientName || 'U').substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">{selectedRequest.donorName || selectedRequest.volunteerName || selectedRequest.patientName || 'Unknown'}</h4>
                  <p className="text-sm text-gray-600">{selectedRequest.donorEmail || selectedRequest.volunteerEmail || 'No email provided'}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Blood Group</span>
                  <span className="text-red-700 font-bold text-lg">{selectedRequest.bloodGroup || selectedRequest.bloodType || 'N/A'}</span>
                </div>

              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</span>
                <span className="text-gray-900 font-medium capitalize">{selectedRequest.upazila ? `${selectedRequest.upazila}, ${selectedRequest.district}` : selectedRequest.location || selectedRequest.district || 'Unknown'}</span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Deadline</span>
                <span className="text-gray-900 font-medium">{selectedRequest.date ? `${selectedRequest.date} ${selectedRequest.time || ''}` : selectedRequest.deadline || 'No deadline'}</span>
              </div>

              {selectedRequest.message && (
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Message / Instructions</span>
                  <p className="text-sm text-gray-700 bg-amber-50/50 p-3 rounded-lg border border-amber-100 italic">
                    "{selectedRequest.message}"
                  </p>
                </div>
              )}

              <div className="pt-5 border-t border-gray-100 flex flex-col gap-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Update Status</label>
                <select
                  value={selectedStatus[selectedRequest._id] || selectedRequest.status || 'Pending'}
                  onChange={(e) => handleStatusChange(selectedRequest._id, e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white shadow-sm"
                >
                  <option value="Urgent">🔴 Urgent</option>
                  <option value="In Progress">🔵 In Progress</option>
                  <option value="Completed">🟢 Completed</option>
                  <option value="Pending">🟡 Pending</option>
                  <option value="Cancelled">⚫ Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {toastMessage && (
        <div className="fixed top-24 right-4 md:right-8 bg-green-50 text-green-700 px-6 py-3 rounded-lg shadow-lg border border-green-200 z-[70] flex items-center gap-2 animate-in slide-in-from-top-2 duration-300">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white shrink-0">✓</div>
          <p className="font-semibold text-sm">{toastMessage}</p>
        </div>
      )}
    </main>
  )
}
