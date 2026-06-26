'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function RespondButton({ requestId }) {
  const router = useRouter()
  const { user } = useAuth()

  const handleClick = () => {
    if (!user) {
      router.push('/login')
    } else {
      router.push(`/requests?requestId=${requestId}`)
    }
  }

  return (
    <button 
      onClick={handleClick}
      className="w-full mt-auto bg-red-700 text-white py-2 rounded-lg font-medium hover:bg-red-800 transition"
    >
      Respond Now
    </button>
  )
}
