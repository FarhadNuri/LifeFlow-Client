'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Camera, ArrowRight } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export default function Register() {
  const router = useRouter()
  const { register } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [previewImg, setPreviewImg] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const [divisions, setDivisions] = useState([])
  const [districts, setDistricts] = useState([])
  const [upazilas, setUpazilas] = useState([])
  const [selectedDivision, setSelectedDivision] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedUpazila, setSelectedUpazila] = useState('')

  useEffect(() => {
    fetch('/divisions.json')
      .then(res => res.json())
      .then(data => {
        const divData = data.find(item => item.type === 'table' && item.name === 'divisions')
        if (divData) setDivisions(divData.data)
      })
      .catch(err => console.error("Error loading divisions:", err))

    fetch('/districts.json')
      .then(res => res.json())
      .then(data => {
        const distData = data.find(item => item.type === 'table' && item.name === 'districts')
        if (distData) setDistricts(distData.data)
      })
      .catch(err => console.error("Error loading districts:", err))

    fetch('/upazilas.json')
      .then(res => res.json())
      .then(data => {
        const upaData = data.find(item => item.type === 'table' && item.name === 'upazilas')
        if (upaData) setUpazilas(upaData.data)
      })
      .catch(err => console.error("Error loading upazilas:", err))
  }, [])

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

  const validatePassword = (password) => {
    if (password.length < 6) {
      return 'Password must be at least 6 characters long'
    }
    return ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    setPasswordError('')

    const formData = new FormData(e.currentTarget)
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')
    const confirmPassword = formData.get('confirmPassword')
    const bloodGroup = formData.get('bloodGroup')
    const district = formData.get('district')
    const upazila = formData.get('upazila')
    const phone = formData.get('phone')

    // Validate password
    const passError = validatePassword(password)
    if (passError) {
      setPasswordError(passError)
      setIsSubmitting(false)
      return
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setIsSubmitting(false)
      return
    }

    const result = await register({
      name,
      email,
      password,
      bloodGroup,
      district,
      upazila,
      phone,
      image: previewImg
    })

    if (result.success) {
      router.push('/donor') // Redirect to donor dashboard after registration
    } else {
      setError(result.error || 'Registration failed. Please try again.')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="grow flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6">
        <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 p-5 sm:p-8 shadow-sm">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Create your account</h1>
            <p className="text-gray-600 text-xs sm:text-sm">Join our community of life-savers today.</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg text-sm bg-red-50 text-red-600 border border-red-200">
              {error}
            </div>
          )}

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
                name="name"
                type="text"
                placeholder="John Doe"
                required
                className="w-full h-10 sm:h-11 px-3 sm:px-4 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-20 focus:border-red-700 transition-all text-sm placeholder:text-gray-400 text-gray-900"
              />
            </div>

            {/* Email Address and Mobile Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Email Address</label>
                <input
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  className="w-full h-10 sm:h-11 px-3 sm:px-4 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-20 focus:border-red-700 transition-all text-sm placeholder:text-gray-400 text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Mobile Number</label>
                <input
                  name="phone"
                  type="tel"
                  placeholder="+880 1XXXXXXXXX"
                  required
                  className="w-full h-10 sm:h-11 px-3 sm:px-4 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-20 focus:border-red-700 transition-all text-sm placeholder:text-gray-400 text-gray-900"
                />
              </div>
            </div>

            {/* Blood Group and District */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Blood Group</label>
                <select
                  name="bloodGroup"
                  required
                  className="w-full h-10 sm:h-11 px-2 sm:px-4 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-20 focus:border-red-700 transition-all text-sm text-gray-900"
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
                <label className="block text-sm font-medium text-gray-900 mb-2">Division</label>
                <select
                  required
                  value={selectedDivision}
                  onChange={(e) => {
                    setSelectedDivision(e.target.value)
                    setSelectedDistrict('')
                    setSelectedUpazila('') 
                  }}
                  className="w-full h-10 sm:h-11 px-2 sm:px-4 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-20 focus:border-red-700 transition-all text-sm text-gray-900"
                >
                  <option value="">Select Division</option>
                  {divisions.map((div) => (
                    <option key={div.id} value={div.name}>
                      {div.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* District and Upazila */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">District</label>
                <select
                  name="district"
                  required
                  value={selectedDistrict}
                  onChange={(e) => {
                    setSelectedDistrict(e.target.value)
                    setSelectedUpazila('')
                  }}
                  disabled={!selectedDivision}
                  className="w-full h-10 sm:h-11 px-3 sm:px-4 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-20 focus:border-red-700 transition-all text-sm text-gray-900 disabled:opacity-50 disabled:bg-gray-50"
                >
                  <option value="">Select District</option>
                  {districts
                    .filter((dist) => {
                      const div = divisions.find(d => d.name === selectedDivision)
                      return div && dist.division_id === div.id
                    })
                    .map((dist) => (
                      <option key={dist.id} value={dist.name}>
                        {dist.name}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Upazila</label>
                <select
                  name="upazila"
                  required
                  value={selectedUpazila}
                  onChange={(e) => setSelectedUpazila(e.target.value)}
                  disabled={!selectedDistrict}
                  className="w-full h-10 sm:h-11 px-3 sm:px-4 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-20 focus:border-red-700 transition-all text-sm text-gray-900 disabled:opacity-50 disabled:bg-gray-50"
                >
                  <option value="">Select Upazila</option>
                  {upazilas
                    .filter((upa) => {
                      const dist = districts.find(d => d.name === selectedDistrict)
                      return dist && upa.district_id === dist.id
                    })
                    .map((upa) => (
                      <option key={upa.id} value={upa.name}>
                        {upa.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  required
                  className="w-full h-10 sm:h-11 px-3 sm:px-4 pr-10 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-20 focus:border-red-700 transition-all text-sm placeholder:text-gray-400 text-gray-900"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {passwordError && (
                <p className="text-xs text-red-600 mt-1">{passwordError}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Confirm Password</label>
              <div className="relative">
                <input
                  name="confirmPassword"
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="••••••••"
                  required
                  className="w-full h-10 sm:h-11 px-3 sm:px-4 pr-10 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-20 focus:border-red-700 transition-all text-sm placeholder:text-gray-400 text-gray-900"
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
              className="w-full h-10 sm:h-11 bg-red-700 text-white rounded-lg font-bold text-sm uppercase tracking-wide hover:bg-red-800 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-80 disabled:cursor-not-allowed"
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
