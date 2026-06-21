'use client'

import { Mail, Shield, ShieldCheck } from 'lucide-react'

export default function AdminProfilePage() {
  return (
    <div className="flex-1 overflow-auto bg-slate-50 min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Admin Profile</h1>
          <p className="text-sm text-gray-600 mt-1">Manage your administrator account settings</p>
        </div>
      </header>

      {/* Content */}
      <div className="p-8">
        <div className="max-w-3xl">
          {/* Profile Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
                <ShieldCheck className="w-10 h-10 text-red-700" />
              </div>
              <div className="pt-2">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900">System Admin</h2>
                  <span className="bg-red-700 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    Super Admin
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <Mail className="w-4 h-4" />
                  <span>admin@lifeflow.org</span>
                </div>
              </div>
            </div>
          </div>

          {/* Account Details Form */}
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">Account Details</h3>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Full Name</label>
                  <input
                    type="text"
                    defaultValue="System Admin"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Email Address</label>
                  <input
                    type="email"
                    defaultValue="admin@lifeflow.org"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent bg-gray-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Role</label>
                <input
                  type="text"
                  defaultValue="Super Administrator"
                  disabled
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-2">Roles can only be modified by other Super Administrators.</p>
              </div>

              <div className="pt-6 border-t border-gray-200 flex justify-end">
                <button className="bg-red-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-800 transition">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
