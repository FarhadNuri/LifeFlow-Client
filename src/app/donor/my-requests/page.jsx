'use client';

import { useState } from 'react';
import { Heart, Share2, Plus, Search, Filter, Eye, Edit, Trash2, ArrowRight } from 'lucide-react';

const recentRequests = [
  {
    id: 1,
    recipient: 'Sarah Johnson',
    initials: 'SJ',
    location: 'City General Hospital',
    date: 'Oct 12, 2024',
    time: '10:30 AM',
    bloodType: 'A+',
    status: 'Completed',
    statusColor: 'bg-green-100 text-green-700',
  },
  {
    id: 2,
    recipient: 'Mark Wilson',
    initials: 'MW',
    location: 'St. Jude Medical Center',
    date: 'Oct 15, 2024',
    time: '02:15 PM',
    bloodType: 'B-',
    status: 'Pending',
    statusColor: 'bg-amber-100 text-amber-700',
  },
  {
    id: 3,
    recipient: 'Robert Chen',
    initials: 'RC',
    location: 'Metro Clinic East',
    date: 'Oct 18, 2024',
    time: '09:00 AM',
    bloodType: 'O-',
    status: 'Urgent',
    statusColor: 'bg-red-100 text-red-700',
  },
];

const DonorDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
      <main className="w-full">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-slate-200 p-4 flex justify-between items-center sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-700 rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-red-700">LifeFlow</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-slate-600 hover:text-slate-900"
          >
            ☰
          </button>
        </div>

        {/* Main Grid */}
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          {/* Header Section */}
          <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                Welcome back, John Doe!
              </h2>
              <p className="text-slate-600">
                Your contributions have impacted 12 lives this year.
              </p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 border border-slate-300 bg-white text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors flex items-center gap-2 text-sm md:text-base">
                <Share2 className="w-4 h-4" />
                Share Portal
              </button>
              <button className="px-4 py-2 bg-red-700 text-white rounded-lg font-semibold hover:bg-red-800 transition-colors flex items-center gap-2 text-sm md:text-base">
                <Plus className="w-4 h-4" />
                New Request
              </button>
            </div>
          </header>

          {/* Bento Grid Stats */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Total Personal Requests Card */}
            <div className="md:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                Total Personal Requests
              </h3>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-bold text-red-700">08</span>
                <span className="text-sm font-semibold text-orange-600">+2 this month</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="bg-red-700 h-full w-3/4 rounded-full"></div>
                  </div>
                  <span className="text-xs text-slate-600">Active goal: 12</span>
                </div>
              </div>
            </div>

            {/* Urgent Need Card */}
            <div className="bg-red-700 text-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <span className="text-2xl">🆘</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Need O-?</h3>
              <p className="text-red-100 text-sm mb-4">
                There is an urgent request in your area for O negative blood.
              </p>
              <button className="w-full bg-white text-red-700 font-semibold py-2 rounded-lg hover:bg-red-50 transition-colors text-sm">
                Donate Now
              </button>
            </div>
          </section>

          {/* Recent Requests Section */}
          <section className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <h3 className="text-lg font-bold text-slate-900">Recent Requests</h3>
              <div className="flex gap-2">
                <div className="relative flex-1 md:flex-none">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search requests..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-red-700 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <button className="p-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                  <Filter className="w-4 h-4 text-slate-600" />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 font-semibold text-slate-700">Recipient</th>
                    <th className="px-6 py-3 font-semibold text-slate-700">Location</th>
                    <th className="px-6 py-3 font-semibold text-slate-700">Date & Time</th>
                    <th className="px-6 py-3 font-semibold text-slate-700">Blood Group</th>
                    <th className="px-6 py-3 font-semibold text-slate-700">Status</th>
                    <th className="px-6 py-3 font-semibold text-slate-700 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {recentRequests.map((request) => (
                    <tr
                      key={request.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center font-bold text-red-700 text-xs">
                            {request.initials}
                          </div>
                          <span className="font-semibold text-slate-900">
                            {request.recipient}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {request.location}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        <div className="flex flex-col">
                          <span>{request.date}</span>
                          <span className="text-xs text-slate-500">{request.time}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-red-700 text-white font-bold text-xs ring-2 ring-red-200">
                          {request.bloodType}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full font-semibold text-xs ${request.statusColor}`}
                        >
                          {request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            title="View"
                            className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            title="Edit"
                            className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            title="Delete"
                            className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-slate-50 flex justify-center border-t border-slate-200">
              <button className="flex items-center gap-2 text-red-700 font-semibold hover:underline transition-all group text-sm">
                View All My Requests
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-8 py-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4 text-slate-600 border-t border-slate-200 text-xs md:text-sm">
            <p>
              © 2024 LifeFlow Blood Donation Platform. Saving lives through community.
            </p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-red-700 transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-red-700 transition-colors">
                Support
              </a>
              <a href="#" className="hover:text-red-700 transition-colors">
                Help Center
              </a>
            </div>
          </footer>
        </div>
      </main>
  );
};

export default DonorDashboard;
