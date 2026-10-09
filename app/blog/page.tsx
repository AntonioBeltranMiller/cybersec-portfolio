'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, ArrowUpRight } from 'lucide-react'
import { writeups } from '@/lib/content'
import DispositionBadge from '@/components/DispositionBadge'

export default function BlogPage() {
  return (
    <div className="pt-28 pb-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-amber-400 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>

        <motion.header initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-8 mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-100">Investigation write-ups</h1>
          <p className="mt-3 text-slate-400 max-w-2xl">
            Real events from my honeypot and an incident response case, documented the way I would hand them to another
            analyst: a verdict up front, then the evidence, the assessment, and what to do next.
          </p>
        </motion.header>

        <div className="space-y-5">
          {writeups.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Link href={`/blog/${post.slug}`} className="group block panel rounded-xl p-6 hover:border-amber-600/50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <DispositionBadge value={post.disposition} />
                      <span className="text-xs text-slate-500">{post.category}</span>
                    </div>
                    <h2 className="mt-3 text-xl font-semibold text-slate-100 group-hover:text-amber-300 transition-colors">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-slate-400 leading-relaxed">{post.excerpt}</p>
                    <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {post.readTime}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-slate-600 group-hover:text-amber-400 transition-colors shrink-0" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
