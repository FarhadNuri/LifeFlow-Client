'use client';

import { useState, useEffect } from 'react';
import { Heart, Share2, Plus, Search, Filter, Eye, Edit, Trash2, ArrowRight, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useLocationData } from '@/hooks/useLocationData';

const VolunteerDashboard = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterBloodGroup, setFilterBloodGroup] = useState('');
  const [filterDivision, setFilterDivision] = useState('');
  const [filterDistrict, setFilterDistrict] = useState('');
  const [filterUpazila, setFilterUpazila] = useState('');
  const { divisions, districts, upazilas } = useLocationData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [viewModalData, setViewModalData] = useState(null);
  const [editModalData, setEditModalData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 5000);
  };

  const itemsPerPage = 3;
  const filteredRequests = requests.filter(req => {
    if (filterBloodGroup && req.bloodGroup !== filterBloodGroup) return false;
    const loc = (req.district || req.location || '').toLowerCase();
    if (filterDivision && !filterDistrict) {
      const validDistricts = districts.filter(d => d.division_id === filterDivision).map(d => d.name.toLowerCase());
      if (!validDistricts.includes(loc)) return false;
    }
    if (filterDistrict && loc !== filterDistrict.toLowerCase()) return false;
    if (filterUpazila && req.upazila?.toLowerCase() !== filterUpazila.toLowerCase()) return false;
    return true;
  });
  const sortedRequests = [...filteredRequests].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  const totalPages = Math.ceil(sortedRequests.length / itemsPerPage);
  const currentRequests = sortedRequests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDelete = async (id) => {
    setIsDeleting(id);
    try {
      await new Promise(r => setTimeout(r, 1000));
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/volunteer/requests/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setRequests(prev => prev.filter(req => req._id !== id));
        showToast('Request deleted successfully');
        return true;
      } else {
        alert('Failed to delete request.');
        return false;
      }
    } catch (error) {
      console.error('Error deleting request:', error);
      return false;
    } finally {
      setIsDeleting(null);
      setDeleteConfirmId(null);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsEditing(true);
    try {
      await new Promise(r => setTimeout(r, 1500));
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/volunteer/requests/${editModalData._id}`, {
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
        })
      });
      if (response.ok) {
        setRequests(prev => prev.map(req => req._id === editModalData._id ? editModalData : req));
        setEditModalData(null);
        showToast('Request updated successfully');
      } else {
        alert('Failed to update request.');
      }
    } catch (error) {
      console.error('Error updating request:', error);
    } finally {
      setIsEditing(false);
    }
  };

  useEffect(() => {
    const fetchRequests = async () => {
      if (!user?.id) return;
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/volunteer/my-requests/${user.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setRequests(data);
        }
      } catch (error) {
        console.error('Error fetching requests:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [user]);

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-amber-100 text-amber-700';
      case 'In Progress': return 'bg-blue-100 text-blue-700';
      case 'Completed': return 'bg-green-100 text-green-700';
      case 'Cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <main className="w-full">
      <div className="p-6 md:p-8 max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              Welcome back, {user?.name || 'Volunteer'}!
            </h2>
            <p className="text-slate-600">
              You have {requests.length} total requests.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/volunteer/create-request" className="px-4 py-2 bg-red-700 text-white rounded-lg font-semibold hover:bg-red-800 transition-colors flex items-center gap-2 text-sm md:text-base">
              <Plus className="w-4 h-4" />
              New Request
            </Link>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
              Total Personal Requests
            </h3>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-bold text-red-700">{requests.length.toString().padStart(2, '0')}</span>
              <span className="text-sm font-semibold text-orange-600">Requests</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="bg-red-700 h-full w-3/4 rounded-full"></div>
                </div>
                <span className="text-xs text-slate-600">Active goal: 12</span>
              </div>
            </div>
          </div>

        </section>

        <section className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <h3 className="text-lg font-bold text-slate-900">Recent Requests</h3>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <select
                value={filterBloodGroup}
                onChange={(e) => setFilterBloodGroup(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-red-700 outline-none text-slate-700 bg-white"
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
                className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-red-700 outline-none text-slate-700 bg-white capitalize"
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
                className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-red-700 outline-none text-slate-700 bg-white capitalize disabled:bg-slate-100 disabled:text-slate-400"
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
                className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-red-700 outline-none text-slate-700 bg-white capitalize disabled:bg-slate-100 disabled:text-slate-400"
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
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 md:px-6 py-3 font-semibold text-slate-700">Recipient</th>
                  <th className="px-4 md:px-6 py-3 font-semibold text-slate-700 text-center md:text-left">Blood Group</th>
                  <th className="hidden md:table-cell px-6 py-3 font-semibold text-slate-700">Location</th>
                  <th className="hidden md:table-cell px-6 py-3 font-semibold text-slate-700">Date & Time</th>
                  <th className="hidden md:table-cell px-6 py-3 font-semibold text-slate-700">Status</th>
                  <th className="hidden md:table-cell px-6 py-3 font-semibold text-slate-700 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-slate-500">
                      Loading requests...
                    </td>
                  </tr>
                ) : requests.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-slate-500">
                      You have no donation requests yet.
                    </td>
                  </tr>
                ) : (
                  currentRequests.map((request) => (
                    <tr
                      key={request._id}
                      className="hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-100 last:border-0"
                      onClick={() => setViewModalData(request)}
                    >
                      <td className="px-4 md:px-6 py-4">
                        <div className="flex items-center gap-3">
                          {user?.image ? (
                            <img
                              src={user.image}
                              alt={request.volunteerName || 'User'}
                              className="w-10 h-10 rounded-full object-cover shrink-0"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center font-bold text-red-700 text-xs shrink-0">
                              {getInitials(request.volunteerName)}
                            </div>
                          )}
                          <span className="font-semibold text-slate-900 truncate min-w-0">
                            {request.volunteerName || 'Unknown'}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4 text-center md:text-left">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-red-700 text-white font-bold text-sm">
                          {request.bloodGroup || 'N/A'}
                        </span>
                      </td>
                      <td className="hidden md:table-cell px-6 py-4 text-slate-600 capitalize">
                        {request.upazila}, {request.district}
                      </td>
                      <td className="hidden md:table-cell px-6 py-4 text-slate-600">
                        <div className="flex flex-col">
                          <span>{request.date}</span>
                          <span className="text-xs text-slate-500">{request.time}</span>
                        </div>
                      </td>
                      <td className="hidden md:table-cell px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full font-semibold text-xs ${getStatusColor(request.status)}`}
                        >
                          {request.status}
                        </span>
                      </td>
                      <td className="hidden md:table-cell px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-end gap-2">

                          <button
                            onClick={() => setEditModalData(request)}
                            title="Edit"
                            className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); setDeleteConfirmId(request._id); }}
                            title="Delete"
                            disabled={isDeleting === request._id}
                            className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors disabled:opacity-50"
                          >
                            {isDeleting === request._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-slate-300 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed text-slate-600"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`w-8 h-8 rounded-lg font-semibold ${currentPage === idx + 1 ? 'bg-red-700 text-white' : 'border border-slate-300 hover:bg-slate-100 text-slate-700'}`}
              >
                {idx + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-2 border border-slate-300 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed text-slate-600"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        <footer className="mt-8 py-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4 text-slate-600 border-t border-slate-200 text-xs md:text-sm">
          <p>
            © 2024 LifeFlow Blood Donation Platform. Saving lives through community.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-red-700 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-red-700 transition-colors">
              Support
            </a>
            <a href="#" className="hover:text-red-700 transition-colors">
              Help Center
            </a>
          </div>
        </footer>
      </div>

      {viewModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-lg">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Request Details</h3>
            <div className="space-y-3 text-sm">
              <p className="text-slate-900"><span className="font-semibold text-slate-700">Blood Group:</span> {viewModalData.bloodGroup}</p>
              <p className="text-slate-900"><span className="font-semibold text-slate-700">Location:</span> <span className="capitalize">{viewModalData.upazila}, {viewModalData.district}</span></p>
              <p className="text-slate-900"><span className="font-semibold text-slate-700">Date:</span> {viewModalData.date}</p>
              <p className="text-slate-900"><span className="font-semibold text-slate-700">Time:</span> {viewModalData.time}</p>
              <p className="text-slate-900"><span className="font-semibold text-slate-700">Status:</span> {viewModalData.status}</p>
              <div>
                <span className="font-semibold text-slate-700 block mb-1">Message:</span>
                <p className="bg-slate-50 p-3 rounded-lg text-slate-600 border border-slate-200">{viewModalData.message || 'No message provided.'}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2 border-t border-slate-100 pt-4">
              <button
                onClick={() => {
                  setEditModalData(viewModalData);
                  setViewModalData(null);
                }}
                className="px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <Edit className="w-4 h-4" /> Edit
              </button>
              <button
                disabled={isDeleting === viewModalData._id}
                onClick={async () => {
                  setDeleteConfirmId(viewModalData._id);
                }}
                className="px-4 py-2 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {isDeleting === viewModalData._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                {isDeleting === viewModalData._id ? 'Deleting...' : 'Delete'}
              </button>
              <button onClick={() => setViewModalData(null)} className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg font-medium transition-colors">Close</button>
            </div>
          </div>
        </div>
      )}

      {editModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-lg max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Edit Request</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-slate-700">Blood Group</label>
                  <input type="text" value={editModalData.bloodGroup} onChange={e => setEditModalData({ ...editModalData, bloodGroup: e.target.value })} required className="border border-slate-300 rounded px-3 py-2 text-sm text-gray-900 bg-white" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-slate-700">District</label>
                  <input type="text" value={editModalData.district} onChange={e => setEditModalData({ ...editModalData, district: e.target.value })} required className="border border-slate-300 rounded px-3 py-2 text-sm text-gray-900 bg-white" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-slate-700">Upazila</label>
                  <input type="text" value={editModalData.upazila} onChange={e => setEditModalData({ ...editModalData, upazila: e.target.value })} required className="border border-slate-300 rounded px-3 py-2 text-sm text-gray-900 bg-white" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-slate-700">Date</label>
                  <input type="date" value={editModalData.date} onChange={e => setEditModalData({ ...editModalData, date: e.target.value })} required className="border border-slate-300 rounded px-3 py-2 text-sm text-gray-900 bg-white" />
                </div>
                <div className="flex flex-col gap-1 text-gray-900 bg-white">
                  <label className="text-xs font-semibold text-slate-700">Time</label>
                  <input type="time" value={editModalData.time} onChange={e => setEditModalData({ ...editModalData, time: e.target.value })} required className="border border-slate-300 rounded px-3 py-2 text-sm text-gray-900 bg-white" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-700">Message</label>
                <textarea rows={3} value={editModalData.message} onChange={e => setEditModalData({ ...editModalData, message: e.target.value })} required className="border border-slate-300 rounded px-3 py-2 text-sm resize-none text-gray-900 bg-white"></textarea>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button type="button" onClick={() => setEditModalData(null)} disabled={isEditing} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors disabled:opacity-50">Cancel</button>
                <button type="submit" disabled={isEditing} className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-70">
                  {isEditing && <Loader2 className="w-4 h-4 animate-spin" />}
                  {isEditing ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirmId && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 shadow-xl text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Delete Request?</h3>
            <p className="text-slate-600 mb-6 text-sm">
              Are you sure you want to delete this request? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setDeleteConfirmId(null)}
                disabled={isDeleting === deleteConfirmId}
                className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  const success = await handleDelete(deleteConfirmId);
                  if (success && viewModalData?._id === deleteConfirmId) {
                    setViewModalData(null);
                  }
                }}
                disabled={isDeleting === deleteConfirmId}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2 disabled:opacity-70"
              >
                {isDeleting === deleteConfirmId && <Loader2 className="w-4 h-4 animate-spin" />}
                {isDeleting === deleteConfirmId ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {toastMessage && (
        <div className="fixed top-24 right-4 md:right-8 bg-green-50 text-green-700 px-6 py-3 rounded-lg shadow-lg border border-green-200 z-50 flex items-center gap-2 animate-in slide-in-from-top-2 duration-300">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white shrink-0">✓</div>
          <p className="font-semibold text-sm">{toastMessage}</p>
        </div>
      )}
    </main>
  );
};

export default VolunteerDashboard;
