import Link from 'next/link'
import { BarChart3, Download, Users, Wallet, Droplet, TrendingUp, AlertCircle } from 'lucide-react'

export default function AdminDashboard() {
    return (
            <main className="px-12 py-8">
                {/* Header */}
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Administrative Overview</h2>
                        <p className="text-gray-600 mt-1">Real-time insights into donor activity and resource distribution.</p>
                    </div>
                    <button className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-50">
                        <Download className="w-4 h-4" />
                        Export Report
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                    {/* Total Donors */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Users className="w-5 h-5 text-blue-600" />
                            </div>
                            <span className="text-sm text-gray-600">Total Donors</span>
                        </div>
                        <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-3xl font-bold text-gray-900">12,482</span>
                            <span className="text-sm text-green-600 font-semibold">↑ 8.4%</span>
                        </div>
                        <p className="text-sm text-gray-600">Active volunteers this month</p>
                    </div>

                    {/* Total Funding */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                                <Wallet className="w-5 h-5 text-amber-600" />
                            </div>
                            <span className="text-sm text-gray-600">Total Funding</span>
                        </div>
                        <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-3xl font-bold text-gray-900">$842.5K</span>
                            <span className="text-sm text-green-600 font-semibold">↑ 12.1%</span>
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
                            <span className="text-3xl font-bold text-gray-900">1,094</span>
                            <span className="text-sm text-red-600 font-semibold">Urgent</span>
                        </div>
                        <p className="text-sm text-gray-600">Emergency appeals pending</p>
                    </div>
                </div>

                {/* Chart and Urgent Appeals Section */}
                <div className="grid grid-cols-3 gap-6">
                    {/* Weekly Donations Chart */}
                    <div className="col-span-2 bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Weekly Donation Requests</h3>
                                <p className="text-sm text-gray-600">Comparative analysis of regional demand</p>
                            </div>
                            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700">
                                <option>Last 7 Days</option>
                                <option>Last 30 Days</option>
                            </select>
                        </div>

                        {/* Chart Bars */}
                        <div className="h-64 flex items-end justify-between gap-3">
                            {[65, 45, 85, 70, 55, 30, 40].map((height, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                    <div className="w-full bg-red-200 rounded-t-lg hover:bg-red-400 transition-colors" style={{ height: `${height}%` }}></div>
                                    <span className="text-xs text-gray-600">{'Mon Tue Wed Thu Fri Sat Sun'.split(' ')[i]}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Urgent Appeals */}
                    <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900">Urgent Appeals</h3>
                            <Link href="#" className="text-red-700 font-medium hover:underline">View All</Link>
                        </div>

                        <div className="space-y-4">
                            {/* Appeal 1 */}
                            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                                <div className="w-10 h-10 bg-red-700 rounded-full flex items-center justify-center text-white font-bold">A+</div>
                                <div className="flex-grow">
                                    <p className="font-semibold text-gray-900">St. Jude Medical Center</p>
                                    <p className="text-sm text-gray-600">3 units required urgently</p>
                                </div>
                                <span className="px-2 py-1 bg-red-700 text-white text-xs font-bold rounded">CRITICAL</span>
                            </div>

                            {/* Appeal 2 */}
                            <div className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">O-</div>
                                <div className="flex-grow">
                                    <p className="font-semibold text-gray-900">General City Hospital</p>
                                    <p className="text-sm text-gray-600">Blood bank shortage</p>
                                </div>
                                <span className="px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded">HIGH</span>
                            </div>

                            {/* Appeal 3 */}
                            <div className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">B+</div>
                                <div className="flex-grow">
                                    <p className="font-semibold text-gray-900">Child Welfare Trust</p>
                                    <p className="text-sm text-gray-600">Scheduled transfusion</p>
                                </div>
                                <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded">MEDIUM</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity Table */}
                <div className="mt-8 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                        <h3 className="text-lg font-bold text-gray-900">Recent Global Activity</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Donor Identity</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Amount</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Location</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-xs font-bold text-red-700">JD</div>
                                            <div>
                                                <p className="font-semibold text-gray-900">John Doe</p>
                                                <p className="text-xs text-gray-600">john@example.com</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4"><span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded">Blood A+</span></td>
                                    <td className="px-6 py-4 text-sm text-gray-900">450ml</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">Central Clinic</td>
                                    <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">Verified</span></td>
                                    <td className="px-6 py-4"><button className="text-gray-400 hover:text-gray-600">👁</button></td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-700">SM</div>
                                            <div>
                                                <p className="font-semibold text-gray-900">Sarah Miller</p>
                                                <p className="text-xs text-gray-600">sarah@life.org</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4"><span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">Plasma</span></td>
                                    <td className="px-6 py-4 text-sm text-gray-900">$250.00</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">Online Gateway</td>
                                    <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">Completed</span></td>
                                    <td className="px-6 py-4"><button className="text-gray-400 hover:text-gray-600">👁</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
    )
}
