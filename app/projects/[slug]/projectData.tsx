// app/projects/[slug]/projectData.tsx
import React from 'react'
import { Shield, AlertTriangle, Database, TrendingUp } from 'lucide-react'

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
  'vulnerability-research': {
    title: 'NPM Supply Chain Vulnerability Discovery',
    fullDescription:
      `Discovered a critical vulnerability in a public NPM package that could enable remote code execution through dependency confusion attacks. This finding highlighted the importance of supply chain security and proper package configuration.`,
    timeline: 'August 2024 - Present',
    technologies: ['Node.js', 'NPM', 'Security Research', 'Responsible Disclosure'],
    details: [
      'Identified misconfigured .npmrc file in public repository',
      'Analyzed potential attack vectors and impact',
      'Coordinated responsible disclosure with maintainers',
      'CVE pending assignment',
    ],
    outcomes: [
      'Prevented potential supply chain attack affecting thousands',
      'Improved security awareness in open source community',
      'Contributing to CVE database',
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

  'certprotector': {
    title: 'CertProtector - SSL/TLS Monitoring Platform',
    fullDescription:
      `Built a production-ready monitoring platform that tracks SSL/TLS certificate lifecycles and alerts on expiration. Demonstrates full-stack development capabilities and understanding of security monitoring needs.`,
    timeline: 'December 2024 - Present',
    technologies: ['React', 'Node.js', 'Supabase', 'GitHub Actions', 'RESEND API'],
    details: [
      'Automated certificate scanning and validation',
      'Multi-tier alerting system (7-day, 1-day, expiration)',
      'API-driven architecture for enterprise integration',
      'Scalable to monitor 1000+ domains',
    ],
    outcomes: [
      'Prevents certificate-related outages',
      'Reduces manual monitoring overhead',
      'Enterprise-ready architecture',
    ],
    liveDemo: 'https://certprotector.com',
  },

  'soc-lab': {
    title: 'Enterprise SOC Home Lab',
    fullDescription:
      `Designed and deployed a comprehensive Security Operations Center environment for testing and skill development. Features enterprise-grade tools and realistic attack simulations.`,
    timeline: 'June 2024 - Present',
    technologies: ['Splunk', 'Active Directory', 'Sysmon', 'pfSense', 'VMware'],
    details: [
      'Splunk SIEM with 45+ custom detection rules',
      'Active Directory with honeytokens',
      'Network segmentation with pfSense',
      'Sysmon enhanced logging',
      'MITRE ATT&CK mapped detections',
    ],
    outcomes: [
      'Reduced false positive rate by 40%',
      'Created reusable detection content',
      'Documented security playbooks',
    ],
  },

  'honeypot': {
    title: 'T-Pot Honeypot Threat Intelligence Platform',
    fullDescription:
      `Deployed a distributed T-Pot honeypot and captured/analysed large-scale hostile activity, including active exploitation attempts against URGENT/11 VxWorks CVEs, Citrix Workspace probing, a VoIP toll-fraud campaign, scanner activity from ONYPHE, and advanced TLS reconnaissance on a non-standard port.`,
    timeline: 'September 2024 – Present',
    technologies: [
      'T-Pot Platform', 'Docker', 'Elasticsearch', 'Logstash', 'Kibana',
      'Suricata IDS', 'Cowrie', 'Dionaea', 'Sentrypeer',
      'Honeytrap', 'ConPot', 'Ubuntu Server 22.04', 'Python'
    ],
    details: [
      'Detected exploitation attempts for URGENT/11 (CVE-2019-12255/12260/12261/12263) and Citrix Workspace CVE-2020-11900',
      'Captured SIP INVITE floods (UDP/5060) with spoofed “Cisco-SIPGateway” identity from GoDaddy AS398101, targeting premium international routes',
      'Observed TLS session establishment on high, non-standard port 64297 from M247 Europe (AS9009), indicative of targeted reconnaissance and potential honeypot fingerprinting',
      'Identified systematic ONYPHE (AS213412) scanning on port 9770 with clean handshake and immediate RST after banner grab',
      'Documented attacker behavior, created detection notes, and shared IOCs via AbuseIPDB and provider abuse channels'
    ],
    metrics: [
      { label: 'Honeypot Attacks', value: '33,000+*', color: 'red' },
      { label: 'Top Attacker ASNs', value: 'DigitalOcean, GoDaddy, Host Europe, Google Cloud', color: 'orange' },
      { label: 'Most-Triggered Sig', value: 'SURICATA SSH invalid banner', color: 'blue' },
      { label: 'Peak Categories', value: 'Generic protocol, misc activity, attempted admin', color: 'purple' },
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
      {
        title: 'Commercial Mass Scanning by ONYPHE',
        severity: 'low',
        description:
          'Systematic port 9770 scan from ONYPHE (AS213412) with banner grab and immediate RST; commercial reconnaissance cataloging honeypot responses.',
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
      {
        title: 'SOC Value Demonstration',
        icon: <Shield className="w-5 h-5" />,
        content: [
          'Early-warning telemetry for exploit campaigns and reconnaissance',
          'Clear linkage from raw signals → IOCs → abuse reporting',
          'Reusable detections and interview-ready deep-dives (packet-level analysis of URGENT/11, SIP fraud TTPs)',
        ],
      },
    ],
    blogs: [
      {
        title: 'URGENT/11: Why 5-Year-Old Vulnerabilities Still Matter',
        link: '/blog/honeypot/urgent11-analysis',
        description: 'Impact of persistent VxWorks exploitation in IoT/OT and how to detect it',
      },
      {
        title: 'Anatomy of a VoIP Toll Fraud Campaign',
        link: '/blog/honeypot/voip-toll-fraud',
        description: 'How INVITE floods monetize via premium-rate routes and how to spot them',
      },
      {
        title: 'Threat Intelligence Sharing: From Detection to Action',
        link: '/blog/honeypot/threat-intel-sharing',
        description: 'Turning honeypot detections into community protection via reporting',
      },
      {
        title: 'Commercial Scanners: The Double-Edged Sword',
        link: '/blog/honeypot/commercial-scanners',
        description: 'Research vs. reconnaissance and why ONYPHE-style scans matter',
      },
    ],
    outcomes: [
      'Verified active exploitation attempts of legacy CVEs and documented packet-level indicators',
      'Blocked and reported toll-fraud infrastructure; contributed IOCs to AbuseIPDB feeds',
      'Demonstrated differentiation between mass-scan, targeted recon, and fraud campaigns',
      'Built interview-ready artifacts: dashboards, signatures, and written analyses',
    ],
  },

  'cybershell': {
    title: 'CyberShell - Autonomous Exploitation Framework',
    fullDescription:
      `Developed an automated security testing framework that combines traditional scanning with ML-powered analysis for continuous security assessment.`,
    timeline: 'October 2024 - Present',
    technologies: ['Python', 'Machine Learning', 'LLM Integration', 'Automation'],
    details: [
      'Automated vulnerability discovery',
      'ML-powered exploitation attempts',
      'Comprehensive reporting system',
      'CI/CD pipeline integration',
      'Business impact analysis',
    ],
    outcomes: [
      'Reduced manual testing time by 70%',
      'Improved vulnerability coverage',
      'Automated compliance reporting',
    ],
    github: 'https://github.com/CyberShellCode/cybershell',
  },
}

export { projectDetails }
export default projectDetails
