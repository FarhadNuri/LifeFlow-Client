'use client'

import Link from 'next/link'
import { Download, Users, Wallet, Droplet, Loader2, ChevronLeft, ChevronRight, AlertCircle, X } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function VolunteerDashboard() {
    const [donors, setDonors] = useState([])
    const [requests, setRequests] = useState([])
    const [totalFunds, setTotalFunds] = useState(0)
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedRequest, setSelectedRequest] = useState(null)
    const [filterBloodGroup, setFilterBloodGroup] = useState('')
    const [filterDistrict, setFilterDistrict] = useState('')
    const [filterUpazila, setFilterUpazila] = useState('')

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = localStorage.getItem('token')

                // Fetch donors
                const donorsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/donors`)
                const donorsData = await donorsRes.json()

                // Fetch requests
                const requestsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/volunteer/requests`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
                const requestsData = await requestsRes.json()

                // Fetch donations
                const donationsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/donations`)
                const donationsData = await donationsRes.json()
                const sum = donationsData.reduce((acc, curr) => acc + Number(curr.amount.replace(/[^0-9.-]+/g, "")), 0)

                setDonors(donorsData)
                setRequests(requestsData)
                setTotalFunds(sum + 20100)
            } catch (error) {
                console.error("Failed to fetch dashboard data", error)
            } finally {
                setLoading(false)
            }
        }

        fetchDashboardData()
    }, [])

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
            </div>
        )
    }

    const urgentRequests = requests.filter(r => r.status === 'Urgent' || r.urgency === 'Critical' || r.status === 'Pending').slice(0, 3)

    const filteredRequests = requests.filter(req => {
        if (filterBloodGroup && (req.bloodGroup || req.bloodType) !== filterBloodGroup) return false;
        const loc = (req.district || req.location || '').toLowerCase();
        if (filterDistrict && loc !== filterDistrict.toLowerCase()) return false;
        if (filterUpazila && (req.upazila || '').toLowerCase() !== filterUpazila.toLowerCase()) return false;
        return true;
    });

    const itemsPerPage = 5
    const totalPages = Math.ceil(filteredRequests.length / itemsPerPage)
    // Sort so newest requests come first
    const sortedRequests = [...filteredRequests].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    const startIndex = (currentPage - 1) * itemsPerPage
    const recentActivity = sortedRequests.slice(startIndex, startIndex + itemsPerPage)

    return (
        <>
            <main className="px-4 md:px-12 py-6 md:py-8 pb-24 md:pb-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Volunteer Overview</h2>
                        <p className="text-gray-600 mt-1">Real-time insights into donor activity and resource distribution.</p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Total Donors */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Users className="w-5 h-5 text-blue-600" />
                            </div>
                            <span className="text-sm text-gray-600">Total Donors</span>
                        </div>
                        <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-3xl font-bold text-gray-900">{donors.length}</span>
                        </div>
                        <p className="text-sm text-gray-600">Registered donors in system</p>
                    </div>

                    {/* Total Funding (Mock) */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                                <Wallet className="w-5 h-5 text-amber-600" />
                            </div>
                            <span className="text-sm text-gray-600">Total Funding</span>
                        </div>
                        <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-3xl font-bold text-gray-900">
                                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalFunds)}
                            </span>
                        </div>
                        <p className="text-sm text-gray-600">Life-saving contributions raised</p>
                    </div>

                    {/* Active Requests */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                <Droplet className="w-5 h-5 text-red-700" fill="currentColor" />
                            </div>
                            <span className="text-sm text-gray-600">Active Requests</span>
                        </div>
                        <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-3xl font-bold text-gray-900">{requests.filter(r => r.status === 'Pending' || r.status === 'Urgent').length}</span>
                            <span className="text-sm text-red-600 font-semibold">Pending</span>
                        </div>
                        <p className="text-sm text-gray-600">Appeals waiting for donors</p>
                    </div>
                </div>



                {/* Recent Activity Table */}
                <div className="mt-8 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <h3 className="text-lg font-bold text-gray-900">Recent Global Activity</h3>
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                            <select
                                value={filterBloodGroup}
                                onChange={(e) => { setFilterBloodGroup(e.target.value); setCurrentPage(1); }}
                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
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
                                onChange={(e) => { setFilterDistrict(e.target.value); setCurrentPage(1); }}
                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white capitalize"
                            >
                                <option value="">All Districts</option>
                                <option value="dhaka">Dhaka</option>
                                <option value="chattogram">Chattogram</option>
                                <option value="sylhet">Sylhet</option>
                                <option value="rajshahi">Rajshahi</option>
                            </select>
                            <select
                                value={filterUpazila}
                                onChange={(e) => { setFilterUpazila(e.target.value); setCurrentPage(1); }}
                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white capitalize"
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
                    <div className="overflow-x-auto md:overflow-visible">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Donor Identity</th>
                                    <th className="px-4 md:px-6 py-3 text-center md:text-left text-xs font-semibold text-gray-600 uppercase">Type</th>

                                    <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Location</th>
                                    <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {recentActivity.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No recent activity</td>
                                    </tr>
                                ) : recentActivity.map(req => {
                                    const name = req.donorName || req.patientName || req.volunteerName || 'Unknown User';
                                    const email = req.donorEmail || req.volunteerEmail || 'No email';
                                    const initial = name.substring(0, 2).toUpperCase();
                                    const location = req.upazila ? `${req.upazila}, ${req.district}` : req.location || req.district || 'Unknown location';

                                    return (
                                        <tr
                                            key={req._id}
                                            className="hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0"
                                            onClick={() => setSelectedRequest(req)}
                                        >
                                            <td className="px-4 md:px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-xs font-bold text-amber-700 shrink-0">{initial}</div>
                                                    <div className="min-w-0">
                                                        <p className="font-semibold text-gray-900 truncate">{name}</p>
                                                        <p className="text-xs text-gray-600 truncate">{email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 md:px-6 py-4 text-center md:text-left">
                                                <span className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-red-100 text-red-700 font-bold text-sm">{req.bloodGroup || 'N/A'}</span>
                                            </td>

                                            <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-900 capitalize">{location}</td>
                                            <td className="hidden md:table-cell px-6 py-4">
                                                <span className={`px-2 py-1 text-xs font-semibold rounded ${req.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                                                    req.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                                        req.status === 'Urgent' ? 'bg-red-100 text-red-700' :
                                                            'bg-gray-100 text-gray-700'
                                                    }`}>
                                                    {req.status}
                                                </span>
                                            </td>

                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination Controls */}
                    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-center gap-2">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="p-2 border border-gray-300 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>

                        {Array.from({ length: totalPages }).map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentPage(idx + 1)}
                                className={`w-8 h-8 rounded-lg font-semibold ${currentPage === idx + 1 ? 'bg-amber-500 text-white' : 'border border-gray-300 hover:bg-gray-100 text-gray-700'}`}
                            >
                                {idx + 1}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages || totalPages === 0}
                            className="p-2 border border-gray-300 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Details Modal */}
                {selectedRequest && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-gray-50">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">Activity Details</h3>
                                    <p className="text-sm text-gray-500">Global activity information</p>
                                </div>
                                <button
                                    onClick={() => setSelectedRequest(null)}
                                    className="text-gray-400 hover:text-gray-900 p-1 rounded-md hover:bg-gray-200 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="p-6 space-y-5">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center font-bold text-amber-700 text-lg shrink-0">
                                        {(selectedRequest.donorName || selectedRequest.patientName || selectedRequest.volunteerName || 'U').substring(0, 2).toUpperCase()}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-lg">{selectedRequest.donorName || selectedRequest.patientName || selectedRequest.volunteerName || 'Unknown User'}</h4>
                                        <p className="text-sm text-gray-600">{selectedRequest.donorEmail || selectedRequest.volunteerEmail || 'No email provided'}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Blood Group</span>
                                        <span className="text-red-700 font-bold text-lg">{selectedRequest.bloodGroup || 'N/A'}</span>
                                    </div>

                                </div>

                                <div className="flex flex-col gap-1">
                                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</span>
                                    <span className="text-gray-900 font-medium capitalize">{selectedRequest.upazila ? `${selectedRequest.upazila}, ${selectedRequest.district}` : selectedRequest.location || selectedRequest.district || 'Unknown location'}</span>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</span>
                                    <div>
                                        <span className={`px-2 py-1 text-xs font-semibold rounded ${selectedRequest.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                                            selectedRequest.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                                selectedRequest.status === 'Urgent' ? 'bg-red-100 text-red-700' :
                                                    'bg-gray-100 text-gray-700'
                                            }`}>
                                            {selectedRequest.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-100 flex justify-end">
                                    <Link
                                        href="/volunteer/all-blood-donation-request"
                                        className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition-colors"
                                    >
                                        View All Requests
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </main>

        </>
    )
}
