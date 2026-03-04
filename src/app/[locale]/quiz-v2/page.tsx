"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import SaveResultsCard from "@/components/quiz/SaveResultsCard";
import { generateSessionId, trackEvent } from "@/lib/analytics";
import {
  Wrench,
  ChartBar,
  Lightning,
  Sparkle,
  Lightbulb,
  Hammer,
  Target,
  Shield,
  MagnifyingGlass,
  Heart,
  Star,
  HandFist,
  Backpack,
  Rocket,
  Envelope,
  Compass,
  Lock,
  Desktop,
  ChartLineUp,
  Confetti,
  GraduationCap,
  HeartBreak,
  EyeSlash,
  Prohibit,
  PaintBrush,
  Warning,
  Fire,
  Clipboard,
  Handshake,
  Books,
  Brain,
  Eye,
  Smiley,
  Palette,
  Moon,
  ChatCircle,
  DeviceMobile,
  HandWaving,
  FingerprintSimple,
  Check,
} from "@phosphor-icons/react";

// ============================================
// TYPES
// ============================================

type AgeGroup = "under18" | "18plus" | null;
type Screen = "home" | "capture" | "quiz" | "loading" | "results";
type PersonalityKey =
  | "fixer"
  | "architect"
  | "connector"
  | "creator"
  | "builder"
  | "maker"
  | "strategist"
  | "guardian"
  | "analyst"
  | "healer"
  | "educator"
  | "advocate";

// ============================================
// BACKGROUND IMAGES
// ============================================

const backgrounds = {
  hero: "/images/quiz/hero-home.jpg",
  q1: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1920&q=80",
  q2: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80",
  q3: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80",
  q4: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&q=80",
  q5: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1920&q=80",
  results: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&q=80",
};

// ============================================
// ICON COMPONENT FOR CAREER TYPES
// ============================================

function CareerIcon({ type, size = 32, className = "" }: { type: PersonalityKey; size?: number; className?: string }) {
  const props = { size, weight: "bold" as const, className };
  switch (type) {
    case "fixer": return <Wrench {...props} />;
    case "architect": return <ChartBar {...props} />;
    case "connector": return <Lightning {...props} />;
    case "creator": return <Sparkle {...props} />;
    case "builder": return <Lightbulb {...props} />;
    case "maker": return <Hammer {...props} />;
    case "strategist": return <Target {...props} />;
    case "guardian": return <Shield {...props} />;
    case "analyst": return <MagnifyingGlass {...props} />;
    case "healer": return <Heart {...props} />;
    case "educator": return <Star {...props} />;
    case "advocate": return <HandFist {...props} />;
  }
}

// ============================================
// NON-TRANSLATABLE CAREER METADATA
// ============================================

const careerMeta: Record<PersonalityKey, {
  salary: { low: number; mid: number; high: number };
  timeToComplete: Record<number, number>;
  personality: PersonalityKey;
  color: string;
  forYouth: { ctaUrl: string };
  forAdult: { ctaUrl: string };
}> = {
  fixer: { salary: { low: 45000, mid: 58000, high: 75000 }, timeToComplete: { 2: 8, 4: 4, 6: 3 }, personality: "fixer", color: "#1D59FF", forYouth: { ctaUrl: "/" }, forAdult: { ctaUrl: "#" } },
  architect: { salary: { low: 55000, mid: 75000, high: 95000 }, timeToComplete: { 2: 10, 4: 5, 6: 4 }, personality: "architect", color: "#1D59FF", forYouth: { ctaUrl: "/" }, forAdult: { ctaUrl: "#" } },
  connector: { salary: { low: 60000, mid: 81000, high: 105000 }, timeToComplete: { 2: 7, 4: 4, 6: 3 }, personality: "connector", color: "#FF4C00", forYouth: { ctaUrl: "/" }, forAdult: { ctaUrl: "#" } },
  creator: { salary: { low: 62000, mid: 85000, high: 115000 }, timeToComplete: { 2: 9, 4: 5, 6: 3 }, personality: "creator", color: "#1D59FF", forYouth: { ctaUrl: "/" }, forAdult: { ctaUrl: "#" } },
  builder: { salary: { low: 40000, mid: 75000, high: 150000 }, timeToComplete: { 2: 6, 4: 3, 6: 2 }, personality: "builder", color: "#FF4C00", forYouth: { ctaUrl: "/" }, forAdult: { ctaUrl: "#" } },
  maker: { salary: { low: 42000, mid: 58000, high: 85000 }, timeToComplete: { 2: 12, 4: 6, 6: 4 }, personality: "maker", color: "#1D59FF", forYouth: { ctaUrl: "/" }, forAdult: { ctaUrl: "#" } },
  strategist: { salary: { low: 65000, mid: 88000, high: 120000 }, timeToComplete: { 2: 8, 4: 4, 6: 3 }, personality: "strategist", color: "#012966", forYouth: { ctaUrl: "/" }, forAdult: { ctaUrl: "#" } },
  guardian: { salary: { low: 70000, mid: 95000, high: 130000 }, timeToComplete: { 2: 10, 4: 5, 6: 4 }, personality: "guardian", color: "#1D59FF", forYouth: { ctaUrl: "/" }, forAdult: { ctaUrl: "#" } },
  analyst: { salary: { low: 58000, mid: 78000, high: 105000 }, timeToComplete: { 2: 9, 4: 5, 6: 3 }, personality: "analyst", color: "#FF4C00", forYouth: { ctaUrl: "/" }, forAdult: { ctaUrl: "#" } },
  healer: { salary: { low: 48000, mid: 65000, high: 90000 }, timeToComplete: { 2: 10, 4: 5, 6: 4 }, personality: "healer", color: "#012966", forYouth: { ctaUrl: "/" }, forAdult: { ctaUrl: "#" } },
  educator: { salary: { low: 52000, mid: 72000, high: 95000 }, timeToComplete: { 2: 8, 4: 4, 6: 3 }, personality: "educator", color: "#1D59FF", forYouth: { ctaUrl: "/" }, forAdult: { ctaUrl: "#" } },
  advocate: { salary: { low: 45000, mid: 62000, high: 85000 }, timeToComplete: { 2: 6, 4: 3, 6: 2 }, personality: "advocate", color: "#012966", forYouth: { ctaUrl: "/" }, forAdult: { ctaUrl: "#" } },
};

