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
      verifyLink: 'https://www.credly.com/users/antonio-beltran-miller',
    },
    {
      name: 'LetsDefend SOC Analyst Learning Path',
      issuer: 'LetsDefend',
      date: 'February 12, 2025',
      status: 'completed',
      skills: ['SOC Operations', 'Incident Response', 'SIEM Analysis', 'Threat Detection', 'Security Monitoring'],
      color: 'from-cyan-500 to-blue-600',
      description: 'Comprehensive SOC analyst training covering real-world security operations scenarios',
      verifyLink: 'https://app.letsdefend.io/certificate/show/3b48fd23-0ea8-4c67-aebd-e6cb407a54f1',
    },
    {
      name: 'Google Cybersecurity Certificate',
      issuer: 'Google',
      date: 'January 20, 2025',
      status: 'completed',
      skills: ['SIEM Tools', 'Python', 'Linux', 'SQL', 'IDS', 'Risk Management'],
      color: 'from-blue-500 to-cyan-500',
      description: '8-course professional certificate with hands-on practice in cybersecurity fundamentals',
      verifyLink: 'https://coursera.org/verify/professional-cert/4C8X6MTX0XMD',
    },
    {
      name: 'Fortinet Certified Associate in Cybersecurity',
      issuer: 'Fortinet',
      date: 'August 29, 2025',
      status: 'completed',
      skills: ['Network Security', 'Firewall Configuration', 'IPS/IDS', 'VPN', 'Threat Prevention'],
      color: 'from-red-600 to-red-700',
      description: 'Associate-level cybersecurity certification covering network security fundamentals',
      verifyLink: 'https://training.fortinet.com/admin/tool/certificate/index.php',
    },
    {
      name: 'SailPoint Identity Security Leader',
      issuer: 'SailPoint',
      date: '2025',
      status: 'completed',
      skills: ['Identity Governance', 'Access Management', 'IGA', 'Compliance', 'Identity Security'],
      color: 'from-indigo-500 to-purple-600',
      description: 'Identity and access management certification focusing on governance and compliance',
      verifyLink: 'http://verify.skilljar.com/c/tt9wxqy96srx',
    },
    {
      name: 'Cisco Introduction to Cybersecurity',
      issuer: 'Cisco Networking Academy',
      date: 'August 25, 2025',
      status: 'completed',
      skills: ['Security Fundamentals', 'Threat Landscape', 'Network Security', 'Data Protection'],
      color: 'from-blue-600 to-cyan-600',
      description: 'Foundational cybersecurity concepts and industry best practices',
      verifyLink: 'https://www.credly.com/users/antonio-beltran-miller',
    },
    {
      name: 'AWS Security Best Practices: Overview',
      issuer: 'Amazon Web Services',
      date: 'August 26, 2025',
      status: 'completed',
      skills: ['Cloud Security', 'AWS Security Services', 'Best Practices', 'Compliance'],
      color: 'from-orange-500 to-yellow-500',
      description: 'Comprehensive overview of AWS security fundamentals and architecture',
      verifyLink: 'https://www.credly.com/users/antonio-beltran-miller',
    },
    {
      name: 'AWS Security Best Practices: Computing',
      issuer: 'Amazon Web Services',
      date: 'August 26, 2025',
      status: 'completed',
      skills: ['EC2 Security', 'Container Security', 'Serverless Security', 'Compute Hardening'],
      color: 'from-orange-500 to-yellow-500',
      description: 'Securing compute resources in AWS environments',
      verifyLink: 'https://www.credly.com/users/antonio-beltran-miller',
    },
    {
      name: 'AWS Security Best Practices: Network Infrastructure',
      issuer: 'Amazon Web Services',
      date: 'August 26, 2025',
      status: 'completed',
      skills: ['VPC Security', 'Security Groups', 'NACLs', 'Network Segmentation', 'WAF'],
      color: 'from-orange-500 to-yellow-500',
      description: 'Network security architecture and controls in AWS',
      verifyLink: 'https://www.credly.com/users/antonio-beltran-miller',
    },
    {
      name: 'AWS Security Best Practices: Monitoring and Alerting',
      issuer: 'Amazon Web Services',
      date: 'October 15, 2025',
      status: 'completed',
      skills: ['CloudWatch', 'GuardDuty', 'Security Hub', 'CloudTrail', 'Config'],
      color: 'from-orange-500 to-yellow-500',
      description: 'Implementing security monitoring and incident detection in AWS',
      verifyLink: 'https://www.credly.com/users/antonio-beltran-miller',
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
              <div className="text-3xl font-bold text-cyan-400 mb-2">4</div>
              <p className="text-slate-400">AWS Security</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">3</div>
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
