'use client'

// FILE:  app/projects/letsdefend-phishing/page.tsx
// Images: public/images/projects/
//   Takeownership.png, ThePhishingEmail.png, ThreatIntelShowsLumma.png,
//   affectedEndpoint.png, ConfirmedPayloadExecution.png, mshta_Process_Fire.png,
//   VIrustotalHashLookup.png, NetworkTrafficEvidence.png, HostContained.png

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  Shield,
  AlertTriangle,
  Terminal,
  Activity,
  Search,
  Network,
  Lock,
  CheckCircle,
  ArrowLeft,
} from 'lucide-react'

interface Step {
  id: number
  phase: string
  title: string
  summary: string
  image: string
  imageAlt: string
  details: string[]
  mitre?: string[]
  iocs?: { label: string; value: string }[]
  verdict?: 'malicious' | 'benign' | 'suspicious' | 'confirmed'
  icon: React.ReactNode
}

const steps: Step[] = [
  {
    id: 1,
    phase: 'Ticket Ownership',
    title: 'Alert Claimed',
    icon: <CheckCircle className="w-5 h-5" />,
    summary:
      'Before any investigation begins, ownership of the alert is taken. This is standard SOC practice. claiming the ticket prevents two analysts from working the same case and establishes a clear chain of accountability.',
    image: '/images/projects/Takeownership.png',
    imageAlt: 'LetsDefend alert panel showing ticket ownership being taken',
    details: [
      'Alert: SOC338 - Lumma Stealer - DLL Side-Loading via ClickFix Phishing',
      'EventID: 316 | Severity: Critical | Type: Data Leakage',
      'Ticket is claimed before any investigation steps are taken. this is non-negotiable SOC hygiene',
      'Claiming the ticket locks it to one analyst and prevents duplicate investigation work',
      'Level: Security Analyst. scoped to Tier 1 triage with a clear Tier 2 escalation path',
      'First read of the trigger reason: "Redirected site contains a ClickFix type script for Lumma Stealer distribution". this immediately signals social engineering delivery rather than a malicious attachment',
    ],
    verdict: 'suspicious',
  },
  {
    id: 2,
    phase: 'Alert Triage',
    title: 'Phishing Email Reviewed',
    icon: <Search className="w-5 h-5" />,
    summary:
      'A critical-severity alert fired for an email impersonating Microsoft, sent from a third-party domain to dylan@letsdefend.io. The device action was Allowed, meaning the email was not blocked and landed in the inbox.',
    image: '/images/projects/ThePhishingEmail.png',
    imageAlt: 'Phishing email displayed in LetsDefend Email Security panel',
    details: [
      'Sender: update@windows-update.site. has no affiliation with Microsoft',
      'Subject: "Upgrade your system to Windows 11 Pro for FREE". urgency-based lure',
      'SMTP Source IP: 132.232.40.201',
      'Device Action: Allowed. the email reached Dylan\'s mailbox unblocked',
      'The email body mimics a Microsoft Windows 11 upgrade page and includes a countdown timer to push the user into acting fast',
      'Trigger reason: the redirected site contains a ClickFix-type script for Lumma Stealer distribution',
      'Because delivery is ClickFix-based, the malicious action happens entirely on the redirected site. Attachment scanning and email filtering provide no protection here.',
    ],
    verdict: 'malicious',
  },
  {
    id: 3,
    phase: 'Threat Intelligence',
    title: 'Sender IP Confirmed as Lumma C2',
    icon: <Shield className="w-5 h-5" />,
    summary:
      'A Threat Intel lookup on 132.232.40.201 returned a direct hit tagged "Lumma, Lumma Stealer". confirming the sending infrastructure is known malicious C2.',
    image: '/images/projects/ThreatIntelShowsLumma.png',
    imageAlt: 'LetsDefend Threat Intel panel showing Lumma Stealer tag on 132.232.40.201',
    details: [
      '132.232.40.201 is indexed in LetsDefend Threat Intel as of Mar 13, 2025 at 04:58 PM',
      'Tagged: Lumma, Lumma Stealer. a Malware-as-a-Service infostealer active since 2022',
      'Lumma Stealer targets browser credentials, session cookies, crypto wallets, and 2FA data',
      'This confirms the email originated from known Lumma C2 infrastructure, not an unrelated spammer',
      'At this point the alert is already a confirmed True Positive. The rest of the investigation is about establishing full scope.',
    ],
    iocs: [
      { label: 'Malicious IP', value: '132.232.40.201' },
      { label: 'Threat Tag', value: 'Lumma, Lumma Stealer' },
      { label: 'Intel Source', value: 'LetsDefend Threat Intel (Anonymous)' },
    ],
    verdict: 'confirmed',
  },
  {
    id: 4,
    phase: 'Endpoint Investigation',
    title: 'Affected Endpoint Located',
    icon: <Activity className="w-5 h-5" />,
    summary:
      "Dylan's endpoint was found in Endpoint Security. The host was running Windows 10 on IP 172.16.17.216. Containment was OFF at this point, meaning the machine was still live on the network.",
    image: '/images/projects/affectedEndpoint.png',
    imageAlt: "LetsDefend Endpoint Security panel showing Dylan's host information",
    details: [
      'Hostname: Dylan | Domain: LetsDefend | IP: 172.16.17.216',
      'OS: Windows 10 64-bit | User: Dylan | Type: Client',
      'Last Login: Mar 14, 2025, 12:05 PM. a post-incident login, confirming the user remained active after the alert fired',
      'Containment was OFF at time of discovery. isolation needed immediately',
      'EDR shows 87 processes, 28 network actions, 3 terminal history entries, and 1 browser history entry',
      'Only 3 terminal history entries. a small number, but each one turned into a critical artifact',
    ],
    verdict: 'suspicious',
  },
  {
    id: 5,
    phase: 'Execution Evidence',
    title: 'ClickFix Command Found in Terminal History',
    icon: <Terminal className="w-5 h-5" />,
    summary:
      "Terminal history confirmed Dylan manually ran a ClickFix clipboard payload. The command reconstructs mshta.exe at runtime to evade detection, then fetches the Lumma payload from a C2 URL disguised as a .mp4 file.",
    image: '/images/projects/ConfirmedPayloadExecution.png',
    imageAlt: 'LetsDefend terminal history showing obfuscated ClickFix PowerShell command',
    details: [
      'PowerShell.exe ran with -w 1 (WindowStyle Hidden). no terminal window was visible to the user',
      'Obfuscation method: "ms]]]ht]]]a]]].]]]exe" with -replace \']\' reconstructs "mshta.exe" at runtime',
      'This technique breaks static AV and YARA signatures that scan for the literal string "mshta.exe"',
      'C2 payload URL: https://overcoatpassably.shop/Z8UZbPyVpGfdRS/maloy.mp4',
      'The .mp4 extension is a content filter bypass. the file is an HTA/PowerShell script, not a video',
      'Comment in the command: # "I am not a robot - reCAPTCHA Verification ID: 3824"',
      'That comment is the fake CAPTCHA text bundled into the clipboard payload to make the command look legitimate as the user pasted it. a social engineering layer built directly into the payload',
      'Two identical obfuscated entries in terminal history suggest the user ran it twice',
    ],
    mitre: [
      'T1566.002 - Spearphishing Link',
      'T1204.002 - User Execution: Malicious File',
      'T1027 - Obfuscated Files or Information',
      'T1218.005 - Signed Binary Proxy Execution: Mshta',
    ],
    iocs: [
      { label: 'C2 Domain', value: 'overcoatpassably.shop' },
      { label: 'Payload URL', value: 'https://overcoatpassably.shop/Z8UZbPyVpGfdRS/maloy.mp4' },
      { label: 'LOLBin', value: 'mshta.exe' },
      { label: 'Lure Text', value: 'I am not a robot - reCAPTCHA Verification ID: 3824' },
    ],
    verdict: 'confirmed',
  },
  {
    id: 6,
    phase: 'Process Analysis',
    title: 'mshta.exe Spawned and Payload Fetched',
    icon: <AlertTriangle className="w-5 h-5" />,
    summary:
      'Process logs confirmed mshta.exe (PID 7284) was spawned by powershell.exe and reached out to the C2 domain. mshta.exe is a Living-off-the-Land Binary (LOLBin), a legitimate signed Microsoft executable that threat actors abuse to deliver malware without triggering AV.',
    image: '/images/projects/mshta_Process_Fire.png',
    imageAlt: 'LetsDefend process log showing mshta.exe PID 7284 spawned from powershell.exe',
    details: [
      'Process: mshta.exe | PID: 7284 | Parent: powershell.exe',
      'Image Path: C:\\Windows\\System32\\mshta.exe. a legitimate Windows binary, not a dropped file',
      'User context: EC2AMAZ-ILGVOIN\\LetsDefend. ran under Dylan\'s standard user account',
      'Child process: conhost.exe 0xffffffff -ForceV1. console host spawned, confirming execution completed',
      'File Hash: 15c80b5be235bf2a8c38291eb697a702c07dde087eb459e9ea46a2bee17c5f03',
      'This hash belongs to the fetched payload (maloy.mp4), not mshta.exe itself. submitted to VirusTotal in the next step',
      'Process chain: powershell.exe → mshta.exe (PID 7284) → conhost.exe',
      'Windows Defender updated its signatures at 23:25:43, just 37 seconds before mshta.exe fired. The payload still executed. a clear example of why LOLBin abuse is effective against signature-based detection.',
    ],
    mitre: [
      'T1218.005 - Signed Binary Proxy Execution: Mshta',
      'T1105 - Ingress Tool Transfer',
      'T1574.002 - DLL Side-Loading (next stage)',
    ],
    verdict: 'malicious',
  },
  {
    id: 7,
    phase: 'Malware Confirmation',
    title: 'Payload Hash: 22/58 Detections on VirusTotal',
    icon: <Search className="w-5 h-5" />,
    summary:
      'The file hash from the mshta.exe process log was submitted to VirusTotal. 22 of 58 vendors flagged it as malicious, with Ikarus explicitly labeling it Trojan.PowerShell.LummaStealer.',
    image: '/images/projects/VIrustotalHashLookup.png',
    imageAlt: 'VirusTotal showing 22/58 detections for the Lumma Stealer payload hash',
    details: [
      'Hash: 15c80b5be235bf2a8c38291eb697a702c07dde087eb459e9ea46a2bee17c5f03',
      'Filename on VT: maloy.mp4. confirms the extension was purely a bypass, the file is a trojan',
      '22/58 vendors detected it. the lower rate is expected given the obfuscated HTA delivery mechanism',
      'Popular threat label: trojan.sagent/emmenhtal',
      'Family labels: sagent, emmenhtal, htadl. an HTA-based dropper family commonly used in Lumma campaigns',
      'Ikarus: Trojan.PowerShell.LummaStealer. explicitly identifies the family',
      'Kaspersky: HEUR:Trojan.HTA.SAgent.gen | Sophos: Troj/HTADL-RC',
      'File size: 2.35 MB | Last analyzed: 17 days before this alert',
    ],
    iocs: [
      { label: 'Payload Hash (SHA256)', value: '15c80b5be235bf2a8c38291eb697a702c07dde087eb459e9ea46a2bee17c5f03' },
      { label: 'VT Detections', value: '22/58' },
      { label: 'Threat Label', value: 'trojan.sagent/emmenhtal' },
      { label: 'Malware Family', value: 'Lumma Stealer / LummaC2' },
    ],
    verdict: 'confirmed',
  },
  {
    id: 8,
    phase: 'Network Analysis',
    title: 'Outbound C2 Connections Identified',
    icon: <Network className="w-5 h-5" />,
    summary:
      'Network logs showed 8 outbound connections during the execution window. The original phishing IP reached back to the machine before mshta.exe even fired. A Yandex-hosted IP appeared about 55 seconds after execution, which lines up with Lumma finishing a credential harvest and pushing data out.',
    image: '/images/projects/NetworkTrafficEvidence.png',
    imageAlt: 'LetsDefend network action log showing outbound connections during Lumma execution',
    details: [
      '23:26:08 - 132.232.40.201: Original phishing sender IP, contacted 12 seconds before mshta.exe ran',
      '23:26:16 - 142.250.190.35: Google infrastructure, benign Chrome activity',
      '23:26:18 - 34.104.35.123: Google Cloud, benign',
      '23:26:20 - 172.67.139.19: Cloudflare IP, likely overcoatpassably.shop fronted via CDN for payload delivery',
      '23:26:23 - 172.31.12.250: RFC1918 private address, internal AWS traffic, benign',
      '23:26:36 - 35.190.80.1: Google Cloud load balancer, benign',
      '23:27:15 - 77.88.21.119: Yandex infrastructure, no legitimate reason for this to appear here',
      '23:28:11 - 34.104.35.123: Repeat Google Cloud connection, benign',
      'The 55-second gap between execution and the Yandex connection is consistent with Lumma completing its credential sweep before exfiltrating',
      'Both suspicious IPs came back clean on VirusTotal, which is expected in a simulated lab. In a real case these would be pivoted on via PassiveDNS and threat intel feeds.',
    ],
    iocs: [
      { label: 'C2 Beacon IP', value: '132.232.40.201' },
      { label: 'Payload CDN IP', value: '172.67.139.19 (Cloudflare)' },
      { label: 'Suspected Exfil IP', value: '77.88.21.119 (Yandex)' },
    ],
    mitre: [
      'T1041 - Exfiltration Over C2 Channel',
      'T1555.003 - Credentials from Web Browsers',
    ],
    verdict: 'malicious',
  },
  {
    id: 9,
    phase: 'Containment',
    title: 'Host Isolated',
    icon: <Lock className="w-5 h-5" />,
    summary:
      "Dylan's endpoint was isolated via the Endpoint Security panel. Containment cuts off all network access, stopping any further C2 communication or lateral movement attempts.",
    image: '/images/projects/HostContained.png',
    imageAlt: 'LetsDefend Endpoint Security panel showing Host Contained status enabled',
    details: [
      'Containment toggle activated. host cut off from the network',
      'Status confirmed as "Host Contained" in the UI',
      'Email quarantined from Dylan\'s mailbox',
      '132.232.40.201 and overcoatpassably.shop blocked at the email gateway and web proxy',
      'Dylan\'s credentials and all active sessions flagged for reset and invalidation',
      'Password reset alone is not enough for infostealer incidents. Lumma steals session cookies, so active sessions need to be invalidated separately',
      'Escalated to Tier 2 for full forensic review of file drops and post-execution artifacts',
    ],
    verdict: 'confirmed',
  },
  {
    id: 10,
    phase: 'Alert Closure',
    title: 'Alert Closed as True Positive',
    icon: <CheckCircle className="w-5 h-5" />,
    summary:
      'Alert closed as True Positive. This is one of many simulated SOC tickets completed on LetsDefend to document analyst methodology and build a portfolio of realistic investigation walkthroughs.',
    image: '/images/projects/HostContained.png',
    imageAlt: 'LetsDefend alert closed as True Positive with host contained',
    details: [
      'Classification: True Positive. phishing with confirmed Lumma Stealer execution',
      'Severity: Critical. infostealer with credential exfiltration capability reached the inbox and the user executed the payload',
      'Escalation: Tier 2 / Incident Response',
      'Closing note: full attack chain documented from phishing email through ClickFix lure, mshta.exe execution, C2 contact, and suspected exfiltration',
      'Completed as part of the LetsDefend SOC Analyst learning path to practice realistic Tier 1 triage methodology',
    ],
    verdict: 'confirmed',
  },
]

