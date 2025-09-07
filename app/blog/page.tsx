'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Shield, ChevronRight, Calendar, Clock } from 'lucide-react'

const blogPosts = [
  {
    slug: 'incident-response',
    title: 'Critical Incident Response: WordPress Compromise & Recovery',
    excerpt: 'A detailed case study of identifying, containing, and recovering from an active website compromise in under 3 hours.',
    date: '2024-11-15',
    readTime: '8 min read',
    category: 'Incident Response',
    featured: true,
  },
  // Add more blog posts here as you create them
]

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-20">
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link href="/" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-6">
            ← Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold mb-4">Security Blog</h1>
            <p className="text-xl text-slate-400 mb-12">
              Case studies, technical writeups, and security research findings
            </p>

            <div className="space-y-8">
              {blogPosts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`group relative ${
                    post.featured 
                      ? 'bg-gradient-to-r from-cyan-900/10 to-blue-900/10 border-cyan-800/50' 
                      : 'bg-slate-900/50 border-slate-800'
                  } backdrop-blur border rounded-xl p-8 hover:border-cyan-700/50 transition-colors`}
                >
                  {post.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-cyan-600/20 border border-cyan-600/50 rounded-full text-xs text-cyan-400">
                        Featured
                      </span>
                    </div>
                  )}

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-cyan-500/10 rounded-lg">
                      <Shield className="w-6 h-6 text-cyan-400" />
                    </div>
                    
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                        {post.title}
                      </h2>
                      
                      <p className="text-slate-400 mb-4">{post.excerpt}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </span>
                        <span className="px-2 py-1 bg-slate-800 rounded">
                          {post.category}
                        </span>
                      </div>
                      
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-semibold"
                      >
                        Read Case Study
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {blogPosts.length === 1 && (
              <div className="mt-12 p-8 bg-slate-900/30 rounded-xl text-center">
                <p className="text-slate-500">More security writeups and case studies coming soon</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
