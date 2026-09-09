import type { Metadata } from "next";
import { pageAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
  title: "Code Along Beyond: Music | Beyond Code Collective",
  description:
    "Code Along Beyond: Music — Beyond Code Collective's free YouTube coding series launches Saturday, Sept 12, with support from Apple. Four episodes, one music playlist app, built from scratch.",
  openGraph: {
    title: "Code Along Beyond: Music",
    description:
      "The free coding series returns. Season launches Saturday, Sept 12 on YouTube.",
    images: [
      {
        url: "https://www.wearebcc.org/images/code-along/playlist-card-og-v4.jpg",
        width: 854,
        height: 480,
        alt: "Code Along Season 1",
      },
    ],
  },
    alternates: pageAlternates(locale, "/code-along"),
  };
}

export default function CodeAlongLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
