"use client";

interface TextareaFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

export default function TextareaField({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
}: TextareaFieldProps) {
  return (
    <div className="space-y-1.5">
      <label
        className="block text-[11px] uppercase tracking-wider text-black/40"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full bg-white text-true-black px-3 py-2 text-sm rounded-md border border-black/10 focus:border-cobalt focus:outline-none placeholder:text-black/20 resize-y"
      />
    </div>
  );
}
