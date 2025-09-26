'use client'

import { motion } from 'framer-motion'
import { Shield, PhoneCall, AlertTriangle, CheckCircle, Clock, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function VoipTollFraudCaseStudy() {
  const kpis = [
    { label: 'Protocol / Port', value: 'SIP INVITE / UDP 5060', color: 'cyan' },
    { label: 'Source ASN', value: 'GoDaddy AS398101', color: 'purple' },
    { label: 'Payload Size', value: '819-byte INVITE', color: 'blue' },
    { label: 'Risk', value: 'High ($$ Fraud)', color: 'red' },
  ]

  const attackProfile = [
    'SIP INVITE floods over UDP/5060',
    'Persistence via varying source ports (50352, 52392, 56775)',
    'Target numbers with sequential international patterns (0075346850780296, 76000046850780294)',
    'Spoofed User-Agent: “Cisco-SIPGateway” to mimic legitimate equipment',
    'Full SDP negotiation; established bidirectional UDP flows',
  ]

  const methodology = [
    'International premium route abuse: 760/007 indicate high-tariff destinations',
    'Compromised/misconfigured PBX sought for unauthorized call placement',
    'Signature evasion using legitimate vendor fingerprints',
    'Systematic dial of sequential number ranges to find billable routes',
  ]

  const timeline = [
    {
      time: 'T+00:00',
      phase: 'Detection',
      severity: 'high',
      description: 'Sentrypeer + Suricata triggered on SIP INVITE bursts',
      actions: ['Flagged anomalous volume to 5060/UDP', 'Correlated User-Agent + SDP length', 'Enabled packet capture'],
    },
    {
      time: 'T+00:08',
      phase: 'Attribution',
      severity: 'high',
      description: 'Source 208.109.190.200 (GoDaddy/AS398101) — likely compromised VPS',
      actions: ['ASN + geo lookup', 'Checked Abuse/Whois contacts', 'Searched for prior fraud reports'],
    },
    {
      time: 'T+00:15',
      phase: 'Analysis',
      severity: 'critical',
      description: 'Confirmed toll-fraud tradecraft and premium-rate targets',
      actions: [
        'Parsed full SIP/SDP; verified SDP codecs and call intent',
        'Recognized sequential premium number patterns',
        'Classified as professional toll-fraud campaign',
      ],
    },
    {
      time: 'T+00:25',
      phase: 'Response',
      severity: 'resolved',
      description: 'Shared IOCs; tuned throttling and decoy behavior',
      actions: [
        'Rate-limited INVITE handling at sensor',
        'Filed abuse report to provider; submitted to AbuseIPDB',
        'Wrote detection notes for PBX defenders',
      ],
    },
  ]

  const impact = [
    'Toll fraud can generate $50k-$200k in hours — carriers often hold victims liable.',
    'Legit infrastructure abuse (GoDaddy VPS) complicates IP-based blocking.',
    'Whitelisted vendor strings (“Cisco-SIPGateway”) help bypass naive defenses.',
  ]

  const recommendations = [
    'Disable unauthenticated SIP on the public internet; restrict by IP where possible.',
    'Enforce outbound call rules (destinations, max concurrency, price caps).',
    'Alert on vendor strings in unexpected contexts and sequential international dialing.',
    'Deploy honeypot SIP listeners (e.g., Sentrypeer) to surface fraud early.',
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-12 px-4 bg-gradient-to-b from-rose-900/10 to-transparent">
        <div className="container mx-auto max-w-4xl">
          <Link href="/blog" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-6">
            ← Back to Blog
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-rose-500/10 rounded-lg">
                <PhoneCall className="w-8 h-8 text-rose-400" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">Honeypot Detection: Sophisticated VoIP Toll Fraud</h1>
                <p className="text-xl text-slate-400">Sentrypeer + Suricata capture INVITE floods from GoDaddy (AS398101)</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {kpis.map((k) => (
                <div key={k.label} className="bg-slate-900/50 rounded-lg p-4 text-center">
                  <p className={`text-2xl font-bold ${
                    k.color === 'cyan' ? 'text-cyan-400' :
                    k.color === 'purple' ? 'text-purple-400' :
                    k.color === 'blue' ? 'text-blue-400' :
                    'text-red-400'
                  }`}>{k.value}</p>
                  <p className="text-sm text-slate-400">{k.label}</p>
                </div>
              ))}
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
              My T-Pot honeypot observed an aggressive VoIP toll-fraud campaign from <span className="font-mono">208.109.190.200</span> (GoDaddy/AS398101).
              The attacker used legitimate-looking SIP fingerprints (“Cisco-SIPGateway”), sequential international targets, and full SDP negotiation —
              a hallmark of professional revenue-share fraud targeting misconfigured PBX systems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold mb-8">Incident Timeline</h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-rose-500 via-orange-500 to-green-500" />
            {timeline.map((ev, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} className="relative flex items-start mb-8">
                <div className={`absolute left-0 w-16 h-16 rounded-full flex items-center justify-center border-2 ${
                  ev.severity === 'critical' ? 'bg-red-900 border-red-500' :
                  ev.severity === 'high' ? 'bg-orange-900 border-orange-500' :
                  ev.severity === 'resolved' ? 'bg-green-900 border-green-500' :
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

      {/* Technical Analysis */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
              <h3 className="font-semibold text-cyan-400 mb-3">Attack Profile</h3>
              <ul className="space-y-2">{attackProfile.map((x) => <li key={x} className="text-slate-300">• {x}</li>)}</ul>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
              <h3 className="font-semibold text-cyan-400 mb-3">Methodology & Intent</h3>
              <ul className="space-y-2">{methodology.map((x) => <li key={x} className="text-slate-300
