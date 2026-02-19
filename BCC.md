# BCC.md — Beyond Code Collective Project Bible

> This document is the single source of truth for the BCC website and career quiz. It captures every brand decision, technical pattern, safety measure, and institutional detail accumulated during development. If you're new to this project — human or AI — start here.

---

## Mission

Close the AI literacy gap and unlock digital dignity for communities long excluded from the future of work.

BCC is intergenerational by design: ages 7 to 107. Students, career changers, parents, educators, and seniors. English and Spanish speaking. Operating across the United States and Puerto Rico with hub locations planned. The website and quiz reflect all of this — bilingual from day one, split into youth (7-17) and adult (18+) tracks, with safety and legal protections appropriate for working with minors.

**Full name:** Beyond Code Collective
**Short name (after first reference):** Beyond Code
**Site:** [wearebcc.org](https://wearebcc.org)
**Brand designed by:** BASIC/DEPT (2026)

---

## People

| Name | Role |
|------|------|
| **Cristina Mancini** | Founder & CEO of both BCC and Black Girls Code |
| **Fonz Morris** | Lead developer, product architect |
| **Kennedy Sermon** | Team coordinator |
| **Shannan McMillan-Gibbs** | Legal, privacy policy, terms of use coordination |

---

## Brand System

### Colors

| Token | Hex | Tailwind Class | Role |
|-------|-----|----------------|------|
| Cobalt Blue | `#1D59FF` | `bg-cobalt` / `text-cobalt` | Primary brand, backgrounds, links, accents |
| Electric Green | `#E5F701` | `bg-electric-green` / `text-electric-green` | CTAs, highlights, active states, surprise moments |
| True Black | `#000000` | `bg-true-black` / `text-true-black` | Headlines, section backgrounds |
| Off White | `#FFFDF7` | `bg-off-white` / `text-off-white` | Page backgrounds, text on dark |
| Dark Cobalt | `#012966` | `bg-dark-cobalt` | Secondary section backgrounds |
| Forest Green | `#193F0F` | `bg-forest-green` | Resources section background |
| Orange | `#FF4C00` | `bg-orange` | Career card accent (Connector, Builder, Analyst) |
| Charcoal | `#2F2F2F` | `bg-charcoal` | Dark UI elements, input backgrounds |
| Grey 1 | `#ECECEC` | `bg-grey-1` | Light backgrounds, input fills |
| Grey 2 | `#D8D8D8` | `bg-grey-2` | Borders, dividers |
| Grey 3 | `#646464` | `bg-grey-3` | Secondary text, captions |

**Section rhythm:** Black > Off White > Cobalt Blue > Black > Forest Green > Dark Cobalt > Electric Green > Black

### Typography

| Role | Font | Rules |
|------|------|-------|
| Headlines | Special Gothic Condensed One | ALL CAPS, -2% tracking (`letter-spacing: -0.02em`), tight leading (0.85-0.9) |
| Body | GT America Standard Regular | -1% tracking, normal casing |
| Captions / Labels | Space Mono | ALL CAPS, -1% tracking, monospaced, bracket notation |

**Font files** (self-hosted in `public/fonts/`):
- `SpecialGothicCondensedOne-Regular.ttf`
- `GT-America-Standard-Regular.ttf`
- Space Mono loaded via `next/font/google`

**CSS variables:**
- `--font-heading` / `.font-heading`
- `--font-body` (default)
- `--font-mono` / `.font-mono`

### Voice Rules

**Tone:** Bold, direct, warm. Not corporate, not academic, not charity-speak.

**Red zones — NEVER use:**
- "diversity" / "diverse"
- "empower" / "empowerment"
- Gender-specific language
- "multiculturalism"
- Rags-to-riches framing
- "programs" (use **"initiatives"** instead)

**First reference:** "Beyond Code Collective" — **subsequent:** "Beyond Code"

### Design Language Signatures

- **Bracket notation:** `[01]`, `[ THE CODE ]`, `[ Lawyer > Dev ]`
- **Person attribution:** `// NAME //` with `< CITY, STATE >`
- **Section labels:** Numbered with SectionLabel component `[01] OF [06]`
- **Phosphor Icons:** Bold weight for UI, Regular for inline. Never use emoji as icons.
- **8-bit / pixel art:** SVG illustrations (part of brand identity)

---

## Tech Stack

```
Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
Framer Motion (animations)
Phosphor Icons (@phosphor-icons/react)
next-intl (i18n — English / Spanish)
Anthropic Claude SDK (quiz AI chat)
Resend (email delivery + audience management)
Vercel (hosting + analytics)
```

### Environment Variables

| Variable | Purpose | Required |
|----------|---------|----------|
| `ANTHROPIC_API_KEY` | Powers the quiz AI career guide chat | Yes |
| `RESEND_API_KEY` | Email audience management + transactional email | Yes |
| `RESEND_AUDIENCE_ID` | Resend audience ID to add quiz/newsletter contacts to | Yes |
| `RESEND_FROM_EMAIL` | From address for results emails (e.g. `BCC Career Quiz <quiz@wearebcc.org>`) | Recommended (falls back to `onboarding@resend.dev`) |

---

## Bilingual by Design (i18n)

BCC serves communities where English and Spanish are both primary languages. Bilingual support is not a translation layer added after the fact — it was built into the architecture from the start. Every screen, every disclaimer, every quiz question, every safety measure, and every results email exists in both languages. This includes the AI career guide chat, which responds in the user's selected locale.

The site also serves an intergenerational audience. The quiz splits into two tracks at entry: ages 7-17 (youth) and 18+ (adults). Each track gets age-appropriate course recommendations, different AI chat behavior, and different safety framing. The youth track includes parental guidance notices and age-appropriate language throughout. This is foundational to how BCC operates — not a feature toggle, but a core design principle.

**Supported locales:** English (`en`), Spanish (`es`)

**URL structure:**
```
/en          — English landing page
/es          — Spanish landing page
/en/quiz     — English quiz (v1, aspirational courses)
/en/quiz-v2  — English quiz (v2, real BCC catalog courses)
/es/quiz     — Spanish quiz
/es/quiz-v2  — Spanish quiz v2
```

**Translation namespaces** (in `src/messages/{locale}/`):
- `common.json` — nav, footer, newsletter, form labels, audience segments
- `landing.json` — all landing page section copy
- `quiz.json` — quiz v1 (placeholder courses)
- `quiz-v2.json` — quiz v2 (real BCC courses)

**Language toggle:** EN/ES pill in the nav bar. Electric Green active state. Visible on both desktop and mobile (not hidden in hamburger). Uses `GlobeSimple` Phosphor icon.

---

## Landing Page Architecture

### Section Order

| # | Component | Background | ID |
|---|-----------|------------|-----|
| — | `<Nav />` | Transparent > off-white on scroll | — |
| 1 | `<Hero />` | True Black | — |
| 2 | `<About />` | Off White | `#about` |
| 3 | `<Testimonials />` | Off White | — |
| 4 | `<Audience />` | Off White | — |
| 5 | `<Stats />` | True Black | — |
| 6 | `<Initiatives />` | Cobalt Blue | `#initiatives` |
| 7 | `<Founder />` | True Black | `#founder` |
| 8 | `<Resources />` | Forest Green | `#resources` |
| 9 | `<CTABridge />` | Dark Cobalt | `#partners` |
| 10 | `<GetInvolved />` | Electric Green | `#get-involved` |
| 11 | `<Footer />` | True Black | — |

### Signature Interactions

- **Hero shuffle text:** "EVERYONE" scrambles letter-by-letter, then cycles through "BUILDS.", "GROWS.", "LEARNS.", "LEADS." every 15 seconds
- **Hero photo viewer:** 7 community thumbnails control the main hero image. Clicking a thumbnail swaps with AnimatePresence. Counter shows `[01] OF [07]`
- **Floating face photos:** 12 portraits float with ambient animation (opacity pulses, subtle y/x drift)
- **Stats counter:** Numbers animate up from 0 when scrolled into view
- **Testimonials carousel:** AnimatePresence fade transitions with prev/next arrows
- **Partner logos:** CSS infinite scroll animation, pauses on hover

---

## Career Quiz System

Two versions: `/quiz` (v1 with aspirational course recommendations) and `/quiz-v2` (mapped to real BCC catalog).

### Quiz Flow
```
HomeScreen → LeadCaptureScreen → QuestionScreen (x7) → LoadingScreen (2.8s) → ResultsScreen
                  ↓ skip
              QuestionScreen →
```

### 12 Personality Types

| Key | Display Name | Career Role | Salary Range | Card Color |
|-----|-------------|-------------|-------------|------------|
| `fixer` | The Fixer | IT Support Specialist | $45k-$75k | Cobalt |
| `architect` | The Architect | Data Analyst | $55k-$95k | Cobalt |
| `connector` | The Connector | Salesforce Administrator | $60k-$105k | Orange |
| `creator` | The Creator | UX Designer | $62k-$115k | Cobalt |
| `builder` | The Builder | Entrepreneur / Freelancer | $40k-$150k | Orange |
| `maker` | The Maker | Creative Technologist* | $42k-$85k | Cobalt |
| `strategist` | The Strategist | Project Manager | $65k-$120k | Dark Cobalt |
| `guardian` | The Guardian | Cybersecurity Analyst | $70k-$130k | Cobalt |
| `analyst` | The Detective | Data Storyteller* | $58k-$105k | Orange |
| `healer` | The Healer | AI for Social Impact Specialist* | $48k-$90k | Dark Cobalt |
| `educator` | The Guide | Technical Trainer / Instructional Designer | $52k-$95k | Cobalt |
| `advocate` | The Advocate | Community Tech Coordinator | $45k-$85k | Dark Cobalt |

*V2 reframed roles (v1 had: Skilled Trades Professional, Business Intelligence Analyst, Healthcare Tech Specialist)

### Scoring

Pure frequency count. Each of the 7 questions has 6 answer choices, each mapped to a personality. User picks one per question. Highest total wins. Ties go to first in array order (fixer > architect > connector > ...).

### Question Background Themes

```
Q1: #1D59FF (Cobalt)     Q2: #FF4C00 (Orange)      Q3: #012966 (Dark Cobalt)
Q4: #E5F701 (Elec Green) Q5: #193F0F (Forest Green) Q6: #000000 (Black)
Q7: #570000 (Dark Red)
```

### V2 Course Mapping (Real BCC Catalog)

**Youth Track (7-17):**

| Personality | Recommended Courses |
|-------------|-------------------|
| Fixer | Cybersafety Workshops, Code Along Club, Scratch Workshops |
| Architect | The Happiness Code, Intro to Data Science, Python Workshops |
| Connector | Code Along Club, AI Explorers, Workshops |
| Creator | P5 JavaScript: Code Art, Scratch Animation, Digital Vision Boards with AI |
| Builder | Entrepreneurship 101, Websites for Social Innovation, Professional Website with WIX |
| Maker | VR/AR Game Design Intensive, Green Thumb Robotics, Becoming an Inventor |
| Strategist | Code Along Club, Entrepreneurship 101, Workshops |
| Guardian | Cybersafety (Ages 10-13), Cybersafety (Ages 14-18), Python Workshops |
| Detective | The Happiness Code, Intro to Data Science, Python + Tech Stats |
| Healer | AI Explorers, Coding for Change, Code Along Club |
| Guide | Code Along Club, AI Explorers, Scratch: Interactive Story |
| Advocate | Coding for Change: Activism through Animation, Code Along Club, Climate Games |

**Adult Track (18+):**

| Personality | Recommended Courses |
|-------------|-------------------|
| Fixer | CompTIA IT Fundamentals (ITF+), Workplace Fundamentals, AI Fundamentals |
| Architect | Data Science 101, Data Science 102, AI Fundamentals |
| Connector | Salesforce Administration, Zapier Fundamentals, Workplace Fundamentals |
| Creator | Figma Make Fundamentals, Webflow Fundamentals, Designing with Canva |
| Builder | AI Tools for Small Business, Digital Storytelling for Entrepreneurs, Zapier Fundamentals |
| Maker | VR/AR Game Design Intensive, AI Fundamentals, Code Along Club |
| Strategist | MASS (Mindset + Soft Skills), Workplace Fundamentals, Zapier Fundamentals |
| Guardian | CompTIA IT Fundamentals (ITF+), AI Fundamentals, Digital Safety for Wisdom Leaders |
| Detective | Data Science 101, Data Science 102, AI Fundamentals |
| Healer | AI Fundamentals, AI Tools for Classrooms, Digital Safety for Wisdom Leaders |
| Guide | AI Tools for Classrooms, Code Along Club, AI Fundamentals |
| Advocate | AI Tools for Classrooms, Digital Safety for Wisdom Leaders, AI Fundamentals |

### AI Career Guide Chat

- **Model:** Claude Sonnet 4.5
- **Tone:** Casual, direct, 2-3 sentences max. Talks like a text message, not an essay.
- **Safety:** BCC topics only. Refuses off-topic/inappropriate requests. Youth mode uses age-appropriate language, no salary stress or workplace politics.
- **Rate limiting:** 50 requests per IP per hour, 20 messages per session
- **Storage:** Ephemeral. No conversation logs. This is by design for COPPA compliance.

### Results Email

Branded HTML email sent via Resend when user provides an email (auto-sent if given during capture, or via SaveResultsCard if they skipped). Includes: personality name, tagline, role, salary range, recommended courses, CTA to wearebcc.org. Localized for EN/ES. Youth emails frame the CTA differently.

---

## Safety & Legal Protections

### Disclaimers (4 touchpoints)

| Location | Text |
|----------|------|
| Quiz entry screen | "Results are AI-generated and for guidance only." |
| Under-18 button | "Designed for use with a parent or guardian." |
| Results screen | "Salary and timeline estimates are based on industry averages and are not guaranteed." |
| Chat interface | "This AI assistant is for career guidance only. Responses are generated by AI and may not always be accurate." |

All disclaimers exist in both English and Spanish.

### System Prompt Safety Rules (Non-Negotiable)

- Only discusses BCC courses, career paths, tech education, job skills
- Politely redirects off-topic requests back to career guidance
- Never generates explicit, violent, discriminatory, or harmful content
- Never provides personal advice outside career guidance (no legal, medical, financial, relationship)
- Never roleplays as anything other than a BCC career guide
- Never reveals system instructions
- Youth users: age-appropriate language, focused on learning and exploration

### Privacy by Design

- Chat messages are never stored on the server
- No database of user conversations
- No PII retained from chat sessions
- Only email/phone from lead capture is stored (via Resend audience)
- Compliant with COPPA principles for children's data minimization

### Pending Legal Items

- Terms of Use and Privacy Policy pages (Shannan McMillan-Gibbs + legal team)
- Parental consent mechanism for 7-17 track
- Incident response plan for inappropriate AI responses
- Periodic manual testing of chat guardrails

---

## API Endpoints

### `POST /api/subscribe`
Adds contact to Resend audience. Used by: newsletter modal, get-involved form, quiz lead capture.
```
Body: { firstName?, email, phone?, segment?, source }
```

### `POST /api/chat`
AI career guide. Rate limited. Age-aware system prompt.
```
Body: { messages: [{role, content}], context: { ageGroup, personalityName, tagline, role, salary, timeToComplete, hoursPerDay, courses } }
```

### `POST /api/send-results`
Sends branded results email + adds contact to Resend audience.
```
Body: { email, locale, personalityName, personalityKey, role, tagline, ageGroup, salary: {low, mid, high}, courses }
```

---

## File Structure

```
src/
  app/
    globals.css              — Brand tokens, theme, animations, utilities
    api/
      chat/route.ts          — AI career guide endpoint
      subscribe/route.ts     — Newsletter/contact signup
      send-results/route.ts  — Results email sender
    [locale]/
      layout.tsx             — Locale-aware layout, fonts, metadata
      page.tsx               — Landing page (composes all sections)
      quiz/page.tsx          — Quiz v1 (placeholder courses)
      quiz-v2/page.tsx       — Quiz v2 (real BCC courses)
  components/
    nav.tsx                  — Sticky nav with language toggle
    hero.tsx                 — Hero with ShuffleText + photo viewer
    about.tsx                — Three pillars section
    audience.tsx             — Persona cards section
    stats.tsx                — Animated statistics
    initiatives.tsx          — The Forge, Catalysts, Code Along
    testimonials.tsx         — Carousel with AnimatePresence
    founder.tsx              — Cristina Mancini + press logos
    resources.tsx            — Video + downloads
    cta-bridge.tsx           — Partner logos + CTA
    get-involved.tsx         — Signup form
    footer.tsx               — Footer
    newsletter-modal.tsx     — Newsletter overlay + context
    quiz-modal.tsx           — Quiz navigation context
    quiz/
      SaveResultsCard.tsx    — Email capture on results page
    ui/
      logo.tsx               — BCC logo component
      section-label.tsx      — [01] bracket labels
      shuffle-text.tsx       — Character shuffle animation
      button.tsx             — Shared button/link
      brand-logos.tsx         — Partner logo data
  i18n/
    routing.ts               — Locale config (en, es)
    request.ts               — Translation loader
    navigation.ts            — Locale-aware Link, router
  lib/
    constants.ts             — All copy, links, data constants
  messages/
    en/ (common, landing, quiz, quiz-v2)
    es/ (common, landing, quiz, quiz-v2)
public/
  fonts/                     — Self-hosted brand fonts
  images/                    — All photos, logos, assets
  resources/                 — Downloadable PDFs
```

---

## Deployment

- **Platform:** Vercel
- **Auto-deploy:** Connected to GitHub repo, deploys on push to `main`
- **Analytics:** Vercel Analytics (`@vercel/analytics`)
- **Domain:** wearebcc.org (DNS points to Vercel)
- **Resend domain verification:** Required for branded `from` email address

---

## Contacts & Links

| What | Where |
|------|-------|
| Marketing | marketing@wearebcc.org |
| Partnerships | partnership@wearebcc.org |
| Donate | [Donorbox](https://donorbox.org/support-beyond-code-collective) |
| Video | [The Future Is All Of Ours](https://www.youtube.com/watch?v=-JEj-7AS7Kc) |
| Brand Flipbook | [Flipsnack](https://www.flipsnack.com/beyondcodecollective/bcc-brand-book-v2-0/full-view.html) |

### Press

Forbes, CNBC, Essence, Fast Company, Mashable, Black Enterprise — all with published articles about BCC.

---

## Known Outstanding Items

1. Privacy Policy and Terms of Use pages (pending legal)
2. Instagram and LinkedIn social links in footer (currently `href="#"`)
3. SMS/text messaging for quiz results (requires Mailchimp SMS or Twilio integration)
4. Salesforce CRM integration (log quiz leads + results into Salesforce contacts)
5. The Forge Overview PDF may not be in `public/resources/` — verify before launch
6. Spanish versions of downloadable PDFs (future deliverable)
7. Course catalog CTA URLs (currently placeholder `"/"` and `"#"`) — need real BCC enrollment links
8. Parental consent mechanism for 7-17 quiz track
9. Quiz scoring calibration: `maker` only appears in 1 of 7 questions, `connector` appears in all 7

---

## Infrastructure Handoff Checklist

When transferring this project to BCC's own accounts:

```
[ ] BCC creates GitHub org — transfer repo from youngfonz/bcc
[ ] BCC creates Vercel account — deploy from their GitHub
[ ] BCC creates Resend account — verify wearebcc.org domain, create audience
[ ] BCC creates Anthropic account — set usage limits for quiz chat
[ ] Set all env vars on their Vercel (ANTHROPIC_API_KEY, RESEND_API_KEY, RESEND_AUDIENCE_ID, RESEND_FROM_EMAIL)
[ ] Point wearebcc.org DNS to their Vercel deployment
[ ] Test full site on their infrastructure
[ ] Delete project from Fonz's Vercel
[ ] Rotate/revoke Fonz's API keys
```

**Zero vendor lock-in.** Standard Next.js. Deploys anywhere Node runs. All assets self-hosted. All data in Resend (portable) or Salesforce (their own CRM).
