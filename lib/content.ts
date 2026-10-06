// lib/content.ts
// Single source of truth for the whole site.
// Every number here is either drawn from the current résumé or backed by a
// screenshot in /public/images/projects. Nothing is asserted that cannot be shown.

export const profile = {
  name: 'Antonio Beltran-Miller',
  // Titles kept aligned with the résumé summary: analyst-in-training, not roles held.
  roles: ['SOC Analyst', 'Detection & Automation', 'Bug Bounty Researcher'],
  location: 'Ann Arbor, Michigan',
  email: 'AntonioBeltranMiller@gmail.com',
  site: 'antoniobeltranmiller.com',
  github: 'https://github.com/CyberShellCode',
  linkedin: 'https://linkedin.com/in/antoniobeltran-miller',
  resume: '/resume.pdf',
  // First person, plain. Mirrors the cover-letter voice.
  tagline:
    'Security+ certified professional transitioning into a SOC role. I build detections and automation in my home lab, deploy honeypots to capture real-world threat telemetry, and conduct bug bounty research to analyze practical intrusion techniques.',
  summary: [
    'I spent about two and a half years as the only IT person for a 200-person logistics company, so I know what a normal Windows and Active Directory environment looks like and how to keep people working while something is broken.',
    'Since then I have been building toward security operations on purpose: a Splunk, n8n, and GPT-4 alert-triage pipeline in my lab, distributed T-Pot honeypots for live attack data, and responsible bug bounty disclosure. I would rather show a smaller number I can defend than a big one I cannot.',
  ],
}

export type Metric = { label: string; value: string; note?: string }
export type Evidence = { label: string; src: string }
export type Section = { heading: string; body?: string; items?: string[] }

export type Project = {
  slug: string
  title: string
  kind: string
  timeline: string
  status?: string
  featured?: boolean
  // the two strongest projects get an elevated, larger card
  spotlight?: boolean
  // a single sharp line pulled up onto the spotlight card as a teaser
  highlight?: string
  // approximate reading time for the case study
  readTime?: string
  // preview screenshot shown on the project card
  cover?: string
  // one-line honest summary for the card
  card: string
  // what shows on the card as the headline result
  result: string
  tags: string[]
  // narrative case study
  why: string
  built: string[]
  learned: string[]
  metrics: Metric[]
  evidence: Evidence[]
  // optional: how it relates to walkthroughs it was based on
  credit?: string
  // optional: one short paragraph connecting the lab to production SOC reality
  application?: string
  // optional: a real rule/query shown as code on the project page
  codeSample?: { label: string; code: string }
  // optional: MITRE ATT&CK technique chips
  attack?: string[]
  github?: string
  gallery?: Evidence[]
}

