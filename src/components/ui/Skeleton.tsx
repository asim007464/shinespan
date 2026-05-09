"use client";

export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-[length:200%_100%] ${className}`}
      aria-hidden
    />
  );
}
