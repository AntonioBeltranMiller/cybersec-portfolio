'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Github, Linkedin, Mail, MapPin, ArrowRight, CalendarClock, ArrowUpRight } from 'lucide-react'
import { profile, projects } from '@/lib/content'

// The three cases a SOC manager should be able to click before scrolling:
// the alert triage first, then the lab work behind it.
const proof = projects.filter((p) => !p.hideFromHome && p.short && p.cover).slice(0, 3)

export default function Hero() {
  return (
    <section className="relative pt-32 pb-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/50 px-3 py-1 text-xs font-mono uppercase tracking-wider text-slate-300 mb-6">
            Open to SOC Analyst &amp; detection roles
          </span>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-100">
            {profile.name}
          </h1>

          <p className="mt-3 text-lg md:text-xl text-amber-300 font-mono">
            {profile.roles.join('  ·  ')}
          </p>

          <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-2xl">
            {profile.tagline}
          </p>

          <p className="mt-4 inline-flex items-start gap-2 text-sm text-emerald-300/90">
            <CalendarClock className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{profile.availability}</span>
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-amber-500 text-slate-950 font-medium hover:bg-amber-400 transition-colors"
            >
              See the work <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/resume.pdf"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-slate-700 text-slate-200 hover:border-amber-600/60 hover:text-amber-300 transition-colors"
            >
              Download résumé
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-slate-400 text-sm">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-4 h-4" /> {profile.location}
            </span>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-amber-400 transition-colors">
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-amber-400 transition-colors">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
            <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-1.5 hover:text-amber-400 transition-colors">
              <Mail className="w-4 h-4" /> Email
            </a>
          </div>
        </motion.div>

        {/* Proof row: real work, clickable, above the fold on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-12"
        >
          <p className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-3">Start here</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {proof.map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="group flex sm:flex-col items-center sm:items-stretch gap-3 sm:gap-0 overflow-hidden rounded-lg border border-slate-800 bg-slate-900/40 hover:border-amber-500/40 transition-colors"
              >
                <div className="relative w-28 sm:w-full shrink-0 aspect-[16/10] bg-slate-950 overflow-hidden">
                  <Image
                    src={p.cover as string}
                    alt=""
                    fill
                    className="object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity"
                    sizes="(max-width:640px) 112px, 280px"
                  />
                </div>
                <div className="flex items-start justify-between gap-2 py-2 pr-3 sm:px-3 sm:py-2.5">
                  <span className="text-sm font-medium text-slate-200 group-hover:text-amber-200 leading-snug">
                    {p.short}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-amber-400 shrink-0 mt-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-10 space-y-4 border-l-2 border-slate-800 pl-5"
        >
          {profile.summary.map((p, i) => (
            <p key={i} className="text-slate-400 leading-relaxed max-w-2xl">
              {p}
            </p>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
