'use client'

import { motion } from 'framer-motion'
import { Award, CheckCircle, ExternalLink, Clock, Shield } from 'lucide-react'
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
  highlight?: string
}

export default function CertificationsShowcase() {
  const [selectedCert, setSelectedCert] = useState<number | null>(null)

  const certifications: Certification[] = [
    {
      name: "CompTIA Security+",
      issuer: "CompTIA",
      date: "January 2025",
      status: "completed",
      skills: ["Threat Detection & Analysis", "Incident Response", "Risk Management", "Network Hardening", "SIEM Operations", "Vulnerability Assessment", "Security Controls"],
      color: "from-red-500 to-orange-500",
      highlight: "DoD 8140 Approved",
      description: "Industry-standard certification proving hands-on ability to detect threats, respond to incidents, and secure enterprise networks. Validates expertise in vulnerability management, risk assessment, and security operations—meeting DoD 8140 requirements for government and defense contractor roles.",
      verifyLink: "https://www.credly.com/badges/8771ef3b-bbff-4188-b2d2-c9069c939ca4/public_url",
      image: "/images/certifications/comptia-security-plus.png",
    },
    {
      name: "LetsDefend SOC Analyst Learning Path",
      issuer: "LetsDefend",
      date: "February 2025",
      status: "completed",
      skills: ["Real-World Incident Response", "SIEM Analysis (Splunk)", "EDR Platform Operations", "Threat Hunting", "Log Analysis & Correlation", "Malware Investigation", "Alert Triage & Escalation"],
      color: "from-cyan-500 to-blue-600",
      highlight: "Hands-On SOC Training",
      description: "Practical SOC analyst training through 50+ real-world security incident simulations. Demonstrates ability to investigate alerts, analyze SIEM data, respond to active threats, and execute incident response procedures—proven skills employers need from day one.",
      verifyLink: "https://app.letsdefend.io/certificate/show/3b48fd23-0ea8-4c67-aebd-e6cb407a54f1",
      image: "/images/certifications/letsdefend-soc-analyst.png",
    },
    {
      name: "Google Cybersecurity Professional Certificate",
      issuer: "Google",
      date: "January 2025",
      status: "completed",
      skills: ["Python Security Automation", "Linux System Security", "SQL for Security Analysis", "SIEM Tools (Splunk, Chronicle)", "Network Protocol Analysis", "NIST Frameworks", "Incident Detection & Response"],
      color: "from-blue-500 to-cyan-500",
      highlight: "Google Career Certificate",
      description: "Comprehensive 170-hour program covering Python automation, Linux administration, and SIEM operations. Designed by Google security experts to prepare for Security+ and entry-level analyst roles—connects graduates with 150+ hiring employers including Google, Deloitte, and T-Mobile.",
      verifyLink: "https://www.credly.com/badges/0fab499b-10ed-4514-a5cd-37b40761120d/public_url",
      image: "/images/certifications/google-cybersecurity-certificate.png",
    },
    {
      name: "Fortinet Certified Associate Cybersecurity",
      issuer: "Fortinet",
      date: "August 2025",
      status: "completed",
      skills: ["FortiGate Firewall Management", "IPsec & SSL VPN Deployment", "IPS/IDS Configuration", "Security Policy Implementation", "SSL Inspection", "Threat Intelligence Integration", "Network Segmentation"],
      color: "from-red-600 to-red-700",
      highlight: "Enterprise Firewall Expertise",
      description: "Validates hands-on ability to deploy, configure, and manage FortiGate next-gen firewalls used by 70% of Fortune 500 companies. Covers VPN tunnels, intrusion prevention, application control, and security fabric integration—essential skills for network security roles.",
      verifyLink: "https://www.credly.com/badges/cd35a869-2aee-45bb-ae85-2aaeefc40ccf/public_url",
      image: "/images/certifications/fortinet-associate-cybersecurity.png",
    },
    {
      name: "SailPoint Identity Security Leader",
      issuer: "SailPoint",
      date: "2025",
      status: "completed",
      skills: ["Identity Governance (IGA)", "Access Management Strategy", "Zero Trust Architecture", "Compliance & Auditing", "Role-Based Access Control", "Identity Lifecycle Management", "Privileged Access"],
      color: "from-indigo-500 to-purple-600",
      highlight: "IAM Leadership",
      description: "Vendor-agnostic credential demonstrating strategic understanding of identity governance and access management. Covers planning IAM programs, implementing zero-trust principles, and managing compliance requirements—critical for organizations securing cloud and hybrid environments.",
      verifyLink: "https://verify.skilljar.com/c/tt9wxqy96srx",
      image: "/images/certifications/sailpoint-identity-leader.png",
    },
    {
      name: "AWS Security Best Practices Specialization",
      issuer: "Amazon Web Services",
      date: "August - October 2025",
      status: "completed",
      skills: ["CloudWatch Monitoring", "GuardDuty Threat Detection", "Security Hub Management", "VPC Security Architecture", "IAM Policy Design", "CloudTrail Logging", "Compute Hardening", "Incident Response"],
      color: "from-orange-500 to-yellow-500",
      highlight: "4-Course Cloud Security Series",
      description: "Comprehensive AWS security specialization covering cloud architecture security, threat detection with GuardDuty, VPC network controls, and security monitoring. Demonstrates ability to secure AWS workloads, implement least-privilege access, and respond to cloud security incidents.",
      verifyLink: "/certs/aws-security-monitoring.pdf",
      image: "/images/certifications/aws-security-specialization.png",
    },
    {
      name: "Fortinet FortiGate 7.6 Operator",
      issuer: "Fortinet",
      date: "August 2025",
      status: "completed",
      skills: ["FortiGate 7.6 Features", "Advanced Firewall Operations", "Security Fabric Integration", "Performance Monitoring", "Threat Detection", "Configuration Management"],
      color: "from-red-600 to-orange-600",
      highlight: "Latest Platform Version",
      description: "Specialized certification in FortiGate 7.6, demonstrating proficiency with the latest features including AI-powered threat detection, Security Fabric orchestration, and advanced firewall capabilities—staying current with cutting-edge network security technology.",
      verifyLink: "https://www.credly.com/badges/214c0777-f580-4ff3-b271-b30eab7b42af/public_url",
      image: "/images/certifications/fortinet-fortigate-operator.png",
    },
    {
      name: "ISC2 Candidate",
      issuer: "ISC2",
      date: "Active until August 2026",
      status: "completed",
      skills: ["CISSP Preparation", "Professional Development", "Security Leadership Path", "Industry Best Practices", "Continuous Learning", "Cybersecurity Community"],
      color: "from-green-600 to-emerald-600",
      highlight: "CISSP Track",
      description: "Active ISC2 member on pathway to CISSP—the premier cybersecurity certification. Demonstrates commitment to professional growth and achieving advanced credentials. Provides access to ISC2 resources, mentorship, and the global cybersecurity leadership community.",
      verifyLink: "https://www.credly.com/badges/53b3b7b1-4c5b-4043-ab40-66612e91c111/public_url",
      image: "/images/certifications/isc2-candidate.png",
    },
  ]

  const completedCount = certifications.filter(c => c.status === "completed").length
  const inProgressCount = certifications.filter(c => c.status === "in-progress").length

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-cyan-400" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Professional Certifications
            </h2>
          </div>
          <p className="text-slate-300 text-lg mb-6 max-w-2xl mx-auto">
            Industry-recognized credentials validating hands-on security expertise across threat detection, 
            incident response, cloud security, and network defense
          </p>
          <div className="flex justify-center gap-8 flex-wrap">
            <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-slate-200 font-semibold">{completedCount} Active Certifications</span>
            </div>
            {inProgressCount > 0 && (
              <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full">
                <Clock className="w-5 h-5 text-yellow-400" />
                <span className="text-slate-200 font-semibold">{inProgressCount} In Progress</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedCert(selectedCert === index ? null : index)}
              className={`group relative bg-slate-900/80 backdrop-blur border rounded-xl p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                selectedCert === index 
                  ? "border-cyan-500 shadow-lg shadow-cyan-500/20 ring-2 ring-cyan-500/50" 
                  : "border-slate-800 hover:border-cyan-600/50"
              }`}
            >
              {/* Status Badge */}
              <div className="absolute top-4 right-4 z-10">
                {cert.status === "completed" ? (
                  <div className="bg-green-500/20 p-1.5 rounded-full">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                ) : (
                  <div className="bg-yellow-500/20 p-1.5 rounded-full">
                    <Clock className="w-5 h-5 text-yellow-400" />
                  </div>
                )}
              </div>

              {/* Certification Badge */}
              <div className="relative mb-4">
                <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${cert.color} p-0.5 mx-auto`}>
                  <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center overflow-hidden p-2">
                    <Image
                      src={cert.image}
                      alt={`${cert.name} badge`}
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                </div>
                {cert.highlight && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="text-xs font-semibold px-3 py-1 bg-cyan-600 text-white rounded-full shadow-lg">
                      {cert.highlight}
                    </span>
                  </div>
                )}
              </div>

              {/* Cert Info */}
              <div className="text-center mb-4 mt-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                  {cert.name}
                </h3>
                <p className="text-cyan-400 text-sm font-medium mb-1">{cert.issuer}</p>
                <p className="text-slate-400 text-xs">{cert.date}</p>
              </div>

              {/* Description (shown when selected) */}
              <motion.div
                initial={false}
                animate={{ 
                  height: selectedCert === index ? "auto" : 0,
                  opacity: selectedCert === index ? 1 : 0 
                }}
                className="overflow-hidden"
              >
                <div className="mb-4 pt-2 border-t border-slate-700">
                  <p className="text-slate-300 text-sm leading-relaxed">{cert.description}</p>
                </div>
              </motion.div>

              {/* Skills */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {cert.skills.slice(0, selectedCert === index ? cert.skills.length : 3).map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 bg-slate-800/70 hover:bg-slate-700/70 rounded-md text-slate-300 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                  {cert.skills.length > 3 && selectedCert !== index && (
                    <span className="text-xs px-2.5 py-1 bg-cyan-600/20 rounded-md text-cyan-400 font-medium">
                      +{cert.skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Verify Link */}
              {cert.verifyLink && (
                
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
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-900/20 via-blue-900/20 to-purple-900/20 border border-cyan-800/30 p-8"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 animate-pulse" />
          
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Certification Portfolio Highlights
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center group">
                <div className="text-4xl font-bold bg-gradient-to-br from-cyan-400 to-cyan-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                  {completedCount}
                </div>
                <p className="text-slate-300 text-sm font-medium">Active Certifications</p>
              </div>
              <div className="text-center group">
                <div className="text-4xl font-bold bg-gradient-to-br from-green-400 to-emerald-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                  DoD
                </div>
                <p className="text-slate-300 text-sm font-medium">8140 Approved</p>
              </div>
              <div className="text-center group">
                <div className="text-4xl font-bold bg-gradient-to-br from-blue-400 to-purple-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                  Multi
                </div>
                <p className="text-slate-300 text-sm font-medium">Vendor Expertise</p>
              </div>
              <div className="text-center group">
                <div className="text-4xl font-bold bg-gradient-to-br from-orange-400 to-red-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                  2025
                </div>
                <p className="text-slate-300 text-sm font-medium">Latest Achievement</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
