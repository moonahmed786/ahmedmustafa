// ─── MASTER CV STRING (feeds AI Tailor engine & PDF generator) ─────────────────
export const AHMED_MASTER_CV = `AHMED MUSTAFA
Senior Solutions Architect · Senior Software Engineer · Full-Stack Developer
moonahmed786@gmail.com · +92 332 837 1943 · Rawalpindi, Punjab, PK
https://www.linkedin.com/in/ahmed-mustafa-b3613754 · https://github.com/moonahmed786 · https://ahmedmustafa.programmersin.com/

SUMMARY: 
Solutions Architect & Technical Lead with over a decade of experience, specialising in translating complex business requirements into scalable and robust technical solutions. Expert in MERN (MongoDB, Express, React, Node) and enterprise PHP (Laravel) ecosystems with strong backend architecture skills. Proven experience in designing high-concurrency microservices and delivering Python-based AI solutions (FastAPI/RAG/LLM integrations) across Healthcare, Fintech, E-commerce, and Telecom domains.

EXPERIENCE:

Sr Tech Lead / Architect | Troon Technologies | Jan 2023 – Present
• Led cross-functional teams (Backend, Frontend, DevOps) to boost productivity by 30%.
• Built RocX: MERN-based carbon credit platform; improved performance by ~30%.
• Built AliaMed: Medical chatbot (FastAPI, RAG, LLMs); raised accuracy by 35–45%.
• CCHMC: Integrated 14+ RoR apps into Salesforce; cut manual work by ~60%.
• Icon Exchange: Hospital staffing backend; accelerated API by 33%, 2x scalability.
• PHC: Patient relocation system; cut latency by 28%, boosted speed by 36%.

Sr Software Engineer | Troon Technologies | Jan 2020 – Dec 2022
• Carehubble: Laravel/Vue/GraphQL healthcare API; improved data retrieval by 33%.
• MyRemedyApp: Laravel/Vue/GraphQL cannabis e-commerce; 28% performance boost.
• MyHealthyGut: Yii2/MySQL nutrition backend; accelerated data processing by 37%.

Jr Software Engineer | Troon Technologies | Jul 2017 – Dec 2019
• ATS: Yii2/MySQL construction analysis; 38% accuracy gain, 47% manual work cut.
• Cadenza: PHP music platform; improved user engagement by 33%.

Jr Software Engineer | Green Tech Lab | Aug 2016 – Jul 2017
• Green Taxi: Laravel ride-hailing API; 33% faster allocation, 2x reliability boost.

Full-Stack Developer | PTCL | Jan 2015 – Jul 2016
• HR Portal: PHP/MySQL; automated HR tasks, 47% manual work reduction.

SKILLS:
- Languages: PHP, Python, JavaScript (ES6+), TypeScript
- Frameworks: Laravel, Yii2, Node.js, NestJS, Express, FastAPI, React.js, Next.js, Vue.js
- AI & ML: LLMs, RAG, AI Pipelines, Vector DBs (Pinecone, pgvector)
- DevOps: AWS (EC2, S3, RDS, Lambda), Docker, CI/CD, GitHub Actions
- Architecture: REST, GraphQL, Microservices, System Design, Databases, AI Pipelines, Distributed Systems

EDUCATION:
- MSCS | Superior University, Lahore | 2022
- BSCS | Virtual University of Pakistan | 2016

INDUSTRIES: Healthcare, Fintech, E-commerce, AI, Sustainability
 
 LANGUAGES:
 - English (Professional)
 - Urdu (Native)
 - Punjabi (Native)
 - Portuguese (Basic)

KEY PROJECTS:
- AliaMed: Architected AI medical chatbot (FastAPI, RAG, LLM, Next.js), boosting user engagement by ~40% and improving response accuracy by 35–45% — Healthcare AI
- RocX: Led development of MERN-based carbon credit trading platform, improving system performance by ~30% through a scalable architecture — Sustainability
- CCHMC: Managed migration and integration of 14+ Rails applications into Salesforce, reducing manual work by ~60% and improving workflow efficiency by ~40% — Enterprise Integration
`