export const projects: Project[] = [
  {
    slug: 'soc-automation',
    title: 'AI-Assisted SOC Automation Lab',
    kind: 'Home lab · detection + automation',
    timeline: 'October 2025 – December 2025',
    featured: true,
    spotlight: true,
    cover: '/images/projects/soc-n8n-workflow.png',
    highlight:
      'My first SSH brute-force rule fired on a single failed login, which is useless. Tuning it to need repeated failures from one source inside a short window, so it catches a real attack without screaming at every mistyped password, was the actual detection work.',
    readTime: '4 min read',
    card:
      'An AI-assisted detection and triage pipeline I built across four VMs. Splunk ingests the endpoint telemetry, n8n hands each alert to an LLM acting as a tier-1 analyst, and an MCP server lets that AI query Splunk directly to investigate on its own.',
    result: 'Cut my own triage time from 45 to 8 minutes across 10 self-run attacks',
    tags: ['Splunk', 'n8n', 'LLM (GPT-4.1 mini)', 'MCP server', 'DFIR IRIS', 'Sysmon', 'MITRE ATT&CK', 'VirusTotal', 'AbuseIPDB', 'Slack'],
    credit:
      'This follows MyDFIR’s SOC Automation 2.0 build (Splunk, a Windows 10 VM, n8n, and the alert-to-Slack path) including its advanced sections for VirusTotal enrichment, DFIR IRIS ticketing, and the MCP server that lets the AI query the SIEM. I built the full stack end to end; the detection tuning and how I reason about it are my own.',
    application:
      'In a real SOC the value here is not the AI, it is the discipline around it. An alert is only useful once its false positives are tuned down, which is exactly the SSH brute-force lesson, and that same loop is what fights alert fatigue on a live queue. The MCP server is the part I find most interesting: it lets the AI ask the SIEM its own questions instead of only reacting to an alert it was handed, which is closer to how an analyst actually investigates. I keep the AI as an assistant to a human and never an automated action, because it will state things the telemetry does not support. And because this feeds data to a hosted model, it stays a lab; in production I would run a local LLM.',
    why:
      'I wanted to understand alert triage from the inside: not just read a SIEM alert, but see the whole path from a raw endpoint event to an analyst-ready summary in Slack, and feel where the time actually goes. Building it end to end was the only way to learn which parts of triage are mechanical enough to automate and which still need a person.',
    built: [
      'Stood up the whole on-prem stack myself across four VMs: a Windows 10 endpoint with Sysmon (SwiftOnSecurity config) forwarding to Splunk over the Universal Forwarder, plus dedicated Ubuntu servers for Splunk, n8n, and a DFIR IRIS case-management instance.',
      'Wrote the detection logic in Splunk SPL and mapped it to MITRE ATT&CK. The SSH brute-force rule is the one I tuned hardest: my first version fired on a single failed sign-in, so I reworked it to require repeated failures from the same source inside a short time window before it triggers.',
      'Built the n8n workflow that catches each Splunk alert on a webhook and hands it to an LLM (GPT-4.1 mini via the OpenAI API) running a tier-1 analyst prompt: summarize the alert, enrich the indicators, assess severity against MITRE ATT&CK, and recommend next actions, then post a clean writeup to Slack.',
      'Gave the AI real tools rather than just text. It calls AbuseIPDB and VirusTotal itself to score a source IP or file hash, and a confirmed alert opens a ticket in DFIR IRIS instead of only pinging a channel.',
      'Connected the AI to an MCP server so it can query Splunk directly in plain language. I can ask what happened in a given window and it runs the searches itself, corrects the time format, and surfaces activity like failed logons and Atomic Red Team PowerShell execution, then returns findings and recommended actions.',
      'Validated detections by generating the activity myself from Kali, using Hydra for brute force plus Metasploit, Meterpreter, and Atomic Red Team for the endpoint rules, then confirming each one fired on the telemetry it was meant to catch.',
    ],
    learned: [
      'The SSH brute-force rule taught me the most. Firing on one failed login is noise, so the real work was finding the threshold and time window that catch an actual brute force while leaving normal mistyped logins alone.',
      'Wiring the AI to an MCP server changed what it could do. Instead of only summarizing an alert it was handed, it can go ask Splunk its own questions, which is much closer to real investigation than canned enrichment.',
      'The AI is genuinely useful for the mechanical parts of triage, but it will confidently narrate things the data does not support, so a human stays in the loop and the pipeline ends at a person, not an automated action. Feeding alerts to a hosted model is also a privacy risk, which is why this stays a lab and a production version would use a local LLM.',
      'The 45-to-8-minute figure is my own timing on my own self-run attacks in this lab. It measures how much of my manual triage the pipeline removed, not a production MTTD.',
    ],
    metrics: [
      { label: 'Detection rules', value: '10', note: 'each mapped to MITRE ATT&CK' },
      { label: 'My triage time', value: '45 → 8 min', note: 'self-run attacks, lab' },
      { label: 'Attacks self-run', value: '10', note: 'Metasploit / Meterpreter / Hydra' },
      { label: 'VMs orchestrated', value: '4', note: 'Win10, Splunk, n8n, Kali' },
    ],
    attack: [
      'T1003.001 · LSASS credential dumping',
      'T1055 · Process injection',
      'T1059.001 · PowerShell',
      'T1110 · Brute force',
      'T1547.001 · Registry Run-key persistence',
      'T1543.003 · Service installation',
    ],
    codeSample: {
      label: 'One of the ten rules: registry Run-key persistence via Sysmon (EventCode 13, T1547.001)',
      code: `index=dfir-project source="XmlWinEventLog:Microsoft-Windows-Sysmon/Operational" EventCode=13
(TargetObject="*\\\\CurrentVersion\\\\Run*" OR TargetObject="*\\\\CurrentVersion\\\\RunOnce*"
 OR TargetObject="*\\\\Winlogon\\\\*" OR TargetObject="*\\\\userinit*")
| table _time, Computer, Image, TargetObject, Details, EventType`,
    },
    evidence: [
      { label: 'n8n workflow: webhook → GPT-4 → AbuseIPDB / VirusTotal → Slack', src: '/images/projects/soc-n8n-workflow.png' },
      { label: 'The 10 detection rules in Splunk', src: '/images/projects/soc-splunk-alerts.png' },
      { label: 'The tier-1 analyst prompt driving the model', src: '/images/projects/soc-ai-prompt.png' },
      { label: 'Enriched brute-force alert delivered to Slack', src: '/images/projects/soc-slack-alert.png' },
      { label: 'Registry-persistence detection (Sysmon EventCode 13)', src: '/images/projects/soc-splunk-registry.png' },
      { label: 'Meterpreter alert summarized to Slack', src: '/images/projects/soc-slack-meterpreter.png' },
    ],
  },
  {
    slug: 'honeypot',
    title: 'T-Pot Honeypot Threat Intelligence',
    kind: 'Home lab · threat intel',
    timeline: 'August 2025 – present',
    featured: true,
    spotlight: true,
    cover: '/images/projects/tpot-dashboard.png',
    highlight:
      '424k attacks, and almost all of it is noise. The skill is finding the handful of sources worth a second look, and doing something with them.',
    readTime: '4 min read',
    card:
      'Distributed T-Pot honeypots on a public VPS. Most of it is automated scanning noise. The useful work was finding the few patterns worth alerting on and reporting the infrastructure behind them.',
    result: '424k+ attacks logged; wrote Suricata rules and reported malicious IPs to AbuseIPDB',
    tags: ['T-Pot', 'Suricata', 'Elasticsearch / Kibana', 'Cowrie', 'Dionaea', 'Threat Intel'],
    credit:
      'The T-Pot deployment follows the standard honeypot setup (spin up a VPS, run the T-Pot installer, open it to the internet). The analysis and reporting is my own.',
    why:
      'Reading about attacker behavior is not the same as watching it hit something you own. I put honeypots on the public internet to get real, unsolicited traffic and practice the boring but important part of threat intel: separating background scanning from anything worth a second look, and then doing something with it.',
    built: [
      'Deployed T-Pot with multiple honeypot sensors (Cowrie, Dionaea, Sentrypeer, Honeytrap, Ciscoasa and others) on a public VPS and left it exposed to collect live traffic.',
      'Used the Kibana dashboards to break attacks down by sensor, source ASN, country, and credentials, and to confirm the two CVE-exploitation signatures Suricata flagged (CVE-2019-12263 and CVE-2020-11900).',
      'Wrote Suricata rules from the recurring patterns worth alerting on, and reported high-confidence malicious source IPs to AbuseIPDB with the supporting evidence.',
      'Turned three of the more interesting single events into short write-ups: a VoIP toll-fraud campaign, a commercial scanner (ONYPHE), and non-standard-port TLS recon. Each was practice at explaining a finding the way a report would.',
    ],
    learned: [
      'The volume is almost all commodity scanning: the credential word clouds are exactly what you would expect (root, admin, 123456, empty). The signal is not the count, it is the handful of sources and behaviors that stand out from it.',
      'The two CVE hits are a good reminder of long-tail risk. CVE-2019-12263 (URGENT/11, a VxWorks TCP stack flaw) and CVE-2020-11900 (a Treck TCP/IP stack flaw from the Ripple20 set) are both years old and still being sprayed at anything that answers.',
      'Everything on this page maps to a number I can pull up live in the dashboard. If a figure is not in a screenshot, I left it off.',
    ],
    metrics: [
      { label: 'Attacks logged', value: '424k+', note: 'across all sensors' },
      { label: 'Top sensor', value: 'Sentrypeer 204k', note: 'then Honeytrap / Ciscoasa 69k' },
      { label: 'Top source ASN', value: 'OVH 111,855', note: 'velia.net 67,027 next' },
      { label: 'CVE signatures seen', value: 'CVE-2019-12263, -2020-11900', note: '9 and 6 hits' },
    ],
    evidence: [
      { label: 'T-Pot attack overview: 424k across sensors', src: '/images/projects/tpot-dashboard.png' },
      { label: 'Attacker ASNs, top source IPs, and Suricata CVE hits', src: '/images/projects/tpot-attacks.png' },
      { label: 'Live attack map and source distribution', src: '/images/projects/tpot-analysis.png' },
      { label: 'Source-IP reputation, OS, and country breakdown', src: '/images/projects/tpot-attack-overview.png' },
    ],
  },
  {
    slug: 'letsdefend-phishing',
    title: 'SOC Alert: Lumma Stealer via ClickFix',
    kind: 'LetsDefend training · SOC338',
    timeline: 'Training scenario',
    featured: true,
    cover: '/images/projects/ThePhishingEmail.png',
    card:
      'A simulated phishing alert I triaged end to end on LetsDefend: email through the ClickFix lure, mshta LOLBin abuse, payload confirmation, containment, and a tier-2 handoff brief.',
    result: 'Confirmed true positive · full kill chain traced · host contained · tier-2 brief written',
    tags: ['Phishing', 'DFIR', 'Lumma Stealer', 'ClickFix', 'LOLBin', 'MITRE ATT&CK'],
    why:
      'This is a training environment, so the stakes were not real. I use it to practice tier-1 methodology and, just as importantly, to practice writing an investigation so another analyst could pick it up without asking me a single question. I picked this scenario because it covers the whole chain across email, endpoint, process, and network evidence.',
    built: [
      'Worked the alert as tier 1: claimed the ticket, reviewed the impersonation email, and confirmed the sender IP as known Lumma C2 in threat intel.',
      'Traced the ClickFix social-engineering lure to the obfuscated PowerShell the user was tricked into pasting, then followed it to mshta.exe (a signed Microsoft LOLBin) fetching a payload disguised as a .mp4.',
      'Confirmed the payload malicious on VirusTotal (22/58, Ikarus naming Trojan.PowerShell.LummaStealer), walked the outbound connections, isolated the host, and flagged sessions for invalidation, not just a password reset, since Lumma steals cookies.',
      'Wrote a tier-2 handoff brief: what was confirmed, the open questions for IR, and the immediate priorities.',
    ],
    learned: [
      'ClickFix puts the user inside the kill chain. Nothing malicious hits disk from the email itself, so attachment scanning is irrelevant and behavioral detection is what catches it.',
      'LOLBin abuse works precisely because mshta.exe is supposed to exist. Defender updated signatures 37 seconds before it ran and the payload still executed.',
      'Infostealer incidents need session invalidation, not just a credential reset, because the stolen cookies stay valid afterward.',
    ],
    metrics: [
      { label: 'Alert', value: 'SOC338', note: 'Lumma Stealer, Critical' },
      { label: 'Verdict', value: 'True Positive' },
      { label: 'VirusTotal', value: '22 / 58' },
      { label: 'LOLBin', value: 'mshta.exe', note: 'T1218.005' },
    ],
    evidence: [
      { label: 'The impersonation email', src: '/images/projects/ThePhishingEmail.png' },
      { label: 'Sender IP confirmed as Lumma C2 in threat intel', src: '/images/projects/ThreatIntelShowsLumma.png' },
      { label: 'ClickFix command in terminal history', src: '/images/projects/ConfirmedPayloadExecution.png' },
      { label: 'Payload confirmed malicious on VirusTotal', src: '/images/projects/VIrustotalHashLookup.png' },
    ],
  },
  {
    slug: 'npm-supply-chain',
    title: 'npm Supply-Chain MITM Vulnerability',
    kind: 'Bug bounty · Bugcrowd',
    timeline: 'August 2024',
    featured: true,
    readTime: '3 min read',
    cover: '/images/projects/npm-supply-chain-exploitation.png',
    highlight:
      'Severity is an argument you make with a working chain, not a label you attach to a setting.',
    card:
      'A public repo shipped an .npmrc pinned to HTTP. I built a man-in-the-middle proof of concept showing it enabled RCE through package injection, and argued the severity up from P4 to P2.',
    result: 'Escalated P4 → P2 on Bugcrowd; the repo enforced HTTPS after disclosure',
    tags: ['Supply chain', 'MITM', 'mitmproxy', 'Responsible disclosure', 'Bugcrowd'],
    why:
      'Bug bounty work taught me to build the full attack chain before arguing severity. An insecure registry line looks like a low-severity misconfiguration until you actually show what it lets an attacker do, so I built the chain rather than just reporting the setting.',
    built: [
      'Found an .npmrc in a public repository configured with registry=http://registry.npmjs.org/, which is unencrypted transport for package installs.',
      'Stood up a mitmproxy man-in-the-middle proof of concept that intercepts the HTTP npm traffic and substitutes a package carrying a post-install script.',
      'Demonstrated arbitrary code execution on install from that position, which is what turns "uses HTTP" into a real supply-chain risk to a developer machine or CI runner.',
      'Reported it through Bugcrowd and made the severity case from the demonstrated RCE impact; it was raised from P4-Low to P2, and the repo moved to HTTPS after disclosure.',
      'Backed the argument with a CVSS 3.1 score of 8.9 (High) using the vector AV:N/AC:H/PR:N/UI:R/S:C/C:H/I:H/A:H, so the reviewer had a defensible number, not just a narrative.',
    ],
    learned: [
      'Severity is an argument you make with a working chain, not a label you attach to a setting. The escalation happened because the PoC made the impact concrete.',
      'The interesting security bug is often a boring config line whose consequences nobody walked all the way through.',
    ],
    metrics: [
      { label: 'Initial triage', value: 'P4-Low' },
      { label: 'Escalated to', value: 'P2' },
      { label: 'CVSS 3.1', value: '8.9', note: 'High · AV:N/AC:H/S:C' },
      { label: 'Outcome', value: 'HTTPS enforced' },
    ],
    evidence: [
      { label: 'The insecure HTTP .npmrc configuration', src: '/images/projects/npm-supply-chain-exploitation.png' },
    ],
  },
  {
    slug: 'blind-xss-server',
    title: 'Blind XSS Capture Tool',
    kind: 'Personal tool · bug bounty tooling',
    timeline: '2024 – present',
    readTime: '2 min read',
    cover: '/images/projects/blind-xss-capture.png',
    highlight:
      'I only ever point it at targets I am authorized to test. Self-hosting was about controlling where the callback data goes.',
    card:
      'A self-hosted blind-XSS callback server I built to use in my own authorized bug bounty testing. One script deploys an SSL dashboard that logs payload fire-backs.',
    result: 'Personal tool I built and use; tested against a CTF lab target',
    tags: ['Node.js', 'Express', 'SQLite', 'Bash', 'Let’s Encrypt'],
    github: 'https://github.com/CyberShellCode/blind-xss-server',
    why:
      'I wanted my own blind-XSS callback infrastructure for authorized bug bounty work rather than relying on a shared hosted one, and building it was a good way to learn how these tools actually capture and attribute a fire-back.',
    built: [
      'A single setup script that stands up an Express server behind Nginx with a Let’s Encrypt certificate and a small SQLite store, kept running with PM2.',
      'A dashboard that shows captures (source IP, origin, user agent, cookies, referer, and a page screenshot), plus a payload generator and multi-channel (Slack / Discord / email) notifications.',
    ],
    learned: [
      'I have tested it against a CTF lab target to confirm the capture path works end to end; the dashboard in the screenshot shows those lab captures, not production findings.',
      'I would only ever point this at targets I am authorized to test. The point of self-hosting was control over where the callback data goes.',
    ],
    metrics: [
      { label: 'Deploy', value: '1 script' },
      { label: 'Stack', value: 'Node + SQLite' },
      { label: 'Tested on', value: 'CTF lab' },
      { label: 'Use', value: 'Authorized only' },
    ],
    evidence: [
      { label: 'Capture dashboard (lab captures on a CTF target)', src: '/images/projects/blind-xss-capture.png' },
      { label: 'Payload generator', src: '/images/projects/blind-xss-payload.png' },
    ],
  },
]

