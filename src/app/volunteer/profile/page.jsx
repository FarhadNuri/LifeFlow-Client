'use client'

import Link from 'next/link'
import { MapPin, Building2, Loader2, Edit } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'

export default function VolunteerProfilePage() {
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

  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const showToast = (message) => {
    setToastMessage(message)
    setTimeout(() => setToastMessage(''), 5000)
  }

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

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/volunteer/profile/${userId}`, {
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

  const handleSave = async () => {
    try {
      setIsSaving(true)
      await new Promise(r => setTimeout(r, 1500))
      const token = localStorage.getItem('token')
      const userId = user?.id || user?.sub || user?._id

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/volunteer/profile/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          bloodType: bloodGroup,
          phone,
          district,
          upazila
        })
      })

      if (response.ok) {
        setIsEditing(false)
        showToast('Profile updated successfully!')
        setProfile(prev => ({ ...prev, name, bloodType: bloodGroup, phone, district, upazila }))
      } else {
        setError('Failed to update profile')
      }
    } catch (err) {
      console.error(err)
      setError('An error occurred while saving')
    } finally {
      setIsSaving(false)
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
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-8 py-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>

        </div>
      </header>

      <div className="p-4 md:p-8">
        {error && (
          <div className="mb-8 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 w-full text-center md:text-left">
              <img
                src={profile?.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"}
                alt={name || "Volunteer"}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover shadow-sm"
              />
              <div className="flex flex-col items-center md:items-start">
                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 mb-2 md:mb-3">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">{name || 'Loading...'}</h2>
                  <span className="bg-red-700 text-white text-xs font-semibold px-3 py-1 rounded-full">{bloodGroup}</span>
                </div>
                <p className="text-gray-600 mb-4 text-sm md:text-base">{email}</p>
                <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-6 text-sm">
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

        <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
          <div className="flex items-center justify-between mb-6 md:mb-8 pb-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-red-50 text-red-700 px-3 md:px-4 py-2 rounded-lg font-semibold hover:bg-red-100 transition flex items-center gap-2 text-xs md:text-sm"
              >
                <Edit className="w-4 h-4" /> Edit Profile
              </button>
            )}
          </div>

          <div className="space-y-6 md:space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent text-gray-900 ${isEditing ? 'bg-white' : 'bg-gray-50 cursor-not-allowed'}`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">Email Address</label>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent bg-gray-100 cursor-not-allowed text-gray-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">Blood Group</label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent appearance-none text-gray-900 ${isEditing ? 'bg-white cursor-pointer' : 'bg-gray-50 cursor-not-allowed'}`}
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
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent text-gray-900 ${isEditing ? 'bg-white' : 'bg-gray-50 cursor-not-allowed'}`}
                />
              </div>
            </div>

          </div>

          {isEditing && (
            <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-end gap-3 md:gap-4">
              <button
                onClick={() => {
                  setIsEditing(false);
                  fetchProfile();
                }}
                disabled={isSaving}
                className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-red-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-800 transition flex items-center justify-center gap-2 disabled:opacity-70 w-full sm:w-auto"
              >
                {isSaving && <Loader2 className="w-5 h-5 animate-spin" />}
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </div>
      </div>

      {toastMessage && (
        <div className="fixed top-20 right-4 md:top-24 md:right-8 bg-green-50 text-green-700 px-6 py-3 rounded-lg shadow-lg border border-green-200 z-50 flex items-center gap-2 animate-in slide-in-from-top-2 duration-300">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white shrink-0">✓</div>
          <p className="font-semibold text-sm">{toastMessage}</p>
        </div>
      )}
    </div>
  )
}
