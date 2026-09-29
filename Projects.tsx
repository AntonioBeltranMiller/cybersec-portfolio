'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight, Clock } from 'lucide-react'
import { projects } from '@/lib/content'

export default function Projects() {
  const spotlight = projects.filter((p) => p.spotlight)
  const rest = projects.filter((p) => !p.spotlight)

  return (
    <section id="projects" className="py-20 px-4 scroll-mt-16">
      <div className="container mx-auto max-w-5xl">
        <header className="mb-12">
          <p className="font-mono text-sm text-amber-400">01 / projects</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-100">Projects &amp; research</h2>
          <p className="mt-3 text-slate-400 max-w-2xl">
            Home-lab builds and bug bounty work. Each write-up is honest about what I built, what I based it on,
            and what the screenshots actually show.
          </p>
        </header>

        {/* Spotlight: the two strongest, elevated */}
        <div className="grid md:grid-cols-2 gap-6">
          {spotlight.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                href={`/projects/${p.slug}`}
                className="group relative block h-full rounded-2xl p-7 bg-gradient-to-b from-amber-500/[0.06] to-slate-900/40 border border-amber-600/25 ring-1 ring-amber-500/10 hover:border-amber-500/50 hover:ring-amber-500/20 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="font-mono text-xs text-amber-400/80">{p.kind}</span>
                  <ArrowUpRight className="w-5 h-5 text-slate-600 group-hover:text-amber-400 transition-colors shrink-0" />
                </div>
                <h3 className="mt-3 text-2xl font-bold text-slate-100 group-hover:text-amber-200 transition-colors">
                  {p.title}
                </h3>
                <p className="mt-3 text-slate-300 text-sm leading-relaxed">{p.card}</p>

                {p.highlight && (
                  <p className="mt-5 border-l-2 border-amber-500/40 pl-4 text-slate-300 italic leading-relaxed">
                    &ldquo;{p.highlight}&rdquo;
                  </p>
                )}

                <p className="mt-5 text-sm text-emerald-400/90 font-medium">{p.result}</p>

                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {p.tags.slice(0, 4).map((t) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-slate-800/60 border border-slate-700 text-slate-300">
                      {t}
                    </span>
                  ))}
                  {p.readTime && (
                    <span className="ml-auto inline-flex items-center gap-1 text-xs text-slate-500">
                      <Clock className="w-3.5 h-3.5" /> {p.readTime}
                    </span>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* The rest, quieter */}
        <div className="mt-6 grid md:grid-cols-2 gap-5">
          {rest.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <Link
                href={`/projects/${p.slug}`}
                className="group block h-full panel rounded-xl p-6 hover:border-amber-600/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="font-mono text-xs text-slate-500">{p.kind}</span>
                  <ArrowUpRight className="w-5 h-5 text-slate-600 group-hover:text-amber-400 transition-colors shrink-0" />
                </div>
                <h3 className="mt-3 text-lg font-semibold text-slate-100 group-hover:text-amber-300 transition-colors">
                  {p.title}
                </h3>
                <p className="mt-2 text-slate-400 text-sm leading-relaxed">{p.card}</p>
                {p.highlight && (
                  <p className="mt-3 text-sm text-slate-400 italic leading-relaxed">&ldquo;{p.highlight}&rdquo;</p>
                )}
                <p className="mt-3 text-sm text-emerald-400/90 font-medium">{p.result}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
