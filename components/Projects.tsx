'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, Clock } from 'lucide-react'
import { projects } from '@/lib/content'
import Kicker from './Kicker'

export default function Projects() {
  const spotlight = projects.filter((p) => p.spotlight && !p.hideFromHome)
  const rest = projects.filter((p) => !p.spotlight && !p.hideFromHome)
  // still live pages, but secondary to a SOC application, so listed as links only
  const other = projects.filter((p) => p.hideFromHome)

  return (
    <section id="projects" className="py-24 px-4 scroll-mt-16">
      <div className="container mx-auto max-w-5xl">
        <header className="mb-14 max-w-2xl">
          <Kicker>Cases &amp; projects</Kicker>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-slate-100">
            Alert triage first, then the lab work behind it
          </h2>
          <p className="mt-4 text-slate-400 leading-relaxed">
            A full alert investigation, the detection lab where I write and tune rules, and the honeypot where I study
            live attack traffic. Each one says what I built, what it was based on, and what the evidence shows.
          </p>
        </header>

        {/* Spotlight: the alert investigation and the detection lab */}
        <div className="grid lg:grid-cols-2 gap-6">
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
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 hover:border-amber-500/40 transition-colors"
              >
                {p.cover && (
                  <div className="relative aspect-[16/9] overflow-hidden bg-slate-950">
                    <Image
                      src={p.cover}
                      alt={`${p.title} preview`}
                      fill
                      className="object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500"
                      sizes="(max-width:1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                    <span className="absolute top-4 left-4 text-xs font-mono px-2.5 py-1 rounded-full bg-slate-950/70 backdrop-blur border border-amber-500/30 text-amber-300">
                      {p.kind}
                    </span>
                  </div>
                )}
                <div className="flex flex-1 flex-col p-7">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-2xl font-bold text-slate-100 group-hover:text-amber-200 transition-colors">
                      {p.title}
                    </h3>
                    <ArrowUpRight className="w-5 h-5 text-slate-600 group-hover:text-amber-400 transition-colors shrink-0 mt-1" />
                  </div>
                  <p className="mt-3 text-slate-300 text-sm leading-relaxed">{p.card}</p>
                  {p.highlight && (
                    <p className="mt-5 border-l-2 border-amber-500/40 pl-4 text-slate-300 italic leading-relaxed">
                      &ldquo;{p.highlight}&rdquo;
                    </p>
                  )}
                  <p className="mt-5 text-sm text-emerald-400/90 font-medium">{p.result}</p>
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    {p.tags.slice(0, 4).map((t) => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-slate-800/70 border border-slate-700 text-slate-300">
                        {t}
                      </span>
                    ))}
                    {p.readTime && (
                      <span className="ml-auto inline-flex items-center gap-1 text-xs text-slate-500">
                        <Clock className="w-3.5 h-3.5" /> {p.readTime}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* The rest, with a compact preview */}
        <div className={`mt-6 grid gap-6 ${rest.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
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
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900/40 hover:border-amber-500/40 transition-colors"
              >
                {p.cover && (
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                    <Image
                      src={p.cover}
                      alt={`${p.title} preview`}
                      fill
                      className="object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5">
                  <span className="font-mono text-[11px] text-slate-500">{p.kind}</span>
                  <h3 className="mt-2 text-base font-semibold text-slate-100 group-hover:text-amber-300 transition-colors leading-snug">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-slate-400 text-sm leading-relaxed">{p.card}</p>
                  <p className="mt-auto pt-4 text-xs text-emerald-400/90 font-medium">{p.result}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {other.length > 0 && (
          <p className="mt-8 text-sm text-slate-500">
            Other research:{' '}
            {other.map((p, i) => (
              <span key={p.slug}>
                {i > 0 && ' · '}
                <Link href={`/projects/${p.slug}`} className="text-slate-300 hover:text-amber-400 underline-offset-4 hover:underline transition-colors">
                  {p.title}
                </Link>
              </span>
            ))}
          </p>
        )}
      </div>
    </section>
  )
}