// ─── PROJECTS ──────────────────────────────────────────────────────────────────
export const PROJECTS = [
  {
    n: '01',
    name: 'AliaMed',
    role: 'Solutions Architect',
    desc: 'Architected an AI medical chatbot (FastAPI, RAG, LLM, Next.js), boosting user engagement by ~40% and improving response accuracy by 35–45%.',
    stack: ['FastAPI', 'RAG', 'LLMs', 'Next.js', 'Vector DB'],
    tag: 'AI / Healthcare',
    link: 'https://github.com/moonahmed786',
    image: '/assets/projects/alira.png'
  },
  {
    n: '02',
    name: 'RocX',
    role: 'Technical Lead',
    desc: 'Led development of a MERN-based carbon credit trading platform, improving system performance by ~30% through a scalable architecture.',
    stack: ['MongoDB', 'Express', 'React', 'Node.js'],
    tag: 'Sustainability / Marketplace',
    link: 'https://github.com/moonahmed786',
    image: '/assets/projects/rocx.png'
  },
  {
    n: '03',
    name: 'CCHMC',
    role: 'Solutions Architect',
    desc: 'Managed migration and integration of 14+ Rails applications into Salesforce, reducing manual work by ~60% and improving workflow efficiency by ~40%.',
    stack: ['Ruby on Rails', 'Salesforce', 'Integrations'],
    tag: 'Enterprise / Healthcare',
    link: 'https://github.com/moonahmed786',
    image: '/assets/projects/cchmc.png'
  },
  {
    n: '04',
    name: 'Carehubble',
    role: 'Senior Engineer',
    desc: 'Engineered a GraphQL API using Laravel and developed core features for the Vue.js frontend for a North American healthcare platform, accelerating data retrieval efficiency by 33%.',
    stack: ['Laravel', 'GraphQL', 'Vue.js'],
    tag: 'Healthcare / SaaS',
    link: 'https://github.com/moonahmed786',
    image: '/assets/projects/carehubble.png'
  },
  {
    n: '05',
    name: 'Tailor.cv',
    role: 'Designer & Engineer',
    desc: 'Personal project — an AI-powered CV-tailoring tool that rewrites resumes for specific job descriptions, scores ATS compatibility, and generates tailored cover letters.',
    stack: ['React', 'Anthropic API', 'Prompt Engineering'],
    tag: 'AI / Tooling',
    featured: true,
    link: '/tailor',
    image: '/assets/projects/tailor.png'
  },
  {
    n: '06',
    name: 'Green Taxi',
    role: 'Software Engineer',
    desc: 'Formulated a Laravel REST API for a ride-hailing platform with geo-based booking and real-time tracking; boosted trip allocation by 33% and cut booking response times.',
    stack: ['Laravel', 'MySQL', 'Geo APIs'],
    tag: 'Mobility',
    link: 'https://github.com/moonahmed786',
    image: '/assets/projects/taxi.png'
  },
]

// ─── TIMELINE ──────────────────────────────────────────────────────────────────
export const TIMELINE = [
  {
    period: 'Jan 2023 – Present',
    role: 'Senior Tech Lead and Solutions Architect',
    company: 'Troon Technologies',
    location: 'Islamabad',
    notes: [
      'Spearhead a cross-functional engineering team across backend, frontend, and DevOps; establish code review standards and mentor mid-level engineers, boosting engineering productivity by 30% and reducing time-to-market for key features by 22%.',
      'Led development of a MERN-based carbon credit trading platform (RocX), improving system performance by ~30% through a scalable architecture.',
      'Architected an AI medical chatbot (AliaMed) using FastAPI, RAG, and LLMs, raising response accuracy by 35–45% and boosting user engagement by ~40%.',
      'Managed migration and integration of 14+ Rails applications into Salesforce (CCHMC), reducing manual work by ~60% and improving workflow efficiency by ~40%.',
      'Chaired the backend team for a hospital staffing system (Icon Exchange), accelerating API performance by 33%, expanding scalability by 2x, and strengthening security by 47%.',
      'Governed development of a hospital patient relocation system (PHC), increasing API speed by 36% and reducing latency by 28%.',
      'Delivered enterprise systems across Healthcare, Fintech, and AI domains, enhancing delivery efficiency by 28% and cutting system downtime by 23%.',
    ],
  },
  {
    period: 'Jan 2020 – Dec 2022',
    role: 'Senior Software Engineer',
    company: 'Troon Technologies',
    location: 'Islamabad',
    notes: [
      'Engineered a GraphQL API using Laravel and developed core features for the Vue.js frontend for a North American healthcare platform (Carehubble), accelerating data retrieval efficiency by 33% and enabling scalable real-time healthcare workflows.',
      'Forged a Laravel and Vue.js cannabis e-commerce platform (MyRemedyApp) with GraphQL API integration, boosting platform performance by 28%, strengthening transaction reliability, and supporting secure, scalable order management.',
      'Devised a nutrition-focused backend system (MyHealthyGut) using Yii2 and MySQL, building robust REST APIs that accelerated data processing efficiency by 37% and enabled structured health tracking and analytics workflows.',
    ],
  },
  {
    period: 'Jul 2017 – Dec 2019',
    role: 'Junior Software Engineer',
    company: 'Troon Technologies',
    location: 'Islamabad',
    notes: [
      'Devised Allied Technical Service (ATS), a Yii2 and MySQL construction-analysis and reconciliation system with OAuth; raised operational accuracy by 38% and cut manual effort by 47%.',
      'Launched a PHP-based music learning platform (Cadenza) featuring lesson management, progress tracking, and structured learning workflows; lifted user engagement by 33% and strengthened content management efficiency through scalable platform architecture.',
    ],
  },
  {
    period: 'Aug 2016 – Jul 2017',
    role: 'Junior Software Engineer',
    company: 'Green Tech Lab',
    location: 'Lahore',
    notes: [
      'Formulated a Laravel REST API for ride-hailing platform Green Taxi with geo-based booking, driver matching, and real-time tracking; boosted trip allocation by 33% and cut booking response time by 28%.',
      'Constructed scalable backend architecture using Laravel and MySQL, increasing system reliability by ~2x and improving concurrent request handling capacity while ensuring stable and efficient trip management workflows.',
      'Refined location-based services and real-time request processing, raising tracking accuracy by 38% and reducing latency in live ride updates by 23%.',
    ],
  },
  {
    period: 'Jan 2015 – Jul 2016',
    role: 'Full-Stack PHP Developer',
    company: 'PTCL (Pakistan Telecommunication Company Ltd.)',
    location: 'Lahore',
    notes: [
      'Deployed a PHP and MySQL HR portal (WFM) automating attendance, scheduling, and performance reviews; cut manual HR operations by 47% and raised workforce efficiency by 33%.',
      'Architected scalable backend architecture for workforce data management, increasing system reliability and processing efficiency by 28% through optimized workflows and automation systems.',
    ],
  },
]

