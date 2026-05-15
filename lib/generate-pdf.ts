import { jsPDF } from 'jspdf'
import { AHMED_MASTER_CV, TIMELINE, SKILLS, EDUCATION, CERTIFICATIONS, PROJECTS, LANGUAGES } from '@/lib/cv-data'

// Design Tokens (Single Column - High Compatibility)
const MARGIN = 15
const PW = 210
const CW = PW - MARGIN * 2

const C_BLACK = [15, 23, 42] as const
const C_GRAY = [71, 85, 105] as const
const C_LIGHT = [148, 163, 184] as const
const C_ACCENT = [56, 189, 248] as const // #38bdf8 Sky Blue

const F_BODY = 9
const F_H1 = 20
const F_H2 = 11
const F_H3 = 10

export async function downloadMasterCVAsPDF(): Promise<void> {
  if (typeof window === 'undefined') return
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

  const PH = doc.internal.pageSize.getHeight()
  let y = MARGIN

  const addPage = () => { doc.addPage(); y = MARGIN }
  const guard = (h: number) => { if (y + h > PH - MARGIN) addPage() }

  // ── HEADER ──────────────────────────────────────────
  const cvLines = AHMED_MASTER_CV.split('\n').map(l => l.trim()).filter(Boolean)
  const nameLine = cvLines[0]
  const roleLine = cvLines[1]
  const contactLine = cvLines[2]
  const linksLine = cvLines[3]

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(F_H1)
  doc.setTextColor(...C_BLACK)
  doc.text(nameLine, PW / 2, y, { align: 'center' })
  y += 6

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  doc.setTextColor(...C_ACCENT)
  doc.text(roleLine, PW / 2, y, { align: 'center' })
  y += 5

  doc.setFontSize(8.5)
  doc.setTextColor(...C_GRAY)
  doc.text(contactLine, PW / 2, y, { align: 'center' })
  y += 4
  doc.text(linksLine, PW / 2, y, { align: 'center' })
  y += 6

  const sectionHeader = (title: string) => {
    guard(15)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(F_H2)
    doc.setTextColor(...C_ACCENT)
    doc.text(title.toUpperCase(), MARGIN, y)
    y += 1.2
    doc.setDrawColor(...C_ACCENT)
    doc.setLineWidth(0.3)
    doc.line(MARGIN, y, PW - MARGIN, y)
    y += 4.5
  }

  // ── PROFESSIONAL SUMMARY ────────────────────────────
  sectionHeader('Summary')
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(F_BODY)
  doc.setTextColor(...C_GRAY)

  // Extract summary from master string
  let summaryText = ''
  const sIdx = cvLines.findIndex(l => l.toUpperCase().includes('SUMMARY:'))
  if (sIdx !== -1) {
    // Check if content is on the same line
    const sameLine = cvLines[sIdx].replace(/SUMMARY:?/i, '').trim()
    if (sameLine) {
      summaryText = sameLine
    } else if (cvLines[sIdx + 1]) {
      // If same line is empty, take the next line
      summaryText = cvLines[sIdx + 1].trim()
    }
  }

  if (!summaryText) {
    summaryText = 'Senior Solutions Architect with 10+ years experience in Distributed Systems & AI Platforms.'
  }

  const sLines = doc.splitTextToSize(summaryText, CW)
  doc.text(sLines, MARGIN, y)
  y += sLines.length * 4.5 + 5

  // ── SKILLS / EXPERTISE ──────────────────────────────
  sectionHeader('Skills')
  for (const s of SKILLS) {
    guard(10)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(F_BODY)
    doc.setTextColor(...C_BLACK)
    doc.text(`${s.cat}:`, MARGIN, y)
    const labelW = doc.getTextWidth(`${s.cat}: `)

    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...C_GRAY)
    const items = doc.splitTextToSize(s.items.join(', '), CW - labelW)
    doc.text(items, MARGIN + labelW, y)
    y += items.length * 4.5 + 1.2
  }
  y += 3

  // ── PROFESSIONAL EXPERIENCE ─────────────────────────
  sectionHeader('Experience')
  for (const exp of TIMELINE) {
    guard(25)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(F_H3)
    doc.setTextColor(...C_BLACK)
    doc.text(exp.role, MARGIN, y)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(...C_LIGHT)
    const pW = doc.getTextWidth(exp.period)
    doc.text(exp.period, PW - MARGIN - pW, y)
    y += 5

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9.5)
    doc.setTextColor(...C_ACCENT)
    doc.text(`${exp.company} | ${exp.location}`, MARGIN, y)
    y += 6

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(F_BODY)
    doc.setTextColor(...C_GRAY)
    for (const note of exp.notes) {
      const wrapped = doc.splitTextToSize(note, CW - 6)
      guard(wrapped.length * 4.5 + 1)
      doc.text('•', MARGIN + 1, y)
      doc.text(wrapped, MARGIN + 5, y)
      y += wrapped.length * 4.5 + 0.8
    }
    y += 4
  }

  // ── EDUCATION ───────────────────────────────────────
  sectionHeader('Education')
  for (const e of EDUCATION) {
    guard(12)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(F_H3)
    doc.setTextColor(...C_BLACK)
    doc.text(e.degree, MARGIN, y)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(...C_LIGHT)
    const epW = doc.getTextWidth(e.period)
    doc.text(e.period, PW - MARGIN - epW, y)
    y += 5

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(...C_GRAY)
    doc.text(e.school, MARGIN, y)
    y += 7
  }

  // ── SELECTED PROJECTS ──────────────────────────────
  sectionHeader('Key Projects')
  for (const p of PROJECTS.slice(0, 4)) {
    guard(15)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(F_H3)
    doc.setTextColor(...C_BLACK)
    doc.text(p.name, MARGIN, y)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8.5)
    doc.setTextColor(...C_LIGHT)
    const stackStr = p.stack.join(' · ')
    const stW = doc.getTextWidth(stackStr)
    doc.text(stackStr, PW - MARGIN - stW, y)
    y += 5

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(F_BODY)
    doc.setTextColor(...C_GRAY)
    const pDesc = doc.splitTextToSize(p.desc, CW)
    doc.text(pDesc, MARGIN, y)
    y += pDesc.length * 4.5 + 3.5
  }
  y += 3

  // ── CERTIFICATIONS ──────────────────────────────────
  sectionHeader('Certifications')
  for (const c of CERTIFICATIONS) {
    guard(8)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9.5)
    doc.setTextColor(...C_BLACK)
    doc.text(c.name, MARGIN, y)

    const issW = doc.getTextWidth(c.issuer)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...C_LIGHT)
    doc.text(c.issuer, PW - MARGIN - issW, y)
    y += 4.5
  }

  // -- Languages --

  sectionHeader('Languages')
  for (const l of LANGUAGES) {
    guard(8)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9.5)
    doc.setTextColor(...C_BLACK)
    doc.text(l.name, MARGIN, y)

    const levelW = doc.getTextWidth(l.level)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...C_LIGHT)
    doc.text(l.level, PW - MARGIN - levelW, y)
    y += 4.5
  }

  doc.save('Ahmed Mustafa Resume.pdf')
}

