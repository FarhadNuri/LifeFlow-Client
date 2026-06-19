'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Eye, EyeOff, Camera, ArrowRight } from 'lucide-react'

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [previewImg, setPreviewImg] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setPreviewImg(event.target?.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="grow flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6">
        <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 p-5 sm:p-8 shadow-sm">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Create your account</h1>
            <p className="text-gray-600 text-xs sm:text-sm">Join our community of life-savers today.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Avatar Upload */}
            <div className="flex flex-col items-center mb-6 sm:mb-8">
              <label htmlFor="avatar-upload" className="relative group cursor-pointer">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 hover:border-red-700 hover:bg-red-50 transition-all group-hover:scale-105">
                  {previewImg ? (
                    <img src={previewImg} alt="Profile" className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 group-hover:text-red-700" />
                  )}
                </div>
                <button
                  type="button"
                  className="absolute bottom-0 right-0 bg-red-700 text-white p-1.5 sm:p-2 rounded-full shadow-md hover:bg-red-800 transition-transform hover:scale-110"
                  onClick={() => document.getElementById('avatar-upload')?.click()}
                >
                  <Camera className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label className="text-xs sm:text-sm text-gray-600 mt-2 sm:mt-3">Upload Profile Picture</label>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                required
                className="w-full h-10 sm:h-11 px-3 sm:px-4 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-20 focus:border-red-700 transition-all text-sm placeholder:text-gray-400"
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Email Address</label>
              <input
                type="email"
                placeholder="name@example.com"
                required
                className="w-full h-10 sm:h-11 px-3 sm:px-4 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-20 focus:border-red-700 transition-all text-sm placeholder:text-gray-400"
              />
            </div>

            {/* Blood Group and District */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Blood Group</label>
                <select
                  required
                  className="w-full h-10 sm:h-11 px-2 sm:px-4 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-20 focus:border-red-700 transition-all text-sm text-gray-400"
                >
                  <option value="">Select</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">District</label>
                <select
                  required
                  className="w-full h-10 sm:h-11 px-2 sm:px-4 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-20 focus:border-red-700 transition-all text-sm text-gray-400"
                >
                  <option value="">Select</option>
                  <option value="dhaka">Dhaka</option>
                  <option value="chattogram">Chattogram</option>
                  <option value="sylhet">Sylhet</option>
                  <option value="rajshahi">Rajshahi</option>
                </select>
              </div>
            </div>

            {/* Upazila */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Upazila</label>
              <select
                required
                className="w-full h-10 sm:h-11 px-3 sm:px-4 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-20 focus:border-red-700 transition-all text-sm text-gray-400"
              >
                <option value="">Select Upazila</option>
                <option value="gulshan">Gulshan</option>
                <option value="dhanmondi">Dhanmondi</option>
                <option value="uttara">Uttara</option>
                <option value="mirpur">Mirpur</option>
              </select>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  required
                  className="w-full h-10 sm:h-11 px-3 sm:px-4 pr-10 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-20 focus:border-red-700 transition-all text-sm placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="••••••••"
                  required
                  className="w-full h-10 sm:h-11 px-3 sm:px-4 pr-10 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-20 focus:border-red-700 transition-all text-sm placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-700"
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-10 sm:h-11 bg-red-700 text-white rounded-lg font-bold text-sm uppercase tracking-wide hover:bg-red-800 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-80"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin">⏳</div>
                  Processing...
                </>
              ) : (
                <>
                  Register
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-xs sm:text-sm text-gray-600">
                Already have an account?{' '}
                <Link href="/login" className="text-red-700 font-bold hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
