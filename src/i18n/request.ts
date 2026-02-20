import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { getContentOverrides } from "@/lib/content-db";

/** Deep-merge override on top of base. Arrays are replaced wholesale. */
function deepMerge(
  base: Record<string, unknown>,
  override: Record<string, unknown>
): Record<string, unknown> {
  const result = { ...base };
  for (const key of Object.keys(override)) {
    const baseVal = base[key];
    const overrideVal = override[key];
    if (
      overrideVal !== null &&
      typeof overrideVal === "object" &&
      !Array.isArray(overrideVal) &&
      typeof baseVal === "object" &&
      baseVal !== null &&
      !Array.isArray(baseVal)
    ) {
      result[key] = deepMerge(
        baseVal as Record<string, unknown>,
        overrideVal as Record<string, unknown>
      );
    } else {
      result[key] = overrideVal;
    }
  }
  return result;
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as "en" | "es")) {
    locale = routing.defaultLocale;
  }

  const [common, landing, quiz, quizV2] = await Promise.all([
    import(`../messages/${locale}/common.json`).then((m) => m.default),
    import(`../messages/${locale}/landing.json`).then((m) => m.default),
    import(`../messages/${locale}/quiz.json`).then((m) => m.default),
    import(`../messages/${locale}/quiz-v2.json`).then((m) => m.default),
  ]);

  // Fetch DB overrides — returns {} on failure (site falls back to JSON files)
  const overrides = await getContentOverrides(locale);

  // Deep-merge overrides on top of landing.json namespaces only
  const mergedLanding = { ...landing } as Record<string, unknown>;
  for (const ns of Object.keys(overrides)) {
    if (mergedLanding[ns] && typeof mergedLanding[ns] === "object") {
      mergedLanding[ns] = deepMerge(
        mergedLanding[ns] as Record<string, unknown>,
        overrides[ns] as Record<string, unknown>
      );
    }
  }

  return {
    locale,
    messages: {
      ...common,
      ...mergedLanding,
      ...quiz,
      ...quizV2,
    },
  };
});
