import type { Disposition } from '@/lib/content'

// One color per analyst call, used on every write-up card and post.
const styles: Record<Disposition, string> = {
  Resolved: 'bg-emerald-500/10 border-emerald-600/40 text-emerald-300',
  Malicious: 'bg-rose-500/10 border-rose-600/40 text-rose-300',
  Benign: 'bg-sky-500/10 border-sky-600/40 text-sky-300',
  Inconclusive: 'bg-amber-500/10 border-amber-600/40 text-amber-300',
}

export default function DispositionBadge({ value }: { value: Disposition }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${styles[value]}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" aria-hidden />
      {value}
    </span>
  )
}
