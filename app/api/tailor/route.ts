import Anthropic from '@anthropic-ai/sdk'
import OpenAI from 'openai'
import { NextRequest, NextResponse } from 'next/server'
import { AHMED_MASTER_CV } from '@/lib/cv-data'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY || 'dummy' })
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || 'dummy' })

// In-memory rate limiter: 5 requests per minute per IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 60 * 1000
  const maxRequests = 5
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (entry.count >= maxRequests) return false

  entry.count++
  return true
}

const SYSTEM_PROMPT = `You are a world-class Executive Resume Architect. Your mission is to dynamically transform Ahmed Mustafa's Master CV into a 100% surgical match for a specific Job Description.

═══ MANDATORY REWRITING RULES ═══
• TOTAL CV REWRITE: Do not just return the Master CV. You MUST rewrite every single experience bullet to lead with the JD's keywords and align with the requested seniority.
• SENIORITY CALIBRATION (CRITICAL): If the JD asks for "2-3 years" or "Mid-level", rewrite Ahmed's 10-year history to focus on a "3-Year Advanced Specialization Track". Do not let him look overqualified. Lead with the specific duration requested in the JD.
• SKILL RECTIFICATION: If a skill is missing (e.g. Azure), find its equivalent in the Master CV (e.g. AWS) and rewrite the bullet as: "Mastery in Cloud Architecture (Azure/AWS), leveraging 5+ years of production-grade infrastructure deployment."
• BULLET STRUCTURE: [Action Verb from JD] + [Key Technology from JD] + [Quantifiable Result from Master CV].

═══ OUTPUT STRUCTURE ═══
• HEADER: Full contact info from Master CV.
• SUMMARY: 4 punchy sentences mirrored to JD seniority.
• SKILLS: Categorized exactly like the JD requirements.
• EXPERIENCE: Rewritten for 100% keyword density and duration alignment.
• EDUCATION: Degrees from Master CV.

Return ONLY JSON:
{
  "tailoredCV": "A FULLY REWRITTEN, ATS-OPTIMIZED CV STRING.",
  "tailoredSummary": "A seniority-mirrored hook (e.g. '3+ years of expertise in...').",
  "tailoredCoverLetter": "A high-conversion letter mapping specific project wins to the JD.",
  "atsScore": 100,
  "scoreExplanation": "Technical synergy breakdown based on years and stack.",
  "matchedKeywords": ["Keywords"],
  "missingKeywords": [],
  "improvements": ["Interview tips"]
}
`

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Please wait a minute and try again.' },
      { status: 429 }
    )
  }

  let jd: string
  try {
    const body = await request.json()
    jd = body?.jd?.trim()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  if (!jd) {
    return NextResponse.json({ error: 'Job description is required.' }, { status: 400 })
  }

  if (!process.env.ANTHROPIC_API_KEY && !process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: 'API keys not configured. Add ANTHROPIC_API_KEY or OPENAI_API_KEY to your environment.' },
      { status: 503 }
    )
  }

  const promptContent = `MASTER CV:\n"""\n${AHMED_MASTER_CV}\n"""\n\nJOB DESCRIPTION:\n"""\n${jd}\n"""\n\nGenerate the tailored CV now. Return JSON only.`

  try {
    // ─── ATTEMPT 1: ANTHROPIC (CLAUDE) ───
    if (process.env.ANTHROPIC_API_KEY) {
      try {
        const response = await anthropic.messages.create({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 4000,
          system: SYSTEM_PROMPT,
          messages: [{ role: 'user', content: promptContent }],
        })

        const text = response.content
          .filter((b): b is Anthropic.TextBlock => b.type === 'text')
          .map((b) => b.text)
          .join('')

        return NextResponse.json(parseResult(text))
      } catch (err: any) {
        console.error('Anthropic API Failure Detail:', {
          status: err?.status,
          message: err?.message
        })
      }
    }

    // ─── ATTEMPT 2: OPENAI (GPT-4o) FALLBACK ───
    if (process.env.OPENAI_API_KEY) {
      try {
        const response = await openai.chat.completions.create({
          model: 'gpt-4o',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: promptContent }
          ],
          response_format: { type: 'json_object' }
        })

        const text = response.choices[0].message.content
        if (text) return NextResponse.json(parseResult(text))
      } catch (err: any) {
        console.error('OpenAI API Failure Detail:', {
          status: err?.status,
          message: err?.message
        })
      }
    }

    throw new Error('AI Tailoring Engine is temporarily unavailable. Please verify your API keys.')

  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: `Tailoring Engine Error: ${message}` }, { status: 500 })
  }
}

function parseResult(text: string) {
  const cleaned = text.replace(/```json\s*/g, '').replace(/```\s*$/g, '').trim()
  const start = cleaned.indexOf('{')
  const end = cleaned.lastIndexOf('}')
  if (start === -1 || end === -1) {
    throw new Error('Unexpected response format from model.')
  }
  return JSON.parse(cleaned.slice(start, end + 1))
}
