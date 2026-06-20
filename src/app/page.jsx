import Link from 'next/link'
import { Droplet, Users, Heart, AlertCircle, CheckCircle2, Shield, MessageCircle } from 'lucide-react'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <>
    <div className="min-h-screen bg-white">

      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full mb-6">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Emergency Blood Needed in your area</span>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Give Blood.<br />
              <span className="text-red-700">Save Lives.</span>
            </h1>
            <p className="text-gray-600 mb-8 leading-relaxed text-lg">
              Connecting life-saving blood donors with patients in need. Every drop counts. Join our community of over 50,000 donors today.
            </p>
            <div className="flex gap-4">
              <Link href="/profile" className="bg-red-700 text-white px-8 py-3 rounded-md font-semibold hover:bg-red-800 transition">
                Join as a Donor
              </Link>
              <Link href="#" className="border-2 border-red-700 text-red-700 px-8 py-3 rounded-md font-semibold hover:bg-red-50 transition">
                Search Donors
              </Link>
            </div>
          </div>

          
          <div className="flex justify-center">
            <div className="relative w-96 h-96 bg-gradient-to-br from-red-400 to-orange-400 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1631217314830-4e6015e8e2e4?w=400&h=400&fit=crop"
                alt="Blood donor"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="border border-gray-200 rounded-2xl p-8 bg-white">
          <div className="grid grid-cols-3 gap-8">
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

      
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Donate with LifeFlow?</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We streamline the process of finding and providing help, ensuring that every donation makes the maximum impact.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-8">
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
          <div className="grid grid-cols-2 gap-12">
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
                    <p className="text-lg font-semibold text-gray-900">+1 (800) LIFE-FLOW</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <MessageCircle className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-600">Email</h4>
                    <p className="text-lg font-semibold text-gray-900">support@lifeflow.org</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <MessageCircle className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-600">Location</h4>
                    <p className="text-lg font-semibold text-gray-900">123 Medical Center Dr, Austin, TX</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
    <Footer/>
    </>
  )
}
