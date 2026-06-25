import Link from 'next/link'
import { Droplet, Users, Heart, AlertCircle, CheckCircle2, Shield, MessageCircle } from 'lucide-react'

export default async function Home() {
  let activeRequests = [];
  try {
    const res = await fetch(${process.env.NEXT_PUBLIC_API_URL}, { cache: "no-store" });
    if (res.ok) {
      activeRequests = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch active requests:", error);
  }

  return (
    <>
      <div className="min-h-screen bg-white">

        <section
          className="relative pt-32 pb-32 lg:pt-32 lg:pb-32 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/Hero3.png')" }}
        >
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gray-900/60"></div>

          <div className="relative max-w-7xl mx-auto px-4 z-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2 rounded-full mb-8">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span className="text-sm font-medium tracking-wide">Emergency Blood Needed in your area</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-md">
              Give Blood.<br />
              <span className="text-red-500">Save Lives.</span>
            </h1>

            <p className="text-gray-200 mb-10 leading-relaxed text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 drop-shadow">
              Connecting life-saving blood donors with patients in need. Every drop counts. Join our community of over 50,000 donors today.
            </p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link href="/register" className="bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-800 transition shadow-xl shadow-red-900/20 flex items-center justify-center gap-2">
                <Heart className="w-5 h-5" />
                Join as a Donor
              </Link>
              <Link href="/search" className="bg-white text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition shadow-xl flex items-center justify-center gap-2">
                <Shield className="w-5 h-5 text-red-700" />
                Search Donors
              </Link>
            </div>
          </div>
        </section>


        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="border border-gray-200 rounded-2xl p-8 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-center gap-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <Users className="w-6 h-6 text-red-700" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">52,400+</div>
                  <div className="text-gray-600">Total Donors</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <CheckCircle2 className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">18,250</div>
                  <div className="text-gray-600">Requests Fulfilled</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <Heart className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">150k+</div>
                  <div className="text-gray-600">Lives Saved</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Active Requests Section */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Urgent Blood Requests</h2>
            <Link href="/requests" className="text-red-700 font-semibold hover:underline">
              View All Requests &rarr;
            </Link>
          </div>

          {activeRequests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeRequests.slice(0, 3).map((req) => {
                const location = `${req.upazila}, ${req.district}`;
                const urgencyText = req.message?.substring(0, 20) || req.status;
                const isUrgent = req.message?.toLowerCase().includes('urgent') || req.status === 'Pending';

                return (
                  <div key={req._id} className="border border-red-100 bg-red-50/30 rounded-xl p-6 hover:shadow-md transition flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div className="bg-red-100 text-red-700 font-bold text-xl px-3 py-1 rounded-lg">
                        {req.bloodGroup}
                      </div>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${isUrgent ? 'bg-red-600 text-white' : 'bg-yellow-500 text-white'
                        }`}>
                        {urgencyText}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">{req.donorName}</h3>
                    <p className="text-sm text-gray-600 mb-4 capitalize">{location}</p>
                    <div className="text-sm mb-4 flex gap-4 text-gray-600">
                      <span>📅 {req.date}</span>
                      <span>⏰ {req.time}</span>
                    </div>
                    <button className="w-full mt-auto bg-red-700 text-white py-2 rounded-lg font-medium hover:bg-red-800 transition">
                      Respond Now
                    </button>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-100">
              <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Urgent Requests</h3>
              <p className="text-gray-500">There are currently no active blood requests in your area.</p>
            </div>
          )}
        </section>

        <section className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Donate with LifeFlow?</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We streamline the process of finding and providing help, ensuring that every donation makes the maximum impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-gray-200 rounded-xl p-8 bg-white hover:shadow-lg transition">
              <div className="bg-red-50 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Droplet className="w-6 h-6 text-red-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Rapid Matching</h3>
              <p className="text-gray-600">
                Our intelligent algorithm matches donor blood types with urgent requests in real-time, reducing response latency by 40%.
              </p>
            </div>

            <div className="border border-gray-200 rounded-xl p-8 bg-white hover:shadow-lg transition">
              <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Verified Profiles</h3>
              <p className="text-gray-600">
                Every donor and medical facility undergoes a strict verification process to ensure safety and reliability for all parties.
              </p>
            </div>

            <div className="border border-gray-200 rounded-xl p-8 bg-white hover:shadow-lg transition">
              <div className="bg-red-50 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-red-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Community Led</h3>
              <p className="text-gray-600">
                Join a network of local heroes dedicated to supporting their neighborhood medical centers and saving lives close to home.
              </p>
            </div>
          </div>
        </section>


        <section className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-white rounded-2xl p-8 border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Send us a message</h3>
                <p className="text-gray-600 mb-6">
                  Have questions about donation? Our support team is here to help.
                </p>
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Full Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Email Address</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Message</label>
                    <textarea
                      placeholder="How can we help you?"
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent resize-none"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-red-700 text-white py-3 rounded-lg font-semibold hover:bg-red-800 transition"
                  >
                    Send Message
                  </button>
                </form>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Get in touch</h3>
                <p className="text-gray-600 mb-8">
                  Have questions about donation? Our medical support team is available 24/7 to assist you.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-50 p-3 rounded-lg">
                      <MessageCircle className="w-6 h-6 text-red-700" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-600">Phone</h4>
                      <p className="text-lg font-semibold text-gray-900">+880 186 577 9218</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <MessageCircle className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-600">Email</h4>
                      <p className="text-lg font-semibold text-gray-900">farhadnuri559@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <MessageCircle className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-600">Location</h4>
                      <p className="text-lg font-semibold text-gray-900">Chattogram, Bangladesh</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}
