'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Github, Info, ZoomIn, X, ChevronLeft, ChevronRight, Clock, CheckCircle2, Lightbulb, FileText, ArrowUpRight } from 'lucide-react'
import type { Project } from '@/lib/content'
import { writeups, projects } from '@/lib/content'

export default function ProjectView({ project }: { project: Project }) {
  const [index, setIndex] = useState<number | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const evidence = project.evidence
  const related = writeups.filter((w) => w.related?.slug === project.slug)
  // next project in the list, wrapping around, for continuous browsing
  const order = projects.findIndex((p) => p.slug === project.slug)
  const nextProject = order >= 0 ? projects[(order + 1) % projects.length] : null

  const close = useCallback(() => setIndex(null), [])
  const prev = useCallback(() => setIndex((i) => (i === null ? i : (i - 1 + evidence.length) % evidence.length)), [evidence.length])
  const next = useCallback(() => setIndex((i) => (i === null ? i : (i + 1) % evidence.length)), [evidence.length])

  // Keyboard support for the lightbox: Escape closes, arrows navigate.
  useEffect(() => {
    if (index === null) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, close, prev, next])

  return (
    <div className="pt-24 pb-10 px-4">
      <div className="container mx-auto max-w-3xl">
        <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-amber-400 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to projects
        </Link>

        {/* Header */}
        <header className="mt-8">
          <p className="font-mono text-sm text-amber-400">{project.kind}</p>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold text-slate-100">{project.title}</h1>
          <div className="mt-3 flex items-center gap-4 text-sm font-mono text-slate-400">
            <span>{project.timeline}</span>
            {project.readTime && (
              <span className="inline-flex items-center gap-1 text-slate-500">
                <Clock className="w-3.5 h-3.5" /> {project.readTime}
              </span>
            )}
          </div>
          <p className="mt-5 text-lg text-emerald-400/90 font-medium">{project.result}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-slate-800/60 border border-slate-700 text-slate-400">
                {t}
              </span>
            ))}
          </div>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 transition-colors"
            >
              <Github className="w-4 h-4" /> View the code
            </a>
          )}
        </header>

        {project.credit && (
          <div className="mt-8 flex gap-3 rounded-xl border border-slate-700/70 bg-slate-800/30 p-4">
            <Info className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
            <p className="text-sm text-slate-400 leading-relaxed">{project.credit}</p>
          </div>
        )}

        {/* Metrics */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
          {project.metrics.map((m) => (
            <div key={m.label} className="panel rounded-lg p-4">
              <div className="text-lg font-bold text-amber-300 leading-tight">{m.value}</div>
              <div className="text-xs text-slate-400 mt-1">{m.label}</div>
              {m.note && <div className="text-[11px] text-slate-500 mt-1">{m.note}</div>}
            </div>
          ))}
        </div>

        {/* Why */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-slate-100">Why I built it</h2>
          <p className="mt-3 text-slate-300 leading-relaxed">{project.why}</p>
        </section>

        {/* Built */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-slate-100">What I built</h2>
          <ul className="mt-4 space-y-3">
            {project.built.map((b, i) => (
              <li key={i} className="flex gap-3 text-slate-300 leading-relaxed">
                <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Application to production */}
        {project.application && (
          <section className="mt-10">
            <div className="rounded-xl border border-amber-800/40 bg-amber-950/10 p-5">
              <h2 className="text-sm font-mono text-amber-300">In a real SOC</h2>
              <p className="mt-3 text-slate-300 leading-relaxed">{project.application}</p>
            </div>
          </section>
        )}

        {/* Evidence */}
        {evidence.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-semibold text-slate-100">Evidence</h2>
            <p className="mt-2 text-sm text-slate-500">Every figure on this page maps to one of these. Click to enlarge.</p>
            <div className="mt-5 grid sm:grid-cols-2 gap-4">
              {evidence.map((e, i) => (
                <button key={e.src} onClick={() => setIndex(i)} className="group text-left">
                  <div className="relative aspect-video rounded-lg overflow-hidden border border-slate-800 bg-slate-900">
                    <Image src={e.src} alt={e.label} fill className="object-cover object-top" sizes="(max-width:640px) 100vw, 50vw" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <ZoomIn className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-slate-400 leading-snug">{e.label}</p>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Learned */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-slate-100">What I learned</h2>
          <ul className="mt-4 space-y-3">
            {project.learned.map((l, i) => (
              <li key={i} className="flex gap-3 text-slate-300 leading-relaxed">
                <Lightbulb className="w-5 h-5 text-amber-400/80 shrink-0 mt-0.5" />
                <span>{l}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Related write-ups from this project */}
        {related.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-semibold text-slate-100">From this project</h2>
            <p className="mt-2 text-sm text-slate-500">Single events from the honeypot logs I wrote up in more detail.</p>
            <div className="mt-4 grid sm:grid-cols-2 gap-3">
              {related.map((w) => (
                <Link
                  key={w.slug}
                  href={`/blog/${w.slug}`}
                  className="group flex items-start gap-3 panel rounded-lg p-4 hover:border-amber-600/50 transition-colors"
                >
                  <FileText className="w-5 h-5 text-slate-500 group-hover:text-amber-400 transition-colors shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-200 group-hover:text-amber-300 transition-colors leading-snug">{w.title}</p>
                    <p className="text-xs text-slate-500 mt-1">{w.readTime}</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-amber-400 transition-colors shrink-0 ml-auto" />
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-12 pt-8 border-t border-slate-800 flex items-center justify-between gap-4">
          <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-amber-300 transition-colors">
            <ArrowLeft className="w-4 h-4" /> All projects
          </Link>
          {nextProject && nextProject.slug !== project.slug && (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group inline-flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 transition-colors text-right"
            >
              <span className="flex flex-col items-end">
                <span className="text-xs text-slate-500">Next project</span>
                <span className="font-medium">{nextProject.title}</span>
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          )}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {index !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={evidence[index].label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          >
            <button ref={closeRef} onClick={close} className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700" aria-label="Close (Esc)">
              <X className="w-5 h-5" />
            </button>
            {evidence.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prev() }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-800/80 hover:bg-slate-700"
                  aria-label="Previous (←)"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); next() }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-800/80 hover:bg-slate-700"
                  aria-label="Next (→)"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
            <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
              <div className="relative w-full" style={{ height: '80vh' }}>
                <Image src={evidence[index].src} alt={evidence[index].label} fill className="object-contain" sizes="100vw" />
              </div>
              <p className="mt-3 text-center text-sm text-slate-300">
                {evidence[index].label}
                {evidence.length > 1 && <span className="text-slate-500"> · {index + 1} / {evidence.length}</span>}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
