'use client'

import { Search, AlertCircle, Users, Bell } from 'lucide-react'
import { useState } from 'react'

export default function SearchDonors() {
  const [donors, setDonors] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    setHasSearched(true)
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const params = new URLSearchParams()

    const bg = formData.get('bloodGroup')
    const dist = formData.get('district')
    const upa = formData.get('upazila')

    if (bg && bg !== 'Select Group') params.append('bloodGroup', bg)
    if (dist && dist !== 'Select District') params.append('district', dist)
    if (upa && upa !== 'Select Upazila') params.append('upazila', upa)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/donors?${params.toString()}`)
      if (res.ok) {
        const data = await res.json()
        setDonors(data)
      }
    } catch (error) {
      console.error("Failed to fetch donors:", error)
    } finally {
      setLoading(false)
    }
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
                  <select name="bloodGroup" className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent">
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
                  <select name="district" className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent">
                    <option value="Select District">Select District</option>
                    <option value="dhaka">Dhaka</option>
                    <option value="chattogram">Chattogram</option>
                    <option value="sylhet">Sylhet</option>
                    <option value="rajshahi">Rajshahi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upazila</label>
                  <select name="upazila" className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent">
                    <option value="Select Upazila">Select Upazila</option>
                    <option value="gulshan">Gulshan</option>
                    <option value="dhanmondi">Dhanmondi</option>
                    <option value="uttara">Uttara</option>
                    <option value="mirpur">Mirpur</option>
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
            {hasSearched && !loading && donors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {donors.map((donor) => (
                  <div key={donor._id} className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 bg-red-100 text-red-700 rounded-full flex items-center justify-center font-bold text-xl">
                        {donor.bloodGroup}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{donor.name}</h3>
                        <span className="text-sm text-gray-500 capitalize">{donor.upazila}, {donor.district}</span>
                      </div>
                    </div>
                    <a href={`mailto:${donor.email}`} className="w-full bg-red-50 text-red-700 py-2 rounded-lg font-semibold hover:bg-red-100 transition block text-center truncate px-2">
                      {donor.email}
                    </a>
                  </div>
                ))}
              </div>
            ) : hasSearched && !loading && donors.length === 0 ? (
              <div className="min-h-96 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50/50 flex flex-col items-center justify-center p-8 mb-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No donors found</h3>
                  <p className="text-gray-600">We couldn't find any donors matching your criteria. Try adjusting your filters.</p>
                </div>
              </div>
            ) : (
              <div className="min-h-96 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50/50 flex flex-col items-center justify-center p-8 mb-8">
                {!loading ? (
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
            )}
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
