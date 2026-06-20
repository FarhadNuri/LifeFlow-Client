'use client'

import { Search, Users, AlertCircle, TrendingUp, Heart } from 'lucide-react'
import { useState } from 'react'

const users = [
  {
    id: 1,
    name: 'Dr. Sarah Jenkins',
    email: 'sarah.j@lifeflow.org',
    role: 'Admin',
    status: 'Active',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAr0LFbt24h65M1eOIT80CbudQ-kWeaHXf5skX2aUVGqPQONMjiXCEmongWkhepdd6UMoVTFNszE9gLZpfAhi7GWmmz9UDM3AR3fBNyj8YgAN1AHuOV6_h3sQMYWqvfee9C5MSV-7o4NEx40mkYdN18qf3p-0rqElHJjNUyvkbxSa76FIZvSBJs2kAINZuSaENHyS3mRNEAuCXCE7uVHhxTUcy8cQRJ8jbcQ3Pq7b1E0M0T0aHdjJc8IhRIZeYARclGl9wosdlMJhY',
    roleColor: 'bg-teal-600',
    statusColor: 'text-green-600',
    canMakeVolunteer: true,
    canBlock: true
  },
  {
    id: 2,
    name: 'Marcus Thompson',
    email: 'marcus.t@gmail.com',
    role: 'Volunteer',
    status: 'Active',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2-ST5Pg88CleQsvYaD7xEWVS2A1ZJ8ZS63L9nJB6uYfsDU-YrHMudJ3dmASjYYfCP6g_J6Yd5hzqt0L0NhnOa0ORaBgmf4lM5aL_W_JyAwCucGoiC1hwcav_hv0TF_nLpxhpojoDnqVxB2B9BUPCHTnKCPg0pre1QM6PBHLwXI1zK3cs9PTE_mI8O2bZjssACghxv-x4dCfsfxiBqOANswp7kjzyIblmUldSvdT4Ava06QrSrG8JYptqYlyhPSxHsOiUB8mYR0NU',
    roleColor: 'bg-amber-500',
    statusColor: 'text-green-600',
    canMakeVolunteer: false,
    canBlock: true
  },
  {
    id: 3,
    name: 'Eliza Vance',
    email: 'evance_32@outlook.com',
    role: 'Donor',
    status: 'Blocked',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGID3Ps5NQLA1IFFxqlphjEuvlTuHPcscJp8sbaCeB-5nJ7lNXgkwuYWvnIhdDTEcf-GabieDKt6nsw7Z56_aJSbjsDEsVmiStPw-5O7CZ1l5OlatYOJOQy85duO7mmCnxsLH47EK9Uu-TokG9I3eIS-OjQmE7Q1IempWtvPXmfMEPmgeBDDbLwVh7DnK5GUTmwkY0a9oQ8iYuBioJD9utZ8ZlNMyLVfMEPgvPaTsn68zfTvcMkEZn0uCmR8Hnp3eMkXP4ZBjked8',
    roleColor: 'bg-gray-300',
    statusColor: 'text-red-600',
    canMakeVolunteer: true,
    canBlock: false
  },
  {
    id: 4,
    name: 'Robert Chen',
    email: 'r.chen@university.edu',
    role: 'Donor',
    status: 'Active',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsV5eqaz8alvXr1lGjdyu-thFv2XtYuzO21QWHjzgNVfVMWd28MFOKbx5xXOSigIOubADqNYNRuocwUZsjfBnTmxLVHl4dKUrLZa6E4mDjB3izB3dsTFC4S9eowuhhrR-Xrd8VHLhLv2iy_5nyjgTivb636cFimgaK_uHTBVB5Li3IVhUOK2mTn2o3B1BBmTwcSLvSOaYgCUgVHn6BcV4z_xHdiG6cdlDW2ubkmHQCXTrszKad40LZuvHX2NTpNQBJehLPyCQ-OSo',
    roleColor: 'bg-gray-300',
    statusColor: 'text-green-600',
    canMakeVolunteer: true,
    canBlock: true
  }
]

