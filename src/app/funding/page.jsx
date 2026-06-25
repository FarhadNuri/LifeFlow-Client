'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Droplet, Filter, Download, Heart, TrendingUp, Mail, Send, X } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

const initialMockDonors = [
  { name: 'Johnathan Doe', initials: 'JD', status: 'Verified', date: 'Oct 24, 2024', amount: '$1,200.00' },
  { name: 'Sarah Al-Fahad', initials: 'SA', status: 'Verified', date: 'Oct 22, 2024', amount: '$500.00' },
  { name: 'Markus Müller', initials: 'MM', status: 'Processing', date: 'Oct 21, 2024', amount: '$2,750.00' },
  { name: 'Elena L.', initials: 'EL', status: 'Verified', date: 'Oct 20, 2024', amount: '$150.00' },
  { name: 'Chen Huang', initials: 'CH', status: 'Verified', date: 'Oct 18, 2024', amount: '$10,000.00' },
  { name: 'Ali Reza', initials: 'AR', status: 'Verified', date: 'Oct 15, 2024', amount: '$250.00' },
  { name: 'Maria Garcia', initials: 'MG', status: 'Verified', date: 'Oct 12, 2024', amount: '$750.00' },
  { name: 'David Smith', initials: 'DS', status: 'Processing', date: 'Oct 10, 2024', amount: '$3,100.00' },
  { name: 'Aisha Khan', initials: 'AK', status: 'Verified', date: 'Oct 08, 2024', amount: '$1,000.00' },
  { name: 'Michael Chang', initials: 'MC', status: 'Verified', date: 'Oct 05, 2024', amount: '$400.00' },
]

export default function Funding() {
  const { user } = useAuth()
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [donors, setDonors] = useState(initialMockDonors)

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/donations`)
        if (res.ok) {
          const dbDonations = await res.json()
          setDonors([...dbDonations, ...initialMockDonors])
        }
      } catch (error) {
        console.error("Failed to fetch donations:", error)
      }
    }
    fetchDonations()
  }, [])

  const [currentPage, setCurrentPage] = useState(1)
  const [selectedDonor, setSelectedDonor] = useState(null)

  const itemsPerPage = 5
  const totalPages = Math.ceil(donors.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const displayedDonors = donors.slice(startIndex, startIndex + itemsPerPage)

  const totalRaised = donors.reduce((sum, donor) => sum + Number(donor.amount.replace(/[^0-9.-]+/g, "")), 0)
  const formattedTotalRaised = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalRaised)

  const handleGiveFundClick = () => {
    if (!user) {
      router.push('/login')
    } else {
      setShowModal(true)
    }
  }

  const handleDonate = async () => {
    try {
      setLoading(true)

      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/create-checkout-session`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ amount: Number(amount) })
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert(data.error || "Failed to initiate payment")
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Funding Initiatives</h1>
            <p className="text-gray-600 text-lg max-w-2xl">Support our mission to bridge the gap between donors and patients. Your contributions help maintain our high-speed logistics network and emergency response programs.</p>
          </div>
          <button onClick={handleGiveFundClick} className="flex items-center gap-2 bg-red-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-800 whitespace-nowrap">
            <Heart className="w-5 h-5" fill="currentColor" />
            Give Fund
          </button>
        </div>

        {/* Stats Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Total Funds Raised */}
          <div className="md:col-span-2 bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <p className="text-sm text-gray-600 mb-2">Total Funds Raised</p>
            <h2 className="text-5xl font-bold text-red-700 mb-4">{formattedTotalRaised}</h2>

          </div>

          {/* Active Donors */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-2">Active Donors</p>
            <p className="text-3xl font-bold text-gray-900 mb-4">{donors.length}</p>
            <div className="flex -space-x-3 overflow-hidden">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white"></div>
              ))}
              <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-600">9+</div>
            </div>
          </div>


        </div>

        {/* Recent Contributions Table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-900">Recent Contributions</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 md:px-6 py-3 text-left text-sm font-semibold text-gray-700">Donor Name</th>
                  <th className="hidden md:table-cell px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="hidden md:table-cell px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-4 md:px-6 py-3 text-right text-sm font-semibold text-gray-700">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {displayedDonors.map((donor, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-gray-50 cursor-pointer md:cursor-default transition-colors"
                    onClick={() => { if (window.innerWidth < 768) setSelectedDonor(donor) }}
                  >
                    <td className="px-4 md:px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center font-bold text-red-700 text-sm shrink-0">
                          {donor.initials}
                        </div>
                        <span className="font-medium text-gray-900">{donor.name}</span>
                      </div>
                    </td>
                    <td className="hidden md:table-cell px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${donor.status === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                        {donor.status}
                      </span>
                    </td>
                    <td className="hidden md:table-cell px-6 py-4 text-gray-600 text-sm">{donor.date}</td>
                    <td className="px-4 md:px-6 py-4 text-right font-semibold text-gray-900">{donor.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-4 md:px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
            <p className="text-sm text-gray-600">Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, donors.length)} of {donors.length} donors</p>
            <div className="flex gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full relative shadow-2xl">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Make a Donation</h2>
            <div className="mb-6">
              <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-red-700">
                <span className="text-gray-500 font-bold text-xl">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter your amount"
                  className="w-full py-2 px-3 outline-none font-bold text-gray-800 text-xl"
                />
              </div>
            </div>
            <button
              onClick={handleDonate}
              disabled={loading || !amount || Number(amount) <= 0}
              className="w-full bg-red-700 text-white py-3 rounded-lg font-bold hover:bg-red-800 transition disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              {loading ? <span className="animate-pulse">Processing...</span> : amount ? `Donate $${amount}` : 'Donate'}
            </button>
          </div>
        </div>
      )}

      {/* Mobile Details Modal */}
      {selectedDonor && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-[100] md:hidden p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm relative shadow-2xl">
            <button onClick={() => setSelectedDonor(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Contribution Details</h3>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center font-bold text-red-700 text-xl">
                {selectedDonor.initials}
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900">{selectedDonor.name}</h4>
                <p className="text-gray-500 font-semibold">{selectedDonor.amount}</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-500 text-sm">Status</span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${selectedDonor.status === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                  {selectedDonor.status}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-500 text-sm">Date</span>
                <span className="font-medium text-gray-900">{selectedDonor.date}</span>
              </div>
            </div>

            <button onClick={() => setSelectedDonor(null)} className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition">
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  )
}