export type Cert = {
  name: string
  issuer: string
  date: string
  status: 'completed' | 'in-progress'
  image: string
  verify?: string
  // shown in place of a verify link when no public badge exists (e.g. completion certs)
  note?: string
  skills: string[]
}

export const certifications: Cert[] = [
  {
    name: 'CompTIA Security+',
    issuer: 'CompTIA',
    date: 'October 2025',
    status: 'completed',
    image: '/images/certifications/comptia-security-plus.png',
    verify: 'https://www.credly.com/badges/8771ef3b-bbff-4188-b2d2-c9069c939ca4/public_url',
    skills: ['Threat detection & response', 'Risk & vulnerability management', 'Network security', 'Cryptography & PKI'],
  },
  {
    name: 'CompTIA CySA+',
    issuer: 'CompTIA',
    date: 'In progress · expected October 2026',
    status: 'in-progress',
    image: '/images/certifications/comptia-security-plus.png',
    skills: ['Behavioral analytics', 'Threat hunting', 'Incident response', 'Vulnerability management'],
  },
  {
    name: 'LetsDefend SOC Analyst Path',
    issuer: 'LetsDefend',
    date: 'February 2025',
    status: 'completed',
    image: '/images/certifications/letsdefend-soc-analyst.png',
    verify: 'https://app.letsdefend.io/certificate/show/3b48fd23-0ea8-4c67-aebd-e6cb407a54f1',
    skills: ['SIEM analysis', 'Alert triage', 'Malware analysis', 'Incident response'],
  },
  {
    name: 'Google Cybersecurity Professional',
    issuer: 'Coursera / Google',
    date: 'November 2024',
    status: 'completed',
    image: '/images/certifications/google-cybersecurity-certificate.png',
    verify: 'https://coursera.org/share/871974ea6e95d65bae175850e5a6e37d',
    skills: ['Python automation', 'Linux & SQL', 'SIEM tools', 'NIST frameworks'],
  },
  {
    name: 'Fortinet Certified Associate',
    issuer: 'Fortinet',
    date: 'August 2025',
    status: 'completed',
    image: '/images/certifications/fortinet-associate-cybersecurity.png',
    verify: 'https://www.credly.com/badges/cd35a869-2aee-45bb-ae85-2aaeefc40ccf/public_url',
    skills: ['FortiGate configuration', 'VPN (IPsec/SSL)', 'IPS/IDS', 'Security policy'],
  },
  {
    name: 'Fortinet FortiGate 7.6 Operator',
    issuer: 'Fortinet',
    date: 'August 2025',
    status: 'completed',
    image: '/images/certifications/fortinet-fortigate-operator.png',
    verify: 'https://www.credly.com/badges/214c0777-f580-4ff3-b271-b30eab7b42af/public_url',
    skills: ['FortiGate 7.6 operations', 'Firewall management', 'System monitoring'],
  },
  {
    name: 'AWS Security Best Practices',
    issuer: 'AWS Training',
    date: '2025',
    status: 'completed',
    image: '/images/certifications/aws-security-specialization.png',
    note: 'Course completion (no public badge)',
    skills: ['CloudWatch & GuardDuty', 'VPC security', 'IAM', 'Monitoring & alerting'],
  },
  {
    name: 'SailPoint Identity Security Leader',
    issuer: 'SailPoint',
    date: '2025',
    status: 'completed',
    image: '/images/certifications/sailpoint-identity-leader.png',
    verify: 'https://verify.skilljar.com/c/tt9wxqy96srx',
    skills: ['Identity governance', 'Access management', 'IAM strategy'],
  },
]

