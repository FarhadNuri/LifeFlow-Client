'use client'

import { Users, Filter, Download, Search, ChevronLeft, ChevronRight, Loader2, Eye, Edit, Trash2 } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [editModalData, setEditModalData] = useState(null)
  const [viewModalData, setViewModalData] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch('http://localhost:5000/admin/users', {
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
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/admin/users/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setUsers(prev => prev.filter(user => user._id !== id));
      } else {
        alert('Failed to delete user.');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/admin/users/${editModalData._id}`, {
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
      } else {
        alert('Failed to update user.');
      }
    } catch (error) {
      console.error('Error updating user:', error);
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

  return (
      <main className="px-12 py-8">
        {/* Header */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">User Management</h2>
            <p className="text-gray-600 mt-1">Manage donors, volunteers, and admins in the network.</p>
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

        {/* Search and Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-700"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">User</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Blood Group</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Actions</th>
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
                  users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700 text-sm">
                            {user.name ? user.name.substring(0, 2).toUpperCase() : 'U'}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{user.name || 'Unknown'}</p>
                            <p className="text-xs text-gray-600">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="w-8 h-8 inline-flex items-center justify-center rounded-full bg-red-100 text-red-700 font-bold text-xs">{user.bloodGroup || '-'}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 capitalize">
                        {user.district ? `${user.upazila || ''}, ${user.district}` : 'Not Specified'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-md text-xs font-semibold capitalize ${getRoleColor(user.role)}`}>{user.role || 'user'}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-md text-xs font-semibold ${user.status === 'Suspended' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{user.status || 'Active'}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setViewModalData(user)}
                            title="View Details"
                            className="p-2 hover:bg-gray-100 rounded-lg text-gray-500"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setEditModalData(user)}
                            title="Edit User"
                            className="p-2 hover:bg-gray-100 rounded-lg text-gray-500"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(user._id)}
                            title="Delete User"
                            className="p-2 hover:bg-red-50 rounded-lg text-red-600"
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
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-white">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 bg-red-700 text-white rounded-lg font-semibold">1</button>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-white">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* View Modal */}
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
              <div className="mt-6 flex justify-end">
                <button onClick={() => setViewModalData(null)} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors">Close</button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {editModalData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl max-w-sm w-full p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Edit User Access</h3>
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-700">Role</label>
                  <select 
                    value={editModalData.role || 'donor'} 
                    onChange={e => setEditModalData({...editModalData, role: e.target.value})} 
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
                    onChange={e => setEditModalData({...editModalData, status: e.target.value})} 
                    className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <button type="button" onClick={() => setEditModalData(null)} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-lg font-medium transition-colors">Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    )
}