export async function downloadTailoredCVAsPDF(cvText: string, filename: string): Promise<void> {
  if (typeof window === 'undefined') return
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

  const PH = doc.internal.pageSize.getHeight()
  let y = MARGIN

  const addPage = () => { doc.addPage(); y = MARGIN }
  const guard = (h: number) => { if (y + h > PH - MARGIN) addPage() }

  // Header Block
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(F_H1)
  doc.setTextColor(...C_BLACK)
  doc.text('AHMED MUSTAFA', PW / 2, y, { align: 'center' })
  y += 6

  const lines = cvText.split('\n').map(l => l.trim()).filter(Boolean)

  // Dynamic Role Extraction
  let targetRole = 'Senior Solutions Architect · Senior Software Engineer · Full-Stack Developer'
  let bodyStartIndex = 0

  for (let i = 0; i < Math.min(lines.length, 3); i++) {
    const l = lines[i]
    if (l.toLowerCase().includes('ahmed mustafa') || l.includes('moonahmed786')) continue
    if (l === l.toUpperCase() && !l.includes('SUMMARY') && !l.includes('EXPERIENCE')) {
      targetRole = l
      bodyStartIndex = i + 1
      break
    }
  }

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  doc.setTextColor(...C_ACCENT)
  doc.text(targetRole, PW / 2, y, { align: 'center' })
  y += 5

  doc.setFontSize(8.5)
  doc.setTextColor(...C_GRAY)
  doc.text('moonahmed786@gmail.com  ·  +92 332 837 1943  ·  Rawalpindi, Punjab, PK', PW / 2, y, { align: 'center' })
  y += 4
  doc.text('linkedin.com/in/ahmed-mustafa-b3613754  ·  github.com/moonahmed786', PW / 2, y, { align: 'center' })
  y += 6

  // Body Loop
  for (let i = bodyStartIndex; i < lines.length; i++) {
    const t = lines[i]
    if (t.toLowerCase().includes('ahmed mustafa') || t.includes('moonahmed786')) continue

    const upperT = t.toUpperCase()

    // Header Detection (All CAPS line)
    if (t === upperT && t.length > 3 && !/^[•\-]/.test(t)) {
      y += 2.5
      guard(15)
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(F_H2)
      doc.setTextColor(...C_ACCENT)
      doc.text(t, MARGIN, y)
      y += 1.2
      doc.setDrawColor(...C_ACCENT)
      doc.line(MARGIN, y, PW - MARGIN, y)
      y += 4.5
      continue
    }

    // Bullet Points
    if (/^[•\-]/.test(t)) {
      const bulletText = t.replace(/^[•\-]\s*/, '')
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(F_BODY)
      doc.setTextColor(...C_GRAY)
      const bLines = doc.splitTextToSize(bulletText, CW - 6)
      guard(bLines.length * 4.5 + 2)
      doc.text('•', MARGIN + 1, y)
      doc.text(bLines, MARGIN + 5, y)
      y += bLines.length * 4.5 + 1.2
      continue
    }

    // Normal Text
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(F_BODY)
    doc.setTextColor(...C_GRAY)
    const textLines = doc.splitTextToSize(t, CW)
    guard(textLines.length * 4.5 + 2)
    doc.text(textLines, MARGIN, y)
    y += textLines.length * 4.5 + 2
  }

  doc.save(filename || 'Ahmed Mustafa Tailored CV.pdf')
}