export type Job = {
  role: string
  org: string
  period: string
  current?: boolean
  bullets?: string[]
}

export const experience: Job[] = [
  {
    role: 'Dispatcher (sole IT resource)',
    org: 'ALM Freight',
    period: 'Sep 2021 – May 2024',
    bullets: [
      'Only IT resource for a 200-person, two-site logistics operation with no dedicated IT department.',
      'Managed the endpoint fleet across Windows 10 workstations and 42 Android devices via 42Gears MDM, with manual patch management across the full fleet.',
      'Administered Active Directory (user provisioning, account management, and group policy), and onboarded new employees from a standardized least-privilege Windows image.',
      'Primary technical contact for 200+ drivers, resolving delivery-software and device failures in real time.',
    ],
  },
  {
    role: 'Delivery Associate',
    org: 'MMML (Amazon DSP)',
    period: 'Sep 2025 – present',
    current: true,
  },
  {
    role: 'Delivery Associate',
    org: 'DBE Logistics (Amazon DSP)',
    period: 'May 2024 – Aug 2025',
  },
  {
    role: 'Assembly Technician',
    org: 'Contour Windows',
    period: 'Aug 2019 – Aug 2021',
  },
]

export const education = {
  degree: 'B.S. Cybersecurity & Information Assurance',
  school: 'Western Governors University',
  detail: 'Online · expected 2027',
}

