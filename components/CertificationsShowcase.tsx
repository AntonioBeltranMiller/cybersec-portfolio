'use client'

import { motion } from 'framer-motion'
import { CheckCircle, ExternalLink, Shield } from 'lucide-react'
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
      skills: ["Threat Detection", "Incident Response", "Risk Management"],
      color: "from-red-500 to-orange-500",
      highlight: "DoD 8140 Approved",
      description: "Industry-standard certification proving hands-on ability to detect threats and secure networks.",
      verifyLink: "https://www.credly.com/badges/8771ef3b-bbff-4188-b2d2-c9069c939ca4/public_url",
      image: "/images/certifications/comptia-security-plus.png",
    },
    {
      name: "LetsDefend SOC Analyst",
      issuer: "LetsDefend",
      date: "February 2025",
      status: "completed",
      skills: ["SIEM Analysis", "Incident Response", "Threat Hunting"],
      color: "from-cyan-500 to-blue-600",
      highlight: "Hands-On Training",
      description: "Practical SOC analyst training through real-world security incident simulations.",
      verifyLink: "https://app.letsdefend.io/certificate/show/3b48fd23-0ea8-4c67-aebd-e6cb407a54f1",
      image: "/images/certifications/letsdefend-soc-analyst.png",
    },
  ]

  const completedCount = certifications.filter((c) => c.status === "completed").length

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Shield className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-cyan-400 mb-4">
            Professional Certifications
          </h2>
          <p className="text-slate-300 mb-6">
            {completedCount} Active Certifications
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <div
              key={index}
              onClick={() => setSelectedCert(selectedCert === index ? null : index)}
              className="bg-slate-900 border border-slate-800 rounded-xl p-6 cursor-pointer hover:border-cyan-600"
            >
              <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${cert.color} p-1 mx-auto mb-4`}>
                <div className="w-full h-full rounded-xl bg-slate-900 flex items-center justify-center p-2">
                  <Image src={cert.image} alt={cert.name} width={64} height={64} className="object-contain" />
                </div>
              </div>

              {cert.highlight && (
                <span className="text-xs px-3 py-1 bg-cyan-600 text-white rounded-full">{cert.highlight}</span>
              )}

              <h3 className="text-xl font-bold mt-4 mb-2">{cert.name}</h3>
              <p className="text-cyan-400 text-sm mb-1">{cert.issuer}</p>
              <p className="text-slate-400 text-xs mb-4">{cert.date}</p>

              {selectedCert === index && (
                <p className="text-slate-300 text-sm mb-4">{cert.description}</p>
              )}

              <div className="flex flex-wrap gap-2 mb-4">
                {cert.skills.map((skill, idx) => (
                  <span key={idx} className="text-xs px-2 py-1 bg-slate-800 rounded text-slate-300">
                    {skill}
                  </span>
                ))}
              </div>

              {cert.verifyLink && (
                
                  href={cert.verifyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 text-cyan-400 text-sm"
                >
                  <span>View Certificate</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
