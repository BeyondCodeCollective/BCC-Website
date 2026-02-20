"use client";

import StringField from "./StringField";
import TextareaField from "./TextareaField";
import { ArrayEditorString, ArrayEditorObject } from "./ArrayEditor";
import KeyedGroupEditor from "./KeyedGroupEditor";

/* eslint-disable @typescript-eslint/no-explicit-any */
type V = Record<string, any>;
type OnChange = (v: V) => void;

function set(value: V, key: string, v: unknown, onChange: OnChange) {
  onChange({ ...value, [key]: v });
}

// ─── [01] HERO ───────────────────────────────────────────────────

export function HeroEditor({ value, onChange }: { value: V; onChange: OnChange }) {
  return (
    <div className="space-y-4">
      <StringField label="Headline" value={value.headline1 || ""} onChange={(v) => set(value, "headline1", v, onChange)} />
      <ArrayEditorString label="Rotating Words" items={value.rotatingWords || []} onChange={(v) => set(value, "rotatingWords", v, onChange)} addLabel="Add Word" />
      <StringField label="Human in the Loop Label" value={value.humanInTheLoop || ""} onChange={(v) => set(value, "humanInTheLoop", v, onChange)} />
      <StringField label="Tagline" value={value.tagline || ""} onChange={(v) => set(value, "tagline", v, onChange)} />
      <TextareaField label="Description" value={value.description || ""} onChange={(v) => set(value, "description", v, onChange)} rows={3} />
      <StringField label="Primary CTA" value={value.getStarted || ""} onChange={(v) => set(value, "getStarted", v, onChange)} />
      <StringField label="Secondary CTA" value={value.joinNewsletter || ""} onChange={(v) => set(value, "joinNewsletter", v, onChange)} />
      <StringField label="Community Label" value={value.ourCommunity || ""} onChange={(v) => set(value, "ourCommunity", v, onChange)} />
    </div>
  );
}

// ─── [02] ABOUT ──────────────────────────────────────────────────

export function AboutEditor({ value, onChange }: { value: V; onChange: OnChange }) {
  return (
    <div className="space-y-4">
      <StringField label="Headline Line 1" value={value.headline1 || ""} onChange={(v) => set(value, "headline1", v, onChange)} />
      <StringField label="Headline Line 2" value={value.headline2 || ""} onChange={(v) => set(value, "headline2", v, onChange)} />
      <TextareaField label="Description" value={value.description || ""} onChange={(v) => set(value, "description", v, onChange)} />
      <KeyedGroupEditor
        label="Pillars"
        keys={[
          { key: "intergenerationalEquity", displayName: "Intergenerational Equity" },
          { key: "allTechnologies", displayName: "All Technologies" },
          { key: "todayAndTomorrow", displayName: "Today & Tomorrow" },
        ]}
        fields={[
          { key: "title", label: "Title", type: "string" },
          { key: "description", label: "Description", type: "textarea" },
        ]}
        value={value.pillars || {}}
        onChange={(v) => set(value, "pillars", v, onChange)}
      />
    </div>
  );
}

// ─── [03] TESTIMONIALS ───────────────────────────────────────────

export function TestimonialsEditor({ value, onChange }: { value: V; onChange: OnChange }) {
  return (
    <div className="space-y-4">
      <StringField label="Headline" value={value.headline || ""} onChange={(v) => set(value, "headline", v, onChange)} />
      <StringField label="Subheading" value={value.subheading || ""} onChange={(v) => set(value, "subheading", v, onChange)} />
      <ArrayEditorObject
        label="Testimonials"
        items={value.items || []}
        fields={[
          { key: "quote", label: "Quote", multiline: true },
          { key: "name", label: "Name" },
          { key: "role", label: "Role" },
          { key: "location", label: "Location" },
        ]}
        onChange={(v) => set(value, "items", v, onChange)}
        addLabel="Add Testimonial"
      />
    </div>
  );
}

// ─── [04] AUDIENCE / WHO WE SERVE ────────────────────────────────

export function AudienceEditor({ value, onChange }: { value: V; onChange: OnChange }) {
  return (
    <div className="space-y-4">
      <StringField label="Label" value={value.label || ""} onChange={(v) => set(value, "label", v, onChange)} />
      <StringField label="Headline Line 1" value={value.headline1 || ""} onChange={(v) => set(value, "headline1", v, onChange)} />
      <StringField label="Headline Line 2" value={value.headline2 || ""} onChange={(v) => set(value, "headline2", v, onChange)} />
      <KeyedGroupEditor
        label="Personas"
        keys={[
          { key: "forTheFuture", displayName: "For The Future" },
          { key: "understandingOurWorld", displayName: "Understanding Our World" },
          { key: "changingDirection", displayName: "Changing Direction" },
          { key: "makingADifference", displayName: "Making A Difference" },
        ]}
        fields={[
          { key: "title", label: "Title", type: "string" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "quote", label: "Quote", type: "textarea" },
          { key: "segments", label: "Segments", type: "string-array" },
        ]}
        value={value.personas || {}}
        onChange={(v) => set(value, "personas", v, onChange)}
      />
    </div>
  );
}

// ─── [05] STATS ──────────────────────────────────────────────────

export function StatsEditor({ value, onChange }: { value: V; onChange: OnChange }) {
  return (
    <div className="space-y-4">
      <StringField label="Label" value={value.label || ""} onChange={(v) => set(value, "label", v, onChange)} />
      <ArrayEditorObject
        label="Stats"
        items={value.items || []}
        fields={[
          { key: "value", label: "Value (text — e.g. '77' or 'ALL')" },
          { key: "suffix", label: "Suffix (e.g. '%', '+', 'st')" },
          { key: "label", label: "Label" },
        ]}
        onChange={(v) => set(value, "items", v, onChange)}
        addLabel="Add Stat"
      />
    </div>
  );
}