const allMitre = [
  { id: 'T1566.002', name: 'Spearphishing Link', tactic: 'Initial Access' },
  { id: 'T1204.002', name: 'User Execution: Malicious File', tactic: 'Execution' },
  { id: 'T1027', name: 'Obfuscated Files or Information', tactic: 'Defense Evasion' },
  { id: 'T1218.005', name: 'Signed Binary Proxy Execution: Mshta', tactic: 'Defense Evasion' },
  { id: 'T1105', name: 'Ingress Tool Transfer', tactic: 'Command & Control' },
  { id: 'T1574.002', name: 'DLL Side-Loading', tactic: 'Defense Evasion' },
  { id: 'T1555.003', name: 'Credentials from Web Browsers', tactic: 'Credential Access' },
  { id: 'T1041', name: 'Exfiltration Over C2 Channel', tactic: 'Exfiltration' },
]

const tacticColors: Record<string, string> = {
  'Initial Access': 'border-red-500/50 text-red-400 bg-red-500/10',
  'Execution': 'border-orange-500/50 text-orange-400 bg-orange-500/10',
  'Defense Evasion': 'border-purple-500/50 text-purple-400 bg-purple-500/10',
  'Command & Control': 'border-blue-500/50 text-blue-400 bg-blue-500/10',
  'Credential Access': 'border-yellow-500/50 text-yellow-400 bg-yellow-500/10',
  'Exfiltration': 'border-cyan-500/50 text-cyan-400 bg-cyan-500/10',
}

