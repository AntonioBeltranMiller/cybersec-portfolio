'use client'

import { motion } from 'framer-motion'
import { Server, AlertTriangle, CheckCircle, Clock, ChevronRight, Share2 } from 'lucide-react'
import Link from 'next/link'

export default function OnypheScannerCaseStudy() {
  const scanCharacteristics = [
    'Target port: 9770/TCP (non-standard, high-entropy)',
    'Connection: TCP SYN → banner grab → immediate RST',
    'Duration: ~98ms total interaction time',
    'Bytes: ~128 sent / 74 received',
    'Behavior: Clean handshake with controlled termination',
  ]

  const scannerFacts = [
    'Organization: ONYPHE SAS — commercial threat intelligence provider',
    'Network: AS213412; traffic observed from 91.231.89.129 (OVH/Gravelines region)',
    'Reputation: Labeled “mass scanner” across multiple threat feeds',
    'Model: Sells access to discovered services, banners, certificates',
  ]

  const paradox = [
    'Legally operated scanners mirror attacker recon behavior',
    'Blocking them can reduce researcher visibility while attackers still find paths',
    'Their datasets can be purchased by threat actors (“reconnaissance-as-a-service”)',
  ]

  const recommendations = [
    'Respond with decoy banners or delayed/variable responses to pollute commercial datasets',
    'Correlate scans with later targeted traffic; raise priority when correlation exists',
    'Use honeytokens that only appear after indexing — detect downstream consumption',
    'Segment deception infra so cataloging doesn’t reveal production fingerprints',
  ]

  const timeline = [
    {
      time: 'T+00:00',
      phase: 'Detection',
      severity: 'low',
      description: 'Suricata flagged inbound probe to 9770/TCP',
      actions: ['Event triaged', 'Session reconstructed', 'Confirmed banner grab + RST'],
    },
    {
      time: 'T+00:04',
      phase: 'Attribution',
      severity: 'medium',
      description: 'IP linked to ONYPHE SAS (AS213412), known commercial scanner',
      actions: ['ASN + org lookups', 'Checked existing sightings in TI feeds', 'Tagged as “mass scanner”'],
    },
    {
      time: 'T+00:10',
      phase: 'Assessment',
      severity: 'medium',
      description: 'Non-targeted internet-wide enumeration; low immediate risk but high OSINT impact',
      actions: ['Categorized as mapping activity', 'Evaluated exposure of deception fingerprints'],
    },
    {
      time: 'T+00:18',
      phase: 'Response',
      severity: 'resolved',
      description: 'Implemented scanner-specific responses and tracking',
      actions: ['Decoy banner rotation enabled', 'Honeytoken beacon prepared', 'Correlation alert created'],
    },
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-12 px-4 bg-gradient-to-b from-violet-900/10 to-transparent">
        <div className="container mx-auto max-w-4xl">
          <Link href="/blog" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-6">
            ← Back to Blog
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-violet-500/10 rounded-lg">
                <Server className="w-8 h-8 text-violet-400" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">Honeypot Detection: Commercial Threat Intel Mapping (ONYPHE)</h1>
                <p className="text-xl text-slate-400">Systematic scan on 9770/TCP with banner grab and controlled RST</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-slate-900/50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-cyan-400">9770/TCP</p>
                <p className="text-sm text-slate-400">Target Port</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-purple-400">AS213412</p>
                <p className="text-sm text-slate-400">ONYPHE SAS</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-green-400">~98 ms</p>
                <p className="text-sm text-slate-400">Interaction Time</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Executive Summary */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4">Executive Summary</h2>
            <p className="text-slate-300">
              Suricata detected internet-wide reconnaissance by ONYPHE (commercial scanner). The probe executed a clean
              TCP handshake, captured a banner, and immediately reset — classic cataloging behavior for sale in a
              commercial database. While not malicious per se, this activity enables both defenders and adversaries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold mb-8">Observation Timeline</h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-500 via-cyan-500 to-green-500" />
            {timeline.map((ev, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} className="relative flex items-start mb-8">
                <div className={`absolute left-0 w-16 h-16 rounded-full flex items-center justify-center border-2 ${
                  ev.severity === 'resolved' ? 'bg-green-900 border-green-500' :
                  ev.severity === 'medium' ? 'bg-yellow-900 border-yellow-500' :
                  'bg-slate-900 border-slate-500'
                }`}>
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

      {/* Technical Analysis & Strategy */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
              <h3 className="font-semibold text-cyan-400 mb-3">Scan Characteristics</h3>
              <ul className="space-y-2">{scanCharacteristics.map((x) => <li key={x} className="text-slate-300">• {x}</li>)}</ul>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
              <h3 className="font-semibold text-cyan-400 mb-3">Scanner Infrastructure</h3>
              <ul className="space-y-2">{scannerFacts.map((x) => <li key={x} className="text-slate-300">• {x}</li>)}</ul>
              <div className="mt-4 p-3 rounded border border-yellow-800/50 bg-yellow-900/20 text-yellow-200 flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 mt-0.5" />
                Findings may be re-sold — assume your deception fingerprints are catalogued.
              </div>
            </div>
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">The Researcher Paradox</h3>
              <ul className="space-y-2">{paradox.map((x) => <li key={x} className="text-slate-300">• {x}</li>)}</ul>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Strategic Recommendations</h3>
              <ul className="space-y-2">{recommendations.map((x) => <li key={x} className="text-slate-300">• {x}</li>)}</ul>
              <p className="mt-3 text-xs text-slate-500 flex items-center gap-2">
                <Share2 className="w-4 h-4" /> Consider sharing noisy decoy intel to dilute value while tracking reuse.
              </p>
            </div>
          </div>
        </div>
      </section>
  )
}
