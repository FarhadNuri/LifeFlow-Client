'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle2, Loader2, XCircle } from 'lucide-react'

function SuccessContent() {
  const [status, setStatus] = useState('processing')
  const [message, setMessage] = useState('Verifying your payment...')
  const searchParams = useSearchParams()

  useEffect(() => {
    const confirmDonation = async () => {
      const sessionId = searchParams.get('session_id')
      if (!sessionId) {
        setStatus('error')
        setMessage('Invalid session. Please contact support.')
        return
      }

      try {
        const token = localStorage.getItem('token')
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/donations/confirm`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ session_id: sessionId })
        })

        const data = await res.json()
        if (data.success) {
          setStatus('success')
        } else {
          setStatus('error')
          setMessage(data.message || 'Payment verification failed.')
        }
      } catch (error) {
        console.error(error)
        setStatus('error')
        setMessage('An error occurred while verifying your payment.')
      }
    }

    confirmDonation()
  }, [searchParams])

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="grow flex items-center justify-center p-4">
        {status === 'processing' && (
          <div className="bg-white border border-gray-200 rounded-2xl p-8 max-w-md w-full text-center shadow-lg">
            <Loader2 className="w-20 h-20 text-blue-600 mx-auto mb-6 animate-spin" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Processing Payment...</h1>
            <p className="text-gray-600 mb-8">{message}</p>
          </div>
        )}

        {status === 'success' && (
          <div className="bg-white border border-green-200 bg-green-50/30 rounded-2xl p-8 max-w-md w-full text-center shadow-lg">
            <CheckCircle2 className="w-20 h-20 text-green-600 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
            <p className="text-gray-600 mb-8">
              Thank you for your generous donation. Your support helps us save lives and maintain our critical emergency response network.
            </p>
            <Link href="/funding" className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition inline-block w-full">
              Return to Funding
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div className="bg-white border border-red-200 bg-red-50/30 rounded-2xl p-8 max-w-md w-full text-center shadow-lg">
            <XCircle className="w-20 h-20 text-red-600 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Failed</h1>
            <p className="text-gray-600 mb-8">{message}</p>
            <Link href="/funding" className="bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition inline-block w-full">
              Back to Funding
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}

export default function Success() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-red-700"/></div>}>
      <SuccessContent />
    </Suspense>
  )
}
