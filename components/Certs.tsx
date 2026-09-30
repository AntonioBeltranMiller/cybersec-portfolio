'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { CheckCircle2, Clock, ExternalLink } from 'lucide-react'
import { certifications } from '@/lib/content'
import Kicker from './Kicker'

export default function Certs() {
  return (
    <section id="certifications" className="py-20 px-4 scroll-mt-16">
      <div className="container mx-auto max-w-5xl">
        <header className="mb-12">
          <Kicker>Credentials</Kicker>
          <h2 className="mt-4 text-3xl font-bold text-slate-100">Certifications</h2>
          <p className="mt-3 text-slate-400 max-w-2xl">
            Verifiable where a badge exists. In-progress items are marked as such, so nothing aspirational is dressed up as earned.
          </p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="panel rounded-xl p-5 flex flex-col"
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-lg bg-slate-900/70 border border-slate-800 flex items-center justify-center overflow-hidden shrink-0">
                  <Image src={c.image} alt="" width={40} height={40} className="object-contain" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-slate-100 leading-snug">{c.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{c.issuer}</p>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2 text-xs">
                {c.status === 'completed' ? (
                  <span className="inline-flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {c.date}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-amber-400">
                    <Clock className="w-3.5 h-3.5" /> {c.date}
                  </span>
                )}
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {c.skills.map((s) => (
                  <span key={s} className="text-[11px] px-2 py-0.5 rounded bg-slate-800/50 border border-slate-700/60 text-slate-400">
                    {s}
                  </span>
                ))}
              </div>

              {c.verify ? (
                <a
                  href={c.verify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm text-amber-400 hover:text-amber-300 transition-colors"
                >
                  Verify <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : c.note ? (
                <span className="mt-4 text-xs text-slate-500 italic">{c.note}</span>
              ) : null}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
