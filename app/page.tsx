'use client'

import Hero from '@/components/Hero'
import ProjectShowcase from '@/components/ProjectShowcase'
import SkillsMatrix from '@/components/SkillsMatrix'
import ExperienceTimeline from '@/components/Timeline'
import MetricsBar from '@/components/MetricsBar'
import CertificationsShowcase from '@/components/CertificationsShowcase'
import { motion } from 'framer-motion'
import { Shield, Terminal, Search, AlertCircle, Activity } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const projects = [
    {
      id: 'soc-automation',
      title: 'AI-Powered SOC Automation Platform',
      description: 'End-to-end SOC automation using Splunk, N8N, and GPT-4 for intelligent threat detection and response with real-time enrichment',
      impact: '10 Detection Rules • 85% Faster Triage • AI-Powered Analysis • Real Attack Validation',
      tags: ['Splunk', 'N8N', 'GPT-4', 'MITRE ATT&CK', 'Threat Intelligence', 'Automation'],
      icon: <Activity className="w-6 h-6" />,
      featured: true,
      images: [
        '/images/projects/soc-n8n-workflow.png',
        '/images/projects/soc-slack-alert.png',
        '/images/projects/soc-ai-prompt.png',
        '/images/projects/soc-slack-alerts-2.png',
        '/images/projects/soc-splunk-registry.png',
        '/images/projects/soc-splunk-alerts.png',
        '/images/projects/soc-slack-meterpreter.png',
        '/images/projects/soc-process-injection.png',
      ],
      demoLink: '/projects/soc-automation',
    },
    {
      id: 'honeypot',
      title: 'T-Pot Threat Intelligence Platform',
      description: 'Deployed distributed honeypot infrastructure capturing 424,000+ attacks for comprehensive threat intelligence analysis',
      impact: '424K+ Attacks Captured • 15K+ Unique IPs • 200+ IOCs Extracted • 10+ CVE Signatures',
      tags: ['Threat Intelligence', 'Honeypot', 'T-Pot', 'Analysis'],
      icon: <Search className="w-6 h-6" />,
      images: [
        '/images/projects/tpot-real-time-attacks.png',
        '/images/projects/tpot-dashboard.png',
        '/images/projects/tpot-attack-overview.png',
      ],
      demoLink: '/projects/honeypot',
    },
    {
      id: 'vulnerability-research',
      title: 'Supply Chain Vulnerability Discovery',
      description: 'Discovered critical NPM package vulnerability enabling RCE via dependency confusion',
      impact: 'Multiple Accepted Bug Bounty Reports • Prevented potential supply chain attack',
      tags: ['Security Research', 'Responsible Disclosure', 'Supply Chain'],
      icon: <AlertCircle className="w-6 h-6" />,
      featured: true,
      images: [
        '/images/projects/npm-vuln-1.png',
        '/images/projects/npm-vuln-2.png',
      ],
      demoLink: '/projects/vulnerability-research',
    },
    {
      id: 'blind-xss-server',
      title: 'Blind XSS Detection Platform & Setup Script',
      description: 'Custom XSS hunter platform with SSL-encrypted dashboard, payload generation, and real-time capture monitoring - deployed from a single bash script',
      impact: 'Zero to Production in 60 seconds • Captures stored XSS in real-time',
      tags: ['XSS', 'Web Security', 'Automation', 'Bash'],
      icon: <Terminal className="w-6 h-6" />,
      featured: true,
      images: [
        '/images/projects/blind-xss-capture.png',
        '/images/projects/blind-xss-payload.png',
        '/images/projects/blind-xss-active.png',
      ],
      github: 'https://github.com/CyberShellCode/blind-xss-server',
      demoLink: '/projects/blind-xss-server',
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
                Active security researcher in the cybersecurity community. Discovered critical supply chain vulnerabilities affecting thousands.
              </p>
              <span className="text-green-400 text-sm mt-4 inline-block">Multiple Accepted Reports</span>
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
      <section id="projects" className="py-20 px-4 bg-slate-900/30">
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
      <section id="skills">
        <SkillsMatrix />
      </section>

      {/* Experience Timeline */}
      <section id="experience">
        <ExperienceTimeline />
      </section>

      {/* Certifications Section */}
      <section id="certifications">
        <CertificationsShowcase />
      </section>
    </>
  )
}
