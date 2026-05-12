# Ahmed Mustafa — Portfolio

Personal portfolio site for Ahmed Mustafa, Senior Solutions Architect & Full-Stack Engineer. Includes a live **Tailor.cv** demo — an AI-powered CV tailoring tool that rewrites Ahmed's resume for any job description and scores ATS compatibility.

## Stack

- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS v3**
- **Geist** + **Instrument Serif** via `next/font`
- **lucide-react** for icons
- **@anthropic-ai/sdk** (server-side only — API key never exposed to browser)

## Getting started

```bash
cp .env.example .env.local
# add your ANTHROPIC_API_KEY to .env.local

npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ANTHROPIC_API_KEY` | Yes | Powers the Tailor.cv live demo. Get one at [console.anthropic.com](https://console.anthropic.com). |

## API route

`POST /api/tailor`

Accepts `{ jd: string }` in the request body. Calls Claude server-side, parses the response, and returns:

```json
{
  "tailoredCV": "...",
  "atsScore": 85,
  "scoreExplanation": "...",
  "matchedKeywords": ["..."],
  "missingKeywords": ["..."],
  "improvements": ["..."]
}
```

Rate limited to **5 requests per minute per IP** (in-memory).

## Build

```bash
npm run build
npm start
```
