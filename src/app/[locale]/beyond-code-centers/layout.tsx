import type { Metadata } from "next";
import { pageAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: pageAlternates(locale, "/beyond-code-centers") };
}

export default function BeyondCodeCentersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
