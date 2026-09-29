// A small, designed section label — an accent rule plus uppercase text.
// Replaces the "01 / projects" numbered eyebrow that reads as a template.
export default function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-8 bg-amber-500/70" />
      <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-400/90">{children}</span>
    </div>
  )
}
