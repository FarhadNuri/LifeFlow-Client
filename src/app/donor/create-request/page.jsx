'use client'

import Link from 'next/link'
import { Droplet, AlertCircle, Send } from 'lucide-react'
import { useState } from 'react'

export default function CreateRequest() {
  const [formData, setFormData] = useState({
    bloodGroup: '',
    district: '',
    upazila: '',
    date: '',
    time: '',
    message: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Blood donation request has been successfully broadcasted!')
  }

  return (
    <>
      <main className="w-full max-w-6xl mx-auto px-4 md:px-12 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Create Donation Request</h2>
            <p className="text-gray-600 mt-1">Fill in the details below to broadcast your blood requirement to the community.</p>
          </div>
          <div className="hidden md:flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full font-medium">
            <AlertCircle className="w-5 h-5" />
            Urgent requests are prioritized
          </div>
        </div>

        {/* Form Layout: Sidebar + Main Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Info Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm h-full flex flex-col justify-end">
              <div className="absolute inset-0 opacity-5 bg-cover bg-center rounded-xl" style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1576091160550-112173f7f869?w=400&h=400&fit=crop)',
              }}></div>
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 bg-red-50 text-red-700 text-xs font-bold rounded-full mb-4">Quick Guide</span>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Why accurate data matters</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Providing precise location and timing helps donors understand the urgency and feasibility of their contribution. Your request will be shared with donors matching your blood group in the specified district.
                </p>
              </div>
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Requester Information Section */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-red-700 uppercase tracking-widest">Requester Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-600 font-medium">Requester Name</label>
                      <div className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-gray-600 text-sm cursor-not-allowed">
                        Sarah J. Mitchell
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-600 font-medium">Email Address</label>
                      <div className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-gray-600 text-sm cursor-not-allowed">
                        sarah.mitchell@example.com
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="border-gray-200" />

                {/* Donation Requirements Section */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-red-700 uppercase tracking-widest">Donation Requirements</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="bloodGroup" className="text-sm text-gray-900 font-medium">Blood Group</label>
                      <select
                        id="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                        className="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent"
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
                      <label htmlFor="district" className="text-sm text-gray-900 font-medium">District</label>
                      <select
                        id="district"
                        value={formData.district}
                        onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                        className="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent"
                      >
                        <option value="">Select District</option>
                        <option value="dhaka">Dhaka</option>
                        <option value="chattogram">Chattogram</option>
                        <option value="sylhet">Sylhet</option>
                        <option value="rajshahi">Rajshahi</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="upazila" className="text-sm text-gray-900 font-medium">Upazila</label>
                      <select
                        id="upazila"
                        value={formData.upazila}
                        onChange={(e) => setFormData({ ...formData, upazila: e.target.value })}
                        className="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent"
                      >
                        <option value="">Select Upazila</option>
                        <option value="uttara">Uttara</option>
                        <option value="banani">Banani</option>
                        <option value="gulshan">Gulshan</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Date and Time Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="date" className="text-sm text-gray-900 font-medium">Expected Date</label>
                    <input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="time" className="text-sm text-gray-900 font-medium">Expected Time</label>
                    <input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Message Section */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm text-gray-900 font-medium">Request Message / Special Instructions</label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="e.g. Please bring an NID card, patient is at City Hospital Bed 402..."
                    rows={4}
                    className="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-red-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-800 transition active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center py-3 z-40">
        <Link href="/donor" className="flex flex-col items-center gap-1 text-gray-600">
          <Droplet className="w-6 h-6" />
          <span className="text-xs font-medium">Home</span>
        </Link>
        <Link href="/donor/my-requests" className="flex flex-col items-center gap-1 text-gray-600">
          <Droplet className="w-6 h-6" />
          <span className="text-xs font-medium">Requests</span>
        </Link>
        <Link href="/donor/create-request" className="flex flex-col items-center gap-1 text-red-700">
          <AlertCircle className="w-6 h-6" fill="currentColor" />
          <span className="text-xs font-bold">Create</span>
        </Link>
        <Link href="/donor/profile" className="flex flex-col items-center gap-1 text-gray-600">
          <Droplet className="w-6 h-6" />
          <span className="text-xs font-medium">Profile</span>
        </Link>
      </nav>
    </>
  )
}
