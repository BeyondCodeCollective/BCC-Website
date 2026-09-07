import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "@/components/ui/logo";
import { SITE } from "@/lib/constants";

/**
 * The card someone gets handed at an event.
 *
 * One QR code points here, not four at four destinations: nobody scans a
 * second code. Deliberately plain — no nav, no scroll, no animation. It is a
 * signpost that has to work on a stranger's phone, on venue wifi, in one look.
 *
 * Unlisted rather than secret: noindex keeps it out of search so it does not
 * compete with the real pages, but anyone with the code can reach it.
 */

const OG_IMAGE = "https://www.wearebcc.org/images/community-og-v2.jpg";
const TITLE = "Beyond Code Collective — Where to start";
const DESCRIPTION =
  "Catalyst, BCC Academy, Beyond The Game and Beyond Anything, in one place.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  robots: { index: false, follow: false },
  // noindex keeps it out of search; it does not stop a link preview. Without
  // its own openGraph the page inherits the root card, which titles it "The
  // Future Of Tech Starts Here" and points og:url at the homepage.
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.wearebcc.org/en/links",
    siteName: "Beyond Code Collective",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1456,
        height: 816,
        alt: "A Beyond Code Collective workshop in session",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

type LinkItem = {
  label: string;
  blurb: string;
  href: string;
};

// Absolute URLs on purpose: this page gets scanned from someone else's phone,
// and two of the four live on different domains.
const LINKS: LinkItem[] = [
  {
    label: "Catalyst",
    blurb: "Our workforce program. From skill to career, for adult learners.",
    href: "https://www.wearebcc.org/en/catalyst?src=links",
  },
  {
    label: "BCC Academy",
    blurb: "The learning platform. Live cohorts, taught by real instructors.",
    href: "https://bccacademy.io?src=links",
  },
  {
    label: "Beyond The Game",
    blurb: "Tech careers for athletes, on and off the field.",
    href: "https://www.wearebcc.org/beyond-the-game-deck?src=links",
  },
  {
    label: "Beyond Anything",
    blurb: "The project, and where it is going next.",
    href: "https://beyondanything.org?src=links",
  },
  // Employers get the public pitch, not /partners. That page is behind an
  // access code, so putting it on a card anyone can scan either strands
  // people at a password wall or defeats the point of the gate. The deck
  // link still gets handed out directly, to people who ask for it.
  {
    label: "For Employers",
    blurb: "Hire from the cohort, or help shape what we teach.",
    href: "https://www.wearebcc.org/en/catalyst?src=links#employers",
  },
];

export default function LinksPage() {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center bg-cobalt px-6 py-14">
      <div className="w-full max-w-md">
        <Logo variant="stacked" color="white" className="h-14 w-auto" />

        <h1 className="mt-8 font-heading text-[clamp(2.25rem,9vw,3rem)] leading-[0.9] text-off-white">
          Where to start
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-off-white">
          Four programs and the platform behind them. Explore whichever one fits.
        </p>
        <p className="mt-2 text-lg leading-relaxed text-off-white">
          Questions?{" "}
          <a
            href="mailto:partnerships@wearebcc.org"
            className="underline underline-offset-4 hover:text-electric-green"
          >
            partnerships@wearebcc.org
          </a>
        </p>

        <ul className="mt-9 flex flex-col gap-3">
          {LINKS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="flex items-start justify-between gap-4 bg-off-white p-5 transition-transform hover:-translate-y-0.5"
              >
                <span>
                  <span className="block font-heading text-2xl uppercase leading-none text-true-black">
                    {item.label}
                  </span>
                  <span className="mt-2 block text-base leading-relaxed text-true-black/70">
                    {item.blurb}
                  </span>
                </span>
                <ArrowUpRight
                  size={22}
                  weight="bold"
                  className="mt-1 shrink-0 text-cobalt"
                />
              </a>
            </li>
          ))}
        </ul>

        {/* Below the links: she scrolls through those while talking, and the
            code is what she lands on at the end to hand the page over.
            Tapping opens the full-screen version for holding up. */}
        <a
          href="/en/links/share"
          className="mt-3 flex items-center gap-4 bg-off-white p-4 transition-transform hover:-translate-y-0.5"
        >
          <Image
            src="/images/links/qr.png"
            alt="QR code linking to this page"
            width={780}
            height={780}
            priority
            unoptimized
            className="h-40 w-40 shrink-0"
          />
          <span>
            <span className="block font-heading text-2xl uppercase leading-none text-true-black">
              Scan to share
            </span>
            <span className="mt-2 block text-base leading-snug text-true-black/70">
              Point a camera here, or tap to open it full screen.
            </span>
          </span>
        </a>

        {/* Secondary on purpose. A QR that leads with "give us money" changes
            the conversation; someone who is already moved will still find it. */}
        <a
          href={`${SITE.donateUrl}?src=links`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 flex items-center justify-center gap-2 bg-electric-green px-6 py-4 font-mono text-sm uppercase tracking-wider text-true-black transition-transform hover:-translate-y-0.5"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Support this work
        </a>

        <p
          className="mt-8 text-center font-mono text-sm uppercase tracking-wider text-off-white/90"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          wearebcc.org
        </p>
      </div>
    </main>
  );
}