export const skills: { group: string; items: string[] }[] = [
  {
    group: 'SIEM & detection',
    items: ['Splunk (SPL, dashboards, alerts)', 'Suricata rule writing', 'Sysmon', 'Wireshark', 'Microsoft Sentinel (familiarity)'],
  },
  {
    group: 'Security operations',
    items: ['Alert triage', 'Incident response (NIST 800-61)', 'Threat hunting', 'IOC analysis', 'MITRE ATT&CK', 'Diamond Model'],
  },
  {
    group: 'Systems & cloud',
    items: ['Windows', 'Active Directory', 'Linux', 'TCP/IP', 'AWS fundamentals (CloudWatch, GuardDuty, IAM, VPC)'],
  },
  {
    group: 'Automation & tooling',
    items: ['Python', 'Bash', 'PowerShell', 'n8n', 'GPT-4 API', 'VirusTotal / AbuseIPDB', 'Metasploit', 'Burp Suite', 'mitmproxy'],
  },
]

export type Writeup = {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  // 'incident' gets a little more structure; 'observation' stays light
  kind: 'incident' | 'observation'
  // links a honeypot write-up back to the project it came from
  related?: { slug: string; title: string }
  summary: string
  sections: Section[]
  reflection?: string
  featured?: boolean
}

const HONEYPOT_REF = { slug: 'honeypot', title: 'T-Pot Honeypot Threat Intelligence' }

