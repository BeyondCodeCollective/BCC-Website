export const SITE = {
  name: "Beyond Code Collective",
  shortName: "Beyond Code",
  tagline: "For The Future",
  url: "https://www.wearebcc.org",
  donateUrl: "https://donorbox.org/beyondcodecollective",
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
    contact: "partnerships@wearebcc.org",
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
    learnMoreUrl: "https://www.youtube.com/watch?v=VroOSToSNx8",
  },
  {
    title: "After The Game",
    description:
      "A national, cohort-based workforce program for transitioning or recently retired professional and NCAA student-athletes. Bridges the digital skill divide with technical leads teaching live classes, plus wraparound support from corporate readiness to job placement.",
    contact: "partnerships@wearebcc.org",
  },
] as const;

export const PRESS_FEATURES = [
  { name: "Forbes", href: "https://www.forbes.com/sites/pauleannareid/2025/06/18/how-cristina-mancini-is-rewriting-the-future-of-tech-and-who-gets-to-code-it/" },
  { name: "CNBC", href: "https://www.cnbc.com/2025/10/24/ceo-cristina-mancini-the-no-1-trait-workers-need-for-success.html" },
  { name: "Essence", href: "https://www.essence.com/news/money-career/the-future-of-tech-depends-on-whos-coding-it/" },
  { name: "Fast Company", href: "https://www.fastcompany.com/user/cristinamancini" },
  { name: "Mashable", href: "https://mashable.com/article/black-girls-who-code-representation" },
  { name: "Black Enterprise", href: "https://www.blackenterprise.com/black-girls-code-ceo-sponsor-mentor-tech/" },
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
  info: "info@wearebcc.org",
  partnerships: "partnerships@wearebcc.org",
} as const;

export const RESOURCES = [
  {
    title: "Beyond Code Collective One-Pager",
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
    type: "LINK" as const,
    href: "https://www.flipsnack.com/5AA5E76F8D6/beyondcode",
    external: true as const,
  },
] as const;

export const FEATURED_VIDEO = {
  title: "The Future Is All Of Ours",
  embedUrl: "https://www.youtube.com/embed/-JEj-7AS7Kc",
  thumbnailUrl: "/images/video-thumbnail.jpg",
} as const;

export const FOUNDER = {
  name: "Cristina Mancini",
  title: "Founder & CEO",
  bio: "Cristina Mancini is the visionary Founder & CEO of Beyond Code Collective (BCC), a new national ecosystem built to close the AI literacy gap and unlock digital dignity for communities long excluded from the future of work. She created BCC to answer a transformative question: What if every community had permanent, culturally grounded access to the skills and pathways that define the next decade of innovation and the future of work?",
  quote:
    '"I want people to know that tech is for everyone, and it doesn\'t matter how old you are or where you are in life. This is an incredible moment in time where you can opt in and affect change at great scale, so there\'s no wrong answer to how you start. Just start."',
  quoteAttribution: "Cristina Mancini For Forbes",
} as const;
