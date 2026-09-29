'use client'

import { motion } from 'framer-motion'
import { skills } from '@/lib/content'

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-4 scroll-mt-16">
      <div className="container mx-auto max-w-5xl">
        <header className="mb-12">
          <p className="font-mono text-sm text-amber-400">02 / skills</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-100">Tools I actually use</h2>
          <p className="mt-3 text-slate-400 max-w-2xl">
            Grouped by what I reach for, not rated on a scale. Most of these show up in the projects above.
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
                {s.items.map((item) => (
                  <span key={item} className="text-sm px-3 py-1 rounded-md bg-slate-800/50 border border-slate-700/70 text-slate-300">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
