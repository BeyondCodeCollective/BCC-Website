"use client";

import { useState, useEffect, useCallback } from "react";
import { Lock, ArrowSquareOut, FloppyDisk, ArrowCounterClockwise, Check } from "@phosphor-icons/react";
import SectionEditor from "./SectionEditor";
import enLanding from "@/messages/en/landing.json";
import esLanding from "@/messages/es/landing.json";

/* eslint-disable @typescript-eslint/no-explicit-any */

const BASELINES: Record<string, Record<string, any>> = {
  en: enLanding,
  es: esLanding,
};

const SECTIONS = [
  { key: "hero", label: "Hero" },
  { key: "about", label: "About" },
  { key: "testimonials", label: "Testimonials" },
  { key: "audience", label: "Who We Serve" },
  { key: "stats", label: "Stats" },
  { key: "initiatives", label: "Initiatives" },
  { key: "founder", label: "Founder" },
  { key: "resources", label: "Resources" },
  { key: "ctaBridge", label: "Partners" },
  { key: "getInvolved", label: "Get Involved" },
] as const;

function deepMerge(
  base: Record<string, any>,
  override: Record<string, any>
): Record<string, any> {
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
      result[key] = deepMerge(baseVal, overrideVal);
    } else {
      result[key] = overrideVal;
    }
  }
  return result;
}

