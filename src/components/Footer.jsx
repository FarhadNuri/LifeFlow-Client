import Link from 'next/link'
import { Droplet } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-gray-200">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Droplet className="w-6 h-6 text-red-700" fill="currentColor" />
              <span className="text-lg font-bold text-red-700">LifeFlow</span>
            </div>
            <p className="text-sm text-gray-600">
              © 2026 LifeFlow Blood Donation Platform. Saving lives through community. Join us in making a difference in the world of healthcare and emergency response.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/about" className="hover:text-red-700 transition-colors">About</Link></li>
              <li><Link href="/requests" className="hover:text-red-700 transition-colors">Requests</Link></li>
              <li><Link href="/funding" className="hover:text-red-700 transition-colors">Funding</Link></li>
              <li><Link href="/search" className="hover:text-red-700 transition-colors">Search</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="#" className="hover:text-red-700 transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-red-700 transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-red-700 transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        <p className="text-center text-sm text-gray-500">
          Built for the community with blood, sweat, and care.
        </p>
      </div>
    </footer>
  )
}