const verdictConfig = {
  malicious: { label: 'Malicious', class: 'bg-red-500/20 text-red-400 border-red-500/40' },
  benign: { label: 'Benign', class: 'bg-green-500/20 text-green-400 border-green-500/40' },
  suspicious: { label: 'Suspicious', class: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40' },
  confirmed: { label: 'Confirmed', class: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40' },
}

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-slate-700 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          className="relative w-full max-w-5xl max-h-[90vh] aspect-video"
          onClick={(e) => e.stopPropagation()}
        >
          <Image src={src} alt={alt} fill className="object-contain rounded-lg" sizes="90vw" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function StepCard({ step, isActive, onClick }: { step: Step; isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
        isActive
          ? 'bg-cyan-900/20 border-cyan-600/60'
          : 'bg-slate-900/40 border-slate-800 hover:border-slate-600'
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
            isActive ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400'
          }`}
        >
          {step.id}
        </div>
        <div className="min-w-0">
          <div className="text-xs text-slate-500 uppercase tracking-wider">{step.phase}</div>
          <div className={`text-sm font-medium truncate ${isActive ? 'text-cyan-300' : 'text-slate-300'}`}>
            {step.title}
          </div>
        </div>
      </div>
    </button>
  )
}

export default function LetsDefendPhishingPage() {
  const [activeStep, setActiveStep] = useState(0)
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)

  const step = steps[activeStep]

  const prev = useCallback(() => setActiveStep((s) => Math.max(0, s - 1)), [])
  const next = useCallback(() => setActiveStep((s) => Math.min(steps.length - 1, s + 1)), [])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {lightbox && (
        <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />
      )}

      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-40">
        <div className="container mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <Link
            href="/#projects"
            className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
          <span className="text-xs text-slate-500 bg-slate-800 px-3 py-1 rounded-full">
            LetsDefend · SOC Analyst Lab
          </span>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-10">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-red-500/20 border border-red-500/40 rounded-full text-xs text-red-400 font-medium">
              CRITICAL SEVERITY
            </span>
            <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs text-cyan-400">
              True Positive
            </span>
            <span className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-xs text-slate-400">
              Alert #316 · Mar 13, 2025
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Lumma Stealer
            <span className="text-cyan-400"> via ClickFix Phishing</span>
          </h1>

          <p className="text-base text-slate-400 max-w-3xl leading-relaxed">
            This is one of many simulated SOC tickets completed on LetsDefend to document my analyst methodology
            and build a portfolio of realistic investigation walkthroughs. This particular alert was selected because
            it covers the full attack chain. from a socially engineered phishing email through to confirmed
            infostealer execution and C2 contact. across email, endpoint, process, and network evidence.
          </p>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[
              { label: 'Alert Number', value: 'SOC338' },
              { label: 'Malware Family', value: 'Lumma Stealer' },
              { label: 'Delivery Method', value: 'ClickFix + mshta LOLBin' },
            ].map((s) => (
              <div key={s.label} className="bg-slate-900/60 border border-slate-800 rounded-lg p-4">
                <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">{s.label}</div>
                <div className="text-base font-semibold text-slate-200">{s.value}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Main Layout */}
        <div className="grid lg:grid-cols-[280px_1fr] gap-6">

          {/* Sidebar */}
          <div className="space-y-2">
            <div className="text-xs text-slate-500 uppercase tracking-widest mb-3 px-1">
              Investigation Steps
            </div>
            {steps.map((s, idx) => (
              <StepCard
                key={s.id}
                step={s}
                isActive={idx === activeStep}
                onClick={() => setActiveStep(idx)}
              />
            ))}
          </div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.2 }}
              className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden"
            >
              {/* Step header */}
              <div className="px-6 pt-6 pb-4 border-b border-slate-800">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 uppercase tracking-wider mb-2">
                      <span className="flex items-center gap-1.5 text-cyan-500">
                        {step.icon}
                        {step.phase}
                      </span>
                      <span>·</span>
                      <span>Step {step.id} of {steps.length}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-100">{step.title}</h2>
                  </div>
                  {step.verdict && (
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${verdictConfig[step.verdict].class}`}>
                      {verdictConfig[step.verdict].label}
                    </span>
                  )}
                </div>
                <p className="text-base text-slate-300 mt-3 leading-relaxed">{step.summary}</p>
              </div>

              {/* Image */}
              <div
                className="relative h-[320px] md:h-[420px] bg-slate-950 cursor-zoom-in group"
                onClick={() => setLightbox({ src: step.image, alt: step.imageAlt })}
              >
                <Image
                  src={step.image}
                  alt={step.imageAlt}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 1024px) 100vw, calc(100vw - 320px)"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 bg-slate-900/90 px-3 py-2 rounded-lg text-sm text-slate-300">
                    <ZoomIn className="w-4 h-4" />
                    Click to enlarge
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="p-6 grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xs text-slate-500 uppercase tracking-wider mb-3">Findings</h3>
                  <ul className="space-y-2">
                    {step.details.map((d, i) => (
                      <li key={i} className="flex gap-2 text-base text-slate-300">
                        <span className="text-cyan-500 mt-0.5 flex-shrink-0">›</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-5">
                  {step.iocs && step.iocs.length > 0 && (
                    <div>
                      <h3 className="text-xs text-slate-500 uppercase tracking-wider mb-3">IOCs</h3>
                      <div className="space-y-2">
                        {step.iocs.map((ioc) => (
                          <div key={ioc.label} className="bg-slate-950/60 rounded-lg p-3 border border-slate-800">
                            <div className="text-xs text-slate-500 mb-1">{ioc.label}</div>
                            <div className="text-sm font-mono text-red-400 break-all">{ioc.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {step.mitre && step.mitre.length > 0 && (
                    <div>
                      <h3 className="text-xs text-slate-500 uppercase tracking-wider mb-3">MITRE ATT&CK</h3>
                      <div className="space-y-1.5">
                        {step.mitre.map((m) => (
                          <div key={m} className="text-sm font-mono text-purple-400 bg-purple-500/10 border border-purple-500/20 rounded px-2 py-1.5">
                            {m}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Step navigation */}
              <div className="px-6 pb-6 flex items-center justify-between">
                <button
                  onClick={prev}
                  disabled={activeStep === 0}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg transition-colors text-sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                <span className="text-sm text-slate-600">{activeStep + 1} / {steps.length}</span>
                <button
                  onClick={next}
                  disabled={activeStep === steps.length - 1}
                  className="flex items-center gap-2 px-4 py-2 bg-cyan-700 hover:bg-cyan-600 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg transition-colors text-sm"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* MITRE ATT&CK Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold mb-6">MITRE ATT&CK Coverage</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {allMitre.map((t) => (
              <div
                key={t.id}
                className={`p-4 rounded-lg border ${tacticColors[t.tactic] ?? 'border-slate-700 text-slate-400 bg-slate-800/30'}`}
              >
                <div className="text-xs opacity-70 mb-1">{t.tactic}</div>
                <div className="font-mono text-sm font-bold mb-1">{t.id}</div>
                <div className="text-base font-medium">{t.name}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Full IOC Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold mb-6">Full IOC Summary</h2>
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800 text-left">
                  <th className="px-5 py-3 text-xs text-slate-500 uppercase tracking-wider">Type</th>
                  <th className="px-5 py-3 text-xs text-slate-500 uppercase tracking-wider">Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {[
                  { type: 'Sender IP / C2', value: '132.232.40.201' },
                  { type: 'Sender Email', value: 'update@windows-update.site' },
                  { type: 'Phishing Domain', value: 'windows-update.site' },
                  { type: 'C2 / Payload Domain', value: 'overcoatpassably.shop' },
                  { type: 'Payload URL', value: 'https://overcoatpassably.shop/Z8UZbPyVpGfdRS/maloy.mp4' },
                  { type: 'Payload Hash (SHA256)', value: '15c80b5be235bf2a8c38291eb697a702c07dde087eb459e9ea46a2bee17c5f03' },
                  { type: 'Cloudflare CDN IP', value: '172.67.139.19' },
                  { type: 'Suspected Exfil IP', value: '77.88.21.119 (Yandex)' },
                  { type: 'LOLBin Abused', value: 'mshta.exe (T1218.005)' },
                  { type: 'Malware Family', value: 'Lumma Stealer / LummaC2' },
                  { type: 'Lure Text', value: 'I am not a robot - reCAPTCHA Verification ID: 3824' },
                ].map((row) => (
                  <tr key={row.type} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-5 py-3 text-base text-slate-400 whitespace-nowrap">{row.type}</td>
                    <td className="px-5 py-3 font-mono text-sm text-red-400 break-all">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Key Takeaways */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold mb-6">Key Takeaways</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: 'LOLBin abuse bypasses AV',
                body: 'mshta.exe is a legitimate signed Microsoft binary. It will not trigger AV because it is supposed to exist. Behavioral detection is what catches this pattern, not signatures.',
              },
              {
                title: 'ClickFix puts the user in the kill chain',
                body: 'No file hits disk from the email. The malicious execution happens when the user pastes a clipboard-injected command into PowerShell. Attachment scanning is completely irrelevant.',
              },
              {
                title: 'Obfuscation does not need to be complex',
                body: 'Inserting ]]] into mshta.exe and stripping it with -replace at runtime is trivially simple, but it breaks most static YARA signatures looking for the literal string.',
              },
              {
                title: 'Infostealers require session invalidation',
                body: 'Lumma steals session cookies, not just passwords. A password reset by itself is not enough. every active session needs to be invalidated separately after a compromise like this.',
              },
              {
                title: 'Timing in network logs tells the story',
                body: 'The Yandex connection appeared 55 seconds after mshta.exe fired. That gap lines up with Lumma completing a credential sweep before pushing data out to a secondary endpoint.',
              },
              {
                title: 'Fresh AV signatures did not help',
                body: 'Defender updated its definitions 37 seconds before mshta.exe ran. The payload still executed. LOLBin abuse targets the gap between signature-based controls and behavioral detection.',
              },
            ].map((t) => (
              <div key={t.title} className="bg-slate-900/50 border border-slate-800 rounded-lg p-5">
                <h3 className="text-base font-semibold text-cyan-400 mb-2">{t.title}</h3>
                <p className="text-base text-slate-400 leading-relaxed">{t.body}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tier 2 Handoff Brief */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-12 mb-16"
        >
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold">Tier 2 Handoff Brief</h2>
            <span className="px-2 py-0.5 bg-orange-500/20 border border-orange-500/40 rounded text-xs text-orange-400 font-medium">
              For IR Team
            </span>
          </div>
          <p className="text-base text-slate-500 mb-6">
            A summary of everything Tier 1 established. what IR inherits, what still needs answering, and where to focus first.
          </p>

          <div className="bg-slate-900/60 border border-slate-700 rounded-xl divide-y divide-slate-800">

            {/* What Tier 1 Confirmed */}
            <div className="p-6">
              <h3 className="text-base font-semibold text-slate-200 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
                What Tier 1 Confirmed
              </h3>
              <div className="space-y-3 text-base text-slate-400 leading-relaxed">
                <p>
                  Dylan received a phishing email from <span className="text-red-400 font-mono">update@windows-update.site</span> (SMTP: <span className="text-red-400 font-mono">132.232.40.201</span>) at <strong className="text-slate-300">09:44 AM</strong> impersonating a Microsoft Windows 11 upgrade prompt. The email landed in the inbox unblocked. The sender IP is confirmed in LetsDefend Threat Intel as a known <strong className="text-slate-300">Lumma Stealer C2</strong>.
                </p>
                <p>
                  Later that evening Dylan visited the redirected phishing site and was socially engineered via a fake reCAPTCHA prompt into manually pasting and running a clipboard-injected PowerShell command. The command was obfuscated using string fragmentation (<span className="font-mono text-purple-400">ms]]]ht]]]a]]]</span> reconstructed to <span className="font-mono text-purple-400">mshta.exe</span> via <span className="font-mono text-purple-400">-replace</span>) to evade static AV, and ran with <span className="font-mono text-purple-400">-WindowStyle Hidden</span> so no terminal was visible to the user.
                </p>
                <p>
                  <span className="font-mono text-red-400">mshta.exe</span> (PID 7284) was confirmed spawned from <span className="font-mono text-slate-300">powershell.exe</span> and fetched the payload from <span className="font-mono text-red-400 break-all">https://overcoatpassably.shop/Z8UZbPyVpGfdRS/maloy.mp4</span>. The .mp4 extension is a content filter bypass. VirusTotal confirms the file as <strong className="text-slate-300">22/58 malicious</strong>, threat label <span className="font-mono text-orange-400">trojan.sagent/emmenhtal</span>, with Ikarus explicitly naming <strong className="text-slate-300">Trojan.PowerShell.LummaStealer</strong>. The rule name also flags <strong className="text-slate-300">DLL Side-Loading</strong> as the next-stage persistence mechanism. this was not verified at Tier 1 and should be the first IR focus.
                </p>
                <p>
                  Network logs show an outbound connection to <span className="font-mono text-red-400">132.232.40.201</span> at 23:26:08 (12 seconds before execution), payload delivery via Cloudflare-fronted <span className="font-mono text-red-400">172.67.139.19</span> at 23:26:20, and a connection to <span className="font-mono text-yellow-400">77.88.21.119</span> (Yandex) at 23:27:15. roughly 55 seconds after execution. That timing lines up with Lumma completing a credential harvest cycle before exfiltrating. <strong className="text-slate-300">Treat data exfiltration as confirmed until proven otherwise.</strong>
                </p>
                <p>
                  The host (<span className="font-mono text-slate-300">Dylan / 172.16.17.216</span>) has been <strong className="text-slate-300">contained</strong>. The phishing email has been quarantined and both the sender IP and C2 domain are blocked at the gateway.
                </p>
              </div>
            </div>

            {/* Open Questions */}
            <div className="p-6">
              <h3 className="text-base font-semibold text-slate-200 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block" />
                Open Questions for IR
              </h3>
              <ul className="space-y-2 text-base text-slate-400">
                {[
                  'What did mshta.exe drop? Check %APPDATA%, %TEMP%, and %LOCALAPPDATA% for executables or DLLs written around 23:26:20',
                  'Was DLL Side-Loading executed? Per the rule name, look for a signed binary loading an unsigned DLL from a non-standard path',
                  'What did the Yandex IP (77.88.21.119) receive? Determine data volume transferred. if it is significant, credential exfiltration should be treated as complete',
                  'Which browser credentials are at risk? Lumma targets Chrome, Edge, and Firefox saved passwords and session cookies. assume everything stored in the browser on this machine is compromised',
                  'Were any other hosts in contact with overcoatpassably.shop or 132.232.40.201? Check DNS and proxy logs across the org for broader campaign exposure',
                  'Did Dylan interact with any corporate SSO or VPN sessions after the infection? Session cookies stolen by Lumma remain valid after a password reset',
                  'Was the payload executed once or twice? Terminal history shows two identical obfuscated entries. confirm whether two separate mshta.exe processes fired',
                ].map((q, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-yellow-500 flex-shrink-0 font-bold">{i + 1}.</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Immediate IR Priorities */}
            <div className="p-6">
              <h3 className="text-base font-semibold text-slate-200 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block" />
                Immediate IR Priorities
              </h3>
              <ul className="space-y-2 text-base text-slate-400">
                {[
                  'Full memory acquisition of the endpoint before reimaging. Lumma may still be resident',
                  'Invalidate all of Dylan\'s active sessions across every platform, not just a password reset. Session tokens remain valid after credential changes.',
                  'Pull the full process tree for PID 7284 (mshta.exe). every child process, file write, and network connection it made',
                  'Search DNS and proxy logs for overcoatpassably.shop and 132.232.40.201 across all endpoints to determine if this is isolated or part of a broader campaign',
                  'Brief Dylan\'s manager and flag the user for ClickFix awareness training. this technique is being used actively and will come up again',
                  'Check for persistence: scheduled tasks, registry Run keys, and any services installed between 23:26 and 23:28',
                ].map((p, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-cyan-500 flex-shrink-0">›</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Context note */}
            <div className="p-6 bg-slate-800/30">
              <p className="text-sm text-slate-500 leading-relaxed">
                <strong className="text-slate-400">Note on execution timing:</strong> The phishing email arrived at 09:44 AM and execution occurred at 23:26 PM the same day. This gap suggests Dylan may have seen the email earlier and returned to it later in the evening. The post-incident login on Mar 14 at 12:05 PM confirms the user remained active after the infection. Interview the user to establish what they did between receiving the email and running the command, and whether anything looked or felt unusual afterward.
              </p>
            </div>

          </div>
        </motion.div>

      </div>
    </div>
  )
}
