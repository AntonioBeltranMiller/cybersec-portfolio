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

export const projectDetails: Record<string, Project> = {
  'vulnerability-research': {
    title: 'NPM Supply Chain Vulnerability Discovery',
    fullDescription: `Discovered a critical vulnerability in a public NPM package that could enable remote code execution through dependency confusion attacks. This finding highlighted the importance of supply chain security and proper package configuration.`,
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
    fullDescription: `Developed a sophisticated XSS hunter platform that deploys from a single bash script to a fully functional SSL-encrypted dashboard. The platform enables security researchers and pentesters to detect stored XSS vulnerabilities in real-time with comprehensive payload management and capture analysis.`,
    timeline: 'November 2024 - Present',
    technologies: ['Bash', 'Node.js', 'Express', 'WebSockets', 'Let\'s Encrypt', 'MongoDB', 'JavaScript'],
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
        ]
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
        ]
      }
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
    fullDescription: `Built a production-ready monitoring platform that tracks SSL/TLS certificate lifecycles and alerts on expiration. Demonstrates full-stack development capabilities and understanding of security monitoring needs.`,
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
    fullDescription: `Designed and deployed a comprehensive Security Operations Center environment for testing and skill development. Features enterprise-grade tools and realistic attack simulations.`,
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
    fullDescription: `Deployed a distributed T-Pot honeypot infrastructure that captured and analyzed over 17,000 attacks, leading to the detection of active exploitation attempts against critical CVEs including the URGENT/11 vulnerabilities and sophisticated VoIP toll fraud campaigns. Successfully identified 5 actively exploited CVEs, analyzed attack patterns from 95+ countries, and contributed threat intelligence to global security platforms including AbuseIPDB.`,
    timeline: 'September 2024',
    technologies: [
      'T-Pot Platform', 'Docker', 'Elasticsearch', 'Logstash', 'Kibana', 
      'Suricata IDS', 'Cowrie SSH/Telnet', 'Dionaea', 'Sentrypeer', 
      'Honeytrap', 'Conpot ICS/SCADA', 'Ubuntu Server 22.04', 'Python'
    ],
    details: [
      'Deployed T-Pot with 12+ honeypot services capturing diverse attack vectors',
      'Collected 17,000+ attacks from 3,000+ unique IPs across 95 countries in 24 hours',
      'Detected active exploitation of URGENT/11 (CVE-2019-12255, CVE-2019-12260, CVE-2019-12261, CVE-2019-12263)',
      'Captured sophisticated VoIP toll fraud campaign from GoDaddy infrastructure (AS398101)',
      'Identified TLS reconnaissance on non-standard ports indicating APT activity',
      'Detected commercial threat intelligence scanners (ONYPHE) mapping infrastructure',
      'Implemented automated threat intelligence sharing via AbuseIPDB API',
      'Created custom Kibana dashboards for real-time threat visualization',
      'Analyzed attack patterns: SSH (67%), Telnet (15%), Web (10%), Other (8%)',
      'Peak attack times identified: 2-4 AM EST correlating with Asian business hours',
    ],
    metrics: [
      { label: 'Total Attacks', value: '17,000+', color: 'red' },
      { label: 'Unique IPs', value: '3,000+', color: 'orange' },
      { label: 'Countries', value: '95', color: 'blue' },
      { label: 'CVEs Detected', value: '5', color: 'purple' },
      { label: 'Top Attacker AS', value: 'AS18403 (FPT)', color: 'green' },
      { label: 'Abuse Reports Filed', value: '12', color: 'cyan' },
    ],
    findings: [
      {
        title: 'URGENT/11: Wind River VxWorks TCP/IP Stack RCE',
        severity: 'critical',
        description: 'Detected active exploitation of URGENT/11 vulnerabilities (CVSS 9.8-10.0) targeting IoT/OT devices. 4 attempts captured exploiting TCP stack overflow affecting medical devices, industrial controls, and network equipment.',
        cve: 'CVE-2019-12255'
      },
      {
        title: 'Citrix Workspace Privilege Escalation',
        severity: 'high',
        description: 'Captured attempts to exploit CVE-2020-11900 (CVSS 8.8) for local privilege escalation in enterprise environments. Attackers targeting remote worker infrastructure.',
        cve: 'CVE-2020-11900'
      },
      {
        title: 'VoIP Toll Fraud Campaign',
        severity: 'high',
        description: 'Sophisticated toll fraud operation using spoofed Cisco-SIPGateway identities targeting premium rate numbers (0075346850780296). Campaign could generate $50,000+ in fraudulent charges per compromised system.',
      },
      {
        title: 'TLS Reconnaissance on Port 64297',
        severity: 'medium',
        description: 'Advanced reconnaissance from M247 Europe (146.70.185.71) establishing full TLS sessions on non-standard ports, indicating targeted search for hidden services or C2 infrastructure.',
      },
      {
        title: 'Mass Scanner Infrastructure Mapping',
        severity: 'low',
        description: 'ONYPHE commercial scanner systematically enumerating all 65,535 ports. Data likely sold to both researchers and threat actors, creating operational security concerns.',
      }
    ],
    additionalSections: [
      {
        title: 'Attack Pattern Analysis',
        icon: <TrendingUp className="w-5 h-5" />,
        content: [
          'SSH brute force dominated with "root" (45%), "admin" (23%), "ubuntu" (12%)',
          'Password attempts: "123456" (8%), "(empty)" (7%), "password" (5%)',
          'Top attacking countries: United States (45%), Hong Kong (12%), Seychelles (8%)',
          'Automated botnet activity detected from known malicious ASNs',
          'Correlation between ONYPHE scans and subsequent targeted attacks observed',
        ]
      },
      {
        title: 'Threat Intelligence Actions',
        icon: <AlertTriangle className="w-5 h-5" />,
        content: [
          'Submitted all malicious IPs to AbuseIPDB with 100% confidence scores',
          'Filed abuse reports to GoDaddy for toll fraud infrastructure',
          'Created Suricata IDS rules for CVE-2019-12255 detection',
          'Developed Python automation for threat intelligence sharing',
          'Documented attack patterns for community threat feeds',
        ]
      },
      {
        title: 'Technical Infrastructure',
        icon: <Database className="w-5 h-5" />,
        content: [
          'Deployed on cloud VPS with 8GB RAM / 4 vCPUs',
          'Docker Compose managing 30+ containers',
          'Elasticsearch cluster indexing 500GB+ of attack data',
          'Automated daily backups to external storage',
          'Management interface secured with 2FA and IP whitelisting',
        ]
      },
      {
        title: 'SOC Value Demonstration',
        icon: <Shield className="w-5 h-5" />,
        content: [
          'Early warning system for emerging threats',
          'Validation of security controls effectiveness',
          'Real-world attack data for detection rule tuning',
          'Threat actor TTP documentation for hunt teams',
          'Business risk quantification through attack volume metrics',
        ]
      }
    ],
    blogs: [
      {
        title: 'URGENT/11: Why 5-Year-Old Vulnerabilities Still Matter',
        link: '/blog/honeypot/urgent11-analysis',
        description: 'Deep dive into Wind River VxWorks exploitation attempts and their impact on critical infrastructure'
      },
      {
        title: 'Anatomy of a VoIP Toll Fraud Campaign',
        link: '/blog/honeypot/voip-toll-fraud',
        description: 'Technical analysis of SIP INVITE floods and how criminals monetize compromised PBX systems'
      },
      {
        title: 'Threat Intelligence Sharing: From Detection to Action',
        link: '/blog/honeypot/threat-intel-sharing',
        description: 'How proper abuse reporting and threat intelligence sharing multiplies defensive impact'
      },
      {
        title: 'Commercial Scanners: The Double-Edged Sword',
        link: '/blog/honeypot/commercial-scanners',
        description: 'Analysis of ONYPHE and similar platforms role in the threat landscape'
      }
    ],
    outcomes: [
      'Detected active exploitation of 5 critical CVEs including URGENT/11',
      'Prevented potential toll fraud losses through early detection and reporting',
      'Contributed threat intelligence to global security community via AbuseIPDB',
      'Created detection signatures for emerging attack patterns',
      'Demonstrated ROI of deception technologies for threat detection',
      'Enhanced incident response playbooks with real attack data',
    ],
  },
  'cybershell': {
    title: 'CyberShell - Autonomous Exploitation Framework',
    fullDescription: `Developed an automated security testing framework that combines traditional scanning with ML-powered analysis for continuous security assessment.`,
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

export default projectDetails
