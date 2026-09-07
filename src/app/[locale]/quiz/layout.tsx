import type { Metadata } from "next";
import { pageAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
  title: "Find Your Path | Beyond Code Collective",
  description:
    "Take our quick quiz to discover your perfect learning pathway at Beyond Code Collective. Whether you're 14 or 40, we'll match you with the right courses.",
    alternates: pageAlternates(locale, "/quiz"),
  };
}

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
