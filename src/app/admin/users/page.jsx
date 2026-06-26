'use client'

import { Users, Filter, Download, Search, ChevronLeft, ChevronRight, Loader2, Eye, Edit, Trash2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useLocationData } from '@/hooks/useLocationData'

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [editModalData, setEditModalData] = useState(null)
  const [viewModalData, setViewModalData] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 3
  const [filterBloodGroup, setFilterBloodGroup] = useState('')
  const [filterDivision, setFilterDivision] = useState('')
  const [filterDistrict, setFilterDistrict] = useState('')
  const [filterUpazila, setFilterUpazila] = useState('')
  const { divisions, districts, upazilas } = useLocationData()
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const showToast = (message) => {
    setToastMessage(message)
    setTimeout(() => setToastMessage(''), 5000)
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (response.ok) {
          const data = await response.json()
          setUsers(data)
        }
      } catch (error) {
        console.error('Failed to fetch users:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this user?')) return;
    setIsDeleting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setUsers(prev => prev.filter(user => user._id !== id));
        showToast('User deleted successfully!');
      } else {
        alert('Failed to delete user.');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users/${editModalData._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          role: editModalData.role,
          status: editModalData.status || 'Active',
        })
      });
      if (response.ok) {
        setUsers(prev => prev.map(user => user._id === editModalData._id ? editModalData : user));
        setEditModalData(null);
        showToast('User updated successfully!');
      } else {
        alert('Failed to update user.');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-700'
      case 'donor': return 'bg-red-100 text-red-700'
      case 'volunteer': return 'bg-blue-100 text-blue-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const filteredUsers = users.filter(user => {
    if (filterBloodGroup && (user.bloodGroup || user.bloodType) !== filterBloodGroup) return false;
    const loc = (user.district || user.location || '').toLowerCase();
    if (filterDivision && !filterDistrict) {
      const validDistricts = districts.filter(d => d.division_id === filterDivision).map(d => d.name.toLowerCase());
      if (!validDistricts.includes(loc)) return false;
    }
    if (filterDistrict && loc !== filterDistrict.toLowerCase()) return false;
    if (filterUpazila && (user.upazila || '').toLowerCase() !== filterUpazila.toLowerCase()) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <main className="px-4 md:px-12 py-8 mt-16 md:mt-0">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">User Management</h2>
          <p className="text-gray-600 mt-1">Manage donors, volunteers, and admins in the network.</p>
        </div>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <Users className="w-6 h-6 text-gray-700" />
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded">Total</span>
          </div>
          <p className="text-4xl font-bold text-gray-900 mb-1">{users.length}</p>
          <p className="text-sm text-gray-600">Total Users</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <Users className="w-6 h-6 text-red-700" />
            <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded">Donors</span>
          </div>
          <p className="text-4xl font-bold text-gray-900 mb-1">{users.filter(u => u.role === 'donor').length}</p>
          <p className="text-sm text-gray-600">Registered Donors</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <Users className="w-6 h-6 text-blue-700" />
            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">Volunteers</span>
          </div>
          <p className="text-4xl font-bold text-gray-900 mb-1">{users.filter(u => u.role === 'volunteer').length}</p>
          <p className="text-sm text-gray-600">Active Volunteers</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <Users className="w-6 h-6 text-purple-700" />
            <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded">Admins</span>
          </div>
          <p className="text-4xl font-bold text-gray-900 mb-1">{users.filter(u => u.role === 'admin').length}</p>
          <p className="text-sm text-gray-600">System Admins</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-white flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h3 className="text-lg font-bold text-gray-900">All Users</h3>
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
              value={filterDivision}
              onChange={(e) => {
                setFilterDivision(e.target.value);
                setFilterDistrict('');
                setFilterUpazila('');
              }}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-700 bg-white capitalize"
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
              }}
              disabled={!filterDivision}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-700 bg-white capitalize disabled:bg-gray-100 disabled:text-gray-400"
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
              onChange={(e) => setFilterUpazila(e.target.value)}
              disabled={!filterDistrict}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-700 bg-white capitalize disabled:bg-gray-100 disabled:text-gray-400"
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

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">User</th>
                <th className="px-4 md:px-6 py-3 text-center md:text-left text-xs font-semibold text-gray-700 uppercase">Blood Group</th>
                <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Location</th>
                <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Role</th>
                <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                <th className="hidden md:table-cell px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    <div className="flex justify-center items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin text-red-700" />
                      <span>Loading users...</span>
                    </div>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                currentUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0"
                    onClick={() => setViewModalData(user)}
                  >
                    <td className="px-4 md:px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700 text-sm shrink-0">
                          {user.name ? user.name.substring(0, 2).toUpperCase() : 'U'}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{user.name || 'Unknown'}</p>
                          <p className="text-xs text-gray-600">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4 text-center md:text-left">
                      <span className="w-8 h-8 inline-flex items-center justify-center rounded-full bg-red-100 text-red-700 font-bold text-xs shrink-0">{user.bloodGroup || '-'}</span>
                    </td>
                    <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-900 capitalize">
                      {user.district ? `${user.upazila || ''}, ${user.district}` : 'Not Specified'}
                    </td>
                    <td className="hidden md:table-cell px-6 py-4">
                      <span className={`px-3 py-1 rounded-md text-xs font-semibold capitalize ${getRoleColor(user.role)}`}>{user.role || 'user'}</span>
                    </td>
                    <td className="hidden md:table-cell px-6 py-4">
                      <span className={`px-3 py-1 rounded-md text-xs font-semibold ${user.status === 'Suspended' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{user.status || 'Active'}</span>
                    </td>
                    <td className="hidden md:table-cell px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditModalData(user)}
                          title="Edit User"
                          className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          title="Delete User"
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

      {viewModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">User Details</h3>
            <div className="space-y-3 text-sm">
              <p className="text-gray-900"><span className="font-semibold text-gray-700">Name:</span> {viewModalData.name}</p>
              <p className="text-gray-900"><span className="font-semibold text-gray-700">Email:</span> {viewModalData.email}</p>
              <p className="text-gray-900"><span className="font-semibold text-gray-700">Role:</span> <span className="capitalize">{viewModalData.role}</span></p>
              <p className="text-gray-900"><span className="font-semibold text-gray-700">Blood Group:</span> {viewModalData.bloodGroup || 'Not specified'}</p>
              <p className="text-gray-900"><span className="font-semibold text-gray-700">Location:</span> <span className="capitalize">{viewModalData.upazila || ''} {viewModalData.district || ''}</span></p>
              <p className="text-gray-900"><span className="font-semibold text-gray-700">Status:</span> {viewModalData.status || 'Active'}</p>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => {
                  handleDelete(viewModalData._id)
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

      {editModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Edit User Access</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-700">Role</label>
                <select
                  value={editModalData.role || 'donor'}
                  onChange={e => setEditModalData({ ...editModalData, role: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 bg-white"
                >
                  <option value="donor">Donor</option>
                  <option value="volunteer">Volunteer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-700">Status</label>
                <select
                  value={editModalData.status || 'Active'}
                  onChange={e => setEditModalData({ ...editModalData, status: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 bg-white"
                >
                  <option value="Active">Active</option>
                  <option value="Suspended">Suspended</option>
                </select>
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

      {toastMessage && (
        <div className="fixed top-24 right-4 md:right-8 bg-green-50 text-green-700 px-6 py-3 rounded-lg shadow-lg border border-green-200 z-[110] flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="w-2 h-2 rounded-full bg-green-500 shrink-0"></div>
          <span className="font-semibold">{toastMessage}</span>
        </div>
      )}

      {isDeleting && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-red-700" />
            <p className="font-semibold text-gray-800">Deleting user...</p>
          </div>
        </div>
      )}
    </main>
  )
}
