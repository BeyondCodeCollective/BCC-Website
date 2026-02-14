export const SITE = {
  name: "Beyond Code Collective",
  shortName: "Beyond Code",
  tagline: "For The Future",
  url: "https://www.wearebcc.org",
  donateUrl: "https://donorbox.org/beyond-code-collective",
} as const;

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Initiatives", href: "#initiatives" },
  { label: "Partners", href: "#partners" },
  { label: "Resources", href: "#resources" },
  { label: "Get Involved", href: "#get-involved" },
] as const;

export const PILLARS = [
  {
    title: "Intergenerational Equity",
    description:
      "An ecosystem where all generations participate; not a pipeline that serves one age group, but a model that meets learners wherever they are in life.",
  },
  {
    title: "All Technologies",
    description:
      "From digital fluency and data literacy to automation, cybersecurity, and responsible AI, we prepare learners for the full range of tools they'll encounter.",
  },
  {
    title: "Today & Tomorrow",
    description:
      "Programming that keeps communities relevant now and ready for what's next, as the workforce changes in real time.",
  },
] as const;

export const INITIATIVES = [
  {
    title: "The Forge",
    description:
      "Place-based hubs blending tech education, workforce development, and community engagement for learners of all ages — from K-12 to adults looking to upskill or pivot into tech careers.",
    contact: "partnership@wearebcc.org",
    quizUrl: "https://bcc-guidance-quiz.vercel.app/",
  },
  {
    title: "Beyond Code Catalysts",
    description:
      "Career pathways for 18+ learners combining accessible training, hands-on projects, and career readiness support. No traditional tech background required.",
    contact: "programs@wearebcc.org",
  },
  {
    title: "Code Along",
    description:
      "A free video coding academy with step-by-step tutorials, making tech education accessible to everyone through digital how-to learning.",
    contact: "marketing@wearebcc.org",
  },
  {
    title: "After The Game",
    description:
      "A cohort-based workforce initiative for transitioning and recently retired professional athletes, with structured support for designing a second career in tech.",
    contact: "programs@wearebcc.org",
  },
] as const;

export const PRESS_LOGOS = [
  "Forbes",
  "CNBC",
  "Essence",
  "Fast Company",
  "Mashable",
  "Black Enterprise",
] as const;

export const PARTNERS = [
  "IF/THEN",
  "NextEra Energy",
  "Zapier",
  "ATDC Georgia Tech",
  "Spelman College",
  "Serpentine",
] as const;

export const AUDIENCE_SEGMENTS = [
  "Student (7-17)",
  "Learner (18+)",
  "Parent / Family",
  "Career Changer",
  "Employer",
  "Partner / Donor",
] as const;

export const CONTACT = {
  general: "mica@wearebcc.org",
  marketing: "marketing@wearebcc.org",
  partnerships: "partnership@wearebcc.org",
} as const;

export const RESOURCES = [
  {
    title: "BCC One-Pager",
    description:
      "An overview of Beyond Code Collective — mission, initiatives, and how to get involved.",
    type: "PDF" as const,
    href: "/resources/bcc-one-pager.pdf",
  },
  {
    title: "The Forge Overview",
    description:
      "Details on our place-based tech hubs blending education, workforce development, and community engagement.",
    type: "PDF" as const,
    href: "/resources/the-forge-overview.pdf",
  },
  {
    title: "Brand Flipbook",
    description:
      "Our visual identity, brand story, and the design language behind Beyond Code Collective.",
    type: "PDF" as const,
    href: "/resources/bcc-brand-flipbook.pdf",
  },
  {
    title: "After The Game Brief",
    description:
      "A cohort-based initiative helping professional athletes transition into tech careers.",
    type: "PDF" as const,
    href: "/resources/after-the-game-brief.pdf",
  },
] as const;

export const FEATURED_VIDEO = {
  title: "The Future Is All Of Ours",
  embedUrl: "https://www.youtube.com/embed/-JEj-7AS7Kc",
  thumbnailUrl:
    "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=800&h=450&fit=crop",
} as const;

export const FOUNDER = {
  name: "Cristina Mancini",
  title: "Founder & CEO",
  bio: "Cristina Mancini is the visionary Founder & CEO of Beyond Code Collective (BCC), a new national ecosystem built to close the AI literacy gap and unlock digital dignity for communities long excluded from the future of work. She created BCC to answer a transformative question: What if every community had permanent, culturally grounded access to the skills and pathways that define the next decade of innovation and the future of work?",
  quote:
    '"I want people to know that tech is for everyone, and it doesn\'t matter how old you are or where you are in life. This is an incredible moment in time where you can opt in and affect change at great scale, so there\'s no wrong answer to how you start. Just start."',
  quoteAttribution: "Cristina Mancini For Forbes",
} as const;