export default function AdminShell() {
  // Auth state
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);

  // Editor state
  const [locale, setLocale] = useState<"en" | "es">("en");
  const [activeSection, setActiveSection] = useState("hero");
  const [draft, setDraft] = useState<Record<string, any>>({});
  const [savedSnapshot, setSavedSnapshot] = useState<string>("{}");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const isDirty = JSON.stringify(draft) !== savedSnapshot;

  // Restore session
  useEffect(() => {
    const saved = sessionStorage.getItem("bcc-admin-pw");
    if (saved) {
      setPassword(saved);
      setAuthenticated(true);
    }
  }, []);

  // Fetch section data when section or locale changes
  const fetchSection = useCallback(
    async (pw: string, loc: string, ns: string) => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/admin/content?password=${encodeURIComponent(pw)}&locale=${loc}&namespace=${ns}`
        );
        if (res.status === 401) {
          setAuthenticated(false);
          setAuthError(true);
          sessionStorage.removeItem("bcc-admin-pw");
          return;
        }
        const { override } = await res.json();
        const baseline = BASELINES[loc]?.[ns] || {};
        const merged = override ? deepMerge(baseline, override) : { ...baseline };
        setDraft(merged);
        setSavedSnapshot(JSON.stringify(merged));
      } catch {
        // Fall back to baseline
        const baseline = BASELINES[loc]?.[ns] || {};
        setDraft({ ...baseline });
        setSavedSnapshot(JSON.stringify(baseline));
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (authenticated && password) {
      fetchSection(password, locale, activeSection);
    }
  }, [authenticated, password, locale, activeSection, fetchSection]);

  // Save
  const handleSave = async () => {
    setSaving(true);
    setSaveMessage(null);
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          locale,
          namespace: activeSection,
          content: draft,
        }),
      });
      if (res.status === 401) {
        setAuthenticated(false);
        setAuthError(true);
        sessionStorage.removeItem("bcc-admin-pw");
        return;
      }
      if (res.ok) {
        setSavedSnapshot(JSON.stringify(draft));
        setSaveMessage("Saved");
        setTimeout(() => setSaveMessage(null), 2000);
      }
    } catch {
      setSaveMessage("Failed to save");
      setTimeout(() => setSaveMessage(null), 3000);
    } finally {
      setSaving(false);
    }
  };

  // Discard
  const handleDiscard = () => {
    setDraft(JSON.parse(savedSnapshot));
  };

  // Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(false);
    sessionStorage.setItem("bcc-admin-pw", password);
    setAuthenticated(true);
  };

  // ─── Auth Gate ──────────────────────────────────────────────────

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center px-6">
        <form onSubmit={handleLogin} className="w-full max-w-xs">
          <div className="flex items-center gap-2.5 mb-8">
            <Lock size={18} weight="bold" className="text-cobalt" />
            <h1 className="font-heading text-xl text-true-black uppercase tracking-tight">
              BCC Admin
            </h1>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full bg-white text-true-black px-4 py-3 text-sm rounded-lg border border-black/10 focus:border-cobalt focus:outline-none placeholder:text-black/30"
            style={{ fontFamily: "var(--font-mono)" }}
          />
          {authError && (
            <p
              className="text-[#D32F2F] text-xs mt-2"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Invalid password
            </p>
          )}
          <button
            type="submit"
            className="mt-4 w-full bg-cobalt text-off-white py-3 text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-cobalt/90 transition-colors"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Sign In
          </button>
        </form>
      </div>
    );
  }

  // ─── Admin Panel ────────────────────────────────────────────────

  const activeSectionLabel =
    SECTIONS.find((s) => s.key === activeSection)?.label || activeSection;

  return (
    <div className="min-h-screen bg-off-white text-true-black flex flex-col">
      {/* Header */}
      <header className="border-b border-black/5 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <h1 className="font-heading text-lg uppercase tracking-tight">
            BCC Admin
          </h1>
          <div className="flex items-center gap-3">
            {/* Locale Toggle */}
            <div
              className="flex gap-0.5 bg-black/[0.04] rounded-md p-0.5"
            >
              {(["en", "es"] as const).map((loc) => (
                <button
                  key={loc}
                  onClick={() => setLocale(loc)}
                  className={`px-3 py-1 text-xs rounded transition-colors ${
                    locale === loc
                      ? "bg-cobalt text-off-white"
                      : "text-black/40 hover:text-black/70"
                  }`}
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {loc.toUpperCase()}
                </button>
              ))}
            </div>
            {/* View Site */}
            <a
              href={`/${locale}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-black/40 hover:text-cobalt transition-colors"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              View Site
              <ArrowSquareOut size={14} weight="bold" />
            </a>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <nav className="w-48 shrink-0 border-r border-black/5 bg-white py-4 hidden md:block">
          {SECTIONS.map(({ key, label }, i) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className={`w-full text-left px-4 py-2 text-xs transition-colors ${
                activeSection === key
                  ? "text-cobalt bg-cobalt/5 border-r-2 border-cobalt"
                  : "text-black/50 hover:text-black/80 hover:bg-black/[0.02]"
              }`}
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <span className="text-black/20 mr-1.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              {label}
            </button>
          ))}
        </nav>

        {/* Mobile Section Selector */}
        <div className="md:hidden border-b border-black/5 bg-white px-4 py-2">
          <select
            value={activeSection}
            onChange={(e) => setActiveSection(e.target.value)}
            className="w-full bg-white text-true-black px-3 py-2 text-sm rounded-md border border-black/10 focus:border-cobalt focus:outline-none"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {SECTIONS.map(({ key, label }, i) => (
              <option key={key} value={key}>
                {String(i + 1).padStart(2, "0")} {label}
              </option>
            ))}
          </select>
        </div>

        {/* Editor Area */}
        <main className="flex-1 p-4 sm:p-6 pb-24 overflow-y-auto">
          <div className="max-w-2xl">
            {/* Section Title */}
            <p
              className="text-[11px] uppercase tracking-wider text-black/40 mb-6"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              [{String(SECTIONS.findIndex((s) => s.key === activeSection) + 1).padStart(2, "0")}]{" "}
              {activeSectionLabel} — {locale.toUpperCase()}
            </p>

            {loading ? (
              <p
                className="text-sm text-black/30"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Loading...
              </p>
            ) : (
              <SectionEditor
                section={activeSection}
                value={draft}
                onChange={setDraft}
              />
            )}
          </div>
        </main>
      </div>

      {/* Save Bar */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-black/5 bg-white/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isDirty && (
              <button
                onClick={handleDiscard}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-black/40 hover:text-black/70 transition-colors rounded-md hover:bg-black/[0.04]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                <ArrowCounterClockwise size={14} weight="bold" />
                Discard
              </button>
            )}
          </div>
          <div className="flex items-center gap-3">
            {saveMessage && (
              <span
                className={`text-xs flex items-center gap-1 ${
                  saveMessage === "Saved" ? "text-cobalt" : "text-[#D32F2F]"
                }`}
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {saveMessage === "Saved" && <Check size={14} weight="bold" />}
                {saveMessage}
              </span>
            )}
            <button
              onClick={handleSave}
              disabled={!isDirty || saving}
              className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-colors ${
                isDirty && !saving
                  ? "bg-cobalt text-off-white hover:bg-cobalt/90"
                  : "bg-black/5 text-black/20 cursor-not-allowed"
              }`}
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <FloppyDisk size={14} weight="bold" />
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
