'use client'

import { motion } from 'framer-motion'
import { Shield, Clock, AlertTriangle, CheckCircle, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function IncidentResponseCaseStudy() {
  const timelineEvents = [
    {
      time: 'T+00:00',
      phase: 'Initial Contact',
      description: 'Client reported website not loading properly',
      severity: 'unknown',
      actions: ['Gathered initial symptoms', 'Requested access credentials', 'Initiated remote session'],
    },
    {
      time: 'T+00:15',
      phase: 'Discovery',
      description: 'Identified suspicious files and unauthorized admin accounts',
      severity: 'high',
      actions: ['Found multiple PHP files with obfuscated code', 'Discovered 3 unauthorized admin users', 'Detected modified .htaccess rules'],
    },
    {
      time: 'T+00:30',
      phase: 'Containment',
      description: 'Isolated affected systems and prevented further damage',
      severity: 'critical',
      actions: ['Blocked external access to admin panel', 'Disabled compromised accounts', 'Captured forensic evidence'],
    },
    {
      time: 'T+01:00',
      phase: 'Investigation',
      description: 'Root cause analysis revealed unpatched plugin vulnerability',
      severity: 'critical',
      actions: ['Identified entry point: outdated plugin with known CVE', 'Found webshell backdoors in theme files', 'Discovered database manipulation attempts'],
    },
    {
      time: 'T+01:30',
      phase: 'Eradication',
      description: 'Removed all malicious code and closed attack vectors',
      severity: 'medium',
      actions: ['Cleaned infected files', 'Removed backdoors and webshells', 'Patched vulnerable plugin', 'Reset all credentials'],
    },
    {
      time: 'T+02:00',
      phase: 'Recovery',
      description: 'Restored from clean backup and hardened security',
      severity: 'low',
      actions: ['Restored from pre-compromise backup', 'Applied all security updates', 'Implemented WAF rules', 'Configured file integrity monitoring'],
    },
    {
      time: 'T+02:30',
      phase: 'Lessons Learned',
      description: 'Documented findings and implemented monitoring',
      severity: 'resolved',
      actions: ['Created incident report', 'Implemented security monitoring', 'Scheduled security audit', 'Client training on security practices'],
    },
  ]

  const technicalFindings = {
    'Attack Vector': 'Unpatched WordPress plugin (CVE-2021-XXXXX)',
    'Compromise Depth': 'Web application layer with attempted lateral movement',
    'Data at Risk': '5,000+ customer records, payment information',
    'Persistence Mechanisms': ['Webshell backdoors', 'Modified core files', 'Hidden admin accounts'],
    'IOCs Identified': ['Malicious IPs', 'File hashes', 'Modified timestamps', 'Suspicious user agents'],
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-12 px-4 bg-gradient-to-b from-red-900/10 to-transparent">
        <div className="container mx-auto max-w-4xl">
          <Link href="/" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-6">
            ← Back to Home
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-red-500/10 rounded-lg">
                <Shield className="w-8 h-8 text-red-400" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">Critical Incident Response</h1>
                <p className="text-xl text-slate-400">WordPress Compromise &amp; Recovery</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-slate-900/50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-cyan-400">2.5 hrs</p>
                <p className="text-sm text-slate-400">Total Resolution Time</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-green-400">5,000+</p>
                <p className="text-sm text-slate-400">Records Protected</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-orange-400">$500K+</p>
                <p className="text-sm text-slate-400">Potential Loss Prevented</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Executive Summary */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl p-8 mb-12"
          >
            <h2 className="text-2xl font-bold mb-4">Executive Summary</h2>
            <p className="text-slate-300 mb-4">
              What began as a routine website issue quickly escalated into a critical security incident involving 
              active compromise, data exfiltration attempts, and multiple persistence mechanisms. Through rapid 
              response and systematic remediation, we successfully contained the breach, prevented data loss, and 
              restored operations within 2.5 hours.
            </p>
            <p className="text-slate-300">
              This case demonstrates the importance of treating every anomaly as a potential security incident 
              and the value of comprehensive incident response procedures. The attack leveraged a known vulnerability 
              in an outdated plugin, highlighting the critical nature of patch management.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="py-12 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold mb-8">Incident Timeline</h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-500 via-yellow-500 to-green-500"></div>
            
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative flex items-start mb-8"
              >
                {/* Timeline dot */}
                <div className={`absolute left-0 w-16 h-16 rounded-full flex items-center justify-center ${
                  event.severity === 'critical' ? 'bg-red-900 border-red-500' :
                  event.severity === 'high' ? 'bg-orange-900 border-orange-500' :
                  event.severity === 'medium' ? 'bg-yellow-900 border-yellow-500' :
                  event.severity === 'low' ? 'bg-blue-900 border-blue-500' :
                  event.severity === 'resolved' ? 'bg-green-900 border-green-500' :
                  'bg-slate-900 border-slate-500'
                } border-2`}>
                  {event.severity === 'critical' ? <AlertTriangle className="w-6 h-6" /> :
                   event.severity === 'resolved' ? <CheckCircle className="w-6 h-6" /> :
                   <Clock className="w-6 h-6" />}
                </div>

                {/* Content */}
                <div className="ml-24 flex-1">
                  <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-bold">{event.phase}</h3>
                        <p className="text-slate-400">{event.description}</p>
                      </div>
                      <span className="text-sm font-mono text-cyan-400">{event.time}</span>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-sm text-slate-500 mb-2">Actions Taken:</p>
                      <ul className="space-y-1">
                        {event.actions.map((action, idx) => (
                          <li key={idx} className="flex items-start text-sm">
                            <ChevronRight className="w-4 h-4 text-cyan-400 mr-1 mt-0.5" />
                            <span className="text-slate-300">{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Analysis */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold mb-8">Technical Findings</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(technicalFindings).map(([key, value]) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-6"
              >
                <h3 className="font-semibold text-cyan-400 mb-3">{key}</h3>
                {Array.isArray(value) ? (
                  <ul className="space-y-2">
                    {value.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-green-400 mr-2">✓</span>
                        <span className="text-slate-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-300">{value}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lessons Learned */}
      <section className="py-12 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-800/50 rounded-xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6">Key Takeaways</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-cyan-400 mb-2">1. Never Underestimate Simple Issues</h3>
                <p className="text-slate-300">What appeared to be a simple website problem was actually an active compromise. Always investigate thoroughly.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-cyan-400 mb-2">2. Speed is Critical</h3>
                <p className="text-slate-300">Quick identification and containment prevented data exfiltration and further system compromise.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-cyan-400 mb-2">3. Defense in Depth Works</h3>
                <p className="text-slate-300">Multiple security layers would have prevented or limited this incident. Post-incident hardening included WAF, monitoring, and integrity checking.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-cyan-400 mb-2">4. Documentation is Crucial</h3>
                <p className="text-slate-300">Detailed documentation helped the client understand the incident and implement preventive measures.</p>
              </div>
            </div>

            <div className="mt-8 p-4 bg-slate-900/50 rounded-lg">
              <p className="text-sm text-slate-400 italic">
                Note: Specific technical details, client information, and actual vulnerability identifiers have been 
                redacted or modified to maintain confidentiality while preserving the educational value of this case study.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold mb-4">Need Incident Response Expertise?</h2>
          <p className="text-slate-400 mb-8">
            This case study demonstrates my approach to critical incidents: rapid response, thorough investigation, and comprehensive remediation.
          </p>
          <Link href="/#contact" className="inline-flex items-center px-6 py-3 bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-colors">
            Get in Touch
            <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  )
}
