'use client'

import { Search, AlertCircle, Users, Bell } from 'lucide-react'
import { useState } from 'react'

export default function SearchDonors() {
  const [searchActive, setSearchActive] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    setSearchActive(true)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Main Content */}
      <main className="grow">
        {/* Hero Search Section */}
        <section className="py-8 md:py-12 px-4 md:px-12 bg-white">
          <div className="max-w-6xl mx-auto">
            {/* Title Section */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Find Life-Saving Donors</h1>
              <p className="text-lg text-gray-600 max-w-2xl">
                Connect with thousands of verified blood donors across the country. Search by location and blood group to find an immediate match.
              </p>
            </div>

            {/* Search Form Card */}
            <div className="bg-white border border-gray-300 rounded-2xl p-6 md:p-8 shadow-sm mb-8">
              <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 items-end">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent">
                    <option>Select Group</option>
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>O+</option>
                    <option>O-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent">
                    <option>Select District</option>
                    <option>Dhaka</option>
                    <option>Chittagong</option>
                    <option>Sylhet</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upazila</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent">
                    <option>Select Upazila</option>
                    <option>Gulshan</option>
                    <option>Dhanmondi</option>
                    <option>Uttara</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-700 text-white py-3 rounded-lg font-semibold hover:bg-red-800 transition flex items-center justify-center gap-2"
                >
                  <Search className="w-5 h-5" />
                  Search
                </button>
              </form>
            </div>

            {/* Results Section */}
            <div className="min-h-96 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50/50 flex flex-col items-center justify-center p-8 mb-8">
              {!searchActive ? (
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No results yet</h3>
                  <p className="text-gray-600">Use the search form above to find donors in your area.</p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="inline-block mb-4">
                    <div className="w-12 h-12 border-4 border-red-700 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <p className="text-gray-600">Searching verified donors...</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Why Use LifeFlow Section */}
        <section className="py-12 md:py-16 px-4 md:px-12 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Why use LifeFlow?</h2>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[250px]">
              {/* Card 1 - Large Left (Verified Profiles) */}
              <div className="md:col-span-8 bg-white border border-gray-200 rounded-xl p-8 flex flex-col justify-between hover:shadow-lg transition">
                <div>
                  <AlertCircle className="w-6 h-6 text-red-700 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Verified Donor Profiles</h3>
                  <p className="text-gray-600">
                    Every donor in our system undergoes a verification process to ensure reliability and safety during critical emergencies.
                  </p>
                </div>
                <div className="flex gap-3 flex-wrap">
                  <span className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm font-semibold">80k+ Donors</span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold">Updated Daily</span>
                </div>
              </div>

              {/* Card 2 - Small Right (Emergency CTA) */}
              <div className="md:col-span-4 bg-red-700 text-white rounded-xl p-8 flex flex-col items-center justify-center text-center hover:shadow-lg transition">
                <AlertCircle className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Need Help Fast?</h3>
                <p className="text-red-100 mb-6 text-sm">Post a public request if you can't find a direct donor match.</p>
                <button className="bg-white text-red-700 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition">
                  Post Request
                </button>
              </div>

              {/* Card 3 - Small Left (Live Alerts) */}
              <div className="md:col-span-4 bg-white border border-gray-200 rounded-xl p-8 flex flex-col justify-between hover:shadow-lg transition">
                <div>
                  <Bell className="w-6 h-6 text-amber-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Live Alerts</h3>
                  <p className="text-gray-600 text-sm">
                    Get notified the moment a donor matching your criteria becomes available.
                  </p>
                </div>
              </div>

              {/* Card 4 - Large Right (Community Impact) */}
              <div className="md:col-span-8 bg-white border border-gray-200 rounded-xl p-8 flex items-center gap-6 hover:shadow-lg transition">
                <div className="w-24 h-24 bg-gray-300 rounded-lg shrink-0"></div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Our Community Impact</h3>
                  <p className="text-gray-600">
                    We've facilitated over 12,000 successful donations in the last quarter alone, connecting hearts and saving lives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
