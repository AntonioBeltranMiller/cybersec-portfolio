'use client'

import { motion } from 'framer-motion'
import { Award, CheckCircle, ExternalLink, Clock } from 'lucide-react'
import { useState } from 'react'

interface Certification {
  name: string
  issuer: string
  date: string
  status: 'completed' | 'in-progress'
  skills: string[]
  verifyLink?: string
  color: string
  description: string
}

export default function CertificationsShowcase() {
  const [selectedCert, setSelectedCert] = useState<number | null>(null)

  const certifications: Certification[] = [
    {
      name: 'CompTIA Security+',
      issuer: 'CompTIA',
      date: 'January 2025',
      status: 'completed',
      skills: ['Network Security', 'Threat Analysis', 'Risk Management', 'Cryptography', 'Identity Management'],
      color: 'from-red-500 to-orange-500',
      description: 'Industry-standard certification validating security fundamentals and hands-on skills',
      verifyLink: 'https://www.comptia.org/certifications/security',
    },
    {
      name: 'Google Cybersecurity Certificate',
      issuer: 'Google',
      date: '2024',
      status: 'completed',
      skills: ['SIEM Tools', 'Network Security', 'Linux', 'Python', 'Security Frameworks'],
      color: 'from-blue-500 to-cyan-500',
      description: 'Comprehensive program covering SOC operations, incident response, and security tools',
      verifyLink: 'https://www.coursera.org/google-certificates/cybersecurity-certificate',
    },
    {
      name: 'Fortinet NSE 1 & 2',
      issuer: 'Fortinet',
      date: '2024',
      status: 'completed',
      skills: ['Network Security', 'Firewall Configuration', 'IPS/IDS', 'VPN Technologies'],
      color: 'from-red-600 to-red-700',
      description: 'Network security essentials and threat landscape awareness',
    },
    {
      name: 'AWS Security Fundamentals',
      issuer: 'Amazon Web Services',
      date: '2024',
      status: 'completed',
      skills: ['Cloud Security', 'IAM', 'GuardDuty', 'Security Hub', 'CloudTrail'],
      color: 'from-orange-500 to-yellow-500',
      description: 'Core AWS security services and best practices',
    },
    {
      name: 'AWS Security Best Practices',
      issuer: 'Amazon Web Services',
      date: '2024',
      status: 'completed',
      skills: ['Security Groups', 'NACLs', 'KMS', 'Secrets Manager', 'WAF'],
      color: 'from-orange-500 to-yellow-500',
      description: 'Advanced security configurations and compliance frameworks',
    },
    {
      name: 'AWS Shared Responsibility Model',
      issuer: 'Amazon Web Services',
      date: '2024',
      status: 'completed',
      skills: ['Cloud Governance', 'Compliance', 'Risk Management'],
      color: 'from-orange-500 to-yellow-500',
      description: 'Understanding cloud security responsibilities and boundaries',
    },
    {
      name: 'AWS Security Operations',
      issuer: 'Amazon Web Services',
      date: '2024',
      status: 'completed',
      skills: ['Incident Response', 'Security Monitoring', 'Threat Detection'],
      color: 'from-orange-500 to-yellow-500',
      description: 'Operational security practices in AWS environments',
    },
    {
      name: 'AWS Identity and Access Management',
      issuer: 'Amazon Web Services',
      date: '2024',
      status: 'completed',
      skills: ['IAM Policies', 'Role-Based Access', 'MFA', 'Identity Federation'],
      color: 'from-orange-500 to-yellow-500',
      description: 'Advanced identity and access management strategies',
    },
  ]

  const completedCount = certifications.filter(c => c.status === 'completed').length
  const inProgressCount = certifications.filter(c => c.status === 'in-progress').length

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Professional Certifications</h2>
          <p className="text-slate-400 mb-6">
            Industry-recognized credentials demonstrating security expertise
          </p>
          <div className="flex justify-center gap-8">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-slate-300">{completedCount} Completed</span>
            </div>
            {inProgressCount > 0 && (
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-yellow-400" />
                <span className="text-slate-300">{inProgressCount} In Progress</span>
              </div>
            )}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedCert(selectedCert === index ? null : index)}
              className={`relative bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl p-6 cursor-pointer transition-all hover:border-cyan-600/50 ${
                selectedCert === index ? 'ring-2 ring-cyan-600' : ''
              }`}
            >
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                {cert.status === 'completed' ? (
                  <CheckCircle className="w-6 h-6 text-green-400" />
                ) : (
                  <Clock className="w-6 h-6 text-yellow-400" />
                )}
              </div>

              {/* Certification Badge */}
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${cert.color} flex items-center justify-center mb-4`}>
                <Award className="w-8 h-8 text-white" />
              </div>

              {/* Cert Info */}
              <h3 className="text-xl font-bold mb-2">{cert.name}</h3>
              <p className="text-cyan-400 text-sm mb-2">{cert.issuer}</p>
              <p className="text-slate-400 text-sm mb-4">{cert.date}</p>

              {/* Description (shown when selected) */}
              {selectedCert === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mb-4"
                >
                  <p className="text-slate-300 text-sm mb-4">{cert.description}</p>
                </motion.div>
              )}

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mb-4">
                {cert.skills.slice(0, selectedCert === index ? cert.skills.length : 3).map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-1 bg-slate-800/50 rounded text-slate-400"
                  >
                    {skill}
                  </span>
                ))}
                {cert.skills.length > 3 && selectedCert !== index && (
                  <span className="text-xs px-2 py-1 bg-slate-800/50 rounded text-cyan-400">
                    +{cert.skills.length - 3} more
                  </span>
                )}
              </div>

              {/* Verify Link */}
              {cert.verifyLink && (
                <a
                  href={cert.verifyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm transition-colors"
                >
                  <span>View Certification</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </motion.div>
          ))}
        </div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-12 p-8 bg-gradient-to-r from-cyan-900/10 to-blue-900/10 border border-cyan-800/30 rounded-xl"
        >
          <h3 className="text-2xl font-bold mb-6 text-center">Certification Focus Areas</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">{completedCount}</div>
              <p className="text-slate-400">Certifications</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">5</div>
              <p className="text-slate-400">AWS Security</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">1</div>
              <p className="text-slate-400">Industry Standard</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">2025</div>
              <p className="text-slate-400">Latest Achievement</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
