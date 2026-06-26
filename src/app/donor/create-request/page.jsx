'use client'

import Link from 'next/link'
import { Droplet, AlertCircle, Send, Loader2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

export default function CreateRequest() {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    bloodGroup: '',
    district: '',
    upazila: '',
    date: '',
    time: '',
    message: '',
  })

  const [divisions, setDivisions] = useState([])
  const [districts, setDistricts] = useState([])
  const [upazilas, setUpazilas] = useState([])
  const [selectedDivision, setSelectedDivision] = useState('')

  useEffect(() => {
    fetch('/divisions.json')
      .then(res => res.json())
      .then(data => {
        const divData = data.find(item => item.type === 'table' && item.name === 'divisions')
        if (divData) setDivisions(divData.data)
      })
      .catch(err => console.error("Error loading divisions:", err))

    fetch('/districts.json')
      .then(res => res.json())
      .then(data => {
        const distData = data.find(item => item.type === 'table' && item.name === 'districts')
        if (distData) setDistricts(distData.data)
      })
      .catch(err => console.error("Error loading districts:", err))

    fetch('/upazilas.json')
      .then(res => res.json())
      .then(data => {
        const upaData = data.find(item => item.type === 'table' && item.name === 'upazilas')
        if (upaData) setUpazilas(upaData.data)
      })
      .catch(err => console.error("Error loading upazilas:", err))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await new Promise(resolve => setTimeout(resolve, 2500))

      const token = localStorage.getItem('token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/donor/requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Failed to create request')
      }

      setShowToast(true)
      setTimeout(() => {
        setShowToast(false)
        router.push('/donor/my-requests')
      }, 5000)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {showToast && (
        <div className="fixed top-24 right-4 md:right-8 bg-green-50 text-green-700 px-6 py-3 rounded-lg shadow-lg border border-green-200 z-[70] flex items-center gap-2 animate-in slide-in-from-top-2 duration-300">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white shrink-0">✓</div>
          <p className="font-semibold text-sm">Blood donation request successfully broadcasted!</p>
        </div>
      )}
      <main className="w-full max-w-6xl mx-auto px-4 md:px-12 py-8 mt-16 md:mt-0">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Create Donation Request</h2>
            <p className="text-gray-600 mt-1">Fill in the details below to broadcast your blood requirement to the community.</p>
          </div>

        </div>

        <div className="w-full">
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-12 h-12 animate-spin text-red-700 mb-4" />
                <h3 className="text-xl font-bold text-gray-900">Broadcasting Request</h3>
                <p className="text-gray-600 mt-2">Please wait while we notify nearby donors...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-4">
                  {error && (
                    <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm mb-4">
                      {error}
                    </div>
                  )}
                  <h4 className="text-xs font-bold text-red-700 uppercase tracking-widest">Requester Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-600 font-medium">Requester Name</label>
                      <input
                        type="text"
                        readOnly
                        value={user?.name || 'Loading...'}
                        className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-gray-600 text-sm cursor-not-allowed focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-600 font-medium">Email Address</label>
                      <input
                        type="email"
                        readOnly
                        value={user?.email || 'Loading...'}
                        className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-gray-600 text-sm cursor-not-allowed focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <hr className="border-gray-200" />

                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-red-700 uppercase tracking-widest">Donation Requirements</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="bloodGroup" className="text-sm text-gray-900 font-medium">Blood Group</label>
                      <select
                        id="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                        required
                        className="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent text-gray-900 bg-white"
                      >
                        <option value="">Select Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="division" className="text-sm text-gray-900 font-medium">Division</label>
                      <select
                        id="division"
                        value={selectedDivision}
                        onChange={(e) => {
                          setSelectedDivision(e.target.value)
                          setFormData({ ...formData, district: '', upazila: '' })
                        }}
                        required
                        className="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent text-gray-900 bg-white"
                      >
                        <option value="">Select Division</option>
                        {divisions.map((div) => (
                          <option key={div.id} value={div.name}>{div.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="district" className="text-sm text-gray-900 font-medium">District</label>
                      <select
                        id="district"
                        value={formData.district}
                        onChange={(e) => setFormData({ ...formData, district: e.target.value, upazila: '' })}
                        required
                        disabled={!selectedDivision}
                        className="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent text-gray-900 bg-white disabled:opacity-50 disabled:bg-gray-50"
                      >
                        <option value="">Select District</option>
                        {districts
                          .filter((dist) => {
                            const div = divisions.find(d => d.name === selectedDivision)
                            return div && dist.division_id === div.id
                          })
                          .map((dist) => (
                            <option key={dist.id} value={dist.name}>{dist.name}</option>
                          ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="upazila" className="text-sm text-gray-900 font-medium">Upazila</label>
                      <select
                        id="upazila"
                        value={formData.upazila}
                        onChange={(e) => setFormData({ ...formData, upazila: e.target.value })}
                        required
                        disabled={!formData.district}
                        className="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent text-gray-900 bg-white disabled:opacity-50 disabled:bg-gray-50"
                      >
                        <option value="">Select Upazila</option>
                        {upazilas
                          .filter((upa) => {
                            const dist = districts.find(d => d.name === formData.district)
                            return dist && upa.district_id === dist.id
                          })
                          .map((upa) => (
                            <option key={upa.id} value={upa.name}>{upa.name}</option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="date" className="text-sm text-gray-900 font-medium">Expected Date</label>
                    <input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                      className="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent text-gray-900 bg-white"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="time" className="text-sm text-gray-900 font-medium">Expected Time</label>
                    <input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      required
                      className="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent text-gray-900 bg-white"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm text-gray-900 font-medium">Request Message / Special Instructions</label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    placeholder="e.g. Please bring an NID card, patient is at City Hospital Bed 402..."
                    rows={4}
                    className="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent resize-none text-gray-900 bg-white"
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 bg-red-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-800 transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="animate-pulse">Submitting...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Request
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

    </>
  )
}
