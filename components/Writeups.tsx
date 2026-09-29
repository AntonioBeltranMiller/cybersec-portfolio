'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Clock, ArrowUpRight } from 'lucide-react'
import { writeups } from '@/lib/content'

export default function Writeups() {
  return (
    <section id="writeups" className="py-20 px-4 scroll-mt-16">
      <div className="container mx-auto max-w-5xl">
        <header className="mb-12 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="font-mono text-sm text-amber-400">05 / write-ups</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-100">Investigation write-ups</h2>
            <p className="mt-3 text-slate-400 max-w-2xl">
              Short reports on real honeypot events and an incident response case, written the way I would hand them to another analyst.
            </p>
          </div>
          <Link href="/blog" className="text-sm text-amber-400 hover:text-amber-300 transition-colors inline-flex items-center gap-1">
            All write-ups <ArrowUpRight className="w-4 h-4" />
          </Link>
        </header>

        <div className="grid md:grid-cols-3 gap-5">
          {writeups.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={`/blog/${post.slug}`} className="group block h-full panel rounded-xl p-6 hover:border-amber-600/50 transition-colors">
                <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-600/30 text-amber-300">
                  {post.category}
                </span>
                <h3 className="mt-4 font-semibold text-slate-100 leading-snug group-hover:text-amber-300 transition-colors">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">{post.excerpt}</p>
                <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {post.readTime}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
