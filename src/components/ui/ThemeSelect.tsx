"use client";

import { useEffect, useId, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

export type ThemeSelectOption = { value: string; label: string };

type ThemeSelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: ThemeSelectOption[];
  /** Fallback label when value does not match any option */
  placeholder: string;
  id?: string;
  className?: string;
};

export function ThemeSelect({
  value,
  onChange,
  options,
  placeholder,
  id,
  className = "",
}: ThemeSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  const selected = options.find((o) => o.value === value);
  const labelText = selected?.label ?? placeholder;
  const showFilled = value !== "";

  useEffect(() => {
    function onDocMouseDown(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocMouseDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocMouseDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={rootRef} className={`relative mt-2 ${className}`}>
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-sm outline-none focus:ring-2 focus:ring-ss-blue-500/40"
      >
        <span className={showFilled ? "text-slate-900" : "text-slate-500"}>{labelText}</span>
        <FiChevronDown
          className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      {open ? (
        <ul
          id={listboxId}
          role="listbox"
          tabIndex={-1}
          className="absolute left-0 right-0 z-80 mt-1 max-h-60 overflow-y-auto rounded-2xl border border-slate-200 bg-white py-1 shadow-xl ring-1 ring-slate-100"
        >
          {options.map((opt) => (
            <li
              key={opt.value === "" ? "__empty__" : opt.value}
              role="option"
              aria-selected={value === opt.value}
              className={`cursor-pointer px-4 py-2.5 text-sm text-slate-700 hover:bg-ss-blue-50 ${
                value === opt.value ? "bg-ss-blue-50 font-medium text-ss-blue-800" : ""
              }`}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