// ============================================
// ANSWER ICON COMPONENT
// ============================================

function AnswerIcon({ name, size = 28, className = "" }: { name: string; size?: number; className?: string }) {
  const props = { size, weight: "bold" as const, className };
  const icons: Record<string, React.ReactNode> = {
    wrench: <Wrench {...props} />,
    "magnifying-glass": <MagnifyingGlass {...props} />,
    "device-mobile": <DeviceMobile {...props} />,
    target: <Target {...props} />,
    shield: <Shield {...props} />,
    star: <Star {...props} />,
    desktop: <Desktop {...props} />,
    "chart-line-up": <ChartLineUp {...props} />,
    party: <Confetti {...props} />,
    rocket: <Rocket {...props} />,
    "hand-fist": <HandFist {...props} />,
    "graduation-cap": <GraduationCap {...props} />,
    "heart-break": <HeartBreak {...props} />,
    "eye-slash": <EyeSlash {...props} />,
    prohibit: <Prohibit {...props} />,
    "paint-brush": <PaintBrush {...props} />,
    warning: <Warning {...props} />,
    fire: <Fire {...props} />,
    lightning: <Lightning {...props} />,
    clipboard: <Clipboard {...props} />,
    handshake: <Handshake {...props} />,
    sparkle: <Sparkle {...props} />,
    books: <Books {...props} />,
    heart: <Heart {...props} />,
    brain: <Brain {...props} />,
    eye: <Eye {...props} />,
    "user-circle": <Smiley {...props} />,
    smiley: <Smiley {...props} />,
    lightbulb: <Lightbulb {...props} />,
    palette: <Palette {...props} />,
    moon: <Moon {...props} />,
    "chat-circle": <ChatCircle {...props} />,
    hammer: <Hammer {...props} />,
    "hand-waving": <HandWaving {...props} />,
    "fingerprint-simple": <FingerprintSimple {...props} />,
    "chart-bar": <ChartBar {...props} />,
  };
  return <>{icons[name] || <Sparkle {...props} />}</>;
}

// ============================================
// NON-TRANSLATABLE QUESTION METADATA
// ============================================

interface AnswerMeta {
  icon: string;
  personality: PersonalityKey;
}

interface QuestionMeta {
  background: string;
  answers: AnswerMeta[];
}

const questionMeta: QuestionMeta[] = [
  {
    background: backgrounds.q1,
    answers: [
      { icon: "wrench", personality: "fixer" },
      { icon: "magnifying-glass", personality: "analyst" },
      { icon: "device-mobile", personality: "connector" },
      { icon: "target", personality: "strategist" },
      { icon: "shield", personality: "guardian" },
      { icon: "star", personality: "educator" },
    ],
  },
  {
    background: backgrounds.q2,
    answers: [
      { icon: "desktop", personality: "fixer" },
      { icon: "chart-line-up", personality: "architect" },
      { icon: "party", personality: "connector" },
      { icon: "rocket", personality: "builder" },
      { icon: "hand-fist", personality: "advocate" },
      { icon: "graduation-cap", personality: "educator" },
    ],
  },
  {
    background: backgrounds.q3,
    answers: [
      { icon: "heart-break", personality: "fixer" },
      { icon: "eye-slash", personality: "analyst" },
      { icon: "prohibit", personality: "connector" },
      { icon: "paint-brush", personality: "creator" },
      { icon: "warning", personality: "guardian" },
      { icon: "fire", personality: "advocate" },
    ],
  },
  {
    background: backgrounds.q4,
    answers: [
      { icon: "lightning", personality: "maker" },
      { icon: "clipboard", personality: "strategist" },
      { icon: "handshake", personality: "connector" },
      { icon: "sparkle", personality: "creator" },
      { icon: "books", personality: "analyst" },
      { icon: "heart", personality: "healer" },
    ],
  },
  {
    background: backgrounds.q5,
    answers: [
      { icon: "brain", personality: "analyst" },
      { icon: "moon", personality: "strategist" },
      { icon: "chat-circle", personality: "connector" },
      { icon: "palette", personality: "creator" },
      { icon: "shield", personality: "guardian" },
      { icon: "heart", personality: "advocate" },
    ],
  },
  {
    background: backgrounds.q1,
    answers: [
      { icon: "brain", personality: "fixer" },
      { icon: "eye", personality: "architect" },
      { icon: "handshake", personality: "connector" },
      { icon: "smiley", personality: "creator" },
      { icon: "lightbulb", personality: "builder" },
      { icon: "star", personality: "educator" },
    ],
  },
  {
    background: backgrounds.q2,
    answers: [
      { icon: "hand-waving", personality: "fixer" },
      { icon: "eye", personality: "architect" },
      { icon: "fingerprint-simple", personality: "connector" },
      { icon: "sparkle", personality: "creator" },
      { icon: "shield", personality: "guardian" },
      { icon: "heart", personality: "healer" },
    ],
  },
];

// ============================================
// COMPONENTS
// ============================================

