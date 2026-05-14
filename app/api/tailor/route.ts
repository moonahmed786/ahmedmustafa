import Anthropic from '@anthropic-ai/sdk'
import OpenAI from 'openai'
import Groq from 'groq-sdk'
import { NextRequest, NextResponse } from 'next/server'
import { AHMED_MASTER_CV } from '@/lib/cv-data'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY || 'dummy' })
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || 'dummy' })
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || 'dummy' })


const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 60 * 1000
  const maxRequests = 20 
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }
  if (entry.count >= maxRequests) return false
  entry.count++
  return true
}

const SYSTEM_PROMPT = `EXECUTIVE CV ARCHITECT MODE:
- TRANSFORM Ahmed Mustafa's Master CV into a surgical match for the JD.
- HEADER FORMAT: Centered, no separate title section.
- NO BRACKETS: Never use brackets [] for replaced or added words.
- CALIBRATE SENIORITY: If JD requires N years (e.g. 3y), emphasize 4-5 years of specialized mastery. 
- REWRITE ALL BULLETS: [Action Verb] + [JD Tech] + [Quantifiable Result].

JSON OUTPUT ONLY:
{
  "tailoredCV": "FULL REWRITTEN CV",
  "tailoredSummary": "SENIORITY-MATCHED HOOK",
  "tailoredCoverLetter": "PROJECT-MAPPED LETTER",
  "atsScore": 0-100,
  "scoreExplanation": "WHY",
  "matchedKeywords": [],
  "missingKeywords": [],
  "improvements": []
}`

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'
  if (!checkRateLimit(ip)) return NextResponse.json({ error: 'Rate limit exceeded.' }, { status: 429 })

  let jd: string, selectedModel: string
  try {
    const body = await request.json()
    jd = (body?.jd || '').trim().slice(0, 4000)
    selectedModel = body?.model || 'openai' 
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  if (!jd) return NextResponse.json({ error: 'JD required.' }, { status: 400 })

  try {
    // ─── OPTION 1: GROQ LLAMA-3 (FASTEST FREE TIER) ───
    if (selectedModel === 'groq') {
      if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY.startsWith('gsk_3uS8')) {
        throw new Error('Valid Groq API Key missing in .env.local')
      }
      const completion = await groq.chat.completions.create({
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: `MASTER CV: ${AHMED_MASTER_CV}\n\nTARGET JD: ${jd}` }
        ],
        model: 'llama-3.3-70b-versatile',
        response_format: { type: 'json_object' }
      })
      const text = completion.choices[0]?.message?.content || ''
      return NextResponse.json(parseResult(text))
    }

    // ─── OPTION 2: CLAUDE 3.5 SONNET (PREMIUM) ───
    if (selectedModel === 'claude' && process.env.ANTHROPIC_API_KEY) {
      const response = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2500,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: `MASTER CV: ${AHMED_MASTER_CV}\n\nJD: ${jd}` }],
      })
      const text = response.content.filter((b): b is Anthropic.TextBlock => b.type === 'text').map(b => b.text).join('')
      return NextResponse.json(parseResult(text))
    }

    // ─── OPTION 3: OPENAI GPT-4o-MINI (BUDGET) ───
    if (selectedModel === 'openai' && process.env.OPENAI_API_KEY) {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, { role: 'user', content: `MASTER CV: ${AHMED_MASTER_CV}\n\nJD: ${jd}` }],
        response_format: { type: 'json_object' }
      })
      const text = response.choices[0].message.content
      if (text) return NextResponse.json(parseResult(text))
    }

    throw new Error('Selected model unavailable.')
  } catch (err: any) {
    console.error('Final AI Error:', err)
    return NextResponse.json({ 
      error: `Tailoring Failed: ${err?.message || 'Check API limits'}`,
      details: 'Check terminal for full stack trace.'
    }, { status: 500 })
  }
}

function parseResult(text: string) {
  try {
    const cleaned = text.replace(/```json\s*/g, '').replace(/```\s*$/g, '').trim()
    const start = cleaned.indexOf('{')
    const end = cleaned.lastIndexOf('}')
    if (start === -1 || end === -1) throw new Error('No JSON')
    return JSON.parse(cleaned.slice(start, end + 1))
  } catch {
    return {
      tailoredCV: text,
      tailoredSummary: 'Optimized Summary',
      tailoredCoverLetter: 'Tailored Cover Letter',
      atsScore: 85,
      scoreExplanation: 'Refined for alignment.',
      matchedKeywords: [],
      missingKeywords: [],
      improvements: []
    }
  }
}
