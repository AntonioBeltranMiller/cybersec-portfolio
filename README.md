# Cybersecurity Portfolio — Antonio Beltran-Miller

Source for [antoniobeltranmiller.com](https://antoniobeltranmiller.com), a portfolio
of home-lab detection work, honeypot threat intelligence, and responsible bug-bounty
research. Each write-up is kept honest about what was built, what it was based on, and
what the screenshots actually show.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** for styling, **Framer Motion** for animation, **lucide-react** for icons
- Deployed on **Vercel** (pushes to `main` redeploy automatically)

## How the content is organized

Almost everything on the site is driven from a single file:

- **`lib/content.ts`** — the single source of truth: profile, projects, certifications,
  experience, skills, competencies, and the investigation write-ups. Edit the data here
  and the whole site updates. Every number in this file is meant to be backed by a
  résumé line or a screenshot in `public/images/projects/`.
- **`components/`** — the homepage sections (hero, competencies, projects, skills,
  certifications, experience) plus `ProjectView.tsx`, the shared template that renders
  each data-driven project page.
- **`app/projects/[slug]/page.tsx`** — renders most projects through `ProjectView`.
- **`app/projects/letsdefend-phishing/page.tsx`** — a deliberately standalone,
  step-through case study (the LetsDefend SOC338 Lumma Stealer investigation). It is
  excluded from the dynamic route on purpose; see the comment at the top of that file.
- **`app/blog/`** — the investigation write-ups (`/blog/[slug]`), also sourced from
  `writeups` in `lib/content.ts`.

## Projects covered

- **AI-Assisted SOC Automation Lab** — a five-VM detection and triage pipeline built from
  MyDFIR's SOC Automation 2.0 and extended: Splunk ingests Sysmon telemetry, n8n hands
  each alert to an LLM running a tier-1 prompt, and an MCP server lets that model query
  Splunk directly. Ten custom Splunk detections mapped to MITRE ATT&CK.
- **T-Pot Honeypot Threat Intelligence** — a single-host T-Pot (Standard edition) on a
  public VPS, used to practice separating commodity scanning noise from the handful of
  sources worth reporting.
- **SOC Alert: Lumma Stealer via ClickFix** — an unguided LetsDefend challenge (SOC338)
  triaged end to end, with a full Tier 1 → Tier 2 handoff brief.
- **npm Supply-Chain MITM Vulnerability** — a Bugcrowd finding escalated from P4 to P2
  with a working man-in-the-middle proof of concept.
- **Blind XSS Capture Tool** — a self-hosted callback server for authorized bug-bounty
  testing.

## Local development

```bash
git clone https://github.com/AntonioBeltranMiller/cybersec-portfolio.git
cd cybersec-portfolio
npm install
npm run dev        # http://localhost:3000
```

Type-check before committing:

```bash
npx tsc --noEmit
```

## Deployment

The project is hosted on Vercel and redeploys on every push to `main`:

```bash
git add .
git commit -m "Describe the change"
git push origin main
```

## Images

Project and certification screenshots live under `public/images/`. File names referenced
by the site are defined alongside each project in `lib/content.ts` (and in the standalone
LetsDefend page). Screenshots are sanitized before being committed — no client data, no
real internal IPs, no credentials or tokens.

## License

Personal portfolio. The code may be used as a reference; the written content, screenshots,
and résumé are not for reuse.
