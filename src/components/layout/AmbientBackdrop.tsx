/** Slow-moving radial gradients — shared across all pages (no section seams). */
export function AmbientBackdrop() {
  return (
    <div className="ambient-backdrop" aria-hidden>
      <div className="ambient-orb ambient-orb-a" />
      <div className="ambient-orb ambient-orb-b" />
      <div className="ambient-orb ambient-orb-c" />
    </div>
  );
}