// ─── SKILLS ────────────────────────────────────────────────────────────────────
export const SKILLS = [
  { cat: 'Languages', icon: 'Code2', items: ['PHP', 'Python', 'JavaScript (ES6+)', 'TypeScript', 'C#'] },
  { cat: 'Backend Frameworks', icon: 'Server', items: ['Laravel', 'Yii2', 'Node.js', 'NestJS', 'Express', 'FastAPI', '.NET Core'] },
  { cat: 'Frontend', icon: 'Layout', items: ['React.js', 'Next.js', 'Vue.js'] },
  { cat: 'Databases', icon: 'Database', items: ['MySQL', 'MongoDB', 'PostgreSQL', 'Redis', 'Vector DBs (Pinecone, pgvector)'] },
  { cat: 'AI & ML', icon: 'Brain', items: ['LLMs', 'RAG', 'AI Pipelines', 'Prompt Engineering', 'Vector Search'] },
  { cat: 'Cloud & DevOps', icon: 'Cloud', items: ['AWS (EC2, S3, RDS, Lambda)', 'Docker', 'CI/CD', 'GitHub Actions', 'Jenkins'] },
  { cat: 'APIs & Architecture', icon: 'Network', items: ['REST', 'GraphQL', 'Microservices', 'Event-Driven Design', 'System Design'] },
  { cat: 'Tools', icon: 'Wrench', items: ['Git', 'JIRA', 'Postman'] },
]

// ─── EDUCATION ─────────────────────────────────────────────────────────────────
export const EDUCATION = [
  {
    degree: 'Master of Science in Computer Science',
    school: 'Superior University, Lahore',
    period: 'Sep 2020 – Dec 2022',
  },
  {
    degree: 'Bachelor of Science in Computer Science',
    school: 'Virtual University of Pakistan, Lahore',
    period: 'Oct 2012 – Nov 2016',
  },
]

// ─── CERTIFICATIONS ────────────────────────────────────────────────────────────
export const CERTIFICATIONS = [
  { name: 'Creative Writing', issuer: 'Professional Certification', file: '/assets/certificates/CREATIVE WRITING.png', icon: 'PenTool' },
  { name: 'Freelancing', issuer: 'Professional Certification', file: '/assets/certificates/FREELANCING.png', icon: 'Globe' },
  { name: 'Soft Skills', issuer: 'Professional Certification', file: '/assets/certificates/SOFTSKILLS.jpeg', icon: 'MessageSquare' },
]

// ─── LANGUAGES ───────────────────────────────────────────────────────────────
export const LANGUAGES = [
  { name: 'English', level: 'Professional' },
  { name: 'Urdu', level: 'Native' },
  { name: 'Punjabi', level: 'Native' },
  { name: 'Portuguese', level: 'Basic' },
]
