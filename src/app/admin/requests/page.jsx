'use client'

import Link from 'next/link'
import { Droplet, Filter, Download, Search, ChevronLeft, ChevronRight, MoreVertical, Loader2, Eye, Edit, Trash2 } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function AdminRequests() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewModalData, setViewModalData] = useState(null)
  const [editModalData, setEditModalData] = useState(null)
  const [deleteModalData, setDeleteModalData] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 3
  const [filterBloodGroup, setFilterBloodGroup] = useState('')
  const [filterDistrict, setFilterDistrict] = useState('')
  const [filterUpazila, setFilterUpazila] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const showToast = (message) => {
    setToastMessage(message)
    setTimeout(() => setToastMessage(''), 5000)
  }

  const handleDelete = async () => {
    if (!deleteModalData) return;
    setIsDeleting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      const token = localStorage.getItem('token');
      const response = await fetch(${process.env.NEXT_PUBLIC_API_URL}, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setRequests(prev => prev.filter(req => req._id !== deleteModalData._id));
        setDeleteModalData(null);
        showToast('Request deleted successfully!');
      } else {
        alert('Failed to delete request.');
      }
    } catch (error) {
      console.error('Error deleting request:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      const token = localStorage.getItem('token');
      const response = await fetch(${process.env.NEXT_PUBLIC_API_URL}, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          bloodGroup: editModalData.bloodGroup,
          district: editModalData.district,
          upazila: editModalData.upazila,
          date: editModalData.date,
          time: editModalData.time,
          message: editModalData.message,
          status: editModalData.status
        })
      });
      if (response.ok) {
        setRequests(prev => prev.map(req => req._id === editModalData._id ? editModalData : req));
        setEditModalData(null);
        showToast('Request updated successfully!');
      } else {
        alert('Failed to update request.');
      }
    } catch (error) {
      console.error('Error updating request:', error);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch(${process.env.NEXT_PUBLIC_API_URL}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (response.ok) {
          const data = await response.json()
          setRequests(data)
        }
      } catch (error) {
        console.error('Failed to fetch requests:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchRequests()
  }, [])

  const updateStatus = async (requestId, newStatus) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(${process.env.NEXT_PUBLIC_API_URL}, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      })
      if (response.ok) {
        setRequests(prev => prev.map(r => r._id === requestId ? { ...r, status: newStatus } : r))
        setViewModalData(prev => prev && prev._id === requestId ? { ...prev, status: newStatus } : prev)
        showToast(`Status successfully updated to ${newStatus}`)
      } else {
        console.error('Failed to update status on server')
      }
    } catch (error) {
      console.error('Failed to update status:', error)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-amber-100 text-amber-700'
      case 'In Progress': return 'bg-blue-100 text-blue-700'
      case 'Completed': return 'bg-green-100 text-green-700'
      case 'Cancelled': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  // Calculate dynamic stats
  const activeCount = requests.filter(r => r.status === 'Pending' || r.status === 'In Progress').length
  const criticalCount = requests.filter(r => r.bloodGroup === 'O-').length // Example of critical
  const completedCount = requests.filter(r => r.status === 'Completed').length
  const totalCount = requests.length

  const filteredRequests = requests.filter(req => {
    if (filterBloodGroup && (req.bloodGroup || req.bloodType) !== filterBloodGroup) return false;
    const loc = (req.district || req.location || '').toLowerCase();
    if (filterDistrict && loc !== filterDistrict.toLowerCase()) return false;
    if (filterUpazila && (req.upazila || '').toLowerCase() !== filterUpazila.toLowerCase()) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage)
  const currentRequests = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <main className="px-4 md:px-12 py-8 mt-16 md:mt-0">
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Global Donation Requests</h2>
          <p className="text-gray-600 mt-1">Reviewing all active and historical blood donation appeals across the network.</p>
        </div>

      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <Droplet className="w-6 h-6 text-red-700" />
            <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded">Active</span>
          </div>
          <p className="text-4xl font-bold text-gray-900 mb-1">{activeCount}</p>
          <p className="text-sm text-gray-600">Pending Requests</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <Droplet className="w-6 h-6 text-blue-600" />
            <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded">Critical</span>
          </div>
          <p className="text-4xl font-bold text-gray-900 mb-1">{criticalCount}</p>
          <p className="text-sm text-gray-600">O- Requests</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <Droplet className="w-6 h-6 text-orange-600" />
            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">Fulfilled</span>
          </div>
          <p className="text-4xl font-bold text-gray-900 mb-1">{completedCount}</p>
          <p className="text-sm text-gray-600">Total Successes</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <Droplet className="w-6 h-6 text-gray-400" />
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded">Total</span>
          </div>
          <p className="text-4xl font-bold text-gray-900 mb-1">{totalCount}</p>
          <p className="text-sm text-gray-600">All Requests</p>
        </div>
      </div>

      {/* Search and Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-white flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h3 className="text-lg font-bold text-gray-900">All Requests</h3>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <select
              value={filterBloodGroup}
              onChange={(e) => setFilterBloodGroup(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-700 bg-white"
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
              value={filterDistrict}
              onChange={(e) => setFilterDistrict(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-700 bg-white capitalize"
            >
              <option value="">All Districts</option>
              <option value="dhaka">Dhaka</option>
              <option value="chattogram">Chattogram</option>
              <option value="sylhet">Sylhet</option>
              <option value="rajshahi">Rajshahi</option>
            </select>
            <select
              value={filterUpazila}
              onChange={(e) => setFilterUpazila(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-700 bg-white capitalize"
            >
              <option value="">All Upazilas</option>
              <option value="uttara">Uttara</option>
              <option value="banani">Banani</option>
              <option value="gulshan">Gulshan</option>
              <option value="dhanmondi">Dhanmondi</option>
              <option value="mirpur">Mirpur</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Requester</th>
                <th className="px-4 md:px-6 py-3 text-center md:text-left text-xs font-semibold text-gray-700 uppercase">Blood Group</th>

                <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Location</th>
                <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Deadline</th>
                <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                <th className="hidden md:table-cell px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                    <div className="flex justify-center items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin text-red-700" />
                      <span>Loading requests...</span>
                    </div>
                  </td>
                </tr>
              ) : requests.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                    No active requests found.
                  </td>
                </tr>
              ) : (
                currentRequests.map((req, idx) => (
                  <tr
                    key={req._id}
                    className="hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0"
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
                      <span className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-red-700 text-white font-bold text-sm shrink-0">{req.bloodGroup || 'N/A'}</span>
                    </td>

                    <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-900 capitalize">{req.upazila}, {req.district}</td>
                    <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-900">{req.date} {req.time}</td>
                    <td className="hidden md:table-cell px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={req.status}
                        onChange={(e) => updateStatus(req._id, e.target.value)}
                        className={`px-3 py-1 rounded-md text-xs font-semibold outline-none cursor-pointer appearance-none border-none text-center ${getStatusColor(req.status)}`}
                      >
                        <option value="Pending" className="bg-white text-gray-900">Pending</option>
                        <option value="In Progress" className="bg-white text-gray-900">In Progress</option>
                        <option value="Completed" className="bg-white text-gray-900">Completed</option>
                        <option value="Cancelled" className="bg-white text-gray-900">Cancelled</option>
                      </select>
                    </td>
                    <td className="hidden md:table-cell px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditModalData(req)}
                          title="Edit Request"
                          className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteModalData(req)}
                          title="Delete Request"
                          className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 border border-gray-300 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed text-gray-600"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`w-8 h-8 rounded-lg font-semibold ${currentPage === idx + 1 ? 'bg-red-700 text-white' : 'border border-gray-300 hover:bg-gray-100 text-gray-700'}`}
            >
              {idx + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="p-2 border border-gray-300 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed text-gray-600"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* View Modal */}
      {viewModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-lg">
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
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => {
                  setDeleteModalData(viewModalData)
                  setViewModalData(null)
                }}
                className="md:hidden px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
              <button
                onClick={() => {
                  setEditModalData(viewModalData)
                  setViewModalData(null)
                }}
                className="md:hidden px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button onClick={() => setViewModalData(null)} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-lg max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Edit Request</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-700">Blood Group</label>
                  <input type="text" value={editModalData.bloodGroup} onChange={e => setEditModalData({ ...editModalData, bloodGroup: e.target.value })} required className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 bg-white" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-700">District</label>
                  <input type="text" value={editModalData.district} onChange={e => setEditModalData({ ...editModalData, district: e.target.value })} required className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 bg-white" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-700">Upazila</label>
                  <input type="text" value={editModalData.upazila} onChange={e => setEditModalData({ ...editModalData, upazila: e.target.value })} required className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 bg-white" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-700">Date</label>
                  <input type="date" value={editModalData.date} onChange={e => setEditModalData({ ...editModalData, date: e.target.value })} required className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 bg-white" />
                </div>
                <div className="flex flex-col gap-1 text-gray-900 bg-white">
                  <label className="text-xs font-semibold text-gray-700">Time</label>
                  <input type="time" value={editModalData.time} onChange={e => setEditModalData({ ...editModalData, time: e.target.value })} required className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 bg-white" />
                </div>
                <div className="flex flex-col gap-1 text-gray-900 bg-white">
                  <label className="text-xs font-semibold text-gray-700">Status</label>
                  <select
                    value={editModalData.status}
                    onChange={e => setEditModalData({ ...editModalData, status: e.target.value })}
                    className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 bg-white"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-700">Message</label>
                <textarea rows={3} value={editModalData.message} onChange={e => setEditModalData({ ...editModalData, message: e.target.value })} required className="border border-gray-300 rounded px-3 py-2 text-sm resize-none text-gray-900 bg-white"></textarea>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button type="button" onClick={() => setEditModalData(null)} disabled={isSaving} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors disabled:opacity-50">Cancel</button>
                <button type="submit" disabled={isSaving} className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                  {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteModalData && !isDeleting && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 shadow-lg animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to permanently delete this request? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteModalData(null)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              >
                Delete Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-4 md:right-8 bg-green-50 text-green-700 px-6 py-3 rounded-lg shadow-lg border border-green-200 z-[110] flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="w-2 h-2 rounded-full bg-green-500 shrink-0"></div>
          <span className="font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Global Deleting Loader */}
      {isDeleting && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-red-700" />
            <p className="font-semibold text-gray-800">Deleting request...</p>
          </div>
        </div>
      )}
    </main>
  )
}
