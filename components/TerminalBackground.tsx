'use client'

// Quiet, static backdrop: a faint blueprint grid with two low-opacity
// gradient washes. No animation loops, no matrix rain; it should recede.
export default function Background() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 bg-grid pointer-events-none">
      <div className="absolute inset-0 bg-[#0a0f1a]/40" />
      <div className="absolute -top-40 -left-40 h-[38rem] w-[38rem] rounded-full bg-amber-500/[0.06] blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[32rem] w-[32rem] rounded-full bg-blue-600/[0.05] blur-3xl" />
    </div>
  )
}
