import { jsPDF } from 'jspdf'
import { TIMELINE, SKILLS, EDUCATION, CERTIFICATIONS } from '@/lib/cv-data'

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
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(F_H1)
  doc.setTextColor(...C_BLACK)
  const name = 'AHMED MUSTAFA'
  doc.text(name, MARGIN, y)
  y += 7

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11.5)
  doc.setTextColor(...C_ACCENT)
  doc.text('Senior Solutions Architect & Full-Stack Engineer', MARGIN, y)
  y += 6

  doc.setFontSize(8.5)
  doc.setTextColor(...C_GRAY)
  doc.text('moonahmed786@gmail.com  ·  +92 332 837 1943  ·  Rawalpindi, Punjab, PK', MARGIN, y)
  y += 4.5
  doc.text('linkedin.com/in/ahmed-mustafa-b3613754  ·  github.com/moonahmed786', MARGIN, y)
  y += 8

  doc.setDrawColor(...C_BLACK)
  doc.setLineWidth(0.5)
  doc.line(MARGIN, y, PW - MARGIN, y)
  y += 10

  const sectionHeader = (title: string) => {
    guard(15)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(F_H2)
    doc.setTextColor(...C_ACCENT)
    doc.text(title.toUpperCase(), MARGIN, y)
    y += 1.5
    doc.setDrawColor(...C_ACCENT)
    doc.setLineWidth(0.3)
    doc.line(MARGIN, y, PW - MARGIN, y)
    y += 6
  }

  // ── PROFESSIONAL SUMMARY ────────────────────────────
  sectionHeader('Professional Summary')
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(F_BODY)
  doc.setTextColor(...C_GRAY)
  const summary = 'Senior Solutions Architect with 10+ years experience in Distributed Systems & AI Platforms. Expert in MERN, Enterprise PHP (Laravel), .NET Core, and Python RAG/LLMs.'
  const sLines = doc.splitTextToSize(summary, CW)
  doc.text(sLines, MARGIN, y)
  y += sLines.length * 4.5 + 8

  // ── SKILLS / EXPERTISE ──────────────────────────────
  sectionHeader('Technical Expertise')
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
    y += items.length * 4.5 + 1.5
  }
  y += 6

  // ── PROFESSIONAL EXPERIENCE ─────────────────────────
  sectionHeader('Professional Experience')
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
      y += wrapped.length * 4.5 + 1
    }
    y += 5
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
    y += 5.5
  }

  doc.save('ahmed-mustafa-cv.pdf')
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
  doc.text('AHMED MUSTAFA', MARGIN, y)
  y += 7

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11.5)
  doc.setTextColor(...C_ACCENT)
  doc.text('Senior Solutions Architect · Full-Stack Engineer', MARGIN, y)
  y += 6

  doc.setFontSize(8.5)
  doc.setTextColor(...C_GRAY)
  doc.text('moonahmed786@gmail.com  ·  +92 332 837 1943  ·  Rawalpindi, Punjab, PK', MARGIN, y)
  y += 4.5
  doc.text('linkedin.com/in/ahmed-mustafa-b3613754  ·  github.com/moonahmed786', MARGIN, y)
  y += 8

  doc.setDrawColor(...C_BLACK)
  doc.setLineWidth(0.5)
  doc.line(MARGIN, y, PW - MARGIN, y)
  y += 10

  // Body
  const lines = cvText.split('\n')
  for (const rawLine of lines) {
    const t = rawLine.trim()
    if (!t || t.toLowerCase().includes('ahmed mustafa') || t.includes('moonahmed786')) continue

    if (t === t.toUpperCase() && t.length > 3 && !/^[•\-]/.test(t)) {
      y += 4
      guard(15)
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(F_H2)
      doc.setTextColor(...C_ACCENT)
      doc.text(t, MARGIN, y)
      y += 2
      doc.setDrawColor(...C_ACCENT)
      doc.line(MARGIN, y, PW - MARGIN, y)
      y += 6
      continue
    }

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

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(F_BODY)
    doc.setTextColor(...C_GRAY)
    const textLines = doc.splitTextToSize(t, CW)
    guard(textLines.length * 4.5 + 2)
    doc.text(textLines, MARGIN, y)
    y += textLines.length * 4.5 + 2
  }

  doc.save(filename)
}
