"use client";

export function Logo({
  variant = "stacked",
  color = "black",
  className = "",
}: {
  variant?: "stacked" | "horizontal" | "monogram";
  color?: "black" | "white";
  className?: string;
}) {
  const fillColor = color === "white" ? "#FFFDF7" : "#000000";

  if (variant === "monogram") {
    return (
      <svg
        viewBox="0 0 80 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="BCC"
      >
        {/* B */}
        <path
          d="M2 4h8c3 0 5 1.5 5 4 0 1.8-1 3-2.5 3.5C14.2 12 15.5 13.5 15.5 16c0 3-2.2 4.5-5.5 4.5H2V4zm4 6h3.5c1.2 0 2-.7 2-1.8s-.8-1.7-2-1.7H6v3.5zm0 7h4c1.3 0 2.2-.8 2.2-2s-.9-2-2.2-2H6v4z"
          fill={fillColor}
        />
        {/* C */}
        <path
          d="M20 12c0-5 3.5-8.5 8.5-8.5 3 0 5.2 1.5 6.3 3.8l-3.5 1.5c-.6-1.2-1.6-1.8-2.8-1.8-2.8 0-4.5 2-4.5 5s1.7 5 4.5 5c1.2 0 2.2-.6 2.8-1.8l3.5 1.5c-1.1 2.3-3.3 3.8-6.3 3.8C23.5 20.5 20 17 20 12z"
          fill={fillColor}
        />
        {/* C */}
        <path
          d="M38 12c0-5 3.5-8.5 8.5-8.5 3 0 5.2 1.5 6.3 3.8l-3.5 1.5c-.6-1.2-1.6-1.8-2.8-1.8-2.8 0-4.5 2-4.5 5s1.7 5 4.5 5c1.2 0 2.2-.6 2.8-1.8l3.5 1.5c-1.1 2.3-3.3 3.8-6.3 3.8C41.5 20.5 38 17 38 12z"
          fill={fillColor}
        />
        {/* Bracket */}
        <rect x="58" y="4" width="2.5" height="16.5" fill={fillColor} />
        <rect x="58" y="4" width="8" height="2.5" fill={fillColor} />
        <rect x="58" y="18" width="8" height="2.5" fill={fillColor} />
        <rect x="70" y="4" width="2.5" height="16.5" fill={fillColor} />
        <rect x="64" y="4" width="8" height="2.5" fill={fillColor} />
        <rect x="64" y="18" width="8" height="2.5" fill={fillColor} />
      </svg>
    );
  }

  if (variant === "horizontal") {
    return (
      <span
        className={`font-heading text-lg tracking-[-0.02em] whitespace-nowrap ${className}`}
        style={{ color: fillColor }}
        aria-label="Beyond Code Collective"
      >
        BEY0ND C0DE C0LLECT1VE
      </span>
    );
  }

  // Stacked (primary)
  return (
    <span
      className={`font-heading leading-[0.85] tracking-[-0.02em] block ${className}`}
      style={{ color: fillColor }}
      aria-label="Beyond Code Collective"
    >
      BEY0ND
      <br />
      C0DE
      <br />
      C0LLECT1VE
    </span>
  );
}
