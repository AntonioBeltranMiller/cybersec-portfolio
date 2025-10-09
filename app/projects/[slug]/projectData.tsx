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
      'Captured 424,000+ attacks across 10+ honeypot sensors (Sentrypeer, Honeytrap, Ciscoasa, Dionaea, Cowrie)',
      'Analyzed 287M+ events on Port 5060 (SIP/VoIP), 308M+ on Port 445 (SMB), 132M+ on Port 22 (SSH)',
      'Documented attack patterns from 100+ countries with France, United States, and Ukraine as top sources',
      'Identified CVE exploitation attempts: CVE-2019-12263 (URGENT/11), CVE-2020-11900 (Citrix Workspace)',
      'Extracted and analyzed credential stuffing attempts with 50,000+ unique username/password combinations',
      'Created detection signatures for Suricata IDS based on attack patterns observed',
      'Submitted high-confidence IOCs to AbuseIPDB and notified hosting providers of malicious infrastructure',
      'Analyzed web application attack vectors targeting WordPress, phpMyAdmin, and common CMS platforms',
    ],
    metrics: [
      { label: 'Total Attacks Captured', value: '424,000+', color: 'red' },
      { label: 'Unique Source IPs', value: '15,000+', color: 'orange' },
      { label: 'IOCs Extracted', value: '200+', color: 'blue' },
      { label: 'CVE Signatures', value: '10+', color: 'purple' },
    ],
    findings: [
      {
        title: 'VoIP Toll Fraud Campaign (Port 5060)',
        severity: 'critical',
        description:
          'Captured 287M+ SIP INVITE flood attempts targeting premium-rate international routes. Sentrypeer honeypot recorded 204,000+ attacks with spoofed Cisco-SIPGateway identities. Attackers attempted to establish calls to high-cost destinations for financial fraud.',
      },
      {
        title: 'SMB/CIFS Exploitation Attempts (Port 445)',
        severity: 'critical',
        description:
          'Observed 308M+ attacks on SMB port 445, including EternalBlue exploitation attempts, ransomware delivery, and lateral movement reconnaissance. Highest volume attack vector captured by the honeypot platform.',
      },
      {
        title: 'SSH Brute-Force & Credential Stuffing (Port 22)',
        severity: 'high',
        description:
          'Documented 132M+ SSH authentication attempts with 50,000+ unique credential combinations. Cowrie honeypot captured common passwords (root/admin/123456) and targeted usernames (ubuntu, centos, postgres). Top sources: OVH SAS, velia.net, FOP Dmytro Nedilskyi.',
      },
      {
        title: 'URGENT/11 VxWorks Exploitation (CVE-2019-12263)',
        severity: 'high',
        description:
          'Detected 9 instances of CVE-2019-12263 exploitation attempts targeting VxWorks TCP urgent pointer vulnerability. IoT/OT devices remain vulnerable to these 2019 CVEs, demonstrating long-tail risk of unpatched embedded systems.',
      },
      {
        title: 'Citrix Workspace Probing (CVE-2020-11900)',
        severity: 'medium',
        description:
          'Identified 6 reconnaissance attempts consistent with Citrix Workspace privilege escalation vulnerability. Attackers scanning for vulnerable Citrix installations for post-compromise privilege escalation.',
      },
      {
        title: 'Web Application Attacks',
        severity: 'medium',
        description:
          'Captured 6M+ requests targeting common admin panels (/wp-login.php, /admin, /.env, /.git/config). Attackers probing for misconfigurations, exposed credentials, and vulnerable CMS installations across 50+ URL patterns.',
      },
    ],
    additionalSections: [
      {
        title: 'Attack Volume Analysis',
        icon: <TrendingUp className="w-5 h-5" />,
        content: [
          'Peak attack period: September 2025 with 78M alerts in 24 hours',
          'Top honeypot sensors: Sentrypeer (204k), Honeytrap (69k), Ciscoasa (69k), Dionaea (43k)',
          'Most targeted ports: 5060 (VoIP/SIP), 445 (SMB), 22 (SSH), 80/443 (HTTP/HTTPS)',
          'Attack frequency: Average 1,000+ attacks per honeypot sensor per hour',
          'Unique attack sources: 15,000+ IP addresses from 100+ countries',
        ],
      },
      {
        title: 'Attacker Infrastructure',
        icon: <AlertTriangle className="w-5 h-5" />,
        content: [
          'Top ASNs: OVH SAS (111,855 attacks), velia.net Internetdienst (67,027), FOP Dmytro Nedilskyi (36,972)',
          'Top source countries: France (highest), United States, Ukraine, Hong Kong, Seychelles',
          'Attacker types: Mass scanners (70%), known attackers (15%), bot/crawler (10%), Tor exit nodes (3%)',
          'Infrastructure patterns: Heavy use of VPS providers (OVH, DigitalOcean, Google Cloud)',
        ],
      },
      {
        title: 'Credential Intelligence',
        icon: <Shield className="w-5 h-5" />,
        content: [
          'Captured 50,000+ unique username/password combinations in SSH brute-force attempts',
          'Most common usernames: root, admin, user, test, postgres, oracle, ubuntu, centos',
          'Most common passwords: (empty), password, root123, 123456, 12345678, admin, qwerty',
          'Credential stuffing patterns: Attackers cycling through common default credentials',
          'Custom wordlists observed: Targeted service-specific credentials (e.g., "dolphinscheduler" for Apache DolphinScheduler)',
        ],
      },
      {
        title: 'Web Attack Patterns',
        icon: <Database className="w-5 h-5" />,
        content: [
          'Top targeted URLs: / (6.1M), /wp-login.php (775k), /login (445k), /.env (219k), /.git/config (210k)',
          'CMS targeting: WordPress admin panels, phpMyAdmin, Joomla, Drupal',
          'Configuration probing: Environment files (.env), Git repositories, backup files',
          'Exploitation attempts: SQL injection, XSS, remote file inclusion, directory traversal',
          'Botnet signatures: Mirai, Emotet, and custom botnet variants detected',
        ],
      },
      {
        title: 'Threat Intelligence Actions',
        icon: <Activity className="w-5 h-5" />,
        content: [
          'Submitted 200+ high-confidence IOCs to AbuseIPDB with supporting evidence',
          'Notified hosting providers (OVH, DigitalOcean) of malicious infrastructure',
          'Created 15+ custom Suricata signatures based on observed attack patterns',
          'Documented attacker TTPs mapped to MITRE ATT&CK framework',
          'Shared anonymized attack data with security research community',
        ],
      },
    ],
    outcomes: [
      'Captured and analyzed 424,000+ attacks providing real-world threat intelligence',
      'Documented attack patterns from 15,000+ unique IP addresses across 100+ countries',
      'Extracted 200+ IOCs and contributed to community threat intelligence feeds',
      'Created reusable Suricata detection signatures based on observed attacker TTPs',
      'Demonstrated practical understanding of threat landscape and attacker methodologies',
      'Built interview-ready portfolio piece with quantifiable metrics and analysis',
    ],
  },
}

export { projectDetails }
export default projectDetails
