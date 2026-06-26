'use client'

import { Search, AlertCircle, Users, Bell } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function SearchDonors() {
  const [donors, setDonors] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [visibleCount, setVisibleCount] = useState(6)

  const [divisions, setDivisions] = useState([])
  const [districts, setDistricts] = useState([])
  const [upazilas, setUpazilas] = useState([])
  const [selectedDivision, setSelectedDivision] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedUpazila, setSelectedUpazila] = useState('')

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

  const handleSearch = async (e) => {
    e.preventDefault()
    setHasSearched(true)
    setLoading(true)
    setVisibleCount(6)

    const formData = new FormData(e.currentTarget)
    const params = new URLSearchParams()

    const bg = formData.get('bloodGroup')

    if (bg && bg !== 'Select Group') params.append('bloodGroup', bg)
    if (selectedDistrict) params.append('district', selectedDistrict)
    if (selectedUpazila) params.append('upazila', selectedUpazila)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/donors?${params.toString()}`)
      if (res.ok) {
        let data = await res.json()
        
        // Filter by division on the frontend if division is selected but district is not
        if (selectedDivision && !selectedDistrict) {
          const validDistricts = districts.filter(d => d.division_id === selectedDivision).map(d => d.name)
          data = data.filter(donor => validDistricts.includes(donor.district))
        }
        
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
      <main className="grow">
        <section className="py-8 md:py-12 px-4 md:px-12 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Find Life-Saving Donors</h1>
              <p className="text-lg text-gray-600 max-w-2xl">
                Connect with thousands of verified blood donors across the country. Search by location and blood group to find an immediate match.
              </p>
            </div>

            <div className="bg-white border border-gray-300 rounded-2xl p-6 md:p-8 shadow-sm mb-8">
              <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6 items-end">
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Division</label>
                  <select
                    value={selectedDivision}
                    onChange={(e) => {
                      setSelectedDivision(e.target.value);
                      setSelectedDistrict('');
                      setSelectedUpazila('');
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent"
                  >
                    <option value="">Select Division</option>
                    {divisions.map(div => (
                      <option key={div.id} value={div.id}>{div.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
                  <select
                    name="district"
                    value={selectedDistrict}
                    onChange={(e) => {
                      setSelectedDistrict(e.target.value);
                      setSelectedUpazila('');
                    }}
                    disabled={!selectedDivision}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-400"
                  >
                    <option value="">Select District</option>
                    {districts
                      .filter(dist => dist.division_id === selectedDivision)
                      .map(dist => (
                        <option key={dist.id} value={dist.name}>{dist.name}</option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upazila</label>
                  <select
                    name="upazila"
                    value={selectedUpazila}
                    onChange={(e) => setSelectedUpazila(e.target.value)}
                    disabled={!selectedDistrict}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-400"
                  >
                    <option value="">Select Upazila</option>
                    {upazilas
                      .filter(upa => upa.district_id === districts.find(d => d.name === selectedDistrict)?.id)
                      .map(upa => (
                        <option key={upa.id} value={upa.name}>{upa.name}</option>
                      ))}
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

            {hasSearched && !loading && donors.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {donors.slice(0, visibleCount).map((donor) => (
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
                {visibleCount < donors.length && (
                  <div className="flex justify-center mb-12">
                    <button
                      onClick={() => setVisibleCount(prev => prev + 6)}
                      className="bg-white text-red-700 border-2 border-red-700 px-8 py-3 rounded-lg font-bold hover:bg-red-50 transition"
                    >
                      View More
                    </button>
                  </div>
                )}
              </>
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

        <section className="py-12 md:py-16 px-4 md:px-12 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Why use LifeFlow?</h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[250px]">
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

              <div className="md:col-span-4 bg-red-700 text-white rounded-xl p-8 flex flex-col items-center justify-center text-center hover:shadow-lg transition">
                <AlertCircle className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Need Help Fast?</h3>
                <p className="text-red-100 mb-6 text-sm">Post a public request if you can't find a direct donor match.</p>
              </div>

              <div className="md:col-span-4 bg-white border border-gray-200 rounded-xl p-8 flex flex-col justify-between hover:shadow-lg transition">
                <div>
                  <Bell className="w-6 h-6 text-amber-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Live Alerts</h3>
                  <p className="text-gray-600 text-sm">
                    Get notified the moment a donor matching your criteria becomes available.
                  </p>
                </div>
              </div>

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
