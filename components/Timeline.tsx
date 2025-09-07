'use client'

import { motion } from 'framer-motion'
import { Briefcase, Shield, Code, Award } from 'lucide-react'

export default function ExperienceTimeline() {
  const experiences = [
    {
      title: 'Independent Security Consultant',
      company: 'Self-Employed',
      period: 'Jan 2023 - Present',
      icon: <Shield className="w-5 h-5" />,
      highlights: [
        'Conducted NIST framework security assessments',
        'Led critical incident response and breach recovery',
        'Discovered and disclosed supply chain vulnerabilities',
        'Delivered security architecture recommendations',
      ],
      impact: 'Prevented multiple data breaches and improved security posture for clients',
    },
    {
      title: 'IT Support Specialist',
      company: 'ALM Freight (Amazon DSP)',
      period: 'Sep 2021 - May 2024',
      icon: <Briefcase className="w-5 h-5" />,
      highlights: [
        'Managed security for 150+ endpoint environment',
        'Reduced vulnerability exposure by 35%',
        'Maintained 95% patch compliance rate',
        'Implemented AD security policies and controls',
        'Streamlined incident response procedures',
      ],
      impact: 'Transformed IT operations with security-first approach',
    },
    {
      title: 'Security Research & Development',
      company: 'Personal Projects',
      period: '2023 - Present',
      icon: <Code className="w-5 h-5" />,
      highlights: [
        'Built CertProtector monitoring platform',
        'Developed CyberShell exploitation framework',
        'Created enterprise SOC lab environment',
        'Active bug bounty participant',
      ],
      impact: 'Developed production-ready security tools',
    },
    {
      title: 'Continuous Learning',
      company: 'Education & Certifications',
      period: '2021 - Present',
      icon: <Award className="w-5 h-5" />,
      highlights: [
        'Pursuing B.S. in Cybersecurity (WGU)',
        'CompTIA Security+ (In Progress)',
        'Google Cybersecurity Certificate',
        'Fortinet NSE Certified',
        '5 AWS Security Certificates',
      ],
      impact: 'Continuous skill development and industry certifications',
    },
  ]

  return (
    <section id="experience" className="py-20 px-4 bg-slate-900/30">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-3xl font-bold mb-12 text-center"
        >
          Professional Journey
        </motion.h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 to-blue-500 hidden md:block"></div>

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex items-start mb-12"
            >
              {/* Timeline dot */}
              <div className="hidden md:flex absolute left-0 w-16 h-16 bg-slate-900 border-2 border-cyan-500 rounded-full items-center justify-center">
                {exp.icon}
              </div>

              {/* Content */}
              <div className="md:ml-24 flex-1">
                <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl p-6">
                  <div className="flex flex-wrap items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{exp.title}</h3>
                      <p className="text-cyan-400">{exp.company}</p>
                    </div>
                    <span className="text-sm text-slate-400 bg-slate-800/50 px-3 py-1 rounded-full">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {exp.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-cyan-400 mr-2">▸</span>
                        <span className="text-slate-300">{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 border-t border-slate-800">
                    <p className="text-green-400 text-sm">
                      <strong>Impact:</strong> {exp.impact}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
