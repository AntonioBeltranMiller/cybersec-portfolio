'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ShieldCheck, Radar, Bug, Siren, ArrowUpRight } from 'lucide-react'
import { competencies } from '@/lib/content'
import Kicker from './Kicker'

const icons = {
  triage: ShieldCheck,
  detection: Radar,
  vuln: Bug,
  ir: Siren,
}

export default function Competencies() {
  return (
    <section className="pt-4 pb-8 px-4">
      <div className="container mx-auto max-w-5xl">
        <header className="mb-10 max-w-2xl">
          <Kicker>What I can do</Kicker>
          <h2 className="mt-4 text-2xl md:text-3xl font-bold tracking-tight text-slate-100">
            Where I&apos;m ready to contribute
          </h2>
        </header>

        <div className="grid sm:grid-cols-2 gap-5">
          {competencies.map((c, i) => {
            const Icon = icons[c.icon]
            return (
              <motion.div
                key={c.area}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={c.href}
                  className="group flex h-full items-start gap-4 rounded-xl border border-slate-800 bg-slate-900/40 p-5 hover:border-amber-500/40 transition-colors"
                >
                  <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-600/30 shrink-0">
                    <Icon className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-semibold text-slate-100 group-hover:text-amber-200 transition-colors">{c.area}</h3>
                      <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-amber-400 transition-colors" />
                    </div>
                    <p className="mt-1.5 text-sm text-slate-400 leading-relaxed">{c.proof}</p>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
