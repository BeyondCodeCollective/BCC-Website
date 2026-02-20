"use client";

import { Trash, ArrowUp, ArrowDown, Plus } from "@phosphor-icons/react";

interface ArrayEditorStringProps {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  addLabel?: string;
}

export function ArrayEditorString({
  label,
  items,
  onChange,
  addLabel = "Add Item",
}: ArrayEditorStringProps) {
  const update = (index: number, value: string) => {
    const next = [...items];
    next[index] = value;
    onChange(next);
  };
  const remove = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };
  const moveUp = (index: number) => {
    if (index === 0) return;
    const next = [...items];
    [next[index - 1], next[index]] = [next[index], next[index - 1]];
    onChange(next);
  };
  const moveDown = (index: number) => {
    if (index === items.length - 1) return;
    const next = [...items];
    [next[index], next[index + 1]] = [next[index + 1], next[index]];
    onChange(next);
  };
  const add = () => onChange([...items, ""]);

  return (
    <div className="space-y-1.5">
      <label
        className="block text-[11px] uppercase tracking-wider text-black/40"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {label}
      </label>
      <div className="space-y-1.5">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <input
              type="text"
              value={item}
              onChange={(e) => update(i, e.target.value)}
              className="flex-1 bg-white text-true-black px-3 py-2 text-sm rounded-md border border-black/10 focus:border-cobalt focus:outline-none"
            />
            <button
              type="button"
              onClick={() => moveUp(i)}
              className="p-1.5 text-black/30 hover:text-black/60 transition-colors"
              title="Move up"
            >
              <ArrowUp size={14} weight="bold" />
            </button>
            <button
              type="button"
              onClick={() => moveDown(i)}
              className="p-1.5 text-black/30 hover:text-black/60 transition-colors"
              title="Move down"
            >
              <ArrowDown size={14} weight="bold" />
            </button>
            <button
              type="button"
              onClick={() => remove(i)}
              className="p-1.5 text-black/30 hover:text-[#D32F2F] transition-colors"
              title="Remove"
            >
              <Trash size={14} weight="bold" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="flex items-center gap-1.5 text-xs text-cobalt hover:text-cobalt/70 transition-colors mt-1"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        <Plus size={12} weight="bold" />
        {addLabel}
      </button>
    </div>
  );
}

interface ArrayEditorObjectProps {
  label: string;
  items: Record<string, string>[];
  fields: { key: string; label: string; multiline?: boolean }[];
  onChange: (items: Record<string, string>[]) => void;
  addLabel?: string;
}

export function ArrayEditorObject({
  label,
  items,
  fields,
  onChange,
  addLabel = "Add Item",
}: ArrayEditorObjectProps) {
  const updateField = (
    index: number,
    fieldKey: string,
    value: string
  ) => {
    const next = items.map((item, i) =>
      i === index ? { ...item, [fieldKey]: value } : item
    );
    onChange(next);
  };
  const remove = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };
  const moveUp = (index: number) => {
    if (index === 0) return;
    const next = [...items];
    [next[index - 1], next[index]] = [next[index], next[index - 1]];
    onChange(next);
  };
  const moveDown = (index: number) => {
    if (index === items.length - 1) return;
    const next = [...items];
    [next[index], next[index + 1]] = [next[index + 1], next[index]];
    onChange(next);
  };
  const add = () => {
    const blank: Record<string, string> = {};
    for (const f of fields) blank[f.key] = "";
    onChange([...items, blank]);
  };

  return (
    <div className="space-y-2">
      <label
        className="block text-[11px] uppercase tracking-wider text-black/40"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {label}
      </label>
      {items.map((item, i) => (
        <div
          key={i}
          className="bg-black/[0.02] rounded-md border border-black/5 p-3 space-y-2"
        >
          <div className="flex items-center justify-between mb-1">
            <span
              className="text-[10px] uppercase tracking-wider text-black/30"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Item {i + 1}
            </span>
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                onClick={() => moveUp(i)}
                className="p-1 text-black/30 hover:text-black/60 transition-colors"
              >
                <ArrowUp size={12} weight="bold" />
              </button>
              <button
                type="button"
                onClick={() => moveDown(i)}
                className="p-1 text-black/30 hover:text-black/60 transition-colors"
              >
                <ArrowDown size={12} weight="bold" />
              </button>
              <button
                type="button"
                onClick={() => remove(i)}
                className="p-1 text-black/30 hover:text-[#D32F2F] transition-colors"
              >
                <Trash size={12} weight="bold" />
              </button>
            </div>
          </div>
          {fields.map((field) => (
            <div key={field.key} className="space-y-1">
              <label
                className="block text-[10px] uppercase tracking-wider text-black/30"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {field.label}
              </label>
              {field.multiline ? (
                <textarea
                  value={item[field.key] || ""}
                  onChange={(e) =>
                    updateField(i, field.key, e.target.value)
                  }
                  rows={3}
                  className="w-full bg-white text-true-black px-3 py-2 text-sm rounded-md border border-black/10 focus:border-cobalt focus:outline-none resize-y"
                />
              ) : (
                <input
                  type="text"
                  value={item[field.key] || ""}
                  onChange={(e) =>
                    updateField(i, field.key, e.target.value)
                  }
                  className="w-full bg-white text-true-black px-3 py-2 text-sm rounded-md border border-black/10 focus:border-cobalt focus:outline-none"
                />
              )}
            </div>
          ))}
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="flex items-center gap-1.5 text-xs text-cobalt hover:text-cobalt/70 transition-colors"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        <Plus size={12} weight="bold" />
        {addLabel}
      </button>
    </div>
  );
}
