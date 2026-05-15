import { cookies } from 'next/headers'
import { SignJWT, jwtVerify } from 'jose'

export const SESSION_COOKIE = 'tailor_session'
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7

function getSecret(): Uint8Array {
  const raw = process.env.SESSION_SECRET
  if (!raw || raw.length < 32) {
    throw new Error('SESSION_SECRET must be set in env (>=32 chars)')
  }
  return new TextEncoder().encode(raw)
}

export interface SessionPayload {
  sub: string
  email: string
}

export async function signSession(payload: SessionPayload): Promise<string> {
  return new SignJWT({ email: payload.email })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getSecret())
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret())
    if (typeof payload.sub !== 'string' || typeof payload.email !== 'string') return null
    return { sub: payload.sub, email: payload.email }
  } catch {
    return null
  }
}

export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies()
  const token = store.get(SESSION_COOKIE)?.value
  if (!token) return null
  return verifySession(token)
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
  }
}
