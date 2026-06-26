import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import clientPromise from '@/lib/mongodb'

export async function POST(request) {
  try {
    const { name, email, password, bloodGroup, district, upazila, phone, image } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db('lifeflow')
    const usersCollection = db.collection('users')

    const existingUser = await usersCollection.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = {
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      bloodGroup: bloodGroup || null,
      district: district || null,
      upazila: upazila || null,
      phone: phone || null,
      image: image || null,
      role: 'donor', // Default role
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const result = await usersCollection.insertOne(newUser)

    const token = jwt.sign(
      {
        userId: result.insertedId.toString(),
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    )

    const userResponse = {
      id: result.insertedId.toString(),
      name: newUser.name,
      email: newUser.email,
      bloodGroup: newUser.bloodGroup,
      district: newUser.district,
      upazila: newUser.upazila,
      phone: newUser.phone,
      image: newUser.image,
      role: newUser.role
    }

    return NextResponse.json(
      {
        success: true,
        user: userResponse,
        token
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
