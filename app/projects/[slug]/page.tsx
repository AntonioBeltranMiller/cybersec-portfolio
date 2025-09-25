'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  ChevronLeft, 
  ExternalLink, 
  Github, 
  Shield, 
  AlertTriangle, 
  Activity,
  BookOpen
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
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <Link href="/#projects" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-6">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Projects
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
            <p className="text-xl text-slate-400 mb-8">{project.timeline}</p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-slate-600 hover:bg-slate-600/10 rounded-lg transition-colors"
                >
                  <Github className="w-4 h-4 mr-2" />
                  View Code
                </a>
              )}
            </div>

            {/* Metrics Dashboard - if available */}
            {project.metrics && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8"
              >
                {project.metrics.map((metric, idx) => (
                  <div key={idx} className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-4">
                    <p className="text-sm text-slate-400 mb-1">{metric.label}</p>
                    <p className={`text-2xl font-bold ${
                      metric.color === 'red' ? 'text-red-400' :
                      metric.color === 'orange' ? 'text-orange-400' :
                      metric.color === 'green' ? 'text-green-400' :
                      metric.color === 'blue' ? 'text-blue-400' :
                      metric.color === 'purple' ? 'text-purple-400' :
                      'text-cyan-400'
                    }`}>{metric.value}</p>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Project Description */}
            <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Activity className="w-6 h-6 mr-2 text-cyan-400" />
                Overview
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed">{project.fullDescription}</p>
            </div>

            {/* Technologies */}
            <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">Technologies Used</h2>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-cyan-900/20 border border-cyan-800/50 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Details */}
            <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">Key Features & Findings</h2>
              <ul className="space-y-3">
                {project.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-cyan-400 mr-3 mt-1">▸</span>
                    <span className="text-slate-300">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Security Findings - if available */}
            {project.findings && project.findings.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <AlertTriangle className="w-6 h-6 mr-2 text-orange-400" />
                  Security Findings & CVE Discoveries
                </h2>
                <div className="grid gap-4">
                  {project.findings.map((finding, idx) => (
                    <div 
                      key={idx} 
                      className={`rounded-xl p-6 border ${getSeverityColor(finding.severity)}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-semibold">{finding.title}</h3>
                        {finding.cve && (
                          <span className="px-3 py-1 bg-slate-800/50 rounded-full text-xs">
                            {finding.cve}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-300">{finding.description}</p>
                      <div className="mt-3">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          finding.severity === 'critical' ? 'bg-red-900/50 text-red-300' :
                          finding.severity === 'high' ? 'bg-orange-900/50 text-orange-300' :
                          finding.severity === 'medium' ? 'bg-yellow-900/50 text-yellow-300' :
                          'bg-blue-900/50 text-blue-300'
                        }`}>
                          {finding.severity.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Additional Sections */}
            {project.additionalSections && project.additionalSections.map((section, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl p-8 mb-8"
              >
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  {section.icon || <Shield className="w-6 h-6 mr-2 text-cyan-400" />}
                  <span className="ml-2">{section.title}</span>
                </h2>
                <ul className="space-y-3">
                  {section.content.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start">
                      <span className="text-cyan-400 mr-3 mt-1">▸</span>
                      <span className="text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* Blog Posts / Research Papers */}
            {project.blogs && project.blogs.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl p-8 mb-8"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <BookOpen className="w-6 h-6 mr-2 text-cyan-400" />
                  Related Research & Articles
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.blogs.map((blog, idx) => (
                    <Link 
                      key={idx}
                      href={blog.link}
                      className="block p-4 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors"
                    >
                      <h3 className="text-lg font-semibold mb-2 text-cyan-400 hover:text-cyan-300">
                        {blog.title}
                      </h3>
                      <p className="text-sm text-slate-400">{blog.description}</p>
                      <span className="inline-flex items-center mt-3 text-xs text-cyan-400">
                        Read More →
                      </span>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Outcomes / Business Impact */}
            <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-800/50 rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-green-400">Business Impact</h2>
              <ul className="space-y-3">
                {project.outcomes.map((outcome, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">✓</span>
                    <span className="text-slate-300">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Gallery Section with Screenshots */}
            {slug === 'honeypot' && (
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-slate-800/30 rounded-xl p-4">
                  <h3 className="text-lg font-semibold mb-3">Attack Dashboard</h3>
                  <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center">
                    <span className="text-slate-500">T-Pot Dashboard Screenshot</span>
                  </div>
                </div>
                <div className="bg-slate-800/30 rounded-xl p-4">
                  <h3 className="text-lg font-semibold mb-3">Geographic Distribution</h3>
                  <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center">
                    <span className="text-slate-500">Attack Map Visualization</span>
                  </div>
                </div>
                <div className="bg-slate-800/30 rounded-xl p-4">
                  <h3 className="text-lg font-semibold mb-3">Attack Analytics</h3>
                  <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center">
                    <span className="text-slate-500">Kibana Analytics</span>
                  </div>
                </div>
                <div className="bg-slate-800/30 rounded-xl p-4">
                  <h3 className="text-lg font-semibold mb-3">Threat Intelligence</h3>
                  <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center">
                    <span className="text-slate-500">AbuseIPDB Reports</span>
                  </div>
                </div>
              </div>
            )}

            {/* Default Gallery Placeholder for other projects */}
            {slug !== 'honeypot' && (
              <div className="mt-8 p-8 bg-slate-800/30 rounded-xl text-center">
                <p className="text-slate-500">
                  {slug === 'blind-xss-server' ?
                    'XSS hunter dashboard, payload generator, and capture screenshots coming soon' :
                    'Project screenshots and demonstrations coming soon'
                  }
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