export const writeups: Writeup[] = [
  {
    slug: 'incident-response',
    title: 'WordPress Compromise: Containment and Recovery',
    excerpt:
      'A site owner said the site was "acting up." It was an active compromise. Tracing it to a vulnerable plugin, pulling out the persistence, and getting them back on a clean build in about 2.5 hours.',
    date: '2024-12-15',
    readTime: '4 min read',
    category: 'Incident Response',
    kind: 'incident',
    featured: true,
    summary:
      'A site owner came to me with what sounded like a normal problem: the site was acting up. It turned out to be an active compromise. I traced the entry point, pulled out the persistence, patched the hole, and had them back on a clean build in about two and a half hours. No PII was exposed.',
    sections: [
      {
        heading: 'What I found',
        items: [
          'Entry point: a known-vulnerable plugin, CVE-2021-32682.',
          'Webshell backdoors dropped into theme files, three hidden admin accounts, and modified .htaccess rules holding the persistence in place.',
          'The compromise sat at the web-application layer with signs of attempted lateral movement. I found no evidence that personal data was accessed or taken.',
        ],
      },
      {
        heading: 'How I handled it',
        items: [
          'Contained first: blocked admin access, disabled the unauthorized accounts, and captured the malicious files before deleting anything.',
          'Removed the persistence: cleaned the webshells, reverted the .htaccess changes, and patched the plugin.',
          'Recovered: restored from a clean pre-compromise backup, reset every credential, and added basic monitoring and file-integrity checking so a repeat would get noticed.',
        ],
      },
      {
        heading: 'Why it mattered',
        body:
          'Left alone, those backdoors could have kept the attacker in the site for months and disrupted the owner’s operations. The real exposure here was availability and trust, not a data-breach headline.',
      },
    ],
    reflection:
      'The lesson I keep from this one is to treat "the site is acting weird" as a possible incident until proven otherwise. The whole thing hinged on an unpatched plugin, which is the least glamorous and most common way these compromises start.',
  },
  {
    slug: 'voip-toll-fraud',
    title: 'A VoIP Toll-Fraud Probe on My Honeypot',
    excerpt:
      'Sentrypeer and Suricata caught a burst of SIP INVITEs from a rented VPS, dialing sequential premium-rate numbers behind a spoofed Cisco vendor string. A probe looking for a PBX to run up a bill on.',
    date: '2025-09-22',
    readTime: '3 min read',
    category: 'VoIP Security',
    kind: 'observation',
    related: HONEYPOT_REF,
    summary:
      'While my honeypots were running, the Sentrypeer sensor and Suricata picked up a burst of SIP traffic that clearly was not someone dialing a wrong number. It was a toll-fraud probe looking for a phone system it could use to place expensive international calls on someone else’s bill.',
    sections: [
      {
        heading: 'What I saw',
        items: [
          'Source 208.109.190.200, a GoDaddy VPS (AS398101). Rented infrastructure, not the attacker’s own machine.',
          'SIP INVITE floods over UDP/5060, with the source port rotating (50352, 52392, 56775) to keep the flow alive.',
          'A spoofed User-Agent of "Cisco-SIPGateway" to look like legitimate telecom equipment.',
          'Target numbers that stepped through sequential international ranges on high-tariff premium prefixes.',
          'Full SDP negotiation, so it was trying to actually establish calls, not just scan.',
        ],
      },
      {
        heading: 'Why it matters',
        body:
          'Toll fraud bills the victim, not the attacker. A misconfigured PBX that accepts these calls can run up a large charge before anyone notices, and carriers often hold the account holder responsible. The legitimate-looking vendor string and the rented VPS are both there to slip past naive IP or fingerprint filters.',
      },
    ],
    reflection:
      'If this were a phone system I owned, the fixes are boring and effective: keep SIP off the open internet, require authentication, and cap outbound calls by destination and concurrency so a compromise cannot run up a bill overnight. I reported the source IP to AbuseIPDB.',
  },
  {
    slug: 'onyphe-scanner',
    title: 'A Commercial Scanner Cataloging My Services',
    excerpt:
      'One event in my logs was not an attack at all: a clean handshake, a banner grab, and an immediate reset from a commercial scanner. Worth writing up precisely because it looks boring.',
    date: '2025-09-24',
    readTime: '3 min read',
    category: 'Threat Intelligence',
    kind: 'observation',
    related: HONEYPOT_REF,
    summary:
      'One event in my honeypot logs was not an attack at all: a commercial scanner cataloging my services. It is worth writing up precisely because it looks boring and is easy to wave off.',
    sections: [
      {
        heading: 'What I saw',
        items: [
          'A single clean TCP handshake to 9770/TCP, a banner grab, then an immediate RST. The whole thing was over in about 98 milliseconds.',
          'Source 91.231.89.129, which belongs to ONYPHE (AS213412), a company that scans the internet and sells access to what it finds.',
        ],
      },
      {
        heading: 'Why I did not just ignore it',
        body:
          'This is not malicious, but it is not nothing either. ONYPHE’s job is to record what my box exposes and put it in a searchable database, and that database can be bought by anyone, including people looking for targets. So a "harmless" scan is really the first step of someone else’s reconnaissance, done for them and sold on.',
      },
    ],
    reflection:
      'The honest answer is there is not much to do about a legitimate scanner except know it happened. What I took from it is to correlate: if a specific service gets catalogued and then sees targeted traffic a few days later, that pairing is worth an alert. On its own, one banner grab is just noise to file.',
  },
  {
    slug: 'tls-recon',
    title: 'Someone Fingerprinting My Honeypot',
    excerpt:
      'Suricata flagged a full TLS handshake against 64297/TCP. That port is specific to T-Pot’s own dashboard, so this was not a generic scan. It was something checking whether the box is a honeypot.',
    date: '2025-09-20',
    readTime: '3 min read',
    category: 'Threat Intelligence',
    kind: 'observation',
    related: HONEYPOT_REF,
    summary:
      'Suricata flagged a full TLS handshake against port 64297 on one of my honeypots. That port stood out right away, because 64297 is the port T-Pot’s own web dashboard listens on. This was not a generic scan; it was something checking whether the box is a honeypot.',
    sections: [
      {
        heading: 'What I saw',
        items: [
          'A complete TLS handshake, not just a SYN, to 64297/TCP from a host on M247 (AS9009), a provider often used for VPNs and scanning.',
          'No follow-on exploitation. Just the handshake and whatever the certificate revealed.',
        ],
      },
      {
        heading: 'Why it caught my eye',
        body:
          '64297 is not a service a normal target would be running; it is specific to T-Pot. Probing it looks like honeypot fingerprinting: confirming what the box is before deciding whether it is worth any real effort. The certificate a honeypot presents can give it away, which is a good reminder that deception infrastructure has its own fingerprint to manage.',
      },
    ],
    reflection:
      'I cannot stop someone from fingerprinting a public box, but this changed how I think about the honeypot’s own exposure. If I were running it to fool a specific adversary rather than just collect noise, I would care a lot more about what the management ports and the TLS certificate give away.',
  },
]

