<div align="center">

# Beyond Code Collective

**Close the AI literacy gap. Unlock digital dignity.**

[wearebcc.org](https://wearebcc.org)

---

English & Spanish | Ages 7 to 107 | United States & Puerto Rico

</div>

## What is BCC?

Beyond Code Collective is closing the AI literacy gap for communities long excluded from the future of work. We serve an intergenerational audience — students, career changers, parents, educators, and seniors — across the United States and Puerto Rico.

This repository is the complete website and AI-powered career quiz at [wearebcc.org](https://wearebcc.org).

## What's Inside

**Landing Page** — A single-scroll experience showcasing BCC's mission, initiatives, community stories, and calls to action. Designed by [BASIC/DEPT](https://www.basic.agency/) and built to the brand spec.

**Career Quiz** — A 7-question personality assessment that matches users to one of 12 tech career paths. Results include salary ranges, recommended BCC courses, and an AI career guide chat powered by Claude. The quiz splits into two age-appropriate tracks:

- **Youth (7-17)** — Age-appropriate language, parental guidance notices, courses like Scratch Workshops and Cybersafety
- **Adult (18+)** — Professional framing, real salary data, courses like Data Science 101 and Salesforce Administration

**Bilingual** — Every screen, disclaimer, quiz question, results email, and AI chat response exists in both English and Spanish. This isn't a translation layer — it's built into the architecture.

**Results Email** — Users receive a branded email with their full career match: personality type, ideal role, salary range, and recommended courses.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js](https://nextjs.org) 16 (App Router) + TypeScript |
| Styling | [Tailwind CSS](https://tailwindcss.com) v4 |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| Icons | [Phosphor Icons](https://phosphoricons.com) |
| Internationalization | [next-intl](https://next-intl-docs.vercel.app/) (EN / ES) |
| AI Chat | [Anthropic Claude](https://www.anthropic.com) SDK |
| Email | [Resend](https://resend.com) |
| Hosting | [Vercel](https://vercel.com) |

## Getting Started

```bash
# Install dependencies
npm install

# Set environment variables (see below)
cp .env.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Environment Variables

| Variable | Purpose |
|----------|---------|
| `ANTHROPIC_API_KEY` | Powers the AI career guide chat |
| `RESEND_API_KEY` | Email delivery and audience management |
| `RESEND_AUDIENCE_ID` | Resend audience for quiz and newsletter contacts |
| `RESEND_FROM_EMAIL` | From address for results emails |

## Project Documentation

For a comprehensive guide to the brand system, voice rules, quiz logic, course mappings, safety measures, and infrastructure — see **[BCC.md](./BCC.md)**.

This is the project bible. If you're new to the codebase — human or AI — start there.

## Safety

This project serves minors. Safety measures include:

- AI chat restricted to BCC career topics only (system prompt hardened)
- Rate limiting on all API endpoints
- Disclaimers at 4 touchpoints in both languages
- No chat logs stored (COPPA-compliant data minimization)
- Age-appropriate content for youth track

## Brand

| | |
|---|---|
| **Colors** | Cobalt Blue `#1D59FF` / Electric Green `#E5F701` / True Black `#000` / Off White `#FFFDF7` |
| **Headlines** | Special Gothic Condensed One (ALL CAPS, tight tracking) |
| **Body** | GT America Standard Regular |
| **Captions** | Space Mono |
| **Designed by** | [BASIC/DEPT](https://www.basic.agency/) (2026) |

## Team

| Name | Role |
|------|------|
| **Cristina Mancini** | Founder & CEO |
| **Fonz Morris** | Lead Developer, Product Architect |
| **Kennedy Sermon** | Team Coordinator |
| **Shannan McMillan-Gibbs** | Legal |

## License

Private repository. All rights reserved by Beyond Code Collective.

---

<div align="center">

**Beyond Code Collective** | [wearebcc.org](https://wearebcc.org) | [Donate](https://donorbox.org/support-beyond-code-collective)

*The future is all of ours.*

</div>