function HomeScreen({ onSelectAge }: { onSelectAge: (age: AgeGroup) => void }) {
  const t = useTranslations("quiz-v2");

  return (
    <div className="h-[100dvh] flex">
      <div className="w-full lg:w-1/2 h-full bg-cobalt flex flex-col">
        <header className="flex items-center justify-between px-4 md:px-12 py-6 md:py-8 safe-top">
          <div className="font-heading text-off-white text-sm md:text-base tracking-tight">{t("home.brand")}</div>
          <Link href="/" className="text-off-white/80 text-sm hover:text-off-white transition-colors" style={{ fontFamily: "var(--font-mono)" }}>
            {t("home.backToHome")}
          </Link>
        </header>

        <div className="flex-1 flex items-center px-4 md:px-12 lg:px-16 pb-6">
          <div className="w-full max-w-xl fade-in">
            <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl text-off-white mb-4 md:mb-6 leading-[0.9]">
              {t("home.headline1")}<br />
              <span className="text-off-white">{t("home.headline2")}</span>
            </h1>

            <p className="text-base md:text-xl text-off-white/70 mb-6 md:mb-12 leading-relaxed">
              {t("home.description")}
            </p>

            <p className="text-off-white/50 text-xs md:text-sm mb-4 md:mb-6" style={{ fontFamily: "var(--font-mono)" }}>{t("home.journeyLabel")}</p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <button
                onClick={() => onSelectAge("under18")}
                className="group bg-charcoal border-2 border-off-white/20 px-5 py-5 text-left transition-all hover:border-off-white active:scale-[0.98] md:hover:scale-[1.02] flex-1 focus:outline-none focus:ring-2 focus:ring-cobalt focus:ring-offset-2 focus:ring-offset-true-black"
                aria-label={t("home.under18Title")}
              >
                <div className="text-electric-green mb-2" aria-hidden="true"><Backpack size={28} weight="bold" /></div>
                <div className="text-lg font-semibold text-off-white mb-1">{t("home.under18Title")}</div>
                <div className="text-off-white/60 text-sm">{t("home.under18Desc")}</div>
                <div className="text-off-white/40 text-[10px] mt-2" style={{ fontFamily: "var(--font-mono)" }}>{t("home.parentalNote")}</div>
              </button>

              <button
                onClick={() => onSelectAge("18plus")}
                className="group bg-charcoal border-2 border-off-white/20 px-5 py-5 text-left transition-all hover:border-off-white active:scale-[0.98] md:hover:scale-[1.02] flex-1 focus:outline-none focus:ring-2 focus:ring-cobalt focus:ring-offset-2 focus:ring-offset-true-black"
                aria-label={t("home.over18Title")}
              >
                <div className="text-electric-green mb-2" aria-hidden="true"><Rocket size={28} weight="bold" /></div>
                <div className="text-lg font-semibold text-off-white mb-1">{t("home.over18Title")}</div>
                <div className="text-off-white/60 text-sm">{t("home.over18Desc")}</div>
              </button>
            </div>

            <p className="mt-6 md:mt-10 text-off-white/50 text-xs md:text-sm" style={{ fontFamily: "var(--font-mono)" }}>{t("home.meta")}</p>
            <p className="mt-3 text-off-white/30 text-[10px] md:text-[11px] leading-tight" style={{ fontFamily: "var(--font-mono)" }}>{t("home.disclaimer")}</p>
          </div>
        </div>
      </div>

      <div className="hidden lg:block w-1/2 h-full relative border-l-2 border-off-white/20">
        <Image src={backgrounds.hero} alt="" fill className="object-cover" priority />
      </div>
    </div>
  );
}

