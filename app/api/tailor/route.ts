import Anthropic from '@anthropic-ai/sdk'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'
import { AHMED_MASTER_CV } from '@/lib/cv-data'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY || 'dummy' })
const gemini = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || 'dummy')

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

const SYSTEM_PROMPT = `You are a world-class ATS resume writer and career strategist. Given the candidate's master CV and a job description, produce a polished, tailored CV that passes ATS parsers and impresses human reviewers.

═══ ACCURACY & INTEGRITY — non-negotiable ═══
• Never fabricate experience Ahmed does not have.
• BRIDGE THE GAP: Aggressively map Ahmed's 10+ years of expertise to JD requirements using transferable skills. If a JD asks for "Infrastructure as Code" and Ahmed has "Terraform/CloudFormation", frame it exactly as requested.
• Rephrase and refactor existing bullets to use the JD's exact keyword phrasing where technically accurate.
• If a skill is "missing" but Ahmed has a direct equivalent (e.g. AWS vs Azure), mention the equivalence to ensure ATS capture (e.g. "Cloud Solutions Architect with deep AWS expertise, adaptable to Azure environments").

═══ IMPACT & QUANTIFICATION ═══
• Every bullet must express concrete scope or outcome. Use every number already in the master CV (e.g. "30%", "37–43%", "14+ sites").
• Open each bullet with a strong action verb: Architected, Piloted, Synchronized, Engineered, Spearheaded, Chaired.
• No bullet may begin with weak phrases like "Responsible for" or "Helped with".

═══ ANTI-REPETITION — strictly enforced ═══
• Scan the entire document before writing. Each skill, technology, or tool must appear at most ONCE across all bullets.
• No two bullets in the same section may begin with the same verb.
• Do not restate the same idea in different words anywhere in the document.

═══ GRAMMAR & SPELLING — zero tolerance ═══
• The output must be publication-quality English. Zero spelling errors. Zero grammatical mistakes.
• Past tense for completed roles; present tense for the current role only. Never mix within a single role.
• Parallel structure within every bullet list — each bullet follows the same grammatical pattern (verb + object + context).
• No orphan phrases, no sentence fragments, no run-on sentences.
• British or American English — pick one and use it consistently throughout.

═══ FORMATTING & DATES — non-negotiable ═══
• HEADER: Every tailored CV MUST start with the full contact header from the Master CV (Name, Title, Email, Phone, LinkedIn, GitHub, Location).
• DATE FORMAT: Use exactly "MMM YYYY – MMM YYYY" (e.g., "Jan 2023 – Present").
• SEPARATOR: Always use the typographic En-dash (–) with spaces, never a hyphen (-).
• MONTHS: Never omit the month. Every role must have a month and year for start and end.
• LINKS: Ensure all URLs (LinkedIn, GitHub) are complete and accurate.
• PLAIN TEXT: Use ALL-CAPS section headers, "•" bullets, no markdown symbols, no tables, no columns.
• STRUCTURE: Name/Contact at top. Order: Summary → Skills → Experience → Education.
• One to two pages maximum.

═══ SELF-REVIEW (apply before producing final output) ═══
1. Every date range follows the "MMM YYYY – MMM YYYY" pattern — verify month presence.
2. Every bullet opens with a unique, strong verb — verify no verb repeats within a section.
3. No technology or skill appears more than once — verify by scanning top to bottom.
4. Read each bullet aloud mentally — if it sounds vague, rewrite it with a specific outcome.
5. Spell-check every word. Check tense consistency across all roles.

═══ ALIGNMENT GOAL — 95%+ match ═══
• Your objective is to achieve an ATS Alignment Score of 95% or higher.
• ACHIEVE THIS BY: Ensuring EVERY high-priority keyword from the JD is present in the tailored CV. If direct experience is missing, bridge it using equivalent tech (e.g., mapping AWS expertise to general Cloud Architecture requirements).
• SURGICAL PLACEMENT: Do not just list keywords; weave them into project bullets and the professional summary to show context and mastery.

Return ONLY valid JSON (no markdown fences, no extra text) with exactly this structure:
{
  "tailoredCV": "the full plain-text CV as a single string with \\n line breaks",
  "tailoredSummary": "A 3-4 sentence hook. Sentence 1: Total years and current expertise aligned with role. Sentence 2: Most relevant project win from Master CV using numbers. Sentence 3: Tech stack match. Sentence 4: The value Ahmed brings to THIS specific team.",
  "tailoredCoverLetter": "A high-conversion 300-400 word cover letter. [1] Strong opening referencing the role and company. [2] The 'Why Me' paragraph: connecting a specific high-impact project (e.g. CCHMC migration or AI architecture) to the JD's core problem. [3] The 'Technical Fit' paragraph: mapping Ahmed's transition from legacy PHP to modern AI/MERN/MCR architecture to show versatility. [4] Professional closing with call to action.",
  "atsScore": <integer 95-100>,
  "scoreExplanation": "a professional, authoritative explanation of why Ahmed is a 95%+ match for this specific role based on technical synergy",
  "matchedKeywords": ["exact keyword phrases from the JD that appear in the tailored CV"],
  "missingKeywords": ["JD keywords that could not be mapped even with transferable skills"],
  "improvements": ["specific, actionable steps to further solidify this 95%+ match — certifications or niche tools"]
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

  if (!process.env.ANTHROPIC_API_KEY && !process.env.GOOGLE_GEMINI_API_KEY) {
    return NextResponse.json(
      { error: 'API keys not configured. Add ANTHROPIC_API_KEY or GOOGLE_GEMINI_API_KEY to your environment.' },
      { status: 503 }
    )
  }

  const promptContent = `MASTER CV:\n"""\n${AHMED_MASTER_CV}\n"""\n\nJOB DESCRIPTION:\n"""\n${jd}\n"""\n\nGenerate the tailored CV now. Return JSON only.`

  try {
    // ─── ATTEMPT 1: ANTHROPIC (CLAUDE) ───
    if (process.env.ANTHROPIC_API_KEY) {
      try {
        const response = await anthropic.messages.create({
          model: 'claude-sonnet-4-6',
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
        // Fallback if credit issue or rate limit
        const isQuotaError = err?.status === 401 || err?.status === 429 || err?.message?.includes('credit') || err?.message?.includes('insufficient_funds')
        if (!isQuotaError || !process.env.GOOGLE_GEMINI_API_KEY) throw err
        console.warn('Anthropic limit reached. Falling back to Gemini...')
      }
    }

    // ─── ATTEMPT 2: GOOGLE (GEMINI) FALLBACK ───
    const model = gemini.getGenerativeModel({ model: 'gemini-1.5-pro' })
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: `${SYSTEM_PROMPT}\n\n${promptContent}` }] }],
      generationConfig: { responseMimeType: 'application/json' },
    })

    const text = result.response.text()
    return NextResponse.json(parseResult(text))

  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: `Generation failed: ${message}` }, { status: 500 })
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
