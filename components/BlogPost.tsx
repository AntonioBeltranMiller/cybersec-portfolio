'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, AlertTriangle, Eye, ArrowUpRight } from 'lucide-react'
import type { Writeup } from '@/lib/content'
import DispositionBadge from './DispositionBadge'

export default function BlogPost({ post }: { post: Writeup }) {
  const isIncident = post.kind === 'incident'

  return (
    <article className="pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <div>
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-amber-400 transition-colors">
            <ArrowLeft className="w-4 h-4" /> All write-ups
          </Link>
        </div>

        {/* Breadcrumb back to the source project */}
        {post.related && (
          <div className="mt-4">
            <Link
              href={`/projects/${post.related.slug}`}
              className="inline-flex items-center gap-2 text-xs font-mono text-slate-500 hover:text-amber-400 transition-colors"
            >
              Part of: {post.related.title} <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        <motion.header initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-5">
          <div className="flex items-center gap-3 flex-wrap">
            <span
              className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border ${
                isIncident
                  ? 'bg-rose-500/10 border-rose-600/30 text-rose-300'
                  : 'bg-slate-800/60 border-slate-700 text-slate-400'
              }`}
            >
              {isIncident ? <AlertTriangle className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              {post.category}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-slate-500">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-slate-500">
              <Clock className="w-3.5 h-3.5" /> {post.readTime}
            </span>
          </div>

          <h1 className="mt-4 text-3xl md:text-4xl font-bold text-slate-100 leading-tight">{post.title}</h1>
        </motion.header>

        <p className="mt-6 text-lg text-slate-300 leading-relaxed">{post.summary}</p>

        {/* Triage summary: what a reviewer needs before reading the narrative */}
        <section className="mt-8 rounded-xl border border-slate-700/70 bg-slate-900/60 overflow-hidden" aria-label="Triage summary">
          <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-slate-800">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400">Triage summary</h2>
            <DispositionBadge value={post.disposition} />
          </div>
          <dl className="divide-y divide-slate-800/70">
            {post.ticket.map((t) => (
              <div key={t.label} className="grid grid-cols-[8.5rem_1fr] gap-3 px-5 py-2.5 text-sm">
                <dt className="text-slate-500">{t.label}</dt>
                <dd className="text-slate-200 break-words">{t.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="mt-10 space-y-9">
          {post.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-lg font-semibold text-slate-100">{s.heading}</h2>
              {s.body && <p className="mt-3 text-slate-300 leading-relaxed">{s.body}</p>}
              {s.items && (
                <ul className="mt-4 space-y-2.5">
                  {s.items.map((it, i) => (
                    <li key={i} className="flex gap-2.5 text-slate-300 leading-relaxed">
                      <span className="text-amber-500 mt-0.5 shrink-0">▸</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {post.reflection && (
          <section className="mt-10 rounded-xl border border-slate-700/70 bg-slate-800/30 p-5">
            <h2 className="text-sm font-mono text-amber-300">Lessons learned</h2>
            <p className="mt-3 text-slate-300 leading-relaxed">{post.reflection}</p>
          </section>
        )}

        {post.related && (
          <div className="mt-10 pt-8 border-t border-slate-800">
            <Link
              href={`/projects/${post.related.slug}`}
              className="inline-flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to {post.related.title}
            </Link>
          </div>
        )}
      </div>
    </article>
  )
}
