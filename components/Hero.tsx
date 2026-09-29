'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, MapPin, ArrowRight } from 'lucide-react'
import { profile } from '@/lib/content'

export default function Hero() {
  return (
    <section className="relative pt-36 pb-20 px-4">
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

          <div className="mt-10 flex flex-wrap items-center gap-5 text-slate-400 text-sm">
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-16 space-y-4 border-l-2 border-slate-800 pl-5"
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
