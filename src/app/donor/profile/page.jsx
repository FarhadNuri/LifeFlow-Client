'use client'

import Link from 'next/link'
import { MapPin, Building2, Loader2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'

export default function DonorProfilePage() {
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [bloodGroup, setBloodGroup] = useState('')
  const [district, setDistrict] = useState('')
  const [upazila, setUpazila] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    if (user) {
      fetchProfile()
    }
  }, [user])

  const fetchProfile = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const userId = user?.id || user?.sub || user?._id

      if (!userId || !token) {
        setLoading(false)
        return
      }

      const response = await fetch(`http://localhost:5000/donor/profile/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setProfile(data)
        setName(data.name || '')
        setEmail(data.email || '')
        setBloodGroup(data.bloodType || data.bloodGroup || '')
        setPhone(data.phone || '')
        setDistrict(data.location || data.district || '')
        setUpazila(data.upazila || '')
      } else {
        setError('Failed to load profile')
      }
    } catch (err) {
      console.error(err)
      setError('Failed to connect to the server')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-red-700" />
      </div>
    )
  }

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
        {error && (
          <div className="mb-8 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-6">
              {/* Avatar */}
              <img
                src={profile?.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"}
                alt={name || "Donor"}
                className="w-32 h-32 rounded-full object-cover"
              />
              {/* Info */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-2xl font-bold text-gray-900">{name || 'Loading...'}</h2>
                  <span className="bg-red-700 text-white text-xs font-semibold px-3 py-1 rounded-full">{bloodGroup}</span>
                </div>
                <p className="text-gray-600 mb-4">{email}</p>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{district}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Building2 className="w-4 h-4" />
                    <span>{upazila}</span>
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent bg-gray-50 text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">Email Address</label>
                <input
                  type="email"
                  value={email}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent bg-gray-100 cursor-not-allowed text-gray-900"
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
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent bg-gray-50 appearance-none cursor-pointer text-gray-900"
                >
                  <option value="">Select</option>
                  <option value="A+">A Positive (A+)</option>
                  <option value="A-">A Negative (A-)</option>
                  <option value="B+">B Positive (B+)</option>
                  <option value="B-">B Negative (B-)</option>
                  <option value="O+">O Positive (O+)</option>
                  <option value="O-">O Negative (O-)</option>
                  <option value="AB+">AB Positive (AB+)</option>
                  <option value="AB-">AB Negative (AB-)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent bg-gray-50 text-gray-900"
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
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent bg-gray-50 appearance-none cursor-pointer text-gray-900"
                >
                  <option value="">Select</option>
                  <option value="dhaka">Dhaka</option>
                  <option value="chattogram">Chattogram</option>
                  <option value="sylhet">Sylhet</option>
                  <option value="rajshahi">Rajshahi</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">Upazila</label>
                <select
                  value={upazila}
                  onChange={(e) => setUpazila(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent bg-gray-50 appearance-none cursor-pointer text-gray-900"
                >
                  <option value="">Select</option>
                  <option value="gulshan">Gulshan</option>
                  <option value="dhanmondi">Dhanmondi</option>
                  <option value="uttara">Uttara</option>
                  <option value="mirpur">Mirpur</option>
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
