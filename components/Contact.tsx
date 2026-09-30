'use client'

import { motion } from 'framer-motion'
import { Mail, Github, Linkedin } from 'lucide-react'
import { profile } from '@/lib/content'

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-4 scroll-mt-16">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="panel rounded-2xl p-8 md:p-12 text-center"
        >
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-amber-400/90">Contact</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-100">Let&apos;s talk</h2>
          <p className="mt-3 text-slate-400 max-w-xl mx-auto">
            I&apos;m looking for a SOC Analyst or detection role and I&apos;m prepared for rotating shifts. Happy to walk
            through any of these projects live, including what I&apos;d do differently.
          </p>
          <p className="mt-3 text-sm text-slate-500 max-w-xl mx-auto">
            Based in Ann Arbor, MI. Open to onsite in the Detroit metro, hybrid, or remote, and ready for rotating and off-hours SOC coverage.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-amber-500 text-slate-950 font-medium hover:bg-amber-400 transition-colors"
            >
              <Mail className="w-4 h-4" /> {profile.email}
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-slate-700 text-slate-200 hover:border-amber-600/60 hover:text-amber-300 transition-colors"
            >
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-slate-700 text-slate-200 hover:border-amber-600/60 hover:text-amber-300 transition-colors"
            >
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
