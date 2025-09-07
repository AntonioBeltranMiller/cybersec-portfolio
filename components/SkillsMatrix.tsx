'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function SkillsMatrix() {
  const [activeCategory, setActiveCategory] = useState('all')

  const skills = {
    'Security Operations': [
      { name: 'Splunk SIEM', level: 85, projects: ['SOC Lab', 'T-Pot Integration'] },
      { name: 'Incident Response', level: 90, projects: ['WordPress Recovery', 'Breach Containment'] },
      { name: 'Threat Hunting', level: 75, projects: ['T-Pot Analysis', 'Log Analysis'] },
      { name: 'Detection Engineering', level: 85, projects: ['45+ Custom Rules', 'MITRE Mapping'] },
    ],
    'Cloud & Infrastructure': [
      { name: 'AWS Security', level: 80, projects: ['GuardDuty', 'Security Hub', 'IAM'] },
      { name: 'Azure Security', level: 70, projects: ['Sentinel', 'Azure AD'] },
      { name: 'Kubernetes', level: 65, projects: ['Container Security', 'Pod Policies'] },
      { name: 'Network Security', level: 85, projects: ['pfSense', 'Firewall Rules'] },
    ],
    'Development & Automation': [
      { name: 'Python', level: 85, projects: ['CyberShell', 'Automation Scripts'] },
      { name: 'PowerShell', level: 80, projects: ['AD Management', 'IR Scripts'] },
      { name: 'APIs & Integration', level: 90, projects: ['CertProtector', 'Webhooks'] },
      { name: 'CI/CD Security', level: 75, projects: ['GitHub Actions', 'Security Scanning'] },
    ],
    'Security Research': [
      { name: 'Vulnerability Assessment', level: 85, projects: ['NPM Discovery', 'Web App Testing'] },
      { name: 'Penetration Testing', level: 80, projects: ['OWASP Top 10', 'Network Pentesting'] },
      { name: 'Malware Analysis', level: 70, projects: ['Sandbox Analysis', 'IOC Extraction'] },
      { name: 'OSINT', level: 75, projects: ['Threat Intelligence', 'Attack Attribution'] },
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
              className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-6"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-lg">{skill.name}</h3>
                <span className="text-cyan-400 font-mono">{skill.level}%</span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-slate-800 rounded-full h-2 mb-3">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: index * 0.05 }}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full"
                />
              </div>
              
              {/* Related Projects */}
              <div className="flex flex-wrap gap-2">
                {skill.projects.map((project) => (
                  <span
                    key={project}
                    className="text-xs px-2 py-1 bg-slate-800/50 rounded text-slate-400"
                  >
                    {project}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack Alignment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-16 p-8 bg-gradient-to-r from-cyan-900/10 to-blue-900/10 border border-cyan-800/30 rounded-xl"
        >
          <h3 className="text-2xl font-bold mb-6 text-center">Enterprise Tool Experience</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {['Splunk', 'CrowdStrike', 'Palo Alto', 'ServiceNow', 'AWS', 'Azure', 'Terraform', 'Kubernetes'].map((tool) => (
              <div key={tool} className="p-3 bg-slate-900/50 rounded-lg">
                <span className="text-cyan-400">✓</span> {tool}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
