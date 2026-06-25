'use client';

import { useState, useEffect } from 'react';
import { Heart, Share2, Plus, Search, Filter, Eye, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

const DonorDashboard = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewModalData, setViewModalData] = useState(null);
  const [filterBloodGroup, setFilterBloodGroup] = useState('');
  const [filterDistrict, setFilterDistrict] = useState('');
  const [filterUpazila, setFilterUpazila] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [personalRequestsCount, setPersonalRequestsCount] = useState(0);
  const [totalFunds, setTotalFunds] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch global requests
        const globalRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/requests`);
        if (globalRes.ok) {
          const globalData = await globalRes.json();
          setRequests(globalData);
        }

        // Fetch total funds
        const donationsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/donations`)
        if (donationsRes.ok) {
          const donationsData = await donationsRes.json()
          const sum = donationsData.reduce((acc, curr) => acc + Number(curr.amount.replace(/[^0-9.-]+/g, "")), 0)
          setTotalFunds(sum + 20100)
        }

        // Fetch personal requests count if user is logged in
        if (user?.id) {
          const token = localStorage.getItem('token');
          const personalRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/donor/my-requests/${user.id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (personalRes.ok) {
            const personalData = await personalRes.json();
            setPersonalRequestsCount(personalData.length);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  // Helper to format initials
  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  // Helper for status colors
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-amber-100 text-amber-700';
      case 'In Progress': return 'bg-blue-100 text-blue-700';
      case 'Completed': return 'bg-green-100 text-green-700';
      case 'Cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const filteredRequests = requests.filter(req => {
    if (filterBloodGroup && (req.bloodGroup || req.bloodType) !== filterBloodGroup) return false;
    const loc = (req.district || req.location || '').toLowerCase();
    if (filterDistrict && loc !== filterDistrict.toLowerCase()) return false;
    if (filterUpazila && (req.upazila || '').toLowerCase() !== filterUpazila.toLowerCase()) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const currentRequests = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <main className="w-full mt-16 md:mt-0">

      {/* Main Grid */}
      <div className="p-6 md:p-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              Welcome back, {user?.name || 'Donor'}!
            </h2>
            <p className="text-slate-600">
              Check out the latest community requests below.
            </p>
          </div>
          <div className="flex gap-3">

            <Link href="/donor/create-request" className="px-4 py-2 bg-red-700 text-white rounded-lg font-semibold hover:bg-red-800 transition-colors flex items-center gap-2 text-sm md:text-base">
              <Plus className="w-4 h-4" />
              New Request
            </Link>
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
              <span className="text-5xl font-bold text-red-700">{personalRequestsCount.toString().padStart(2, '0')}</span>
              <span className="text-sm font-semibold text-orange-600">Requests made</span>
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

          {/* Total Funding Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
              Total Funding
            </h3>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-4xl font-bold text-gray-900">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalFunds)}
              </span>
            </div>
            <div className="space-y-3">
              <p className="text-sm text-slate-600 font-medium">Platform-wide contributions</p>
            </div>
          </div>
        </section>

        {/* Recent Requests Section */}
        <section className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-200 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <h3 className="text-lg font-bold text-slate-900">Recent Requests</h3>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <select
                value={filterBloodGroup}
                onChange={(e) => setFilterBloodGroup(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-700 bg-white"
              >
                <option value="">All Blood Groups</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
              <select
                value={filterDistrict}
                onChange={(e) => setFilterDistrict(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-700 bg-white capitalize"
              >
                <option value="">All Districts</option>
                <option value="dhaka">Dhaka</option>
                <option value="chattogram">Chattogram</option>
                <option value="sylhet">Sylhet</option>
                <option value="rajshahi">Rajshahi</option>
              </select>
              <select
                value={filterUpazila}
                onChange={(e) => setFilterUpazila(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-700 bg-white capitalize"
              >
                <option value="">All Upazilas</option>
                <option value="uttara">Uttara</option>
                <option value="banani">Banani</option>
                <option value="gulshan">Gulshan</option>
                <option value="dhanmondi">Dhanmondi</option>
                <option value="mirpur">Mirpur</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 md:px-6 py-3 font-semibold text-slate-700">Recipient</th>
                  <th className="px-4 md:px-6 py-3 font-semibold text-slate-700 text-center md:text-left">Blood Group</th>
                  <th className="hidden md:table-cell px-6 py-3 font-semibold text-slate-700">Location</th>
                  <th className="hidden md:table-cell px-6 py-3 font-semibold text-slate-700">Date & Time</th>
                  <th className="hidden md:table-cell px-6 py-3 font-semibold text-slate-700">Status</th>

                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-slate-500">
                      Loading requests...
                    </td>
                  </tr>
                ) : filteredRequests.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-slate-500">
                      There are no active requests matching your filters right now.
                    </td>
                  </tr>
                ) : (
                  currentRequests.map((request) => (
                    <tr
                      key={request._id}
                      className="hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-100 last:border-0"
                      onClick={() => setViewModalData(request)}
                    >
                      <td className="px-4 md:px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center font-bold text-red-700 text-xs">
                            {getInitials(request.donorName)}
                          </div>
                          <span className="font-semibold text-slate-900">
                            {request.donorName || 'Unknown'}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4 text-center md:text-left">
                        <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-red-700 text-white font-bold text-xs ring-2 ring-red-200">
                          {request.bloodGroup || 'N/A'}
                        </span>
                      </td>
                      <td className="hidden md:table-cell px-6 py-4 text-slate-600 capitalize">
                        {request.upazila}, {request.district}
                      </td>
                      <td className="hidden md:table-cell px-6 py-4 text-slate-600">
                        <div className="flex flex-col">
                          <span>{request.date}</span>
                          <span className="text-xs text-slate-500">{request.time}</span>
                        </div>
                      </td>
                      <td className="hidden md:table-cell px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full font-semibold text-xs ${getStatusColor(request.status)}`}
                        >
                          {request.status}
                        </span>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-slate-300 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed text-slate-600"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`w-8 h-8 rounded-lg font-semibold ${currentPage === idx + 1 ? 'bg-red-700 text-white' : 'border border-slate-300 hover:bg-slate-100 text-slate-700'}`}
              >
                {idx + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-2 border border-slate-300 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed text-slate-600"
            >
              <ChevronRight className="w-4 h-4" />
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

      {/* View Modal */}
      {viewModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-lg">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Request Details</h3>
            <div className="space-y-3 text-sm">
              <p className="text-slate-900"><span className="font-semibold text-slate-700">Blood Group:</span> {viewModalData.bloodGroup}</p>
              <p className="text-slate-900"><span className="font-semibold text-slate-700">Location:</span> <span className="capitalize">{viewModalData.upazila}, {viewModalData.district}</span></p>
              <p className="text-slate-900"><span className="font-semibold text-slate-700">Date:</span> {viewModalData.date}</p>
              <p className="text-slate-900"><span className="font-semibold text-slate-700">Time:</span> {viewModalData.time}</p>
              <p className="text-slate-900"><span className="font-semibold text-slate-700">Status:</span> {viewModalData.status}</p>
              <div>
                <span className="font-semibold text-slate-700 block mb-1">Message:</span>
                <p className="bg-slate-50 p-3 rounded-lg text-slate-900 border border-slate-200">{viewModalData.message || 'No message provided.'}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button onClick={() => setViewModalData(null)} className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg font-medium transition-colors">Close</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default DonorDashboard;
