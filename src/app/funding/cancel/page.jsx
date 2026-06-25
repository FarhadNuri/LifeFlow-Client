import Link from 'next/link'
import { XCircle } from 'lucide-react'

export default function Cancel() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="grow flex items-center justify-center p-4">
        <div className="bg-white border border-red-200 bg-red-50/30 rounded-2xl p-8 max-w-md w-full text-center shadow-lg">
          <XCircle className="w-20 h-20 text-red-600 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Cancelled</h1>
          <p className="text-gray-600 mb-8">
            Your donation process was cancelled and no charges were made. If you experienced an issue, please try again.
          </p>
          <Link href="/funding" className="bg-red-700 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-800 transition inline-block w-full">
            Try Again
          </Link>
        </div>
      </main>
    </div>
  )
}
