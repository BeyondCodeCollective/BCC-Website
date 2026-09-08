import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { ContactProvider } from "@/components/contact-modal";
import "../globals.css";

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";

  return {
    verification: {
      google: "_IH1JCySoi50kYTQvWLwwXaiCCt9BWRcLd4i2IGVKpM",
    },
    title: isEs
      ? "Beyond Code Collective — El Futuro De La Tecnología Comienza Aquí"
      : "Beyond Code Collective — The Future Of Tech Starts Here",
    description: isEs
      ? "Beyond Code Collective ofrece recursos impulsados por personas para un mundo impulsado por la tecnología. Construyendo oportunidad intergeneracional en las tecnologías de hoy y mañana."
      : "Beyond Code Collective provides human-powered resources for a tech-driven world. Building intergenerational opportunity in the technologies of today and tomorrow.",
    keywords: isEs
      ? [
          "Beyond Code Collective",
          "BCC",
          "educación tecnológica",
          "desarrollo laboral",
          "alfabetización en IA",
          "oportunidad intergeneracional",
        ]
      : [
          "Beyond Code Collective",
          "BCC",
          "tech education",
          "workforce development",
          "AI literacy",
          "intergenerational opportunity",
        ],
    openGraph: {
      title: isEs
        ? "Beyond Code Collective — El Futuro De La Tecnología Comienza Aquí"
        : "Beyond Code Collective — The Future Of Tech Starts Here",
      description: isEs
        ? "Beyond Code Collective ofrece recursos impulsados por personas para un mundo impulsado por la tecnología."
        : "Beyond Code Collective provides human-powered resources for a tech-driven world.",
      url: "https://www.wearebcc.org",
      siteName: "Beyond Code Collective",
      type: "website",
      images: [
        {
          url: "https://www.wearebcc.org/images/community-og-v2.jpg",
          width: 1456,
          height: 816,
          alt: "A Beyond Code Collective workshop in session at ATDC",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isEs
        ? "Beyond Code Collective — El Futuro De La Tecnología Comienza Aquí"
        : "Beyond Code Collective — The Future Of Tech Starts Here",
      description: isEs
        ? "Beyond Code Collective ofrece recursos impulsados por personas para un mundo impulsado por la tecnología."
        : "Beyond Code Collective provides human-powered resources for a tech-driven world.",
      images: ["https://www.wearebcc.org/images/community-og-v2.jpg"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  // next-intl serializes every message into the client payload, so a draft
  // post would ship its full text to the browser on any page that loads the
  // provider. Strip drafts here: the server still reads the unfiltered
  // messages (the article route uses them to answer with a 404).
  const news = messages.news as { items?: { draft?: boolean }[] } | undefined;
  const clientMessages = Array.isArray(news?.items)
    ? {
        ...messages,
        news: { ...news, items: news.items.filter((i) => !i?.draft) },
      }
    : messages;

  // Organization schema: ties "BCC" the acronym to the full name, the logo,
  // the social profiles and the founder in Google's knowledge graph.
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Beyond Code Collective",
    alternateName: "BCC",
    url: "https://www.wearebcc.org",
    logo: "https://www.wearebcc.org/images/bcc-logo-stacked-black.png",
    sameAs: [
      "https://www.instagram.com/beyondcodecollective",
      "https://www.linkedin.com/company/beyond-code-collective",
    ],
    founder: {
      "@type": "Person",
      name: "Cristina Mancini",
      jobTitle: "Founder & CEO",
      url: "https://www.wearebcc.org/en/team",
    },
  };

  return (
    <html lang={locale} className={spaceMono.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <NextIntlClientProvider locale={locale} messages={clientMessages}>
          <ContactProvider>{children}</ContactProvider>
          <Analytics />
          <SpeedInsights />
        </NextIntlClientProvider>
        <GoogleAnalytics gaId="G-KJF6CKFSTP" />
        <GoogleAnalytics gaId="G-4HKGVZ4CWD" />
      </body>
    </html>
  );
}
