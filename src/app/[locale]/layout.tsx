import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
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
    title: isEs
      ? "Beyond Code Collective — El Futuro De La Tecnología Comienza Aquí"
      : "Beyond Code Collective — The Future Of Tech Starts Here",
    description: isEs
      ? "Beyond Code Collective ofrece recursos impulsados por personas para un mundo impulsado por la tecnología. Construyendo acceso intergeneracional a las tecnologías de hoy y mañana."
      : "Beyond Code Collective provides human-powered resources for a tech-driven world. Building intergenerational access to the technologies of today and tomorrow.",
    keywords: isEs
      ? [
          "Beyond Code Collective",
          "BCC",
          "educación tecnológica",
          "desarrollo laboral",
          "alfabetización en IA",
          "acceso intergeneracional",
        ]
      : [
          "Beyond Code Collective",
          "BCC",
          "tech education",
          "workforce development",
          "AI literacy",
          "intergenerational access",
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
    },
    alternates: {
      canonical: `https://www.wearebcc.org/${locale}`,
      languages: {
        en: "https://www.wearebcc.org/en",
        es: "https://www.wearebcc.org/es",
      },
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

  return (
    <html lang={locale} className={spaceMono.variable}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
