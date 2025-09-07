'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronLeft, ExternalLink, Github } from 'lucide-react'

// Type definition for Project
interface Project {
  title: string
  fullDescription: string
  timeline: string
  technologies: string[]
  details: string[]
  outcomes: string[]
  liveDemo?: string
  github?: string
}

// This would normally come from a database or API
const projectDetails: Record<string, Project> = {
  'vulnerability-research': {
    title: 'NPM Supply Chain Vulnerability Discovery',
    fullDescription: `Discovered a critical vulnerability in a public NPM package that could enable remote code execution through dependency confusion attacks. This finding highlighted the importance of supply chain security and proper package configuration.`,
    timeline: 'August 2024 - Present',
    technologies: ['Node.js', 'NPM', 'Security Research', 'Responsible Disclosure'],
    details: [
      'Identified misconfigured .npmrc file in public repository',
      'Analyzed potential attack vectors and impact',
      'Coordinated responsible disclosure with maintainers',
      'CVE pending assignment',
    ],
    outcomes: [
      'Prevented potential supply chain attack affecting thousands',
      'Improved security awareness in open source community',
      'Contributing to CVE database',
    ],
  },
  'certprotector': {
    title: 'CertProtector - SSL/TLS Monitoring Platform',
    fullDescription: `Built a production-ready monitoring platform that tracks SSL/TLS certificate lifecycles and alerts on expiration. Demonstrates full-stack development capabilities and understanding of security monitoring needs.`,
    timeline: 'December 2024 - Present',
    technologies: ['React', 'Node.js', 'Supabase', 'GitHub Actions', 'RESEND API'],
    details: [
      'Automated certificate scanning and validation',
      'Multi-tier alerting system (7-day, 1-day, expiration)',
      'API-driven architecture for enterprise integration',
      'Scalable to monitor 1000+ domains',
    ],
    outcomes: [
      'Prevents certificate-related outages',
      'Reduces manual monitoring overhead',
      'Enterprise-ready architecture',
    ],
    liveDemo: 'https://certprotector.com',
  },
  'soc-lab': {
    title: 'Enterprise SOC Home Lab',
    fullDescription: `Designed and deployed a comprehensive Security Operations Center environment for testing and skill development. Features enterprise-grade tools and realistic attack simulations.`,
    timeline: 'June 2024 - Present',
    technologies: ['Splunk', 'Active Directory', 'Sysmon', 'pfSense', 'VMware'],
    details: [
      'Splunk SIEM with 45+ custom detection rules',
      'Active Directory with honeytokens',
      'Network segmentation with pfSense',
      'Sysmon enhanced logging',
      'MITRE ATT&CK mapped detections',
    ],
    outcomes: [
      'Reduced false positive rate by 40%',
      'Created reusable detection content',
      'Documented security playbooks',
    ],
  },
  'honeypot': {
    title: 'T-Pot Honeypot Threat Intelligence',
    fullDescription: `Deployed and managed a distributed honeypot infrastructure to collect threat intelligence and analyze attack patterns. Generated actionable intelligence for defensive improvements.`,
    timeline: 'September 2024',
    technologies: ['T-Pot', 'Docker', 'ELK Stack', 'Kibana', 'Ubuntu Server'],
    details: [
      'Multi-honeypot deployment (Cowrie, Dionaea, Conpot)',
      'Collected 45,000+ attacks over 2 weeks',
      'Identified 12 new attack vectors',
      'Created custom Kibana dashboards',
      'Extracted and analyzed malware samples',
    ],
    outcomes: [
      '89 new IOCs identified',
      'Created 12 detection rules from findings',
      'Improved understanding of current threat landscape',
    ],
  },
  'cybershell': {
    title: 'CyberShell - Autonomous Exploitation Framework',
    fullDescription: `Developed an automated security testing framework that combines traditional scanning with ML-powered analysis for continuous security assessment.`,
    timeline: 'October 2024 - Present',
    technologies: ['Python', 'Machine Learning', 'LLM Integration', 'Automation'],
    details: [
      'Automated vulnerability discovery',
      'ML-powered exploitation attempts',
      'Comprehensive reporting system',
      'CI/CD pipeline integration',
      'Business impact analysis',
    ],
    outcomes: [
      'Reduced manual testing time by 70%',
      'Improved vulnerability coverage',
      'Automated compliance reporting',
    ],
    github: 'https://github.com/CyberShellCode/cybershell',
  },
}

export default function ProjectDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const project = projectDetails[slug]

  if (!project) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
          <Link href="/" className="text-cyan-400 hover:text-cyan-300">
            ← Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20">
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link href="/#projects" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-6">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Projects
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
            <p className="text-xl text-slate-400 mb-8">{project.timeline}</p>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-8">
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

            {/* Project Description */}
            <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-slate-300 text-lg">{project.fullDescription}</p>
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
              <h2 className="text-2xl font-bold mb-4">Key Features</h2>
              <ul className="space-y-3">
                {project.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-cyan-400 mr-3 mt-1">▸</span>
                    <span className="text-slate-300">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Outcomes */}
            <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-800/50 rounded-xl p-8">
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

            {/* Gallery Placeholder */}
            <div className="mt-8 p-8 bg-slate-800/30 rounded-xl text-center">
              <p className="text-slate-500">Project screenshots and demonstrations coming soon</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
