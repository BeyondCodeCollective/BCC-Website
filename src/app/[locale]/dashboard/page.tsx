import { redirect } from "next/navigation";

export const metadata = {
  title: "BCC Admin",
  robots: "noindex, nofollow",
};

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/admin`);
}
