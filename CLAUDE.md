# CLAUDE.md — Creative Web Development Standards

## Philosophy

Every website we build should feel **designed**, not generated. The difference between "vibe coded" and "creative" is intentionality — every element earns its place, every animation has purpose, every color choice traces back to a system.

## Design Principles

### 1. Start With the Brand System, Not the Code
- Extract a full design language BEFORE writing components: colors, typography scale, spacing rhythm, motion language, voice rules
- Define brand tokens as CSS custom properties / Tailwind theme — never hardcode hex values or font names in components
- Every visual decision should be traceable to the brand guide or a deliberate creative choice

### 2. Typography Is the Design
- Treat type as the primary design element, not decoration
- Define a strict hierarchy: headline face, body face, mono/caption face — each with specific tracking, leading, and casing rules
- Use `clamp()` for fluid type scaling instead of rigid breakpoints
- Headlines should feel physical — large, tight leading (0.85–0.9), negative tracking
- Mono/caption text anchors the editorial feel: section labels, counters, metadata

### 3. Color With Intention
- Backgrounds define the section mood. Alternate between light/dark/accent backgrounds to create rhythm as you scroll
- Use high-contrast accent colors sparingly for CTAs, highlights, and labels — not everywhere
- Reserve at least one "surprise" color pairing (e.g., Electric Green on Cobalt Blue) for key moments
- Grayscale/opacity for secondary elements — let hierarchy breathe

### 4. Motion That Means Something
- Every animation should communicate: reveals show hierarchy, transitions show connection, loops show life
- Scroll-triggered `whileInView` animations with `once: true` — things appear once, they don't replay
- Stagger children (0.1–0.2s delays) to create visual flow, not simultaneous pops
- Background motion should be ambient (slow, low-opacity) — never distracting
- Interactive elements get immediate, snappy feedback (0.2–0.4s transitions)
- One signature animation per site (e.g., shuffle text, pixel transitions) — don't overdo it

### 5. Interactive Elements Should Be Discoverable
- If something looks clickable, it should do something. If it does something, make it look clickable
- Hover states, active states, and selected states should all be visually distinct
- Connect UI elements: thumbnails control hero images, nav links smooth-scroll, counters reflect state
- Use `AnimatePresence` for content swaps — never just pop in/out

### 6. Editorial Layout, Not Template Layout
- Break out of the single-column default. Use asymmetric grids, alternating layouts, full-bleed sections
- Section labels with bracket notation `[01]`, numbering, and mono-spaced metadata create editorial structure
- Mix content density: some sections are spacious and dramatic, others are compact and information-rich
- Photos should feel curated, not stock. Crop tightly, use real aspect ratios, vary sizes

### 7. Responsive Is Not an Afterthought
- Design mobile-first but think desktop-first about impact
- Use `clamp()`, `minmax()`, and fluid grids — not just stacking columns at breakpoints
- Large typography and hero images should still feel dramatic on mobile
- Test at 375px, 768px, 1024px, 1440px minimum

## Technical Standards

### Stack Preferences
- **Next.js** (App Router) + TypeScript + Tailwind CSS
- **Framer Motion** for animation (not CSS animations for complex interactions)
- Self-hosted fonts when possible (faster, more reliable than Google Fonts for brand fonts)
- `next/image` with proper `sizes` attributes for all images

### Code Patterns
- Brand tokens live in `globals.css` as `@theme inline` (Tailwind v4) or `tailwind.config` — single source of truth
- Constants file (`lib/constants.ts`) for all copy, links, and data — components stay clean
- Components are self-contained sections, imported and composed in `page.tsx`
- Use `"use client"` only on components that need interactivity or motion
- Inline `style={{ fontFamily: "var(--font-mono)" }}` when Tailwind utility classes don't apply the right font

### Image Guidelines
- Unsplash for placeholders — always specify `w`, `h`, `fit`, and `crop` parameters
- Face photos: use `crop=face` for consistent framing
- Every `<Image>` gets a meaningful `alt` and correct `sizes`
- Mix photo sizes/aspect ratios across sections for visual variety

### Animation Patterns
```
// Scroll reveal — use on most section content
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6 }}

// Staggered children — use for lists/grids
transition={{ delay: 0.1 * index, duration: 0.6 }}

// Content swap — use for carousels/toggles
<AnimatePresence mode="wait">
  <motion.div key={id}
    initial={{ opacity: 0, scale: 1.05 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.4 }}
  />
</AnimatePresence>

// Ambient background — use for floating elements
animate={{ y: [0, -20, 8, -12, 0], x: [0, 8, -6, 4, 0] }}
transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
```

## Voice & Copy
- Write headlines that are bold, active, and short. Not marketing fluff
- Body copy should be clear and direct — one idea per paragraph
- Use the brand's specific vocabulary (check for red-zone words that should never appear)
- CTAs should be action-oriented: "Explore Initiatives" > "Learn More", "Join The Community" > "Sign Up"

## What Makes It Not Look "Vibe Coded"
1. **Consistent spacing rhythm** — not random padding values. Pick a scale (8px base) and stick to it
2. **Intentional color usage** — every color has a role, not just "it looked nice"
3. **Typography hierarchy you can feel** — squint at the page and the structure should be obvious
4. **Sections that create a journey** — dark → light → accent → dark creates rhythm and pacing
5. **Details that reward attention** — hover states, counters, bracket notation, photo overlays
6. **No orphaned elements** — everything connects to something. Thumbnails control images. Labels reference sections. Numbers count something real
7. **Whitespace is a design element** — don't fill every pixel. Let the bold elements breathe