export default function UserManagement() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  const tabCounts = {
    all: 124,
    active: 112,
    blocked: 12
  }

  return (
      <main className="min-h-screen px-12 py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-4xl font-bold text-gray-900">User Management</h2>
            <p className="text-gray-600 mt-1">Oversee system users, roles, and account statuses.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={handleSearch}
                className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700 w-64"
              />
            </div>
            <button className="flex items-center gap-2 bg-red-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-800 transition-colors">
              <Users className="w-5 h-5" />
              Add Admin
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-4 border-b-2 font-semibold transition-all ${
              activeTab === 'all'
                ? 'border-red-700 text-red-700'
                : 'border-transparent text-gray-600 hover:text-red-700'
            }`}
          >
            All Users <span className="ml-2 px-2 py-0.5 text-xs bg-red-100 rounded-full">{tabCounts.all}</span>
          </button>
          <button
            onClick={() => setActiveTab('active')}
            className={`px-6 py-4 border-b-2 font-semibold transition-all ${
              activeTab === 'active'
                ? 'border-red-700 text-red-700'
                : 'border-transparent text-gray-600 hover:text-red-700'
            }`}
          >
            Active <span className="ml-2 px-2 py-0.5 text-xs bg-gray-200 rounded-full">{tabCounts.active}</span>
          </button>
          <button
            onClick={() => setActiveTab('blocked')}
            className={`px-6 py-4 border-b-2 font-semibold transition-all ${
              activeTab === 'blocked'
                ? 'border-red-700 text-red-700'
                : 'border-transparent text-gray-600 hover:text-red-700'
            }`}
          >
            Blocked <span className="ml-2 px-2 py-0.5 text-xs bg-gray-200 rounded-full">{tabCounts.blocked}</span>
          </button>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-8">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">User Profile</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Role</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className={`hover:bg-gray-50 transition-colors ${user.status === 'Blocked' ? 'bg-red-50' : ''}`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-200"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${user.roleColor}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className={`font-semibold text-sm ${user.statusColor}`}>{user.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {user.canMakeVolunteer && (
                        <button className="px-3 py-1.5 bg-gray-100 border border-gray-300 text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-200 transition-colors">
                          Make Volunteer
                        </button>
                      )}
                      {user.role === 'Volunteer' && (
                        <button className="px-3 py-1.5 bg-red-700 text-white rounded-lg text-xs font-semibold hover:bg-red-800 transition-colors">
                          Make Admin
                        </button>
                      )}
                      {user.canBlock && (
                        <button className="px-3 py-1.5 border border-red-600 text-red-600 rounded-lg text-xs font-semibold hover:bg-red-50 transition-colors">
                          Block
                        </button>
                      )}
                      {!user.canBlock && (
                        <button className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-semibold hover:bg-green-700 transition-colors">
                          Unblock
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Footer */}
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200 bg-gray-50">
            <p className="text-sm text-gray-600">Showing 1 to 4 of 124 users</p>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-200 transition-colors">
                ❮
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded bg-red-700 text-white font-semibold text-sm">
                1
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-transparent text-gray-700 hover:bg-gray-200 transition-colors font-semibold text-sm">
                2
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-transparent text-gray-700 hover:bg-gray-200 transition-colors font-semibold text-sm">
                3
              </button>
              <span className="text-gray-600">...</span>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-200 transition-colors">
                ❯
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-3 gap-6">
          {/* Verification Rate */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm text-gray-600 uppercase font-semibold">Verification Rate</span>
            </div>
            <div className="text-4xl font-bold text-gray-900">94.2%</div>
          </div>

          {/* New Volunteers */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-amber-600" />
              </div>
              <span className="text-sm text-gray-600 uppercase font-semibold">New Volunteers</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-gray-900">+18</span>
              <span className="text-xs text-green-600 font-semibold">this month</span>
            </div>
          </div>

          {/* Reports Pending */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <span className="text-sm text-gray-600 uppercase font-semibold">Reports Pending</span>
            </div>
            <div className="text-4xl font-bold text-gray-900">03</div>
          </div>
        </div>
      </main>
    )
}
