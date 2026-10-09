'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { skills } from '@/lib/content'
import Kicker from './Kicker'

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-4 scroll-mt-16">
      <div className="container mx-auto max-w-5xl">
        <header className="mb-12">
          <Kicker>Toolkit</Kicker>
          <h2 className="mt-4 text-3xl font-bold text-slate-100">Tools I actually use</h2>
          <p className="mt-3 text-slate-400 max-w-2xl">
            Every item links to the project, case, or credential where it shows up.
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-5">
          {skills.map((s, i) => (
            <motion.div
              key={s.group}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="panel rounded-xl p-6"
            >
              <h3 className="font-mono text-sm text-amber-300">{s.group}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {s.items.map((item) =>
                  item.href ? (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="group inline-flex items-center gap-1 text-sm px-3 py-1 rounded-md bg-slate-800/50 border border-slate-700/70 text-slate-300 hover:border-amber-600/50 hover:text-amber-200 transition-colors"
                    >
                      {item.name}
                      <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-amber-400" />
                    </Link>
                  ) : (
                    <span key={item.name} className="text-sm px-3 py-1 rounded-md bg-slate-800/50 border border-slate-700/70 text-slate-300">
                      {item.name}
                    </span>
                  ),
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