function LeadCaptureScreen({
  onSubmit,
  onSkip
}: {
  onSubmit: (contact: { type: 'email' | 'phone'; value: string }) => void;
  onSkip: () => void;
}) {
  const t = useTranslations("quiz-v2");
  const [contactType, setContactType] = useState<'email' | 'phone'>('email');
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(false);

  const validateInput = (input: string, type: 'email' | 'phone') => {
    if (type === 'email') {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
    } else {
      return /^[\d\s\-\+\(\)]{10,}$/.test(input.replace(/\s/g, ''));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    setIsValid(validateInput(newValue, contactType));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onSubmit({ type: contactType, value });
    }
  };

  return (
    <div className="h-[100dvh] flex">
      <div className="w-full lg:w-1/2 h-full bg-cobalt flex flex-col">
        <header className="flex items-center justify-between px-4 md:px-12 py-6 md:py-8 safe-top">
          <div className="font-heading text-off-white text-sm md:text-base tracking-tight">{t("capture.brand")}</div>
        </header>

        <div className="flex-1 flex items-center px-4 md:px-12 lg:px-16 pb-6">
          <div className="w-full max-w-xl fade-in">
            <div className="text-off-white mb-4 md:mb-6"><Envelope size={48} weight="bold" /></div>
            <h1 className="font-heading text-2xl md:text-4xl text-off-white mb-3 md:mb-4 leading-[0.9]">
              {t("capture.headline")}
            </h1>
            <p className="text-base md:text-lg text-off-white/70 mb-6 md:mb-8 leading-relaxed">
              {t("capture.description")}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="flex bg-off-white/10 p-1 border border-off-white/20 w-fit">
                <button
                  type="button"
                  onClick={() => { setContactType('email'); setValue(''); setIsValid(false); }}
                  className={`px-5 py-2 text-base font-medium transition-all ${
                    contactType === 'email'
                      ? 'bg-off-white text-cobalt'
                      : 'text-off-white/60 hover:text-off-white'
                  }`}
                >
                  {t("capture.email")}
                </button>
                <button
                  type="button"
                  onClick={() => { setContactType('phone'); setValue(''); setIsValid(false); }}
                  className={`px-5 py-2 text-base font-medium transition-all ${
                    contactType === 'phone'
                      ? 'bg-off-white text-cobalt'
                      : 'text-off-white/60 hover:text-off-white'
                  }`}
                >
                  {t("capture.phone")}
                </button>
              </div>

              <div className="relative">
                <input
                  type={contactType === 'email' ? 'email' : 'tel'}
                  value={value}
                  onChange={handleChange}
                  placeholder={contactType === 'email' ? t("capture.emailPlaceholder") : t("capture.phonePlaceholder")}
                  className="w-full bg-white text-true-black placeholder-grey-3 px-5 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-electric-green border-0"
                  autoFocus
                />
                {isValid && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-cobalt">
                    <Check size={24} weight="bold" />
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={!isValid}
                className={`w-full py-4 text-lg font-bold transition-all ${
                  isValid
                    ? 'bg-electric-green text-true-black active:bg-electric-green/80 md:hover:bg-electric-green/80 md:hover:scale-[1.02]'
                    : 'bg-off-white/10 text-off-white/30 cursor-not-allowed'
                }`}
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {t("capture.submit")} &rarr;
              </button>
            </form>

            <button
              onClick={onSkip}
              className="mt-4 md:mt-6 text-off-white/50 hover:text-off-white text-sm transition-colors"
            >
              {t("capture.skip")}
            </button>

            <p className="mt-6 md:mt-8 text-off-white/40 text-xs flex items-center gap-2" style={{ fontFamily: "var(--font-mono)" }}>
              <Lock size={14} weight="bold" /> {t("capture.privacy")}
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:block w-1/2 h-full relative border-l-2 border-cobalt/20">
        <Image src={backgrounds.hero} alt="" fill className="object-cover" />
      </div>
    </div>
  );
}

function LoadingScreen({ personalityKey }: { personalityKey: PersonalityKey }) {
  const t = useTranslations("quiz-v2");
  const [stage, setStage] = useState(0);

  const stages: string[] = [];
  let si = 0;
  while (t.has(`loading.stages.${si}`)) {
    stages.push(t(`loading.stages.${si}`));
    si++;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setStage(prev => (prev < stages.length - 1 ? prev + 1 : prev));
    }, 600);
    return () => clearInterval(interval);
  }, [stages.length]);

  return (
    <div className="h-[100dvh] bg-cobalt flex items-center justify-center px-4">
      <div className="text-center fade-in">
        <div
          className="flex justify-center mb-6 md:mb-8 animate-bounce text-off-white"
          style={{ animationDuration: '1s' }}
          aria-label={`${t(`careers.${personalityKey}.name`)} icon`}
        >
          <CareerIcon type={personalityKey} size={64} />
        </div>
        <div className="space-y-2 md:space-y-3" role="status" aria-live="polite">
          {stages.map((text, i) => (
            <p
              key={text}
              className={`text-base md:text-lg transition-all duration-300 ${
                i <= stage
                  ? 'text-off-white opacity-100'
                  : 'text-off-white/30'
              }`}
            >
              {i < stage && <span className="text-off-white mr-2" aria-hidden="true"><Check size={16} weight="bold" className="inline" /></span>}
              {i === stage && <span className="text-off-white mr-2" aria-hidden="true">&#9679;</span>}
              {text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function QuestionScreen({
  questionIndex,
  totalQuestions,
  onAnswer,
}: {
  questionIndex: number;
  totalQuestions: number;
  onAnswer: (personality: PersonalityKey) => void;
}) {
  const t = useTranslations("quiz-v2");
  const [selected, setSelected] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const meta = questionMeta[questionIndex];

  const handleSelect = (index: number, personality: PersonalityKey) => {
    setSelected(index);
    setTimeout(() => onAnswer(personality), 400);
  };

  const QUESTION_THEMES = [
    { bg: "#1D59FF", isLight: false },
    { bg: "#FF4C00", isLight: false },
    { bg: "#012966", isLight: false },
    { bg: "#E5F701", isLight: true },
    { bg: "#193F0F", isLight: false },
    { bg: "#000000", isLight: false },
    { bg: "#570000", isLight: false },
  ];
  const theme = QUESTION_THEMES[questionIndex % QUESTION_THEMES.length];
  const currentColor = theme.bg;
  const isLight = theme.isLight;

  return (
    <div className="relative h-[100dvh] overflow-hidden">
      <div className="absolute inset-0" style={{ backgroundColor: currentColor }} />

      <div className="absolute top-0 left-0 right-0 z-50 safe-top">
        <div className={`h-1 ${isLight ? 'bg-true-black/10' : 'bg-off-white/10'}`}>
          <div
            className={`h-full ${isLight ? 'bg-cobalt' : 'bg-electric-green'} transition-all duration-700 ease-out`}
            style={{ width: `${((questionIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
        <div className="flex justify-center gap-1.5 mt-3 md:mt-6">
          {Array.from({ length: totalQuestions }).map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 md:w-2 md:h-2 transition-all duration-300 ${
                i < questionIndex
                  ? (isLight ? 'bg-cobalt' : 'bg-electric-green')
                  : i === questionIndex
                  ? `${isLight ? 'bg-true-black' : 'bg-off-white'} w-6 md:w-8`
                  : (isLight ? 'bg-true-black/30' : 'bg-off-white/30')
              }`}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 h-full flex flex-col justify-center px-4 pt-14 pb-6 md:py-24">
        <div className="w-full max-w-2xl mx-auto flex flex-col h-full md:h-auto justify-between md:justify-start">
          <div className="flex-shrink-0">
            <div className="text-center mb-3 md:mb-8 fade-in">
              <span
                className={`inline-block px-4 py-1.5 ${isLight ? 'bg-true-black/10 text-true-black/70' : 'bg-off-white/10 text-off-white/70'} text-sm font-medium`}
                style={{ fontFamily: "var(--font-mono)" }}
              >
                [{String(questionIndex + 1).padStart(2, "0")}] {t("question.of")} [{String(totalQuestions).padStart(2, "0")}]
              </span>
            </div>

            <h2
              className={`font-heading text-xl md:text-4xl lg:text-5xl ${isLight ? 'text-true-black' : 'text-off-white'} text-center mb-4 md:mb-10 leading-[0.9] fade-in px-2`}
              id="question-heading"
            >
              {t(`questions.${questionIndex}.question`)}
            </h2>
          </div>

          <div className="flex-1 flex flex-col justify-center md:block">
            <div
              className="grid grid-cols-2 gap-2 md:gap-3"
              role="radiogroup"
              aria-labelledby="question-heading"
            >
              {meta.answers.map((answer, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(i, answer.personality)}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelect(i, answer.personality);
                    }
                  }}
                  disabled={selected !== null}
                  role="radio"
                  aria-checked={selected === i}
                  aria-label={t(`questions.${questionIndex}.answers.${i}`)}
                  className={`group relative text-left p-4 md:p-5 transition-all duration-300 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-cobalt focus:ring-offset-2 focus:ring-offset-transparent
                    ${selected === i
                      ? (isLight ? 'bg-cobalt text-off-white' : 'bg-electric-green text-true-black') + ' scale-[1.02] shadow-xl'
                      : selected !== null
                      ? (isLight ? 'bg-true-black/5 text-true-black/40' : 'bg-off-white/5 text-off-white/40') + ' scale-[0.98]'
                      : (isLight
                          ? 'bg-true-black/10 backdrop-blur-sm text-true-black active:bg-true-black/20 md:hover:bg-true-black/20'
                          : 'bg-off-white/10 backdrop-blur-sm text-off-white active:bg-off-white/20 md:hover:bg-off-white/20'
                        ) + ' md:hover:scale-[1.02]'
                    }
                    ${hoveredIndex === i && selected === null ? (isLight ? 'shadow-lg shadow-true-black/10' : 'shadow-lg shadow-off-white/10') : ''}
                  `}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <span className={`${selected === i ? 'text-off-white' : (isLight ? 'text-true-black' : 'text-off-white')}`} aria-hidden="true">
                      <AnswerIcon name={answer.icon} size={28} />
                    </span>
                    <span className="font-medium text-sm md:text-base leading-tight md:leading-snug line-clamp-2">
                      {t(`questions.${questionIndex}.answers.${i}`)}
                    </span>
                  </div>
                  {selected === i && (
                    <div className="absolute top-2 right-2 md:top-3 md:right-3" aria-hidden="true">
                      <Check size={24} weight="bold" className={isLight ? "text-off-white/60" : "text-true-black/60"} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <p className={`hidden md:block text-center mt-8 ${isLight ? 'text-true-black/40' : 'text-off-white/40'} text-sm`}>
            {t("question.trustGut")}
          </p>
        </div>
      </div>
    </div>
  );
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

function ResultsScreen({
  personalityKey,
  ageGroup,
  onRestart,
  contactInfo,
  sessionId,
}: {
  personalityKey: PersonalityKey;
  ageGroup: AgeGroup;
  onRestart: () => void;
  contactInfo: { type: 'email' | 'phone'; value: string } | null;
  sessionId: string;
}) {
  const t = useTranslations("quiz-v2");
  const locale = useLocale();
  const career = careerMeta[personalityKey];
  const [hoursPerDay, setHoursPerDay] = useState<2 | 4 | 6>(4);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatStarted, setChatStarted] = useState(false);
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isYouth = ageGroup === "under18";
  const ctaUrl = isYouth ? career.forYouth.ctaUrl : career.forAdult.ctaUrl;
  const months = career.timeToComplete[hoursPerDay];

  // Build pathway items from translations
  const pathwayKey = isYouth ? "forYouth" : "forAdult";
  const pathwayItems: string[] = [];
  let pi = 0;
  while (t.has(`careers.${personalityKey}.${pathwayKey}.items.${pi}`)) {
    pathwayItems.push(t(`careers.${personalityKey}.${pathwayKey}.items.${pi}`));
    pi++;
  }
  const pathwayCta = t(`careers.${personalityKey}.${pathwayKey}.cta`);

  // Build day-to-day items from translations
  const dayToDay: string[] = [];
  let di = 0;
  while (t.has(`careers.${personalityKey}.dayToDay.${di}`)) {
    dayToDay.push(t(`careers.${personalityKey}.dayToDay.${di}`));
    di++;
  }

  // Build suggested questions from translations
  const suggestedQuestions: string[] = [];
  let qi = 0;
  while (t.has(`results.suggestedQuestions.${qi}`)) {
    suggestedQuestions.push(t(`results.suggestedQuestions.${qi}`));
    qi++;
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Track results viewed
  useEffect(() => {
    trackEvent(sessionId, "quiz-v2", "results_viewed", { personality_result: personalityKey }, locale);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-send results email if user provided email during capture
  useEffect(() => {
    if (contactInfo?.type === "email" && !emailSent) {
      setEmailSent(true);
      const careerName = t(`careers.${personalityKey}.name`);
      const careerRole = t(`careers.${personalityKey}.role`);
      const careerTagline = t(`careers.${personalityKey}.tagline`);
      fetch("/api/send-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: contactInfo.value,
          locale,
          personalityName: careerName,
          personalityKey,
          role: careerRole,
          tagline: careerTagline,
          ageGroup,
          salary: career.salary,
          courses: pathwayItems,
        }),
      }).then(() => {
        trackEvent(sessionId, "quiz-v2", "results_email_sent", {}, locale);
      }).catch(() => { /* silent fail */ });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = { role: "user", content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    if (!chatStarted) {
      trackEvent(sessionId, "quiz-v2", "chat_started", {}, locale);
    }
    trackEvent(sessionId, "quiz-v2", "chat_message", { message_count: messages.length + 1 }, locale);
    setChatStarted(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          locale,
          context: {
            personalityName: t(`careers.${personalityKey}.name`),
            tagline: t(`careers.${personalityKey}.tagline`),
            role: t(`careers.${personalityKey}.role`),
            salary: career.salary.mid,
            timeToComplete: months,
            hoursPerDay,
            courses: pathwayItems,
          },
        }),
      });

      const data = await response.json();
      if (data.message) {
        setMessages(prev => [...prev, { role: "assistant", content: data.message }]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: "assistant", content: t("results.chatError") }]);
    } finally {
      setIsLoading(false);
    }
  };

  const roleCardTextClass = "text-off-white";
  const careerName = t(`careers.${personalityKey}.name`);
  const careerTagline = t(`careers.${personalityKey}.tagline`);
  const careerRole = t(`careers.${personalityKey}.role`);

  return (
    <div className="min-h-[100dvh] flex">
      <div className="w-full lg:w-1/2 min-h-[100dvh] bg-off-white overflow-y-auto pb-24 lg:pb-0">
        <header className="sticky top-0 z-30 bg-off-white border-b border-grey-2 safe-top">
          <div className="px-4 md:px-12 lg:px-16 py-4 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-grey-3 hover:text-true-black transition-colors text-sm"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              {t("results.home")}
            </Link>
            <button
              onClick={onRestart}
              className="text-grey-3 hover:text-true-black text-sm font-medium transition-colors"
              style={{ fontFamily: "var(--font-mono)" }}
              aria-label={t("results.retakeQuiz")}
            >
              {t("results.retakeQuiz")}
            </button>
          </div>
        </header>

        <div className="px-4 md:px-12 lg:px-16 py-6 md:py-8">
          <div className="mb-6 md:mb-8 fade-in">
            <p className="mb-2 text-xs md:text-sm font-semibold tracking-wide text-cobalt" style={{ fontFamily: "var(--font-mono)" }}>
              {t("results.yourPath")}
            </p>
            <h1 className="font-heading text-3xl md:text-5xl text-true-black tracking-tight mb-2 flex items-center gap-3">
              <span className="text-cobalt"><CareerIcon type={personalityKey} size={40} /></span>
              {careerName}
            </h1>
            <p className="text-base md:text-xl text-grey-3 italic">&quot;{careerTagline}&quot;</p>
          </div>

          <div
            className="mb-6 md:mb-8 px-4 md:px-6 py-4 md:py-5"
            style={{ backgroundColor: career.color }}
          >
            <p className={`text-sm font-semibold opacity-80 ${roleCardTextClass}`} style={{ fontFamily: "var(--font-mono)" }}>{t("results.yourIdealRole")}</p>
            <p className={`text-xl md:text-2xl font-bold ${roleCardTextClass}`}>{careerRole}</p>
            <p className={`text-base md:text-lg opacity-90 mt-1 ${roleCardTextClass}`}>${career.salary.mid.toLocaleString()}{t("results.yearAverage")}</p>
          </div>

          <div className="mb-6 md:mb-8 bg-white p-4 md:p-6 border border-grey-2">
            <h3 className="text-base md:text-lg font-bold text-true-black mb-3 md:mb-4">{t("results.howLong")}</h3>
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4 flex-wrap">
              <span className="text-grey-3 text-sm">{t("results.iCanSpend")}</span>
              <div className="flex bg-grey-1 p-1">
                {[2, 4, 6].map((hours) => (
                  <button
                    key={hours}
                    onClick={() => setHoursPerDay(hours as 2 | 4 | 6)}
                    className={`px-4 py-1.5 text-sm font-medium transition-all ${
                      hoursPerDay === hours ? "bg-cobalt text-off-white" : "text-grey-3"
                    }`}
                  >
                    {hours}
                  </button>
                ))}
              </div>
              <span className="text-grey-3 text-sm">{t("results.hrsDay")}</span>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-cobalt">
              &asymp; {months} {t("results.months")}
            </div>
            <p className="text-grey-3 text-xs mt-2" style={{ fontFamily: "var(--font-mono)" }}>{t("results.basedOnAverages")}</p>
          </div>

          <div className="mb-6 md:mb-8 bg-white p-4 md:p-6 border border-grey-2">
            <h3 className="text-base md:text-lg font-bold text-true-black mb-3 md:mb-4">{t("results.salaryRange")}</h3>
            <div className="relative h-16 md:h-20 flex items-end gap-0.5 md:gap-1 mb-2">
              {[15, 25, 40, 55, 70, 85, 95, 100, 95, 85, 70].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 transition-all"
                  style={{
                    height: `${height}%`,
                    backgroundColor: i === 5 || i === 6 ? career.color : "rgba(29, 89, 255, 0.12)",
                  }}
                />
              ))}
            </div>
            <div className="flex justify-between text-sm text-grey-3">
              <span>${(career.salary.low / 1000).toFixed(0)}k</span>
              <span className="font-semibold text-true-black">${(career.salary.mid / 1000).toFixed(0)}k</span>
              <span>${(career.salary.high / 1000).toFixed(0)}k</span>
            </div>
          </div>

          <p className="text-grey-3 text-[10px] md:text-[11px] leading-tight mb-6 md:mb-8 -mt-4 md:-mt-6" style={{ fontFamily: "var(--font-mono)" }}>{t("results.estimatesDisclaimer")}</p>

          <div className="mb-6 md:mb-8 bg-white p-4 md:p-6 border border-grey-2">
            <h3 className="text-base md:text-lg font-bold text-true-black mb-3 md:mb-4">{t("results.dayToDay")}</h3>
            <ul className="space-y-1.5 md:space-y-2">
              {dayToDay.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-charcoal text-sm">
                  <span className="mt-0.5 text-cobalt">&bull;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6 md:mb-8">
            <p className="mb-2 md:mb-3 text-sm font-semibold text-cobalt" style={{ fontFamily: "var(--font-mono)" }}>
              {isYouth ? t("results.initiativesForYou") : t("results.startWithCourses")}
            </p>
            <div className="flex flex-wrap gap-2">
              {pathwayItems.map((item) => (
                <span
                  key={item}
                  className="px-4 py-2 text-sm font-medium border border-cobalt text-cobalt"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Save Results — show card if no email, or confirmation if auto-sent */}
          {(!contactInfo || contactInfo.type === "phone") && (
            <div className="mb-6 md:mb-8">
              <SaveResultsCard
                personalityName={careerName}
                personalityKey={personalityKey}
                role={careerRole}
                tagline={careerTagline}
                ageGroup={ageGroup}
                salary={career.salary}
                courses={pathwayItems}
                tNamespace="quiz-v2"
                sessionId={sessionId}
              />
            </div>
          )}
          {contactInfo?.type === "email" && emailSent && (
            <p className="mb-6 md:mb-8 text-sm text-grey-3 flex items-center gap-1.5" style={{ fontFamily: "var(--font-mono)" }}>
              <Check size={14} weight="bold" className="text-cobalt" />
              {t("results.saveResults.emailSentTo")} {contactInfo.value}
            </p>
          )}

          <Link
            href={ctaUrl}
            className="inline-flex items-center justify-center gap-3 bg-cobalt text-off-white text-base md:text-lg font-bold px-6 md:px-8 py-4 transition-all active:scale-95 md:hover:scale-105 w-full md:w-auto"
            style={{ fontFamily: "var(--font-mono)" }}
            aria-label={pathwayCta}
            onClick={() => trackEvent(sessionId, "quiz-v2", "cta_clicked", { cta_url: ctaUrl }, locale)}
          >
            <span>{pathwayCta}</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Mobile Chat Button */}
      <button
        onClick={() => setShowMobileChat(true)}
        className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-electric-green flex items-center justify-center shadow-lg z-40 active:scale-95 transition-transform focus:outline-none focus:ring-2 focus:ring-cobalt focus:ring-offset-2 text-true-black"
        aria-label={t("results.careerGuide")}
      >
        <Compass size={28} weight="bold" />
      </button>

      {/* Mobile Chat Panel */}
      {showMobileChat && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col bg-off-white">
          <div className="px-4 py-4 border-b border-grey-2 flex items-center gap-3 safe-top">
            <button
              onClick={() => setShowMobileChat(false)}
              className="p-2 -ml-2 text-grey-3"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="w-10 h-10 bg-cobalt flex items-center justify-center shadow text-off-white">
              <Compass size={24} weight="bold" />
            </div>
            <div className="flex-1">
              <h3 className="text-true-black font-bold">{t("results.careerGuideShort")}</h3>
              <p className="text-grey-3 text-xs">{t("results.askAnythingShort")}</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4">
            <p className="text-grey-3 text-[10px] leading-tight mb-3 px-1">{t("results.chatDisclaimer")}</p>
            {!chatStarted ? (
              <div className="space-y-4">
                <div className="bg-grey-1 px-3 py-3 border border-grey-2">
                  <p className="text-charcoal text-sm">
                    {t("results.questionsAbout")} <strong className="text-true-black">{careerRole}</strong>{t("results.iGotYou")}
                  </p>
                </div>
                <div className="space-y-2">
                  {suggestedQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="block w-full text-left px-3 py-2.5 text-sm font-medium bg-grey-1 text-charcoal active:bg-grey-2 border border-grey-2 hover:bg-grey-2"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] px-3 py-2 shadow-sm ${
                      msg.role === "user"
                        ? "bg-cobalt text-off-white"
                        : "bg-white text-true-black border border-grey-2"
                    }`}>
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white px-3 py-2 border border-grey-2">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-grey-3 animate-bounce" style={{ animationDelay: "0ms" }}></span>
                        <span className="w-2 h-2 bg-grey-3 animate-bounce" style={{ animationDelay: "150ms" }}></span>
                        <span className="w-2 h-2 bg-grey-3 animate-bounce" style={{ animationDelay: "300ms" }}></span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          <div className="px-4 py-3 border-t border-grey-2 bg-grey-1 safe-bottom">
            <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("results.askPlaceholder")}
                className="flex-1 bg-white text-true-black placeholder-grey-3 px-4 py-3 text-sm border border-grey-2"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-4 py-3 text-off-white font-semibold disabled:opacity-50 bg-cobalt"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Desktop Chat Panel */}
      <div className="hidden lg:flex w-1/2 h-screen flex-col bg-grey-1 sticky top-0">
        <div className="px-6 py-5 border-b border-grey-2 bg-white flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 bg-cobalt flex items-center justify-center shadow-lg text-off-white">
              <Compass size={28} weight="bold" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-cobalt border-2 border-grey-1"></div>
          </div>
          <div className="flex-1">
            <h3 className="text-true-black font-bold text-lg">{t("results.careerGuide")}</h3>
            <p className="text-grey-3 text-sm">{t("results.hereToHelp")}</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <p className="text-grey-3 text-[11px] leading-tight mb-4">{t("results.chatDisclaimer")}</p>
          {!chatStarted ? (
            <div className="space-y-6">
              <div className="flex justify-start">
                <div className="bg-off-white/10 px-4 py-3 border border-off-white/10 max-w-[85%]">
                  <p className="text-charcoal text-sm leading-relaxed">
                    {t("results.heyQuestions")} <strong className="text-true-black">{careerRole}</strong>{t("results.iGotYou")}
                  </p>
                </div>
              </div>
              <div className="pl-11 space-y-2">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="block w-full text-left px-4 py-3 text-sm font-medium bg-white text-charcoal hover:bg-grey-2 transition-all border border-grey-2 hover:border-grey-3"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] px-4 py-3 shadow-sm ${
                    msg.role === "user"
                      ? "bg-cobalt text-off-white"
                      : "bg-white text-true-black border border-grey-2"
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-off-white/10 px-4 py-3 border border-off-white/10">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-grey-3 animate-bounce" style={{ animationDelay: "0ms" }}></span>
                      <span className="w-2 h-2 bg-grey-3 animate-bounce" style={{ animationDelay: "150ms" }}></span>
                      <span className="w-2 h-2 bg-grey-3 animate-bounce" style={{ animationDelay: "300ms" }}></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-grey-2 bg-white">
          <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("results.askPlaceholder")}
              className="flex-1 bg-charcoal text-off-white placeholder-grey-3 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cobalt/50 text-sm border border-off-white/20 shadow-sm"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-4 py-3 text-off-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 bg-cobalt shadow-md"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function GuidanceQuiz() {
  const [screen, setScreen] = useState<Screen>("home");
  const [ageGroup, setAgeGroup] = useState<AgeGroup>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [contactInfo, setContactInfo] = useState<{ type: 'email' | 'phone'; value: string } | null>(null);
  const [scores, setScores] = useState<Record<PersonalityKey, number>>({
    fixer: 0, architect: 0, connector: 0, creator: 0, builder: 0, maker: 0,
    strategist: 0, guardian: 0, analyst: 0, healer: 0, educator: 0, advocate: 0,
  });
  const [sessionId] = useState(() => generateSessionId());
  const locale = useLocale();
  const QV = "quiz-v2" as const;

  const handleAgeSelect = (age: AgeGroup) => {
    setAgeGroup(age);
    setCurrentQuestion(0);
    setScores({ fixer: 0, architect: 0, connector: 0, creator: 0, builder: 0, maker: 0, strategist: 0, guardian: 0, analyst: 0, healer: 0, educator: 0, advocate: 0 });
    setScreen("capture");
    trackEvent(sessionId, QV, "quiz_started", { age_group: age }, locale);
  };

  const handleContactSubmit = (contact: { type: 'email' | 'phone'; value: string }) => {
    setContactInfo(contact);
    setScreen("quiz");
    trackEvent(sessionId, QV, "lead_captured", { lead_type: contact.type }, locale);
    fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: contact.type === "email" ? contact.value : "",
        phone: contact.type === "phone" ? contact.value : "",
        source: "quiz-lead-capture",
      }),
    }).catch(() => {});
  };

  const handleContactSkip = () => {
    setScreen("quiz");
    trackEvent(sessionId, QV, "lead_skipped", {}, locale);
  };

  const handleAnswer = (personality: PersonalityKey) => {
    setScores((prev) => ({ ...prev, [personality]: prev[personality] + 1 }));
    trackEvent(sessionId, QV, "question_answered", { question_index: currentQuestion, personality_chosen: personality }, locale);
    if (currentQuestion < questionMeta.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      const entries = Object.entries(scores) as [PersonalityKey, number][];
      const updatedScores = { ...Object.fromEntries(entries), [personality]: (scores[personality] || 0) + 1 };
      const winner = (Object.entries(updatedScores) as [PersonalityKey, number][]).reduce((a, b) => (b[1] > a[1] ? b : a))[0];
      trackEvent(sessionId, QV, "quiz_completed", { personality_result: winner }, locale);
      setScreen("loading");
      setTimeout(() => setScreen("results"), 2800);
    }
  };

  const handleRestart = () => {
    trackEvent(sessionId, QV, "quiz_restarted", {}, locale);
    setScreen("home");
    setAgeGroup(null);
    setCurrentQuestion(0);
    setContactInfo(null);
    setScores({ fixer: 0, architect: 0, connector: 0, creator: 0, builder: 0, maker: 0, strategist: 0, guardian: 0, analyst: 0, healer: 0, educator: 0, advocate: 0 });
  };

  const getWinningPersonality = (): PersonalityKey => {
    const entries = Object.entries(scores) as [PersonalityKey, number][];
    const winner = entries.reduce((a, b) => (b[1] > a[1] ? b : a));
    return winner[0];
  };

  return (
    <>
      <main id="main-content">
        {screen === "home" && <HomeScreen onSelectAge={handleAgeSelect} />}
        {screen === "capture" && (
          <LeadCaptureScreen onSubmit={handleContactSubmit} onSkip={handleContactSkip} />
        )}
        {screen === "quiz" && (
          <QuestionScreen
            key={currentQuestion}
            questionIndex={currentQuestion}
            totalQuestions={questionMeta.length}
            onAnswer={handleAnswer}
          />
        )}
        {screen === "loading" && <LoadingScreen personalityKey={getWinningPersonality()} />}
        {screen === "results" && (
          <ResultsScreen personalityKey={getWinningPersonality()} ageGroup={ageGroup} onRestart={handleRestart} contactInfo={contactInfo} sessionId={sessionId} />
        )}
      </main>
    </>
  );
}
