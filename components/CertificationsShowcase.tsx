'use client'

import { motion } from 'framer-motion'
import { CheckCircle, ExternalLink, Clock, Shield } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

interface Certification {
  name: string
  issuer: string
  date: string
  status: 'completed' | 'in-progress'
  skills: string[]
  verifyLink?: string
  color: string
  description: string
  image: string
  highlightLabel: string
}

export default function CertificationsShowcase() {
  const [selectedCert, setSelectedCert] = useState<number | null>(null)

  const certifications: Certification[] = [
    {
      name: 'CompTIA Security+',
      issuer: 'CompTIA',
      date: 'January 2025',
      status: 'completed',
      skills: ['Threat Detection & Response', 'Risk Assessment', 'Network Security', 'SIEM Operations', 'Vulnerability Management', 'Cryptography & PKI'],
      color: 'from-red-500 via-orange-500 to-red-600',
      description: 'Proves ability to detect security threats, implement network security controls, manage risk and vulnerabilities, and respond to incidents—meeting DoD 8140 requirements. The gold standard certification proving I have the hands-on skills employers need from day one.',
      verifyLink: 'https://www.credly.com/badges/8771ef3b-bbff-4188-b2d2-c9069c939ca4/public_url',
      image: '/images/certifications/comptia-security-plus.png',
      highlightLabel: 'DoD 8140 Approved',
    },
    {
      name: 'LetsDefend SOC Analyst Learning Path',
      issuer: 'LetsDefend',
      date: 'February 2025',
      status: 'completed',
      skills: ['SIEM Analysis (Splunk/QRadar)', 'EDR & Endpoint Security', 'Real Incident Response', 'Malware Analysis', 'Network Forensics', 'Security Alert Triage'],
      color: 'from-cyan-500 via-blue-500 to-cyan-600',
      description: 'Demonstrates expertise through 50+ real-world security incident simulations. Gained practical experience analyzing SIEM alerts, triaging threats, performing malware analysis, and responding to live attacks—skills that prove I can hit the ground running in a SOC environment.',
      verifyLink: 'https://app.letsdefend.io/certificate/show/3b48fd23-0ea8-4c67-aebd-e6cb407a54f1',
      image: '/images/certifications/letsdefend-soc-analyst.png',
      highlightLabel: 'Hands-On SOC Training',
    },
    {
      name: 'Google Cybersecurity Professional Certificate',
      issuer: 'Google',
      date: 'January 2025',
      status: 'completed',
      skills: ['Python Security Automation', 'Linux & SQL', 'SIEM Tools (Splunk)', 'Incident Response', 'Network Security', 'Risk Frameworks (NIST)'],
      color: 'from-blue-500 via-cyan-500 to-blue-600',
      description: '170-hour program designed by Google covering Python automation, SIEM operations, and incident response. Connects graduates with 150+ hiring employers including Deloitte, Cognizant, and Walmart—proving I have foundational skills from an industry leader.',
      verifyLink: 'https://www.credly.com/badges/0fab499b-10ed-4514-a5cd-37b40761120d/public_url',
      image: '/images/certifications/google-cybersecurity-certificate.png',
      highlightLabel: 'Industry Leader Training',
    },
    {
      name: 'Fortinet Certified Associate Cybersecurity',
      issuer: 'Fortinet',
      date: 'August 2025',
      status: 'completed',
      skills: ['FortiGate Configuration', 'VPN Deployment (IPsec/SSL)', 'IPS/IDS Implementation', 'Security Policy Management', 'SSL Inspection', 'Threat Prevention Systems'],
      color: 'from-red-600 via-red-500 to-orange-600',
      description: 'Validates proven ability to configure and operate FortiGate security appliances used by 70% of Fortune 500 companies. Demonstrates hands-on expertise in firewall policies, VPN deployment, and threat prevention—enterprise firewall skills that translate directly to network security roles.',
      verifyLink: 'https://www.credly.com/badges/cd35a869-2aee-45bb-ae85-2aaeefc40ccf/public_url',
      image: '/images/certifications/fortinet-associate-cybersecurity.png',
      highlightLabel: 'Enterprise Firewall Expertise',
    },
    {
      name: 'SailPoint Identity Security Leader',
      issuer: 'SailPoint',
      date: '2025',
      status: 'completed',
      skills: ['Identity Governance & Administration', 'Access Management Strategy', 'IAM Program Implementation', 'Compliance & Risk-Based Access', 'Identity Lifecycle Management'],
      color: 'from-indigo-500 via-purple-500 to-indigo-600',
      description: 'Vendor-agnostic credential demonstrating understanding of identity governance strategy and access management frameworks. Shows ability to implement IAM programs that balance security with business needs—critical for organizations managing complex identity ecosystems.',
      verifyLink: 'https://verify.skilljar.com/c/tt9wxqy96srx',
      image: '/images/certifications/sailpoint-identity-leader.png',
      highlightLabel: 'IAM Strategy Focus',
    },
    {
      name: 'AWS Security Best Practices Specialization',
      issuer: 'Amazon Web Services',
      date: 'August - October 2025',
      status: 'completed',
      skills: ['CloudWatch & GuardDuty', 'VPC Security Architecture', 'IAM Best Practices', 'CloudTrail Monitoring', 'EC2 & Compute Security', 'Compliance Logging'],
      color: 'from-orange-500 via-yellow-500 to-orange-600',
      description: '4-course specialization proving ability to secure AWS environments using native security tools. Demonstrates expertise in monitoring (CloudWatch/GuardDuty), network controls (VPC), and IAM policies—skills needed to protect cloud infrastructure used by 32% of enterprises.',
      verifyLink: '/certs/aws-security-monitoring.pdf',
      image: '/images/certifications/aws-security-specialization.png',
      highlightLabel: 'Cloud Security Skills',
    },
    {
      name: 'Fortinet FortiGate 7.6 Operator',
      issuer: 'Fortinet',
      date: 'August 2025',
      status: 'completed',
      skills: ['FortiGate 7.6 Features', 'Firewall Operations', 'System Monitoring', 'Configuration Management'],
      color: 'from-red-600 via-orange-500 to-red-700',
      description: 'Validates hands-on proficiency with FortiGate 7.6, the latest version. Proves ability to operate and monitor enterprise firewalls with current features—showing commitment to staying updated with the latest security technologies.',
      verifyLink: 'https://www.credly.com/badges/214c0777-f580-4ff3-b271-b30eab7b42af/public_url',
      image: '/images/certifications/fortinet-fortigate-operator.png',
      highlightLabel: 'Latest Version Expertise',
    },
    {
      name: 'ISC2 Candidate',
      issuer: 'ISC2',
      date: 'Active until August 2026',
      status: 'completed',
      skills: ['CISSP Pathway', 'Professional Development', 'Industry Networking', 'Continuous Learning'],
      color: 'from-green-600 via-emerald-500 to-green-700',
      description: 'Demonstrates commitment to achieving CISSP or SSCP—the most respected certifications in cybersecurity. Grants access to ISC2 resources and professional community, showing ambition to reach senior-level credentials recognized by employers worldwide.',
      verifyLink: 'https://www.credly.com/badges/53b3b7b1-4c5b-4043-ab40-66612e91c111/public_url',
      image: '/images/certifications/isc2-candidate.png',
      highlightLabel: 'CISSP Pathway',
    },
  ]

  const completedCount = certifications.filter(c => c.status === 'completed').length
  const inProgressCount = certifications.filter(c => c.status === 'in-progress').length

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-cyan-900/20 border border-cyan-600/30 rounded-full">
            <Shield className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-400 font-medium">Professional Credentials</span>
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Industry-Recognized Certifications
          </h2>
          <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
            {completedCount} active certifications demonstrating hands-on security expertise across SOC operations, cloud security, and network defense
          </p>
          <div className="flex justify-center gap-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-900/20 border border-green-600/30 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-slate-300 font-medium">{completedCount} Completed</span>
            </div>
            {inProgressCount > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 bg-yellow-900/20 border border-yellow-600/30 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-400" />
                <span className="text-slate-300 font-medium">{inProgressCount} In Progress</span>
              </div>
            )}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              onClick={() => setSelectedCert(selectedCert === index ? null : index)}
              className={`group relative bg-gradient-to-br from-slate-900/80 to-slate-800/50 backdrop-blur border rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                selectedCert === index 
                  ? 'border-cyan-500 ring-2 ring-cyan-500/50 shadow-lg shadow-cyan-500/20' 
                  : 'border-slate-700 hover:border-cyan-600/50 hover:shadow-lg'
              }`}
            >
              {/* Highlight Label */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${cert.color} text-white shadow-lg`}>
                  {cert.highlightLabel}
                </span>
              </div>

              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                {cert.status === 'completed' ? (
                  <div className="p-1.5 bg-green-900/30 border border-green-500/50 rounded-full">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                ) : (
                  <div className="p-1.5 bg-yellow-900/30 border border-yellow-500/50 rounded-full">
                    <Clock className="w-5 h-5 text-yellow-400" />
                  </div>
                )}
              </div>

              {/* Certification Badge with Image */}
              <div className="flex justify-center mb-6 mt-4">
                <div className={`relative w-24 h-24 rounded-full bg-gradient-to-br ${cert.color} p-1 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden p-2">
                    <Image
                      src={cert.image}
                      alt={`${cert.name} badge`}
                      width={80}
                      height={80}
                      className="object-contain"
                      onError={(e) => {
                        // Fallback to show colored background if image doesn't load
                        const target = e.currentTarget as HTMLImageElement
                        target.style.display = 'none'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Cert Info */}
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold mb-2 text-slate-100 group-hover:text-cyan-300 transition-colors">
                  {cert.name}
                </h3>
                <p className="text-cyan-400 text-sm font-medium mb-1">{cert.issuer}</p>
                <p className="text-slate-500 text-sm">{cert.date}</p>
              </div>

              {/* Description (shown when selected) */}
              <motion.div
                initial={false}
                animate={{ height: selectedCert === index ? 'auto' : 0, opacity: selectedCert === index ? 1 : 0 }}
                className="overflow-hidden"
              >
                <p className="text-slate-300 text-sm leading-relaxed mb-4 px-2">
                  {cert.description}
                </p>
              </motion.div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mb-4 justify-center">
                {cert.skills.slice(0, selectedCert === index ? cert.skills.length : 3).map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1 bg-slate-800/80 border border-slate-700 rounded-full text-slate-300 hover:bg-slate-700/80 hover:border-cyan-600/50 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
                {cert.skills.length > 3 && selectedCert !== index && (
                  <span className="text-xs px-3 py-1 bg-cyan-900/30 border border-cyan-600/50 rounded-full text-cyan-400 font-medium">
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
                  className="flex items-center justify-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors group/link"
                >
                  <span>View Certificate</span>
                  <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>
              )}
            </motion.div>
          ))}
        </div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="p-8 bg-gradient-to-r from-cyan-900/20 via-blue-900/20 to-purple-900/20 border border-cyan-800/30 rounded-2xl shadow-xl"
        >
          <h3 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Certification Highlights
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-slate-900/50 rounded-xl border border-slate-800">
              <div className="text-4xl font-bold text-cyan-400 mb-2">{completedCount}</div>
              <p className="text-slate-400 text-sm">Active Certifications</p>
            </div>
            <div className="text-center p-4 bg-slate-900/50 rounded-xl border border-slate-800">
              <div className="text-4xl font-bold text-orange-400 mb-2">DoD</div>
              <p className="text-slate-400 text-sm">8140 Approved</p>
            </div>
            <div className="text-center p-4 bg-slate-900/50 rounded-xl border border-slate-800">
              <div className="text-4xl font-bold text-purple-400 mb-2">Multi</div>
              <p className="text-slate-400 text-sm">Vendor Expertise</p>
            </div>
            <div className="text-center p-4 bg-slate-900/50 rounded-xl border border-slate-800">
              <div className="text-4xl font-bold text-green-400 mb-2">2025</div>
              <p className="text-slate-400 text-sm">Latest Achievement</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
