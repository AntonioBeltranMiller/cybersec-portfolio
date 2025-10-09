// app/projects/[slug]/projectData.tsx
import React from 'react'
import { Shield, AlertTriangle, Database, TrendingUp, Activity, Zap, Brain } from 'lucide-react'

export interface Project {
  title: string
  fullDescription: string
  timeline: string
  technologies: string[]
  details: string[]
  outcomes: string[]
  metrics?: {
    label: string
    value: string | number
    color?: string
  }[]
  findings?: {
    title: string
    description: string
    severity: 'critical' | 'high' | 'medium' | 'low'
    cve?: string
  }[]
  blogs?: {
    title: string
    link: string
    description: string
  }[]
  liveDemo?: string
  github?: string
  additionalSections?: {
    title: string
    content: string[]
    icon?: React.ReactNode
  }[]
}

const projectDetails: Record<string, Project> = {
  'soc-automation': {
    title: 'AI-Powered SOC Automation Platform',
    fullDescription:
      `Built an end-to-end Security Operations Center (SOC) automation platform in a controlled lab environment that detects, analyzes, and responds to security threats using AI-powered intelligence enrichment. Successfully simulated real-world attacks and demonstrated automated threat detection across 10+ attack vectors mapped to MITRE ATT&CK framework. The platform reduces estimated alert triage time from 15 minutes to under 2 minutes through intelligent automation.`,
    timeline: 'October 2025 | Individual Project',
    technologies: ['Splunk Enterprise', 'N8N', 'GPT-4', 'VirusTotal API', 'AbuseIPDB API', 'Sysmon', 'Windows 10', 'Kali Linux', 'Metasploit', 'Hydra', 'Slack', 'VMware'],
    details: [
      'Created 10 production-ready detection rules covering credential dumping, process injection, PowerShell abuse, and brute-force attacks',
      'Integrated GPT-4 for automated threat analysis with natural language intelligence summaries and MITRE ATT&CK mapping',
      'Automated IOC enrichment using VirusTotal (file hash reputation) and AbuseIPDB (IP reputation scoring)',
      'Deployed Sysmon with SwiftOnSecurity configuration for enhanced endpoint visibility (15+ event types)',
      'Validated detection capabilities using real attack tools: Metasploit, Meterpreter, Hydra for RDP brute-force',
      'Real-time Slack notifications with comprehensive alert details and remediation recommendations',
      'N8N workflow automation orchestrating data flow from Splunk → AI Analysis → Threat Intel → Slack',
      'Successfully detected 9/10 simulated attack scenarios with minimal false positives',
    ],
    metrics: [
      { label: 'Detection Rules', value: '10', color: 'cyan' },
      { label: 'Alert Triage Time', value: '<2 min', color: 'green' },
      { label: 'Attack Scenarios', value: '9+', color: 'blue' },
      { label: 'MITRE ATT&CK Tactics', value: '6', color: 'purple' },
    ],
    findings: [
      {
        title: 'Credential Dumping Attempts (LSASS Access)',
        severity: 'critical',
        description: 'Detected unauthorized access to LSASS process memory through simulated attack, indicating potential credential harvesting attempts. Mapped to MITRE T1003.001 with automatic AI-powered impact assessment and containment recommendations.',
      },
      {
        title: 'Meterpreter Payload Indicators',
        severity: 'critical',
        description: 'Identified Meterpreter command execution patterns through Sysmon process creation events during testing. AI analysis provided detailed attack chain reconstruction and lateral movement predictions.',
      },
      {
        title: 'Process Injection Detection',
        severity: 'high',
        description: 'Captured remote thread creation events (Sysmon EventCode 8) indicating code injection techniques. Automated enrichment confirmed malicious payload characteristics in lab environment.',
      },
      {
        title: 'Suspicious PowerShell Execution',
        severity: 'high',
        description: 'Detected encoded PowerShell commands and download cradles during attack simulation. GPT-4 analysis decoded obfuscation and identified C2 communication patterns.',
      },
      {
        title: 'RDP Brute-Force Campaign',
        severity: 'medium',
        description: 'Identified multiple failed authentication attempts followed by successful login from test IP. Automated blocking recommendation generated with 100% abuse confidence from AbuseIPDB enrichment.',
      },
    ],
    additionalSections: [
      {
        title: 'Project Metrics',
        icon: <Activity className="w-5 h-5" />,
        content: [
          '100+ hours of development, testing, and documentation',
          '4 VMs orchestrated in complex network topology (Windows 10, Splunk, N8N, Kali Linux)',
          '1,000+ security events processed during validation testing',
          '32GB RAM allocated for realistic enterprise-scale simulation',
          '10 production-ready detection rules mapped to MITRE ATT&CK',
          '3 external APIs integrated (GPT-4, VirusTotal, AbuseIPDB)',
        ],
      },
      {
        title: 'Technical Architecture',
        icon: <Database className="w-5 h-5" />,
        content: [
          'Windows 10 Pro with Sysmon forwarding logs to Splunk via Universal Forwarder',
          'Splunk Enterprise detection rules trigger webhooks to N8N automation engine',
          'N8N workflow orchestrates GPT-4 analysis, VirusTotal lookups, and AbuseIPDB queries',
          'Real-time Slack notifications with formatted threat intelligence summaries',
          'Kali Linux attack platform for realistic threat simulation and validation',
        ],
      },
      {
        title: 'AI-Powered Threat Analysis',
        icon: <Brain className="w-5 h-5" />,
        content: [
          'GPT-4 integration for natural language alert triage and threat contextualization',
          'Automatic MITRE ATT&CK tactic and technique mapping (T1003, T1055, T1059, T1110)',
          'Severity assessment based on IOC reputation and attack patterns',
          'Actionable remediation steps tailored to specific threat types',
          'Threat actor TTPs identification and kill chain analysis',
        ],
      },
      {
        title: 'Detection Engineering',
        icon: <Activity className="w-5 h-5" />,
        content: [
          'Credential-Dumping-Attempt: LSASS access monitoring (MITRE T1003.001)',
          'Meterpreter-Indicators: Command execution pattern detection (T1059)',
          'Process-Injection-Detected: Remote thread creation monitoring (T1055)',
          'Suspicious-PowerShell-Execution: Encoded commands and download cradles (T1059.001)',
          'Brute-Force-Success: Failed + successful login correlation (T1110)',
          'Registry-Persistence: Run key modifications detection (T1547.001)',
          'Suspicious-Service-Installation: Malicious service creation (T1543.003)',
          'Suspicious-Network-Connections: Unusual outbound traffic patterns (T1071)',
          'Suspicious-File-Creation: Executable drops in temp folders (T1204)',
          'RDP-Brute-Force: Multiple failed authentication attempts (T1110)',
        ],
      },
      {
        title: 'Threat Intelligence Integration',
        icon: <Shield className="w-5 h-5" />,
        content: [
          'VirusTotal API: Automated file hash reputation (SHA256/MD5/SHA1) with detection ratios',
          'AbuseIPDB API: Real-time IP abuse confidence scoring and historical attack patterns',
          'Geolocation and ASN enrichment for source IP attribution',
          'Malware family identification and behavior analysis from VirusTotal',
          'Community threat intelligence integration for IOC validation',
        ],
      },
      {
        title: 'Attack Simulation & Validation',
        icon: <Zap className="w-5 h-5" />,
        content: [
          'Metasploit Framework: Exploited vulnerabilities and generated reverse shells',
          'Meterpreter Payloads: Process injection, credential dumping, lateral movement',
          'Hydra: Simulated RDP brute-force attacks with EventCode 4625 detection',
          'Custom PowerShell: Download cradles, encoded commands, fileless attacks',
          'Successfully triggered 9/10 detection rules with authentic IOCs',
        ],
      },
      {
        title: 'Key Challenges & Solutions',
        icon: <Zap className="w-5 h-5" />,
        content: [
          'Challenge: Integrating multiple APIs with different authentication methods → Solution: Designed modular N8N workflow with reusable credential management',
          'Challenge: High false positive rate in initial detection rules → Solution: Refined SPL queries using iterative testing with real attack tools',
          'Challenge: Sysmon log volume overwhelming Splunk indexer → Solution: Implemented selective logging with SwiftOnSecurity baseline configuration',
          'Challenge: AI prompt engineering for consistent threat analysis → Solution: Developed structured prompts with specific output format requirements',
          'Challenge: Correlating alerts across multiple data sources → Solution: Created unified event schema with normalized IOC extraction',
        ],
      },
      {
        title: 'Future Enhancements',
        icon: <TrendingUp className="w-5 h-5" />,
        content: [
          'Integration with SOAR platform (e.g., Shuffle) for automated response actions',
          'Machine learning model for behavioral anomaly detection on user activity',
          'Extended coverage for cloud-native attacks targeting AWS/Azure environments',
          'Custom Sysmon configuration tuned for specific threat actor TTPs',
          'Automated threat hunting queries based on MITRE ATT&CK navigator',
          'Integration with ticketing systems (JIRA/ServiceNow) for incident tracking',
        ],
      },
    ],
    outcomes: [
      'Reduced alert triage time by 85% (from estimated 15 minutes to under 2 minutes) through automated enrichment and AI analysis',
      'Successfully validated detection capabilities across 9+ attack scenarios including credential dumping, process injection, and brute-force attacks',
      'Eliminated manual threat intelligence enrichment through full automation',
      'Generated production-ready detection rules aligned with MITRE ATT&CK framework',
      'Demonstrated Tier 1-2 SOC Analyst capabilities with enterprise-grade tooling in controlled lab environment',
      'Created reusable automation framework for incident response workflows',
    ],
  },

  'vulnerability-research': {
    title: 'NPM Registry MITM Supply Chain Attack Discovery',
    fullDescription:
      `Discovered a critical supply chain vulnerability in a public repository where an insecure NPM registry configuration allowed Man-in-the-Middle attacks, enabling remote code execution through malicious package injection. Successfully demonstrated how attackers could poison the npm supply chain by exploiting HTTP transport instead of HTTPS, potentially compromising developer machines and CI/CD pipelines. Initially triaged as P4-Low but escalated after demonstrating the RCE attack vector.`,
    timeline: 'August 2024 - Present',
    technologies: ['Node.js', 'NPM', 'MITM Attacks', 'Supply Chain Security', 'Bugcrowd', 'Responsible Disclosure'],
    details: [
      'Identified insecure .npmrc configuration using HTTP (registry=http://registry.npmjs.org/) in public GitHub repository',
      'Developed proof-of-concept demonstrating Remote Code Execution through package substitution',
      'Used mitmproxy to intercept HTTP traffic and inject malicious npm packages with post-install scripts',
      'Demonstrated how attackers could leverage DNS spoofing or cache poisoning to redirect npm traffic',
      'Showed injection of backdoored dependencies like lodash with arbitrary code execution capabilities',
      'Coordinated responsible disclosure through Bugcrowd platform',
      'Successfully argued for severity escalation from P4 to P2-high due to demonstrated RCE impact',
    ],
    metrics: [
      { label: 'Attack Vector', value: 'Network (MITM)', color: 'red' },
      { label: 'Initial Triage', value: 'P4-LOW', color: 'yellow' },
      { label: 'Escalated To', value: 'P2-HIGH', color: 'orange' },
      { label: 'Impact', value: 'RCE', color: 'red' },
    ],
    findings: [
      {
        title: 'Insecure NPM Registry Configuration',
        severity: 'critical',
        description: 'Public .npmrc file configured to use unencrypted HTTP connection to npm registry, allowing MITM attacks to inject malicious packages with post-install scripts achieving Remote Code Execution. Initially triaged as P4-Low (Server Security Misconfiguration) but severity escalated after RCE demonstration.',
        cve: 'Pending Assignment',
      },
    ],
    additionalSections: [
      {
        title: 'Attack Chain',
        icon: <AlertTriangle className="w-5 h-5" />,
        content: [
          'Step 1: Attacker identifies HTTP registry configuration in public repository',
          'Step 2: Position MITM proxy between victim and npm registry via DNS spoofing or network control',
          'Step 3: Intercept npm install requests over unencrypted HTTP',
          'Step 4: Serve malicious package tarballs with embedded post-install scripts',
          'Step 5: Achieve Remote Code Execution on developer machines or CI/CD systems',
        ],
      },
      {
        title: 'Proof of Concept',
        icon: <Shield className="w-5 h-5" />,
        content: [
          'Configured mitmproxy with --map-local to substitute legitimate packages',
          'Created malicious lodash package with post-install RCE payload',
          'Successfully demonstrated code execution: "node -e \\"require(\'child_process\').exec(\'echo hacked > hacked.txt\')\\"" ',
          'Proved ability to steal credentials, access internal resources, and establish persistence',
          'Documented full exploitation chain for Bugcrowd submission',
        ],
      },
      {
        title: 'Impact Assessment',
        icon: <Database className="w-5 h-5" />,
        content: [
          'Developer machine compromise through poisoned dependencies',
          'CI/CD pipeline infiltration affecting production deployments',
          'Potential for widespread supply chain attack',
          'Credential theft and lateral movement opportunities',
          'Long-term persistent access through backdoored packages',
        ],
      },
    ],
    outcomes: [
      'Successfully demonstrated Remote Code Execution through supply chain attack',
      'Prevented potential compromise of developer and infrastructure systems',
      'Achieved responsible disclosure and remediation (HTTPS enforcement)',
      'Severity escalated from initial P4 triage after proving RCE capability',
      'Contributed to supply chain security awareness in open source community',
    ],
  },

  'blind-xss-server': {
    title: 'Blind XSS Detection Platform',
    fullDescription:
      `Developed a sophisticated XSS hunter platform that deploys from a single bash script to a fully functional SSL-encrypted dashboard. The platform enables security researchers and pentesters to detect stored XSS vulnerabilities in real-time with comprehensive payload management and capture analysis.`,
    timeline: 'November 2024 - Present',
    technologies: ['Bash', 'Node.js', 'Express', 'WebSockets', "Let's Encrypt", 'MongoDB', 'JavaScript'],
    details: [
      'One-command deployment: chmod +x setup.sh && ./setup.sh deploys entire infrastructure',
      'Automatic SSL certificate generation and renewal via Let\'s Encrypt',
      'Real-time WebSocket notifications for captured XSS triggers',
      'Custom payload generator with multiple encoding options (Base64, URL, HTML entities)',
      'Dashboard shows live captures with full DOM snapshots and cookie data',
      'Automatic email/Slack alerts on successful XSS capture',
      'Payload tracking with unique identifiers for attribution',
      'WAF bypass techniques built into payloads',
      'Docker containerization for easy deployment and scaling',
      'API endpoints for programmatic payload generation and retrieval',
    ],
    metrics: [
      { label: 'Deployment Time', value: '< 60 seconds', color: 'cyan' },
      { label: 'Active Payloads', value: '50+', color: 'blue' },
      { label: 'XSS Captured', value: '127', color: 'green' },
      { label: 'Unique Domains', value: '23', color: 'purple' },
    ],
    additionalSections: [
      {
        title: 'Technical Architecture',
        icon: <Database className="w-5 h-5" />,
        content: [
          'Reverse proxy with Nginx for load balancing',
          'MongoDB for persistent storage of captures',
          'Redis for session management and caching',
          'Automated backup system for capture data',
          'Rate limiting to prevent abuse',
        ],
      },
      {
        title: 'Payload Features',
        icon: <Shield className="w-5 h-5" />,
        content: [
          'Polyglot payloads for multiple contexts',
          'DOM-based XSS detection capabilities',
          'Blind XSS with external callbacks',
          'CSP bypass techniques included',
          'Automatic screenshot capture on trigger',
        ],
      },
    ],
    outcomes: [
      'Zero to production deployment in under 60 seconds',
      'Discovered XSS vulnerabilities in 15+ production applications',
      'Contributed to 8 responsible disclosures',
      'Used by 100+ security researchers globally',
    ],
    github: 'https://github.com/CyberShellCode/blind-xss-server',
  },

  'honeypot': {
    title: 'T-Pot Honeypot Threat Intelligence Platform',
    fullDescription:
      `Deployed a distributed T-Pot honeypot platform and captured over 424,000 hostile attacks across multiple honeypot sensors. Analyzed large-scale attack patterns including SSH brute-force campaigns, VoIP toll fraud attempts, web application exploitation, and IoT/OT targeting. Documented attacker TTPs, extracted IOCs, and contributed threat intelligence to community feeds.`,
    timeline: 'August 2025 – Present | Individual Project',
    technologies: [
      'T-Pot Platform', 'Docker', 'Elasticsearch', 'Logstash', 'Kibana',
      'Suricata IDS', 'Cowrie', 'Dionaea', 'Sentrypeer',
      'Honeytrap', 'ConPot', 'Ubuntu Server 22.04', 'Python'
    ],
    details: [
      'Detected exploitation attempts for URGENT/11 (CVE-2019-12255/12260/12261/12263) and Citrix Workspace CVE-2020-11900',
      'Captured SIP INVITE floods (UDP/5060) with spoofed "Cisco-SIPGateway" identity from GoDaddy AS398101, targeting premium international routes',
      'Observed TLS session establishment on high, non-standard port 64297 from M247 Europe (AS9009), indicative of targeted reconnaissance and potential honeypot fingerprinting',
      'Identified systematic ONYPHE (AS213412) scanning on port 9770 with clean handshake and immediate RST after banner grab',
      'Documented attacker behavior, created detection notes, and shared IOCs via AbuseIPDB and provider abuse channels'
    ],
    metrics: [
      { label: 'Honeypot Attacks', value: '33,000+', color: 'red' },
      { label: 'IOCs Identified', value: '89', color: 'orange' },
      { label: 'CVE Signatures', value: '4', color: 'blue' },
      { label: 'Attack Vectors', value: '8', color: 'purple' },
    ],
    findings: [
      {
        title: 'URGENT/11: VxWorks TCP/IP Stack Exploitation Attempts',
        severity: 'critical',
        description:
          'Multiple probes against VxWorks/IPnet components including TCP urgent pointer and DHCP options paths — consistent with CVE-2019-12255/12260/12261/12263. CVSS 9.8–10.0; remote, unauthenticated RCE/DoS paths.',
        cve: 'CVE-2019-12255, CVE-2019-12260, CVE-2019-12261, CVE-2019-12263',
      },
      {
        title: 'Citrix Workspace Privilege Escalation Probing',
        severity: 'high',
        description:
          'Probing consistent with DLL-hijack/priv-esc vectors in Citrix Workspace (post-compromise escalation pattern, enterprise targeting).',
        cve: 'CVE-2020-11900',
      },
      {
        title: 'VoIP Toll Fraud Campaign (SIP INVITE Floods)',
        severity: 'high',
        description:
          'Aggressive SIP INVITE floods to premium routes (e.g., 0075346850780296, 76000046850780294) from 208.109.190.200 (GoDaddy/AS398101), spoofing Cisco-SIPGateway; full SDP negotiation captured.',
      },
      {
        title: 'TLS Reconnaissance on Non-standard Port 64297',
        severity: 'medium',
        description:
          'Complete TLS handshake and short exchange on TCP/64297 from 146.70.185.71 (M247 Europe/AS9009), likely targeted recon or C2 discovery; demonstrates encrypted probing beyond basic scans.',
      },
    ],
    additionalSections: [
      {
        title: 'Attack Pattern Analysis',
        icon: <TrendingUp className="w-5 h-5" />,
        content: [
          'IoT/OT targeting for botnet building and persistence alongside enterprise lateral-movement objectives',
          '24/7 automated scanning; CVE spray patterns with legacy exploits still in active rotation',
          'Suricata top signatures include SSH invalid banner and stream anomalies',
        ],
      },
      {
        title: 'Threat Intelligence Actions',
        icon: <AlertTriangle className="w-5 h-5" />,
        content: [
          'Submitted malicious IPs with 100% confidence to AbuseIPDB and notified GoDaddy for toll-fraud infrastructure',
          'Curated IOC set (IPs, ports, User-Agent, numbers) and added detection notes for reuse',
          'Monitored correlation between ONYPHE enumeration and subsequent targeted probes',
        ],
      },
      {
        title: 'Technical Infrastructure',
        icon: <Database className="w-5 h-5" />,
        content: [
          'T-Pot multi-sensor stack (Cowrie, Dionaea, Sentrypeer, Honeytrap) with Suricata + ELK',
          'Dockerized services with daily backups and hardened access',
          'Custom dashboards for ASNs, top signatures, port histograms, and geo distribution',
        ],
      },
    ],
    outcomes: [
      'Verified active exploitation attempts of legacy CVEs and documented packet-level indicators',
      'Blocked and reported toll-fraud infrastructure; contributed IOCs to AbuseIPDB feeds',
      'Demonstrated differentiation between mass-scan, targeted recon, and fraud campaigns',
      'Built interview-ready artifacts: dashboards, signatures, and written analyses',
    ],
  },
}

export { projectDetails }
export default projectDetails
