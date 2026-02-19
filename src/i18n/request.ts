import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as "en" | "es")) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: {
      ...(await import(`../messages/${locale}/common.json`)).default,
      ...(await import(`../messages/${locale}/landing.json`)).default,
      ...(await import(`../messages/${locale}/quiz.json`)).default,
      ...(await import(`../messages/${locale}/quiz-v2.json`)).default,
    },
  };
});
