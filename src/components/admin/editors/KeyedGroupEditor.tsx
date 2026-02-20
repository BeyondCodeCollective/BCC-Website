"use client";

import { useState } from "react";
import { CaretDown, CaretRight } from "@phosphor-icons/react";
import StringField from "./StringField";
import TextareaField from "./TextareaField";
import { ArrayEditorString } from "./ArrayEditor";

export interface GroupField {
  key: string;
  label: string;
  type: "string" | "textarea" | "string-array";
}

interface KeyedGroupEditorProps {
  label: string;
  keys: { key: string; displayName: string }[];
  fields: GroupField[];
  value: Record<string, Record<string, unknown>>;
  onChange: (value: Record<string, Record<string, unknown>>) => void;
}

export default function KeyedGroupEditor({
  label,
  keys,
  fields,
  value,
  onChange,
}: KeyedGroupEditorProps) {
  const [openKey, setOpenKey] = useState<string | null>(keys[0]?.key ?? null);

  const updateGroupField = (
    groupKey: string,
    fieldKey: string,
    fieldValue: unknown
  ) => {
    onChange({
      ...value,
      [groupKey]: {
        ...(value[groupKey] || {}),
        [fieldKey]: fieldValue,
      },
    });
  };

  return (
    <div className="space-y-1.5">
      <label
        className="block text-[11px] uppercase tracking-wider text-black/40"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {label}
      </label>
      <div className="space-y-1">
        {keys.map(({ key, displayName }) => {
          const isOpen = openKey === key;
          const group = (value[key] || {}) as Record<string, unknown>;
          return (
            <div
              key={key}
              className="bg-black/[0.02] rounded-md border border-black/5 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenKey(isOpen ? null : key)}
                className="w-full flex items-center gap-2 px-3 py-2.5 text-left hover:bg-black/[0.02] transition-colors"
              >
                {isOpen ? (
                  <CaretDown size={12} weight="bold" className="text-black/40" />
                ) : (
                  <CaretRight size={12} weight="bold" className="text-black/40" />
                )}
                <span
                  className="text-xs uppercase tracking-wider text-black/60"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {displayName}
                </span>
              </button>
              {isOpen && (
                <div className="px-3 pb-3 space-y-3">
                  {fields.map((field) => {
                    if (field.type === "textarea") {
                      return (
                        <TextareaField
                          key={field.key}
                          label={field.label}
                          value={(group[field.key] as string) || ""}
                          onChange={(v) =>
                            updateGroupField(key, field.key, v)
                          }
                        />
                      );
                    }
                    if (field.type === "string-array") {
                      return (
                        <ArrayEditorString
                          key={field.key}
                          label={field.label}
                          items={
                            (group[field.key] as string[]) || []
                          }
                          onChange={(v) =>
                            updateGroupField(key, field.key, v)
                          }
                        />
                      );
                    }
                    return (
                      <StringField
                        key={field.key}
                        label={field.label}
                        value={(group[field.key] as string) || ""}
                        onChange={(v) =>
                          updateGroupField(key, field.key, v)
                        }
                      />
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
