"use client";

import {
  HeroEditor,
  AboutEditor,
  TestimonialsEditor,
  AudienceEditor,
  StatsEditor,
  InitiativesEditor,
  FounderEditor,
  ResourcesEditor,
  CtaBridgeEditor,
  GetInvolvedEditor,
} from "./editors/SectionEditors";

/* eslint-disable @typescript-eslint/no-explicit-any */

interface SectionEditorProps {
  section: string;
  value: Record<string, any>;
  onChange: (value: Record<string, any>) => void;
}

export default function SectionEditor({
  section,
  value,
  onChange,
}: SectionEditorProps) {
  switch (section) {
    case "hero":
      return <HeroEditor value={value} onChange={onChange} />;
    case "about":
      return <AboutEditor value={value} onChange={onChange} />;
    case "testimonials":
      return <TestimonialsEditor value={value} onChange={onChange} />;
    case "audience":
      return <AudienceEditor value={value} onChange={onChange} />;
    case "stats":
      return <StatsEditor value={value} onChange={onChange} />;
    case "initiatives":
      return <InitiativesEditor value={value} onChange={onChange} />;
    case "founder":
      return <FounderEditor value={value} onChange={onChange} />;
    case "resources":
      return <ResourcesEditor value={value} onChange={onChange} />;
    case "ctaBridge":
      return <CtaBridgeEditor value={value} onChange={onChange} />;
    case "getInvolved":
      return <GetInvolvedEditor value={value} onChange={onChange} />;
    default:
      return null;
  }
}
