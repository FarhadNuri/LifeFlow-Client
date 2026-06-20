import Link from 'next/link'
import { Droplet, Filter, Download, Heart, TrendingUp, Mail, Send } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export default function Funding() {
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
          <button className="flex items-center gap-2 bg-red-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-800 whitespace-nowrap">
            <Heart className="w-5 h-5" fill="currentColor" />
            Give Fund
          </button>
        </div>

        {/* Stats Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Total Funds Raised */}
          <div className="md:col-span-2 bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <p className="text-sm text-gray-600 mb-2">Total Funds Raised</p>
            <h2 className="text-5xl font-bold text-red-700 mb-4">$428,950.00</h2>
            <div className="flex items-center gap-2 text-green-600 font-semibold">
              <TrendingUp className="w-5 h-5" />
              12.5% increase from last month
            </div>
          </div>

          {/* Active Donors */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-2">Active Donors</p>
            <p className="text-3xl font-bold text-gray-900 mb-4">1,240</p>
            <div className="flex -space-x-3 overflow-hidden">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white"></div>
              ))}
              <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-600">+1k</div>
            </div>
          </div>

          {/* Campaign Goal */}
          <div className="md:col-span-1 bg-red-700 text-white rounded-xl p-6 shadow-sm">
            <p className="text-sm opacity-80 mb-2">Campaign Goal</p>
            <p className="text-3xl font-bold mb-4">$500,000</p>
            <div className="w-full bg-white/20 h-2 rounded-full mb-2">
              <div className="bg-white h-full rounded-full" style={{ width: '85%' }}></div>
            </div>
            <p className="text-sm opacity-80 text-right">85% Complete</p>
          </div>
        </div>

        {/* Recent Contributions Table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-900">Recent Contributions</h3>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-gray-200 rounded-lg">
                <Filter className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded-lg">
                <Download className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Donor Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { name: 'Johnathan Doe', initials: 'JD', status: 'Verified', date: 'Oct 24, 2024', amount: '$1,200.00' },
                  { name: 'Sarah Al-Fahad', initials: 'SA', status: 'Verified', date: 'Oct 22, 2024', amount: '$500.00' },
                  { name: 'Markus Müller', initials: 'MM', status: 'Processing', date: 'Oct 21, 2024', amount: '$2,750.00' },
                  { name: 'Elena L.', initials: 'EL', status: 'Verified', date: 'Oct 20, 2024', amount: '$150.00' },
                  { name: 'Chen Huang', initials: 'CH', status: 'Verified', date: 'Oct 18, 2024', amount: '$10,000.00' },
                ].map((donor, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center font-bold text-red-700 text-sm">
                          {donor.initials}
                        </div>
                        <span className="font-medium text-gray-900">{donor.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        donor.status === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {donor.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{donor.date}</td>
                    <td className="px-6 py-4 text-right font-semibold text-gray-900">{donor.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
            <p className="text-sm text-gray-600">Showing 5 of 1,240 donors</p>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100">Previous</button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100">Next</button>
            </div>
          </div>
        </div>
      </main>

    </div>
  )
}
