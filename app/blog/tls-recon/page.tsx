'use client'

import { motion } from 'framer-motion'
import { Shield, Clock, AlertTriangle, CheckCircle, ChevronRight, Globe } from 'lucide-react'
import Link from 'next/link'

export default function TLSReconCaseStudy() {
  const timeline = [
    {
      time: 'T+00:00',
      phase: 'Detection',
      severity: 'medium',
      description: 'Suricata flagged anomalous TLS traffic on non-standard port 64297',
      actions: ['Alert triaged in SIEM', 'Pulled Suricata event + PCAP metadata', 'Correlated with host firewall logs'],
    },
    {
      time: 'T+00:05',
      phase: 'Attribution',
      severity: 'high',
      description: 'Source attributed to 146.70.185.71 (M247 Europe SRL, AS9009)',
      actions: ['ASN + reputation lookups', 'Checked for related activity in past 30 days', 'Tagged source as VPN/proxy exit'],
    },
    {
      time: 'T+00:12',
      phase: 'Deep Dive',
      severity: 'high',
      description: 'Confirmed full TCP/TLS session on non-standard port; short-lived but clean negotiation',
      actions: [
        'Bytes: 3,418 sent / 744 recv across 14 packets',
        'Duration ~240ms with graceful FIN/ACK',
        'No application payload beyond TLS setup',
      ],
    },
    {
      time: 'T+00:20',
      phase: 'Assessment',
      severity: 'high',
      description: 'Likely targeted reconnaissance or honeypot fingerprinting attempt',
      actions: [
        'Hypotheses: hidden admin/backdoor discovery, C2 discovery, sensor fingerprinting',
        'Marked IOC for monitoring + correlation',
      ],
    },
    {
      time: 'T+00:30',
      phase: 'Response',
      severity: 'resolved',
      description: 'Hardened decoys and added watch rules without burning the sensor',
      actions: [
        'Deployed non-deterministic TLS fingerprints on decoys',
        'Added targeted detection for repeat sessions on high ports',
        'Shared IOC to internal feed',
      ],
    },
  ]

  const connectionProfile = {
    Protocol: 'TLS over TCP on port 64297 (non-standard)',
    'Data Exchange': '3,418 bytes sent / 744 bytes received, 14 packets',
    Duration: '~240ms (complete TCP handshake and termination)',
    Behavior: 'Successful TLS negotiation on unusual high port',
    Source: '146.70.185.71 (M247 Europe SRL, AS9009)',
  }

  const implications = [
    'Operating on non-standard ports to sidestep coarse firewall rules',
    'Encrypted protocols reduce DPI efficacy and signature coverage',
    'Use of VPN/proxy hosting increases anonymization and repeatability',
  ]

  const takeaways = [
    'Modern recon frequently uses full TLS handshakes on odd ports — treat these as priority triage, not noise.',
    'Honeypots can surface pre-exploitation behaviors (admin/backdoor discovery, C2 probing) that production logs miss.',
    'Fingerprint hardening (varying certs/ciphers/timing) frustrates honeypot identification without losing visibility.',
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-12 px-4 bg-gradient-to-b from-blue-900/10 to-transparent">
        <div className="container mx-auto max-w-4xl">
          <Link href="/blog" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-6">
            ← Back to Blog
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Shield className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">Honeypot Detection: Suspicious TLS Reconnaissance</h1>
                <p className="text-xl text-slate-400">Non-standard TLS session on port 64297 from AS9009 (M247)</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-slate-900/50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-cyan-400">64297/TCP</p>
                <p className="text-sm text-slate-400">Non-standard TLS Port</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-purple-400">AS9009</p>
                <p className="text-sm text-slate-400">M247 Europe SRL</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-green-400">240ms</p>
                <p className="text-sm text-slate-400">Session Duration</p>
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
            <h2 className="text-2xl font-bold mb-4">Incident Summary</h2>
            <p className="text-slate-300">
              During routine monitoring of my T-Pot deployment, Suricata detected a full TLS negotiation on an unusual
              high port (64297/TCP) from <span className="font-mono">146.70.185.71</span> ({' '}
              <span className="inline-flex items-center gap-1"><Globe className="w-4 h-4" />M247 Europe, AS9009</span> ).
              The behavior is consistent with targeted reconnaissance, honeypot fingerprinting, or C2 discovery.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold mb-8">Incident Timeline</h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-cyan-500 to-green-500" />
            {timeline.map((ev, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="relative flex items-start mb-8"
              >
                <div
                  className={`absolute left-0 w-16 h-16 rounded-full flex items-center justify-center border-2 ${
                    ev.severity === 'high'
                      ? 'bg-orange-900 border-orange-500'
                      : ev.severity === 'resolved'
                      ? 'bg-green-900 border-green-500'
                      : 'bg-blue-900 border-blue-500'
                  }`}
                >
                  {ev.severity === 'resolved' ? <CheckCircle className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                </div>
                <div className="ml-24 flex-1">
                  <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-bold">{ev.phase}</h3>
                        <p className="text-slate-400">{ev.description}</p>
                      </div>
                      <span className="text-sm font-mono text-cyan-400">{ev.time}</span>
                    </div>
                    <ul className="mt-3 space-y-1">
                      {ev.actions.map((a, idx) => (
                        <li key={idx} className="flex items-start text-sm">
                          <ChevronRight className="w-4 h-4 text-cyan-400 mr-1 mt-0.5" />
                          <span className="text-slate-300">{a}</span>
                        </li>
                      ))}
                    </ul>
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
          <h2 className="text-2xl font-bold mb-6">Technical Analysis</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
              <h3 className="font-semibold text-cyan-400 mb-3">Connection Profile</h3>
              <ul className="space-y-2">
                {Object.entries(connectionProfile).map(([k, v]) => (
                  <li key={k} className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    <span className="text-slate-300"><span className="text-slate-400">{k}:</span> {v}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
              <h3 className="font-semibold text-cyan-400 mb-3">Threat Assessment</h3>
              <ul className="space-y-2">
                <li className="text-slate-300">Targeted search for hidden admin/backdoor services</li>
                <li className="text-slate-300">Potential honeypot fingerprinting attempts</li>
                <li className="text-slate-300">Command-and-control (C2) discovery</li>
              </ul>
              <div className="mt-4 p-3 rounded border border-yellow-800/50 bg-yellow-900/20 text-yellow-200 flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 mt-0.5" />
                The source ASN frequently hosts VPN/proxy exits — raises likelihood of deliberate anonymization.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Implications & Takeaways */}
      <section className="py-12 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Security Implications</h3>
              <ul className="space-y-2">
                {implications.map((x) => (
                  <li key={x} className="text-slate-300">• {x}</li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Key Takeaways</h3>
              <ul className="space-y-2">
                {takeaways.map((x) => (
                  <li key={x} className="text-slate-300">• {x}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold mb-4">Need help hardening against covert recon?</h2>
          <p className="text-slate-400 mb-8">
            I design honeypots and detections that surface targeted activity before exploitation.
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
