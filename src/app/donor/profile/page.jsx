'use client'

import Link from 'next/link'
import { MapPin, Building2 } from 'lucide-react'
import { useState } from 'react'

export default function DonorProfilePage() {
  const [bloodGroup, setBloodGroup] = useState('B Positive (B+)')
  const [district, setDistrict] = useState('Dhaka')
  const [upazila, setUpazila] = useState('Dhanmondi')

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-8 py-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
          <Link href="#" className="bg-red-700 text-white px-6 py-2 rounded-md font-medium hover:bg-red-800 transition flex items-center gap-2">
            <span>✎</span>
            Edit Profile
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="p-8">
        {/* Profile Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-6">
              {/* Avatar */}
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
                alt="Ahmed Sharif"
                className="w-32 h-32 rounded-full object-cover"
              />
              {/* Info */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-2xl font-bold text-gray-900">Ahmed Sharif</h2>
                  <span className="bg-red-700 text-white text-xs font-semibold px-3 py-1 rounded-full">B Positive</span>
                </div>
                <p className="text-gray-600 mb-4">ahmed.sharif@lifeflow.org</p>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>Dhaka</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Building2 className="w-4 h-4" />
                    <span>Dhanmondi</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <p className="text-gray-600 text-sm font-medium mb-2">Total Donations</p>
            <p className="text-4xl font-bold text-gray-900">12</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <p className="text-gray-600 text-sm font-medium mb-2">Last Donation</p>
            <p className="text-2xl font-bold text-gray-900">Oct 24, 2023</p>
          </div>
        </div>

        {/* Personal Information Form */}
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-8 pb-4 border-b border-gray-200">Personal Information</h3>

          <div className="space-y-8">
            {/* Row 1: Full Name and Email */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">Full Name</label>
                <input
                  type="text"
                  defaultValue="Ahmed Sharif"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">Email Address</label>
                <input
                  type="email"
                  defaultValue="ahmed.sharif@lifeflow.org"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent bg-gray-50"
                />
              </div>
            </div>

            {/* Row 2: Blood Group and Phone */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">Blood Group</label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent bg-gray-50 appearance-none cursor-pointer"
                >
                  <option>A Positive (A+)</option>
                  <option>A Negative (A-)</option>
                  <option>B Positive (B+)</option>
                  <option>B Negative (B-)</option>
                  <option>O Positive (O+)</option>
                  <option>O Negative (O-)</option>
                  <option>AB Positive (AB+)</option>
                  <option>AB Negative (AB-)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">Phone Number</label>
                <input
                  type="tel"
                  defaultValue="+880 1712 345678"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent bg-gray-50"
                />
              </div>
            </div>

            {/* Row 3: District and Upazila */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">District</label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent bg-gray-50 appearance-none cursor-pointer"
                >
                  <option>Dhaka</option>
                  <option>Chittagong</option>
                  <option>Sylhet</option>
                  <option>Khulna</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">Upazila</label>
                <select
                  value={upazila}
                  onChange={(e) => setUpazila(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent bg-gray-50 appearance-none cursor-pointer"
                >
                  <option>Dhanmondi</option>
                  <option>Mirpur</option>
                  <option>Gulshan</option>
                  <option>Banani</option>
                </select>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-8 pt-8 border-t border-gray-200 flex justify-end">
            <button className="bg-red-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-800 transition">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
