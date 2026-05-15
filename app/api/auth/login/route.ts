import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { signSession, SESSION_COOKIE, sessionCookieOptions } from '@/lib/auth'

const loginAttempts = new Map<string, { count: number; resetTime: number }>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const windowMs = 15 * 60 * 1000
  const max = 8
  const entry = loginAttempts.get(ip)
  if (!entry || now > entry.resetTime) {
    loginAttempts.set(ip, { count: 1, resetTime: now + windowMs })
    return false
  }
  if (entry.count >= max) return true
  entry.count++
  return false
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'
  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'Too many attempts. Try again later.' }, { status: 429 })
  }

  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase().trim()
  const adminHash = process.env.ADMIN_PASSWORD_HASH

  if (!adminEmail || !adminHash) {
    return NextResponse.json({ error: 'Auth is not configured on the server.' }, { status: 500 })
  }

  let email = '', password = ''
  try {
    const body = await request.json()
    email = String(body?.email || '').toLowerCase().trim()
    password = String(body?.password || '')
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 })
  }

  const emailMatches = email === adminEmail
  const passwordMatches = emailMatches ? await bcrypt.compare(password, adminHash) : false

  if (!emailMatches || !passwordMatches) {
    return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 })
  }

  const token = await signSession({ sub: adminEmail, email: adminEmail })
  const res = NextResponse.json({ ok: true, email: adminEmail })
  res.cookies.set(SESSION_COOKIE, token, sessionCookieOptions())
  return res
}
