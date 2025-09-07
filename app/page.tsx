'use client'

import Hero from '@/components/Hero'
import ProjectShowcase from '@/components/ProjectShowcase'
import SkillsMatrix from '@/components/SkillsMatrix'
import ExperienceTimeline from '@/components/Timeline'
import MetricsBar from '@/components/MetricsBar'
import { motion } from 'framer-motion'
import { Shield, Terminal, Search, AlertCircle, Lock } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const projects = [
    {
      id: 'vulnerability-research',
      title: 'Supply Chain Vulnerability Discovery',
      description: 'Discovered critical NPM package vulnerability enabling RCE via dependency confusion',
      impact: 'CVE Pending • Prevented potential supply chain attack',
      tags: ['Security Research', 'Responsible Disclosure', 'Supply Chain'],
      icon: <AlertCircle className="w-6 h-6" />,
      featured: true,
      images: [
        '/images/projects/npm-vuln-1.png', // Add your screenshots here
        '/images/projects/npm-vuln-2.png',
      ],
      demoLink: '/projects/vulnerability-research',
    },
    {
      id: 'certprotector',
      title: 'CertProtector Platform',
      description: 'Production-ready SSL/TLS monitoring platform with automated alerting',
      impact: 'Enterprise-scale capability • API-driven automation',
      tags: ['Full-Stack', 'Security Automation', 'Monitoring'],
      icon: <Lock className="w-6 h-6" />,
      images: [
        '/images/projects/certprotector-dashboard.png',
        '/images/projects/certprotector-alerts.png',
        '/images/projects/certprotector-arch.png',
      ],
      liveDemo: 'https://certprotector.com',
      demoLink: '/projects/certprotector',
    },
    {
      id: 'soc-lab',
      title: 'Enterprise Security Operations Lab',
      description: 'Comprehensive SOC environment with Splunk SIEM and custom detection rules',
      impact: '45+ Detection Rules • Full Attack Simulation',
      tags: ['Splunk', 'Detection Engineering', 'SIEM'],
      icon: <Shield className="w-6 h-6" />,
      images: [
        '/images/projects/soc-lab-network.png',
        '/images/projects/soc-lab-splunk.png',
        '/images/projects/soc-lab-alerts.png',
      ],
      demoLink: '/projects/soc-lab',
    },
    {
      id: 'honeypot',
      title: 'T-Pot Threat Intelligence',
      description: 'Deployed honeypot infrastructure collecting 45,000+ attacks for analysis',
      impact: '12 New Attack Vectors • 89 IOCs Identified',
      tags: ['Threat Intelligence', 'Honeypot', 'Analysis'],
      icon: <Search className="w-6 h-6" />,
      images: [
        '/images/projects/tpot-dashboard.png',
        '/images/projects/tpot-attacks.png',
        '/images/projects/tpot-analysis.png',
      ],
      demoLink: '/projects/honeypot',
    },
    {
      id: 'cybershell',
      title: 'CyberShell Framework',
      description: 'Autonomous security testing framework with ML-powered vulnerability discovery',
      impact: 'Automated Testing • CI/CD Integration',
      tags: ['Automation', 'ML/AI', 'Security Testing'],
      icon: <Terminal className="w-6 h-6" />,
      images: [
        '/images/projects/cybershell-arch.png',
        '/images/projects/cybershell-scan.png',
      ],
      github: 'https://github.com/CyberShellCode/cybershell',
      demoLink: '/projects/cybershell',
    },
  ]

  return (
    <>
      <MetricsBar />
      <Hero />
      
      {/* Core Competencies Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-bold mb-12 text-center"
          >
            Security Expertise in Action
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-6"
            >
              <Shield className="w-10 h-10 text-cyan-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Incident Response</h3>
              <p className="text-slate-400">
                Led breach containment and recovery operations. Prevented data exfiltration and restored operations in under 3 hours.
              </p>
              <Link href="/blog/incident-response" className="text-cyan-400 hover:text-cyan-300 mt-4 inline-block">
                Read Case Study →
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-6"
            >
              <Search className="w-10 h-10 text-cyan-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Vulnerability Research</h3>
              <p className="text-slate-400">
                Active security researcher with pending CVE. Discovered critical supply chain vulnerabilities affecting thousands.
              </p>
              <span className="text-green-400 text-sm mt-4 inline-block">CVE-2024-PENDING</span>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-6"
            >
              <Terminal className="w-10 h-10 text-cyan-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Security Engineering</h3>
              <p className="text-slate-400">
                Build production security tools and automation. Created platforms actively monitoring enterprise infrastructure.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-6xl">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-bold mb-12 text-center"
          >
            Security Projects & Research
          </motion.h2>
          
          <div className="grid gap-8">
            {projects.map((project, index) => (
              <ProjectShowcase key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Technical Skills Matrix */}
      <SkillsMatrix />

      {/* Experience Timeline */}
      <ExperienceTimeline />

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-800/50 rounded-2xl p-12"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Strengthen Your Security Posture</h2>
            <p className="text-xl text-slate-300 mb-8">
              Bringing proven incident response, vulnerability research, and security engineering expertise to your team.
            </p>
            <div className="flex gap-4 justify-center">
              <a 
                href="mailto:antoniobeltranmiller@gmail.com"
                className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-semibold transition-colors"
              >
                Contact Me
              </a>
              <a 
                href="/resume.pdf"
                className="px-8 py-3 border border-cyan-600 hover:bg-cyan-600/10 rounded-lg font-semibold transition-colors"
              >
                Download Resume
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
