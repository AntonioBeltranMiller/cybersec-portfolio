'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ChevronLeft,
  ExternalLink,
  Github,
  Shield,
  AlertTriangle,
  Activity,
  BookOpen,
} from 'lucide-react'

// Import the project data from the separate file
import { projectDetails } from './projectData'

export default function ProjectDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const project = projectDetails[slug]

  if (!project) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
          <Link href="/" className="text-cyan-400 hover:text-cyan-300">
            ← Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-900/20 border-red-800/50'
      case 'high': return 'text-orange-400 bg-orange-900/20 border-orange-800/50'
      case 'medium': return 'text-yellow-400 bg-yellow-900/20 border-yellow-800/50'
      case 'low': return 'text-blue-400 bg-blue-900/20 border-blue-800/50'
      default: return 'text-slate-400 bg-slate-900/20 border-slate-800/50'
    }
  }

  return (
    <div className="min-h-screen pt-20">
      <section className="py-10 px-4">
        <div className="container mx-auto max-w-6xl">

          {/* Back link */}
          <div className="mb-6">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
            >
              <ChevronLeft className="w-5 h-5" />
              Back to Projects
            </Link>
          </div>

          {/* HERO */}
          <motion.header
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
              {project.title}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-full border border-slate-800 bg-slate-900/50 px-3 py-1 text-sm text-slate-300">
                {project.timeline}
              </span>

              {/* Actions */}
              <div className="ml-auto flex flex-wrap gap-2">
                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-3 py-2 text-sm font-medium hover:bg-cyan-500 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm font-medium hover:bg-slate-700/20 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    View Code
                  </a>
                )}
              </div>
            </div>
          </motion.header>

          {/* KPIs */}
          {project.metrics && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
            >
              {project.metrics.map((m, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm"
                >
                  <p className="text-xs uppercase tracking-wide text-slate-400">{m.label}</p>
                  <p
                    className={
                      'mt-2 text-3xl font-extrabold leading-none ' +
                      (m.color === 'red'
                        ? 'text-red-400'
                        : m.color === 'orange'
                        ? 'text-orange-400'
                        : m.color === 'green'
                        ? 'text-green-400'
                        : m.color === 'blue'
                        ? 'text-blue-400'
                        : m.color === 'purple'
                        ? 'text-purple-400'
                        : 'text-cyan-400')
                    }
                  >
                    {m.value}
                  </p>
                </div>
              ))}
            </motion.div>
          )}

          {/* OVERVIEW + TECH */}
          <div className="grid lg:grid-cols-3 gap-6 mb-10">
            <motion.section
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 md:p-8 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-6 h-6 text-cyan-400" />
                <h2 className="text-2xl font-bold">Overview</h2>
              </div>
              <p className="text-slate-300 text-lg leading-relaxed">{project.fullDescription}</p>
            </motion.section>

            <motion.aside
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 md:p-8 backdrop-blur-sm"
            >
              <h3 className="text-xl font-semibold mb-3">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-cyan-800/40 bg-cyan-900/15 px-3 py-1 text-sm text-cyan-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.aside>
          </div>

          {/* DETAILS */}
          <motion.section
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 }}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 md:p-8 backdrop-blur-sm mb-10"
          >
            <h3 className="text-xl font-semibold mb-4">Key Features & Findings</h3>
            <ul className="grid sm:grid-cols-2 gap-3">
              {project.details.map((d, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 text-cyan-400">▸</span>
                  <span className="text-slate-300">{d}</span>
                </li>
              ))}
            </ul>
          </motion.section>

          {/* SECURITY FINDINGS */}
          {project.findings && project.findings.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              className="mb-10"
            >
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-6 h-6 text-orange-400" />
                <h2 className="text-2xl font-bold">Security Findings & CVE Discoveries</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {project.findings.map((f, i) => (
                  <div
                    key={i}
                    className={`rounded-2xl border p-6 ${getSeverityColor(f.severity)} bg-slate-900/40 backdrop-blur-sm`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-semibold">{f.title}</h3>
                      {f.cve && (
                        <span className="rounded-full bg-slate-800/60 px-3 py-1 text-xs">{f.cve}</span>
                      )}
                    </div>
                    <p className="mt-2 text-slate-300">{f.description}</p>
                    <div className="mt-3">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                          f.severity === 'critical'
                            ? 'bg-red-900/50 text-red-300'
                            : f.severity === 'high'
                            ? 'bg-orange-900/50 text-orange-300'
                            : f.severity === 'medium'
                            ? 'bg-yellow-900/50 text-yellow-300'
                            : 'bg-blue-900/50 text-blue-300'
                        }`}
                      >
                        {f.severity.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {/* ADDITIONAL SECTIONS */}
          {project.additionalSections && project.additionalSections.length > 0 && (
            <div className="space-y-6 mb-10">
              {project.additionalSections.map((section, idx) => (
                <motion.section
                  key={idx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + idx * 0.05 }}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 md:p-8 backdrop-blur-sm"
                >
                  <div className="mb-3 flex items-center gap-2">
                    {section.icon || <Shield className="w-6 h-6 text-cyan-400" />}
                    <h3 className="text-xl font-semibold">{section.title}</h3>
                  </div>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {section.content.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-3">
                        <span className="mt-1 text-cyan-400">▸</span>
                        <span className="text-slate-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.section>
              ))}
            </div>
          )}

          {/* GALLERY */}
          {slug === 'honeypot' && (
            <section className="mb-10">
              <h3 className="text-2xl font-bold mb-4">Screenshots</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <figure className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
                  <h4 className="text-sm font-medium text-slate-300 mb-3">Attack Dashboard</h4>
                  <div className="relative aspect-video">
                    <Image
                      src="/images/projects/tpot-dashboard.png"
                      alt="T-Pot main dashboard"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="rounded-lg object-contain"
                      priority
                    />
                  </div>
                </figure>
                <figure className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
                  <h4 className="text-sm font-medium text-slate-300 mb-3">Kibana Visualizations</h4>
                  <div className="relative aspect-video">
                    <Image
                      src="/images/projects/tpot-attacks.png"
                      alt="Kibana visualizations of captured attacks"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="rounded-lg object-contain"
                    />
                  </div>
                </figure>
                <figure className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
                  <h4 className="text-sm font-medium text-slate-300 mb-3">Geographic Distribution</h4>
                  <div className="relative aspect-video">
                    <Image
                      src="/images/projects/tpot-analysis.png"
                      alt="Attack maps and geographic data"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="rounded-lg object-contain"
                    />
                  </div>
                </figure>
                <figure className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
                  <h4 className="text-sm font-medium text-slate-300 mb-3">VirusTotal Detection</h4>
                  <div className="relative aspect-video">
                    <Image
                      src="/images/projects/tpot-virustotal.png"
                      alt="VirusTotal detection screenshot"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="rounded-lg object-contain"
                    />
                  </div>
                </figure>
              </div>
            </section>
          )}

          {/* BLOGS */}
          {project.blogs && project.blogs.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 }}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 md:p-8 backdrop-blur-sm mb-10"
            >
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-6 h-6 text-cyan-400" />
                <h2 className="text-2xl font-bold">Related Research & Articles</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {project.blogs.map((blog, idx) => (
                  <Link
                    key={idx}
                    href={blog.link}
                    className="block rounded-xl border border-slate-800 bg-slate-800/40 p-4 hover:bg-slate-800/60 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-cyan-300">{blog.title}</h3>
                    <p className="mt-1 text-sm text-slate-400">{blog.description}</p>
                    <span className="mt-3 inline-flex items-center text-xs text-cyan-400">
                      Read More →
                    </span>
                  </Link>
                ))}
              </div>
            </motion.section>
          )}

          {/* OUTCOMES */}
          <section className="rounded-2xl border border-green-900/40 bg-gradient-to-r from-green-900/20 to-emerald-900/20 p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-green-400">Business Impact</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {project.outcomes.map((o, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 text-green-400">✓</span>
                  <span className="text-slate-300">{o}</span>
                </li>
              ))}
            </ul>
          </section>

        </div>
      </section>
    </div>
  )
}