// ─── [06] INITIATIVES ────────────────────────────────────────────

export function InitiativesEditor({ value, onChange }: { value: V; onChange: OnChange }) {
  return (
    <div className="space-y-4">
      <StringField label="Headline Line 1" value={value.headline1 || ""} onChange={(v) => set(value, "headline1", v, onChange)} />
      <StringField label="Headline Line 2" value={value.headline2 || ""} onChange={(v) => set(value, "headline2", v, onChange)} />
      <StringField label="Subheading" value={value.subheading || ""} onChange={(v) => set(value, "subheading", v, onChange)} />
      <TextareaField label="Description" value={value.description || ""} onChange={(v) => set(value, "description", v, onChange)} />
      <StringField label="Learn More CTA" value={value.learnMore || ""} onChange={(v) => set(value, "learnMore", v, onChange)} />
      <StringField label="Career Quiz CTA" value={value.takeCareerQuiz || ""} onChange={(v) => set(value, "takeCareerQuiz", v, onChange)} />
      <KeyedGroupEditor
        label="Initiatives"
        keys={[
          { key: "forge", displayName: "The Forge" },
          { key: "catalysts", displayName: "Beyond Code Catalysts" },
          { key: "codeAlong", displayName: "Code Along" },
        ]}
        fields={[
          { key: "title", label: "Title", type: "string" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "tags", label: "Tags", type: "string-array" },
        ]}
        value={value.items || {}}
        onChange={(v) => set(value, "items", v, onChange)}
      />
    </div>
  );
}

// ─── [07] FOUNDER ────────────────────────────────────────────────

export function FounderEditor({ value, onChange }: { value: V; onChange: OnChange }) {
  return (
    <div className="space-y-4">
      <StringField label="Section Label" value={value.label || ""} onChange={(v) => set(value, "label", v, onChange)} />
      <StringField label="Title" value={value.title || ""} onChange={(v) => set(value, "title", v, onChange)} />
      <TextareaField label="Bio" value={value.bio || ""} onChange={(v) => set(value, "bio", v, onChange)} rows={6} />
      <TextareaField label="Quote" value={value.quote || ""} onChange={(v) => set(value, "quote", v, onChange)} rows={4} />
      <StringField label="Quote Attribution" value={value.quoteAttribution || ""} onChange={(v) => set(value, "quoteAttribution", v, onChange)} />
      <StringField label="As Seen On Label" value={value.asSeenOn || ""} onChange={(v) => set(value, "asSeenOn", v, onChange)} />
    </div>
  );
}

// ─── [08] RESOURCES ──────────────────────────────────────────────

export function ResourcesEditor({ value, onChange }: { value: V; onChange: OnChange }) {
  return (
    <div className="space-y-4">
      <StringField label="Headline Line 1" value={value.headline1 || ""} onChange={(v) => set(value, "headline1", v, onChange)} />
      <StringField label="Headline Line 2" value={value.headline2 || ""} onChange={(v) => set(value, "headline2", v, onChange)} />
      <StringField label="Subheading" value={value.subheading || ""} onChange={(v) => set(value, "subheading", v, onChange)} />
      <TextareaField label="Description" value={value.description || ""} onChange={(v) => set(value, "description", v, onChange)} rows={3} />
      <StringField label="Featured Video Label" value={value.featuredVideo || ""} onChange={(v) => set(value, "featuredVideo", v, onChange)} />
      <StringField label="Downloads Label" value={value.downloads || ""} onChange={(v) => set(value, "downloads", v, onChange)} />
      <KeyedGroupEditor
        label="Resource Items"
        keys={[
          { key: "onePager", displayName: "BCC One-Pager" },
          { key: "forgeOverview", displayName: "The Forge Overview" },
          { key: "brandFlipbook", displayName: "Brand Flipbook" },
        ]}
        fields={[
          { key: "title", label: "Title", type: "string" },
          { key: "description", label: "Description", type: "textarea" },
        ]}
        value={value.items || {}}
        onChange={(v) => set(value, "items", v, onChange)}
      />
    </div>
  );
}

// ─── [09] CTA BRIDGE / PARTNERS ──────────────────────────────────

export function CtaBridgeEditor({ value, onChange }: { value: V; onChange: OnChange }) {
  return (
    <div className="space-y-4">
      <StringField label="Section Label" value={value.label || ""} onChange={(v) => set(value, "label", v, onChange)} />
      <StringField label="Headline Line 1" value={value.headline1 || ""} onChange={(v) => set(value, "headline1", v, onChange)} />
      <StringField label="Headline Line 2" value={value.headline2 || ""} onChange={(v) => set(value, "headline2", v, onChange)} />
      <TextareaField label="Description" value={value.description || ""} onChange={(v) => set(value, "description", v, onChange)} rows={3} />
      <StringField label="Logo Section Label" value={value.logoLabel || ""} onChange={(v) => set(value, "logoLabel", v, onChange)} />
      <StringField label="Partner CTA" value={value.partnerWithUs || ""} onChange={(v) => set(value, "partnerWithUs", v, onChange)} />
    </div>
  );
}

// ─── [10] GET INVOLVED ───────────────────────────────────────────

export function GetInvolvedEditor({ value, onChange }: { value: V; onChange: OnChange }) {
  return (
    <div className="space-y-4">
      <StringField label="Headline Line 1" value={value.headline1 || ""} onChange={(v) => set(value, "headline1", v, onChange)} />
      <StringField label="Headline Line 2" value={value.headline2 || ""} onChange={(v) => set(value, "headline2", v, onChange)} />
    </div>
  );
}
