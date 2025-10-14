'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function SkillsMatrix() {
  const [activeCategory, setActiveCategory] = useState('all')

  const skills = {
    'Security Operations': [
      { name: 'Splunk SIEM', level: 85, projects: ['SOC Automation', 'T-Pot Integration'] },
      { name: 'Incident Response', level: 90, projects: ['WordPress Recovery', 'Breach Containment'] },
      { name: 'Threat Hunting', level: 80, projects: ['T-Pot Analysis', '424K+ Attacks'] },
      { name: 'Detection Engineering', level: 85, projects: ['10 Custom Rules', 'MITRE ATT&CK'] },
    ],
    'Cloud & Infrastructure': [
      { name: 'AWS Security', level: 80, projects: ['GuardDuty', 'Security Hub', 'IAM'] },
      { name: 'Azure Security', level: 70, projects: ['Sentinel', 'Azure AD'] },
      { name: 'Network Security', level: 85, projects: ['pfSense', 'Firewall Rules'] },
      { name: 'Kubernetes', level: 65, projects: ['Container Security', 'Pod Policies'] },
    ],
    'Development & Automation': [
      { name: 'Python', level: 85, projects: ['Automation Scripts', 'API Integration'] },
      { name: 'PowerShell', level: 80, projects: ['AD Management', 'IR Scripts'] },
      { name: 'APIs & Integration', level: 90, projects: ['N8N Workflows', 'Webhooks'] },
      { name: 'CI/CD Security', level: 75, projects: ['GitHub Actions', 'Security Scanning'] },
    ],
    'Security Research': [
      { name: 'Vulnerability Assessment', level: 85, projects: ['NPM Discovery', 'Bug Bounty'] },
      { name: 'Penetration Testing', level: 80, projects: ['OWASP Top 10', 'Network Pentesting'] },
      { name: 'Malware Analysis', level: 70, projects: ['Sandbox Analysis', 'IOC Extraction'] },
      { name: 'Threat Intelligence', level: 80, projects: ['T-Pot', '200+ IOCs'] },
    ],
  }

  const categories = ['all', ...Object.keys(skills)]
  const filteredSkills = activeCategory === 'all' 
    ? Object.values(skills).flat()
    : skills[activeCategory as keyof typeof skills] || []

  return (
    <section id="skills" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-3xl font-bold mb-12 text-center"
        >
          Technical Proficiency Matrix
        </motion.h2>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeCategory === category
                  ? 'bg-cyan-600 text-white'
                  : 'bg-slate-800/50 hover:bg-slate-800 text-slate-300'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-6 hover:border-cyan-600/50 transition-colors"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-lg">{skill.name}</h3>
                <span className="text-cyan-400 font-mono text-xl">{skill.level}%</span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-slate-800 rounded-full h-3 mb-4">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: index * 0.05 }}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full"
                />
              </div>
              
              {/* Related Projects */}
              <div className="flex flex-wrap gap-2">
                {skill.projects.map((project) => (
                  <span
                    key={project}
                    className="text-xs px-3 py-1 bg-slate-800/50 rounded-full text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    {project}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