export type Competency = {
  icon: 'triage' | 'detection' | 'vuln' | 'ir'
  area: string
  proof: string
  href: string
}

// Maps directly to the four role types this work supports, each with proof
// linked to the project that backs it. This is the first thing a hiring
// manager should see: "here is what I can do in your domain."
export const competencies: Competency[] = [
  {
    icon: 'triage',
    area: 'Alert triage & SOC operations',
    proof: 'Worked a full phishing alert end to end (SOC338) and built a Splunk-to-Slack triage pipeline with AI-assisted enrichment.',
    href: '/projects/letsdefend-phishing',
  },
  {
    icon: 'detection',
    area: 'Detection engineering',
    proof: 'Wrote 10 Splunk rules mapped to MITRE ATT&CK plus Suricata signatures, and validated each by running the attack myself.',
    href: '/projects/soc-automation',
  },
  {
    icon: 'vuln',
    area: 'Vulnerability research',
    proof: 'Escalated an npm supply-chain RCE from P4 to P2 (CVSS 8.9) and pulled CVE-exploitation detections from live honeypots.',
    href: '/projects/npm-supply-chain',
  },
  {
    icon: 'ir',
    area: 'Incident response',
    proof: 'Contained an active WordPress compromise, removed the persistence, and restored operations in about 2.5 hours.',
    href: '/blog/incident-response',
  },
]
