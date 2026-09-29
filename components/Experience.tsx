'use client'

import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import { experience, education } from '@/lib/content'
import Kicker from './Kicker'

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-4 scroll-mt-16">
      <div className="container mx-auto max-w-5xl">
        <header className="mb-12">
          <Kicker>Background</Kicker>
          <h2 className="mt-4 text-3xl font-bold text-slate-100">Experience &amp; education</h2>
          <p className="mt-3 text-slate-400 max-w-2xl">
            I am early in my security career and would rather say so plainly. My IT foundation is the ALM Freight
            role; the delivery jobs are how I have paid the bills while studying.
          </p>
        </header>

        <div className="space-y-4">
          {experience.map((job, i) => (
            <motion.div
              key={`${job.org}-${job.period}`}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="panel rounded-xl p-6"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <h3 className="text-lg font-semibold text-slate-100">{job.role}</h3>
                  <p className="text-amber-400 text-sm">{job.org}</p>
                </div>
                <span className={`text-xs font-mono px-3 py-1 rounded-full border ${job.current ? 'border-emerald-600/40 text-emerald-400' : 'border-slate-700 text-slate-400'}`}>
                  {job.period}
                </span>
              </div>
              {job.bullets && (
                <ul className="mt-4 space-y-2">
                  {job.bullets.map((b, idx) => (
                    <li key={idx} className="flex gap-2.5 text-slate-400 text-sm leading-relaxed">
                      <span className="text-amber-500 mt-0.5 shrink-0">▸</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="panel rounded-xl p-6 flex items-start gap-4"
          >
            <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-600/30">
              <GraduationCap className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-100">{education.degree}</h3>
              <p className="text-amber-400 text-sm">{education.school}</p>
              <p className="text-slate-500 text-sm mt-1">{education.detail}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
