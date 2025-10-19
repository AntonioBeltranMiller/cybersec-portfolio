'use client'

import { motion } from 'framer-motion'
import { Briefcase, Shield, Code, Award } from 'lucide-react'

export default function ExperienceTimeline() {
  const experiences = [
    {
      title: 'Security Operations Center (SOC) Ready',
      company: 'Professional Development',
      period: 'Jan 2025 - Present',
      icon: <Shield className="w-5 h-5" />,
      highlights: [
        'CompTIA Security+ certified (DoD 8140 approved)',
        'Completed 100+ real-world incident simulations via LetsDefend',
        'Proficient in Splunk, QRadar, and CloudWatch SIEM platforms',
        'Experience with FortiGate, AWS Security Hub, and GuardDuty',
        'Active threat hunting and malware analysis skills',
      ],
      impact: 'Ready for L1/L2 SOC Analyst role with proven hands-on experience',
    },
    {
      title: 'IT Support & Security Specialist',
      company: 'ALM Freight (Amazon DSP)',
      period: 'Sep 2021 - May 2024',
      icon: <Briefcase className="w-5 h-5" />,
      highlights: [
        'Secured 150+ endpoint fleet with 95% patch compliance',
        'Reduced security incidents by 40% through proactive monitoring',
        'Implemented Zero Trust network access controls',
        'Managed Active Directory security and group policies',
        'Led incident response for ransomware prevention',
      ],
      impact: 'Transformed reactive IT support into proactive security operations',
    },
    {
      title: 'Security Research & Engineering',
      company: 'Independent Projects',
      period: '2023 - Present',
      icon: <Code className="w-5 h-5" />,
      highlights: [
        'Built CertProtector - SSL/TLS monitoring platform (Python/React)',
        'Developed CyberShell  - penetration testing framework',
        'Created enterprise SOC lab with SIEM integration',
        'Published security research on GitHub (10+ repositories)',
        'Contributed to open-source security tools',
      ],
      impact: 'Demonstrated ability to build production-ready security solutions',
    },
    {
      title: 'Continuous Security Education',
      company: 'Western Governors University',
      period: '2021 - Present',
      icon: <Award className="w-5 h-5" />,
      highlights: [
        'B.S. in Cybersecurity (Expected 2026)',
        '8 active industry certifications achieved',
        '500+ hours of hands-on security training',
        'AWS, Google, Fortinet, CompTIA, Sailpoint',
        'Specialized in cloud security and identity management',
      ],
      impact: 'Top 5% completion rate in certification programs',
    },
  ]

  return (
    <section id="experience" className="py-20 px-4 bg-slate-900/30">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-cyan-900/20 border border-cyan-600/30 rounded-full">
            <Briefcase className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-400 font-medium">Career Journey</span>
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Professional Experience
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            From IT support to security operations, building expertise through hands-on experience and continuous learning
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500 hidden md:block"></div>

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex items-start mb-12"
            >
              {/* Timeline dot */}
              <div className="hidden md:flex absolute left-0 w-16 h-16 bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-cyan-500 rounded-full items-center justify-center shadow-lg shadow-cyan-500/20">
                <div className="text-cyan-400">{exp.icon}</div>
              </div>

              {/* Content */}
              <div className="md:ml-24 flex-1">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-slate-900/90 to-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 hover:border-cyan-600/50 transition-all hover:shadow-lg hover:shadow-cyan-900/20"
                >
                  <div className="flex flex-wrap items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1 text-slate-100">{exp.title}</h3>
                      <p className="text-cyan-400 font-medium">{exp.company}</p>
                    </div>
                    <span className="text-sm text-slate-300 bg-gradient-to-r from-cyan-900/30 to-blue-900/30 px-4 py-1.5 rounded-full border border-cyan-600/30">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-2.5 mb-4">
                    {exp.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start group">
                        <span className="text-cyan-400 mr-3 mt-1 group-hover:text-cyan-300 transition-colors">▸</span>
                        <span className="text-slate-300 leading-relaxed">{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 border-t border-slate-700/50">
                    <div className="flex items-start gap-2">
                      <span className="text-green-400 text-sm font-semibold">Impact:</span>
                      <p className="text-green-400/80 text-sm flex-1">{exp.impact}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>         
    </section>         
  )
}
