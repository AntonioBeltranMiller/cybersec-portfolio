// lib/content.ts
// Single source of truth for the whole site.
// Every number here is either drawn from the current résumé or backed by a
// screenshot in /public/images/projects. Nothing is asserted that cannot be shown.

export const profile = {
  name: 'Antonio Beltran-Miller',
  // Titles kept aligned with the résumé summary: the role being pursued, not a role held.
  roles: ['Security Analyst', 'Detection & response'],
  location: 'Ann Arbor, Michigan',
  email: 'AntonioBeltranMiller@gmail.com',
  site: 'antoniobeltranmiller.com',
  github: 'https://github.com/CyberShellCode',
  linkedin: 'https://linkedin.com/in/antoniobeltran-miller',
  resume: '/resume.pdf',
  // First person, plain. Mirrors the cover-letter voice.
  tagline:
    'Security+ certified analyst focused on detection and response. I work alerts end to end, write and tune detections mapped to MITRE ATT&CK in a five-VM home lab, and ran a T-Pot honeypot to study live attack traffic.',
  // Shift and location fit, shown near the top because it is one of the first things a SOC manager screens for.
  availability: 'Available for rotating and off-hours shifts · Onsite in the Detroit metro, hybrid, or remote',
  summary: [
    'I spent about two and a half years as the only IT person for a 200-person logistics company, so I know what a normal Windows and Active Directory environment looks like and how to keep people working while something is broken.',
  ],
}

export type Metric = { label: string; value: string; note?: string }
export type Evidence = { label: string; src: string }
// a single step in an attack-to-response walkthrough: narrative, an inline
// screenshot, and a short takeaway that lands the lesson for that step
export type WalkStep = {
  phase: string
  heading: string
  body: string
  src?: string
  caption?: string
  takeaway?: string
  code?: string
}
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
  // optional override for the "What I built" heading (e.g. a deployment rather than a build)
  builtHeading?: string
  // short label used in the hero proof row
  short?: string
  // kept as a live page but listed under "Other research" instead of on the homepage grid
  hideFromHome?: boolean
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
  // optional: an ordered attack-to-response walkthrough with a screenshot per step
  walkthrough?: WalkStep[]
}

export const projects: Project[] = [
  {
    slug: 'device-code-phishing-detection',
    title: 'Detecting Device Code Phishing in Microsoft Sentinel',
    kind: 'Home lab · detection engineering',
    timeline: 'November 2026',
    featured: true,
    spotlight: true,
    readTime: '5 min read',
    short: 'Device code phishing, detected end to end',
    highlight:
      'The interesting part was not catching the login. It was telling a legitimate admin using the CLI apart from an attacker, so the rule fires on the second one and stays quiet on the first.',
    cover: '/images/projects/dcp-detection-query.png',
    card:
      'A detection I built in my own Microsoft 365 tenant for device code phishing, the technique Storm-2372 used against Entra ID. I ran the attack against my own test accounts, wrote a tuned Sentinel analytics rule that fired an incident on its own, then closed it out with session revocation and a Conditional Access policy that blocks the flow.',
    result: 'Attack run in an isolated tenant · allowlist-tuned analytics rule fired an incident · contained and blocked with Conditional Access',
    tags: ['Microsoft Sentinel', 'Entra ID', 'KQL', 'Conditional Access', 'Device Code Phishing', 'Storm-2372', 'MITRE ATT&CK'],
    why:
      'I wanted hands-on detection work in a Microsoft cloud environment, not just on-prem telemetry, and device code phishing was the right thing to build around because it is current. It is the Entra ID technique behind the Storm-2372 campaigns, and it is interesting precisely because the sign-in it produces looks legitimate. I ran the whole loop myself in an isolated tenant, from the attack through the detection to the response, so I would understand where each control actually sits.',
    built: [
      'Stood up a Microsoft 365 trial tenant with Entra ID P2, created separate admin, break-glass, and standard user accounts, and connected Microsoft Sentinel to a Log Analytics workspace with the Entra ID sign-in and audit logs streaming in through a diagnostic setting.',
      'Ran the attack against my own accounts. I generated a device code with the Microsoft Graph CLI from a Kali VM sitting on a VPN exit in another state, then redeemed it as a standard user to stand in for a victim completing the sign-in. The geographic split was deliberate: it puts the malicious sign-in on a different IP than my normal Michigan baseline, which is the anomaly a detection can key on.',
      'Found that my tenant did not populate the AuthenticationProtocol field, so the textbook deviceCode filter returned nothing. I keyed the detection on the signals that were actually present instead, the Microsoft Graph Command Line Tools application and the mobile and desktop client type, which is what the device code flow logs in this environment.',
      'Tuned the rule with an allowlist so a legitimate admin using the CLI is suppressed and only an unexpected account authenticating this way raises an alert. That false-positive step was most of the real work, since firing on every device code sign-in would be useless to a SOC.',
      'Promoted the query to a scheduled analytics rule mapped to T1528 and T1566, with the user and source IP mapped as entities, and confirmed it generated an incident on its own rather than needing me to run the query by hand.',
      'Worked the response in order: revoked the account’s sessions first because the refresh token survives a password reset, then reset the password, and wrote the recommended actions into the rule so the next analyst sees them on the incident.',
      'Added a Conditional Access policy that blocks the device code flow, excluded the break-glass account so I could not lock myself out, tested it in report-only first, then enforced it and confirmed the next attempt was blocked.',
    ],
    learned: [
      'Device code phishing does not break MFA, it sidesteps it. The victim completes MFA and the resulting token flows to the attacker, so the control that actually stops it is blocking the flow, not adding another factor.',
      'Security Defaults already blocks the device code flow in new tenants, a change Microsoft made in July 2026, which is why my first attempts came back blocked with a 530035. I documented the blocked attempts, then turned Security Defaults off to show the attack succeeding, then rebuilt the block as an explicit Conditional Access policy, which is closer to how an organization that has outgrown Security Defaults would handle it.',
      'The detection is only as good as its allowlist. The useful version knows which accounts are expected to use CLI auth and stays quiet on them, which is the difference between a rule a SOC keeps and one they mute on day one.',
      'Revoking the refresh token versus resetting the password is the detail that separates real containment from a checkbox. A reset alone leaves the stolen token valid, so the revoke has to come first.',
    ],
    application:
      'In a real tenant this rule would need to cover more than the Graph CLI, since device code phishing targets other first-party clients too, and the allowlist would come from asking which service accounts and admins actually use CLI auth rather than guessing. The response matters more than the detection: the window between the token being issued and the session being revoked is the whole incident, so the revoke-first ordering is the part I would least want a tired analyst to get wrong. Everything here ran against my own accounts in an isolated tenant, and the one sign-in I show as successful required me to turn off a default protection to produce it.',
    attack: [
      'T1528 · Steal Application Access Token',
      'T1566 · Phishing',
      'T1078.004 · Valid Accounts: Cloud Accounts',
    ],
    walkthrough: [
      {
        phase: 'Attack',
        heading: 'Starting the device code flow',
        body:
          'Playing the attacker, I generated a device code with the Microsoft Graph CLI from a Kali VM. In a real campaign this is the lure: the attacker starts the flow and sends the victim a short code with a pitch to enter it at microsoft.com/devicelogin. I ran it from a VPN exit in another state so the sign-in would land on an IP far from my normal Michigan activity.',
        src: '/images/projects/dcp-kali-device-code-prompt.png',
        caption: 'The device code flow kicked off from Kali. The code and URL are what a victim would be social-engineered into using.',
        takeaway:
          'Nothing malicious touches the victim’s machine here. The attack rides a legitimate Microsoft authentication flow, which is exactly why attachment scanning and URL filtering miss it, and why the detection has to live in the sign-in logs.',
      },
      {
        phase: 'Attack',
        heading: 'The attacker inherits an authenticated session',
        body:
          'I redeemed the code as a standard user to stand in for a victim completing the sign-in, MFA included. The token came back to the session that started the flow, which in a real attack belongs to the attacker. The context dump confirms a live delegated session for the victim account, obtained through the device code flow.',
        src: '/images/projects/dcp-attacker-session.png',
        caption: 'A valid delegated session for the victim account, with the device-code credential type, held by the machine that started the flow.',
        takeaway:
          'This is the part people get wrong about device code phishing: it does not break MFA, it sidesteps it. The victim satisfies MFA and the attacker inherits the resulting token, so adding another factor does not help. Blocking the flow is the control that does.',
      },
      {
        phase: 'Detect',
        heading: 'Hunting for the sign-in',
        body:
          'Switching to the defender seat, I pulled every device code sign-in in the tenant. The benign admin account using the CLI from my home IP sits right next to the attacker account signing in from New York. One field I expected, AuthenticationProtocol, came back empty in this tenant, so I keyed on the signals that were actually present: the Microsoft Graph Command Line Tools application and the mobile and desktop client type.',
        src: '/images/projects/dcp-device-code-events-query.png',
        caption: 'Every device code sign-in in the window: a legitimate admin from home and the attacker from a different state, same auth method.',
        takeaway:
          'Device code auth is not malicious by itself, which is the trap. A rule that alerts on every device code sign-in would bury the SOC. The real signal is an account using it that has no business doing so, from somewhere it never signs in.',
      },
      {
        phase: 'Detect',
        heading: 'Tuning out the false positives',
        body:
          'The detection work was the allowlist. I carved out the admin account that legitimately uses CLI auth so the rule stays quiet on it, and fires only on an account that should never authenticate this way. After that, the attacker sign-in from New York is the only thing left, with a successful token issuance.',
        code: `let allowlist = dynamic(["itops@<tenant>.onmicrosoft.com"]);
SigninLogs
| where AppDisplayName == "Microsoft Graph Command Line Tools"
| where ClientAppUsed == "Mobile Apps and Desktop clients"
| where UserPrincipalName !in~ (allowlist)
| project TimeGenerated, UserPrincipalName, IPAddress, Location, ResultType, ResultDescription
| order by TimeGenerated desc`,
        src: '/images/projects/dcp-detection-query.png',
        caption: 'With the allowlist applied, the legitimate admin drops out and only the anomalous account from New York remains.',
        takeaway:
          'This is the difference between a rule a SOC keeps and one they mute on day one. A detection’s value is in its false-positive rate as much as its catch rate, and the allowlist is where that judgment lives.',
      },
      {
        phase: 'Detect',
        heading: 'From query to analytics rule',
        body:
          'I promoted the query to a scheduled Sentinel analytics rule, mapped it to the techniques it actually catches, T1528 (Steal Application Access Token) and T1566 (Phishing), and mapped the user and source IP as entities so an analyst can pivot straight from the alert.',
        src: '/images/projects/dcp-analytics-rule-mitre.png',
        caption: 'The rule tied to MITRE ATT&CK, with the account and IP mapped as entities for investigation.',
        takeaway:
          'Mapping to ATT&CK by the behavior, not just a label, is what lets a detection slot into coverage tracking. It turns a one-off query into something a detection program can measure and defend.',
      },
      {
        phase: 'Detect',
        heading: 'The incident fires on its own',
        body:
          'With the rule live, the attacker sign-in generated a Sentinel incident without me running anything. It arrives with the entities attached and the response steps written into it, so the next analyst opens a case that is ready to work.',
        src: '/images/projects/dcp-incident.png',
        caption: 'The detection firing automatically and producing an investigable incident, not just a query result.',
        takeaway:
          'A detection that only works when someone runs the query is a hunt, not a control. The jump from a good query to an automated, enriched incident is the part that actually reduces time to detect on a live queue.',
      },
      {
        phase: 'Respond',
        heading: 'Containing the account',
        body:
          'I worked the response in order. First I revoked the account’s sessions, which invalidates the refresh token the attacker is holding, then I reset the password. Doing it the other way around leaves the stolen token alive.',
        src: '/images/projects/dcp-revoke-sessions.png',
        caption: 'Revoking every session for the compromised account to kill the attacker’s refresh token.',
        takeaway:
          'Revoke before reset. A password reset alone does not touch an already-issued refresh token, so the attacker keeps access until the session is explicitly revoked. That ordering is the detail that separates real containment from a checkbox.',
      },
      {
        phase: 'Prevent',
        heading: 'Blocking it for good',
        body:
          'Finally I added a Conditional Access policy that blocks the device code flow, excluded the break-glass account so I could not lock myself out, tested it in report-only first, then enforced it and confirmed the next attempt was blocked. Newer tenants get this from Security Defaults by default, but rebuilding it as an explicit, audited policy is how an organization that has moved past Security Defaults would actually run it.',
        src: '/images/projects/dcp-ca-policy.png',
        caption: 'The Conditional Access policy blocking the device code flow, running in report-only before enforcement.',
        takeaway:
          'Report-only first is deliberate: it proves the policy would not break legitimate access before it starts blocking. Shipping a blocking control straight to enforced is how you cause an outage and lose the business’s trust in the security team.',
      },
    ],
    metrics: [
      { label: 'Technique', value: 'Device code phishing', note: 'T1528 / T1566 · Storm-2372' },
      { label: 'Platform', value: 'Microsoft Sentinel', note: 'Entra ID SigninLogs' },
      { label: 'Detection', value: 'Scheduled rule', note: 'allowlist-tuned, fired an incident' },
      { label: 'Control added', value: 'Conditional Access', note: 'device code flow blocked' },
    ],
    evidence: [
      { label: 'The attacker initiates the device code flow from a Kali VM', src: '/images/projects/dcp-kali-device-code-prompt.png' },
      { label: 'The attacker holds a valid device-code session for the victim account', src: '/images/projects/dcp-attacker-session.png' },
      { label: 'Tuned detection: the allowlist suppresses legitimate CLI use and isolates the attacker sign-in from New York', src: '/images/projects/dcp-detection-query.png' },
      { label: 'The analytics rule mapped to MITRE ATT&CK (T1528, T1566)', src: '/images/projects/dcp-analytics-rule-mitre.png' },
      { label: 'The rule fired a Sentinel incident on its own', src: '/images/projects/dcp-incident.png' },
      { label: 'Containment: revoking the account’s sessions, not just resetting the password', src: '/images/projects/dcp-revoke-sessions.png' },
      { label: 'Prevention: a Conditional Access policy blocking the device code flow', src: '/images/projects/dcp-ca-policy.png' },
    ],
  },
  {
    slug: 'letsdefend-phishing',
    title: 'SOC Alert: Lumma Stealer via ClickFix',
    kind: 'LetsDefend Challenge · unguided · SOC338',
    timeline: 'August 2026',
    featured: true,
    spotlight: true,
    readTime: '6 min read',
    short: 'Lumma Stealer alert, triaged end to end',
    highlight:
      'Containing the host was not the end of it. Lumma steals session cookies, so the handoff asks for every session to be invalidated, not just a password reset.',
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
    slug: 'soc-automation',
    title: 'AI-Assisted SOC Automation Lab',
    kind: 'Home lab · detection + automation',
    timeline: 'October to December 2025',
    featured: true,
    spotlight: true,
    cover: '/images/projects/soc-n8n-workflow.png',
    highlight:
      'My first SSH brute-force rule fired on a single failed login, which is useless. Tuning it to need repeated failures from one source inside a short window, so it catches a real attack without screaming at every mistyped password, was the actual detection work.',
    readTime: '4 min read',
    short: 'Splunk detections + AI triage lab',
    card:
      'An AI-assisted detection and triage pipeline running across five VMs. I built it from MyDFIR’s SOC Automation 2.0 and extended it: Splunk ingests endpoint telemetry, n8n hands each alert to an LLM acting as a tier-1 analyst, and an MCP server lets that AI query Splunk directly to investigate.',
    result: 'Cut my own triage time from 45 to 8 minutes across 10 self-run attacks',
    tags: ['Splunk', 'n8n', 'LLM (GPT-4.1 mini)', 'MCP server', 'DFIR IRIS', 'Sysmon', 'MITRE ATT&CK', 'VirusTotal', 'AbuseIPDB', 'Slack'],
    credit:
      'I built this by following MyDFIR’s SOC Automation 2.0, including its advanced sections for VirusTotal enrichment, DFIR IRIS ticketing, and the MCP server that lets the AI query the SIEM. The extensions are mine: I attacked the Windows host from Kali, wrote additional detection rules from what I saw, and tuned the SSH brute-force rule down from firing on a single failed login.',
    application:
      'In a real SOC the value here is not the AI, it is the discipline around it. An alert is only useful once its false positives are tuned down, which is the SSH brute-force lesson, and that same loop fights alert fatigue on a live queue. The risk I think hardest about is the one the AI introduces: it reads attacker-influenced log data, so prompt injection is a real concern, and anything that lets a model reach the SIEM should stay read-only, able to investigate but never change data. I keep a human in the loop for the same reason, because the model will state things the telemetry does not support. Running against a hosted model also keeps this lab-only on privacy grounds; a production version would use a local LLM.',
    why:
      'I wanted to understand alert triage from the inside: not just read a SIEM alert, but see the whole path from a raw endpoint event to an analyst-ready summary in Slack, and feel where the time actually goes. Building it end to end was the only way to learn which parts of triage are mechanical enough to automate and which still need a person.',
    built: [
      'Stood up the stack across five VMs and chose Sysmon with the SwiftOnSecurity config on the Windows 10 endpoint on purpose: default Windows logging misses what detection needs, so Sysmon gives me full process creation with command lines and hashes, registry writes, and network connections. The Universal Forwarder ships that to a Splunk SIEM server, and the remaining VMs run n8n, a DFIR IRIS case-management instance, and a Kali attack box.',
      'Wrote the detection logic in Splunk SPL and mapped each rule to MITRE ATT&CK by the behavior it catches, not just a label. The SSH brute-force rule is the one I tuned hardest: a single failed sign-in is meaningless, so I aggregate failures by source over a time window and only alert past a threshold. Others key off specific telemetry, like registry Run-key persistence firing on Sysmon EventCode 13 writes to the autostart paths.',
      'Built the n8n workflow that catches each Splunk alert on a webhook and hands it to an LLM (GPT-4.1 mini via the OpenAI API) running a tier-1 analyst prompt that summarizes the alert, enriches the indicators, assesses severity against MITRE ATT&CK, and recommends next actions, then posts a clean writeup to Slack.',
      'Wired the AI to real tools rather than just text: it calls AbuseIPDB and VirusTotal itself, and a confirmed alert opens a DFIR IRIS ticket instead of only pinging a channel. The VirusTotal results are genuinely mine, since the file hashes come from my own Sysmon telemetry for the Meterpreter and Atomic Red Team payloads I detonated. The source IPs from my Kali box are private, so AbuseIPDB has nothing on them; I demonstrated that enrichment path with a known-bad public IP instead.',
      'Connected the AI to an MCP server so it can query Splunk directly in natural language instead of only reacting to a forwarded alert. I can ask what happened on a host or in a time window and it builds and runs the SPL itself, then summarizes what it found and what to do next.',
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
      { label: 'VMs orchestrated', value: '5', note: 'Win10, Splunk, n8n, Kali, DFIR IRIS' },
    ],
    attack: [
      'T1003.001 · LSASS credential dumping',
      'T1055 · Process injection',
      'T1059.001 · PowerShell',
      'T1078 · Valid accounts (successful brute force)',
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
      { label: 'n8n workflow: webhook → LLM → AbuseIPDB / VirusTotal → Slack', src: '/images/projects/soc-n8n-workflow.png' },
      { label: 'The 10 detection rules in Splunk', src: '/images/projects/soc-splunk-alerts.png' },
      { label: 'The tier-1 analyst prompt driving the model', src: '/images/projects/soc-ai-prompt.png' },
      { label: 'Enriched alert in Slack (enrichment validated with a substituted known-bad public IP)', src: '/images/projects/soc-slack-alert.png' },
      { label: 'Registry-persistence detection (Sysmon EventCode 13)', src: '/images/projects/soc-splunk-registry.png' },
      { label: 'Meterpreter alert summarized to Slack', src: '/images/projects/soc-slack-meterpreter.png' },
    ],
  },
  {
    slug: 'honeypot',
    title: 'T-Pot Honeypot Threat Intelligence',
    kind: 'Home lab · threat intel',
    timeline: 'August to October 2025',
    featured: true,
    cover: '/images/projects/tpot-dashboard.png',
    highlight:
      '424k log events, and almost all of it is noise. The skill is finding the handful of sources worth a second look, and doing something with them.',
    readTime: '4 min read',
    short: 'T-Pot honeypot threat intel',
    builtHeading: 'What I deployed and added',
    card:
      'A single-host T-Pot deployment on a public DigitalOcean VPS, exposed to collect live attack traffic. Most of it is automated scanning noise; the useful work was finding the few patterns worth alerting on and reporting the infrastructure behind them.',
    result: '424k+ events logged; triaged Suricata exploit-attempt signatures and reported malicious IPs to AbuseIPDB',
    tags: ['T-Pot', 'Suricata', 'Elasticsearch / Kibana', 'Cowrie', 'Dionaea', 'Threat Intel'],
    credit:
      'The T-Pot deployment follows the standard honeypot setup (spin up a VPS, run the T-Pot installer, open it to the internet). I left T-Pot’s defaults in place: Blackhole mode off, which is why commodity scanners like ONYPHE still show up in the data, and community submission to Sicherheitstacho at the installer default. The analysis and reporting is my own.',
    why:
      'Reading about attacker behavior is not the same as watching it hit something you own. I put honeypots on the public internet to get real, unsolicited traffic and practice the boring but important part of threat intel: separating background scanning from anything worth a second look, and then doing something with it.',
    built: [
      'Deployed T-Pot CE (the Hive install type, run standalone on one host) on a DigitalOcean droplet: Ubuntu 24.04, 8 GB RAM and 4 vCPUs, about $48 a month. I left it exposed to the internet to collect live traffic. T-Pot runs each honeypot as a Docker container behind a single public IP; the sensors that drew the most traffic were SentryPeer, Honeytrap, Ciscoasa, Cowrie, and Dionaea.',
      'Used the Kibana dashboards to break the traffic down by sensor, source ASN, country, and credentials, and to confirm the two exploit-attempt signatures Suricata flagged (CVE-2019-12263 and CVE-2020-11900).',
      'Triaged the Suricata signatures that fired against the sensors (T-Pot ships the Emerging Threats ruleset), separated the high-confidence exploit attempts from the background noise, and reported malicious source IPs to AbuseIPDB with the supporting evidence.',
      'Turned three of the more interesting single events into short write-ups: a VoIP toll-fraud campaign, a commercial scanner (ONYPHE), and non-standard-port TLS recon. Each was practice at explaining a finding the way a report would.',
    ],
    learned: [
      'The volume is almost all commodity scanning: the credential word clouds are exactly what you would expect (root, admin, 123456, empty). The signal is not the count, it is the handful of sources and behaviors that stand out from it.',
      'The two CVE hits are a good reminder of long-tail risk. CVE-2019-12263 (URGENT/11, a VxWorks TCP stack flaw) and CVE-2020-11900 (a Treck TCP/IP stack flaw from the Ripple20 set) are both years old and still being sprayed at anything that answers.',
      'Every number on this page maps to the dashboard from while the sensors were running. If a figure is not in a screenshot, I left it off.',
    ],
    metrics: [
      { label: 'Events logged', value: '424k+', note: 'all sensors · Kibana event count' },
      { label: 'Top sensor', value: 'SentryPeer 204k', note: '≈48% of all events' },
      { label: 'Top source ASN', value: 'OVH 111,855', note: 'velia.net 67,027 next' },
      { label: 'Exploit-attempt sigs', value: 'CVE-2019-12263, -2020-11900', note: '9 and 6 hits' },
    ],
    evidence: [
      { label: 'T-Pot overview: 424k events across sensors', src: '/images/projects/tpot-dashboard.png' },
      { label: 'Attacker ASNs, top source IPs, and Suricata CVE hits', src: '/images/projects/tpot-attacks.png' },
      { label: 'Live attack map and source distribution', src: '/images/projects/tpot-analysis.png' },
      { label: 'Source-IP reputation, OS, and country breakdown', src: '/images/projects/tpot-attack-overview.png' },
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
      'Backed the severity argument with my own CVSS 3.1 score of 8.3 (High), vector AV:N/AC:H/PR:N/UI:R/S:C/C:H/I:H/A:H. The contestable call is the scope change (S:C); without it the vector scores 7.5, and I was ready to defend why poisoning the install chain crosses a trust boundary. P2 was Bugcrowd’s triage rating; the CVSS was my own argument for it.',
    ],
    learned: [
      'Severity is an argument you make with a working chain, not a label you attach to a setting. The escalation happened because the PoC made the impact concrete.',
      'The interesting security bug is often a boring config line whose consequences nobody walked all the way through.',
    ],
    metrics: [
      { label: 'Initial triage', value: 'P4-Low' },
      { label: 'Escalated to', value: 'P2' },
      { label: 'CVSS 3.1', value: '8.3', note: 'High · self-scored, S:C' },
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
    timeline: '2024 to present',
    readTime: '2 min read',
    hideFromHome: true,
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
  // optional: a cert with no official badge image shows a neutral icon instead of borrowing another cert's logo
  image?: string
  // core certs get a full card; the rest are listed in one "also completed" line
  core?: boolean
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
    core: true,
    verify: 'https://www.credly.com/badges/8771ef3b-bbff-4188-b2d2-c9069c939ca4/public_url',
    skills: ['Threat detection & response', 'Risk & vulnerability management', 'Network security', 'Cryptography & PKI'],
  },
  {
    name: 'CompTIA CySA+',
    issuer: 'CompTIA',
    date: 'In progress · expected November 2026',
    status: 'in-progress',
    core: true,
    skills: ['Behavioral analytics', 'Threat hunting', 'Incident response', 'Vulnerability management'],
  },
  {
    name: 'LetsDefend SOC Analyst Path',
    issuer: 'LetsDefend',
    date: 'February 2025',
    status: 'completed',
    image: '/images/certifications/letsdefend-soc-analyst.png',
    core: true,
    verify: 'https://app.letsdefend.io/certificate/show/3b48fd23-0ea8-4c67-aebd-e6cb407a54f1',
    skills: ['SIEM analysis', 'Alert triage', 'Malware analysis', 'Incident response'],
  },
  {
    name: 'Google Cybersecurity Professional',
    issuer: 'Coursera / Google',
    date: 'November 2024',
    status: 'completed',
    image: '/images/certifications/google-cybersecurity-certificate.png',
    core: true,
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
    period: 'Sep 2021 to May 2024',
    bullets: [
      'Only IT resource for a 200-person, two-site logistics operation with no dedicated IT department.',
      'Managed 42 Android devices through 42Gears SureMDM and kept the Windows 11 workstations patched.',
      'Administered Active Directory (user provisioning, account management, and group policy), and onboarded new employees from a standardized least-privilege Windows image.',
      'Primary technical contact for 200+ drivers, resolving delivery-software and device failures in real time.',
    ],
  },
  {
    role: 'Delivery Associate',
    org: 'MMML (Amazon DSP)',
    period: 'Sep 2025 to Oct 2026',
  },
  {
    role: 'Delivery Associate',
    org: 'DBE Logistics (Amazon DSP)',
    period: 'May 2024 to Aug 2025',
  },
  {
    role: 'Assembly Technician',
    org: 'Contour Windows',
    period: 'Aug 2019 to Aug 2021',
  },
]

export const education = {
  degree: 'B.S. Cybersecurity & Information Assurance',
  school: 'Western Governors University',
  detail: 'Online · expected 2027',
}

// Each skill links to where it is shown on the site. Skills with nothing on the site
// to back them (Sentinel, threat hunting, Diamond Model, Burp Suite, Suricata rule
// writing until the custom rules are published) were removed rather than claimed.
export type Skill = { name: string; href?: string }

export const skills: { group: string; items: Skill[] }[] = [
  {
    group: 'SIEM & detection',
    items: [
      { name: 'Splunk (SPL, alerts, tuning)', href: '/projects/soc-automation' },
      { name: 'Sysmon', href: '/projects/soc-automation' },
      { name: 'Suricata alert triage', href: '/projects/honeypot' },
      { name: 'Elasticsearch / Kibana', href: '/projects/honeypot' },
      { name: 'Wireshark', href: '/#certifications' },
    ],
  },
  {
    group: 'Security operations',
    items: [
      { name: 'Alert triage', href: '/projects/letsdefend-phishing' },
      { name: 'Phishing analysis', href: '/projects/letsdefend-phishing' },
      { name: 'IOC analysis', href: '/projects/letsdefend-phishing' },
      { name: 'MITRE ATT&CK mapping', href: '/projects/soc-automation' },
      { name: 'Incident response (NIST 800-61)', href: '/blog/incident-response' },
      { name: 'Escalation write-ups', href: '/projects/letsdefend-phishing' },
    ],
  },
  {
    group: 'Systems & cloud',
    items: [
      { name: 'Windows', href: '/#experience' },
      { name: 'Active Directory', href: '/#experience' },
      { name: 'Linux (Ubuntu)', href: '/projects/soc-automation' },
      { name: 'TCP/IP', href: '/projects/honeypot' },
      { name: 'AWS fundamentals (CloudWatch, GuardDuty, IAM, VPC)', href: '/#certifications' },
    ],
  },
  {
    group: 'Automation & tooling',
    items: [
      { name: 'n8n', href: '/projects/soc-automation' },
      { name: 'OpenAI API (GPT-4.1 mini) + MCP', href: '/projects/soc-automation' },
      { name: 'VirusTotal / AbuseIPDB', href: '/projects/soc-automation' },
      { name: 'PowerShell', href: '/projects/letsdefend-phishing' },
      { name: 'Bash', href: '/projects/blind-xss-server' },
      { name: 'Python', href: '/#certifications' },
      { name: 'Metasploit / Atomic Red Team', href: '/projects/soc-automation' },
      { name: 'mitmproxy', href: '/projects/npm-supply-chain' },
    ],
  },
]

export type Disposition = 'Resolved' | 'Malicious' | 'Benign' | 'Inconclusive'

export type Writeup = {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  // 'incident' gets a little more structure; 'observation' stays light
  kind: 'incident' | 'observation'
  // the analyst's call, shown as a badge on every card and at the top of the post
  disposition: Disposition
  // the at-a-glance triage summary a reviewer reads before the narrative
  ticket: { label: string; value: string }[]
  // links a honeypot write-up back to the project it came from
  related?: { slug: string; title: string }
  summary: string
  sections: Section[]
  // shown in a "Lessons learned" box at the end
  reflection?: string
  featured?: boolean
}

const HONEYPOT_REF = { slug: 'honeypot', title: 'T-Pot Honeypot Threat Intelligence' }

// Ordered to show the range of calls a Tier 1 analyst makes:
// a resolved incident, a malicious source, a benign one, and an inconclusive one.
export const writeups: Writeup[] = [
  {
    slug: 'incident-response',
    title: 'WordPress Compromise: Containment and Recovery',
    excerpt:
      'A site owner reported the site was "acting up." It was an active compromise through a vulnerable file-manager component. Contained, persistence removed, and back on a clean build in about 2.5 hours.',
    date: '2024-12-15',
    readTime: '2 min read',
    category: 'Incident Response',
    kind: 'incident',
    disposition: 'Resolved',
    featured: true,
    ticket: [
      { label: 'Disposition', value: 'True positive, resolved' },
      { label: 'Reported by', value: 'Site owner ("the site is acting up")' },
      { label: 'Entry point', value: 'elFinder file manager in a plugin, CVE-2021-32682' },
      { label: 'Persistence', value: 'Webshells, 3 hidden admin accounts, .htaccess rules' },
      { label: 'Time to recovery', value: 'About 2.5 hours' },
      { label: 'Data exposure', value: 'No PII exposed' },
    ],
    summary:
      'A site owner told me their WordPress site was "acting up." It was an active compromise. I traced the entry point to a vulnerable file-manager component, removed three separate persistence mechanisms, and had the site back on a clean, patched build in about two and a half hours.',
    sections: [
      {
        heading: 'Detection and analysis',
        items: [
          'Traced the entry point to CVE-2021-32682, a remote code execution flaw in the elFinder file manager that a plugin on the site bundled.',
          'Found three persistence mechanisms: webshells dropped into theme files, three hidden administrator accounts, and modified .htaccess rules.',
          'Scoped the impact to the web application. I found no evidence that personal data was accessed or taken.',
        ],
      },
      {
        heading: 'Containment',
        items: [
          'Blocked admin access and disabled the unauthorized accounts.',
          'Captured copies of the malicious files before deleting anything, so the evidence survived the cleanup.',
        ],
      },
      {
        heading: 'Eradication and recovery',
        items: [
          'Removed the webshells and reverted the .htaccess changes.',
          'Restored from a clean pre-compromise backup, patched the vulnerable plugin, and reset every credential.',
          'Added basic monitoring and file-integrity checking so a repeat would be noticed.',
        ],
      },
      {
        heading: 'Impact',
        body:
          'Left in place, the backdoors would have given the attacker ongoing access to the site: enough to disrupt the owner’s operations for months and put the site’s users at risk.',
      },
    ],
    reflection:
      'Treat "the site is acting weird" as a possible incident until proven otherwise. The whole compromise hinged on one unpatched component, the least glamorous and most common way in, which is why patching and file-integrity checks were part of the recovery and not an afterthought.',
  },
  {
    slug: 'voip-toll-fraud',
    title: 'A VoIP Toll-Fraud Probe on My Honeypot',
    excerpt:
      'A rented VPS sent SIP INVITEs to sequential premium-rate numbers behind a Cisco User-Agent. Toll-fraud reconnaissance: marked malicious and reported to AbuseIPDB.',
    date: '2025-09-22',
    readTime: '2 min read',
    category: 'VoIP Security',
    kind: 'observation',
    disposition: 'Malicious',
    related: HONEYPOT_REF,
    ticket: [
      { label: 'Disposition', value: 'Malicious: toll-fraud reconnaissance' },
      { label: 'Detected by', value: 'SentryPeer sensor and Suricata' },
      { label: 'Source', value: '208.109.190.200 (GoDaddy VPS, AS398101)' },
      { label: 'Target', value: 'UDP/5060 (SIP)' },
      { label: 'Action taken', value: 'Source IP reported to AbuseIPDB' },
    ],
    summary:
      'My honeypot’s SentryPeer sensor and Suricata picked up a burst of SIP INVITE requests from one rented VPS, each trying to place a call to a premium-rate international number. This is toll-fraud reconnaissance: hunting for a phone system that will place expensive calls billed to its owner.',
    sections: [
      {
        heading: 'Evidence',
        items: [
          'SIP INVITE requests over UDP/5060 from 208.109.190.200, arriving from rotating source ports (50352, 52392, 56775), consistent with a scripted dialer opening a new session per attempt.',
          'A User-Agent of "Cisco-SIPGateway." A GoDaddy VPS is not a Cisco gateway, so the string is there to make the traffic look like carrier equipment.',
          'Destination numbers stepping through sequential international ranges on premium-rate prefixes.',
          'Full SDP negotiation in the requests, meaning it was trying to complete real calls, not just map the service.',
        ],
      },
      {
        heading: 'Assessment',
        body:
          'Toll fraud bills the victim, not the attacker. A misconfigured PBX that accepts these calls can run up a large charge before anyone notices, and the carrier usually holds the account owner responsible. Disposable rented infrastructure and a legitimate-looking vendor string cost the attacker nothing and get past simple IP blocklists and fingerprint filters.',
      },
      {
        heading: 'What I would alert on',
        items: [
          'One source sending INVITEs to many different destination numbers in a short window.',
          'Call attempts to premium-rate and high-cost international prefixes.',
          'A User-Agent claiming carrier hardware from hosting-provider address space.',
        ],
      },
      {
        heading: 'Recommendations',
        body:
          'Keep SIP off the open internet, require authentication on every trunk and extension, and cap outbound calls by destination and concurrency so a compromised PBX cannot run up a bill overnight.',
      },
    ],
  },
  {
    slug: 'onyphe-scanner',
    title: 'A Commercial Scanner Cataloging My Services',
    excerpt:
      'A clean handshake, a banner grab, and an immediate reset from ONYPHE, a commercial internet scanner. Closed as benign without a report, and still worth understanding.',
    date: '2025-09-24',
    readTime: '2 min read',
    category: 'Threat Intelligence',
    kind: 'observation',
    disposition: 'Benign',
    related: HONEYPOT_REF,
    ticket: [
      { label: 'Disposition', value: 'Benign: legitimate commercial scanner' },
      { label: 'Source', value: '91.231.89.129 (ONYPHE, AS213412)' },
      { label: 'Target', value: '9770/TCP' },
      { label: 'Action taken', value: 'Closed as informational; not reported' },
    ],
    summary:
      'Not every hit on a honeypot is an attack. This one was a commercial scanner recording what my box exposes. I closed it as benign, and wrote it up because deciding what not to escalate is as much a part of triage as catching what to escalate.',
    sections: [
      {
        heading: 'Evidence',
        items: [
          'One TCP handshake to 9770/TCP, a banner grab, then an immediate RST, about 98 milliseconds from start to finish.',
          'The source, 91.231.89.129, belongs to ONYPHE (AS213412), a company that scans the internet and sells searchable access to what it finds.',
          'It showed up at all because T-Pot’s Blackhole mode, which null-routes known mass scanners like this one, was left off.',
        ],
      },
      {
        heading: 'Why benign is not the same as nothing',
        body:
          'The scan does no harm, and reporting a legitimate research scanner to an abuse database would be a false report. But ONYPHE’s product is a searchable record of what my box exposes, available to anyone who pays, including people looking for targets. The scan is the first step of someone else’s reconnaissance, done for them in advance.',
      },
      {
        heading: 'What I would alert on',
        body:
          'Not the scan itself. In a SOC I would tag known research scanners so they drop out of the triage queue, and alert on a pairing instead: a service gets catalogued, then sees targeted traffic in the following days.',
      },
    ],
  },
  {
    slug: 'tls-recon',
    title: 'A TLS Handshake on My Honeypot’s Management Port',
    excerpt:
      'Suricata flagged a completed TLS handshake against 64297/TCP, T-Pot’s own dashboard port. Inconclusive on intent, and a clear finding about my own configuration.',
    date: '2025-09-20',
    readTime: '2 min read',
    category: 'Threat Intelligence',
    kind: 'observation',
    disposition: 'Inconclusive',
    related: HONEYPOT_REF,
    ticket: [
      { label: 'Disposition', value: 'Inconclusive: possible honeypot fingerprinting' },
      { label: 'Detected by', value: 'Suricata' },
      { label: 'Source', value: 'Host on M247 (AS9009)' },
      { label: 'Target', value: '64297/TCP (T-Pot web dashboard)' },
      { label: 'Finding', value: 'Management port reachable from the internet' },
    ],
    summary:
      'Suricata flagged a completed TLS handshake against port 64297 on my honeypot, the port where T-Pot’s own web dashboard listens. I could not establish intent, so I marked it inconclusive. The firmer finding was about my own setup: the dashboard should not have been reachable from the internet.',
    sections: [
      {
        heading: 'Evidence',
        items: [
          'A complete TLS handshake, not just a SYN, to 64297/TCP from a host on M247 (AS9009), a provider widely used for VPNs and scanning.',
          'No exploitation attempt followed. The exchange ended after the handshake and certificate.',
          'Because the handshake completed, the dashboard was answering the open internet. I had not restricted T-Pot’s management ports (above 64000) to an allowlist, which T-Pot’s own documentation recommends.',
        ],
      },
      {
        heading: 'Assessment',
        body:
          '64297 is specific to T-Pot, so a completed handshake there is consistent with honeypot fingerprinting: confirming what a box is before deciding whether it is worth real effort. A full-range port sweep would also reach 64297, though, so the port alone does not prove intent.',
      },
      {
        heading: 'What would settle it',
        body:
          'Whether the same source touched other ports in the same window. A broad sweep points to a generic scanner; a lone hit on 64297 points to fingerprinting.',
      },
      {
        heading: 'Recommendations',
        body:
          'Restrict the management ports to a trusted-IP allowlist or a VPN so the dashboard does not answer arbitrary hosts, and review what its default TLS certificate reveals about the box.',
      },
    ],
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
    proof: 'Wrote 10 Splunk detection rules mapped to MITRE ATT&CK and validated each by running the attack myself, plus triaged Suricata exploit-attempt signatures on live honeypot traffic.',
    href: '/projects/soc-automation',
  },
  {
    icon: 'vuln',
    area: 'Vulnerability research',
    proof: 'Escalated an npm supply-chain RCE from P4 to P2 (self-scored CVSS 8.3) and triaged exploit-attempt signatures on live honeypots.',
    href: '/projects/npm-supply-chain',
  },
  {
    icon: 'ir',
    area: 'Incident response',
    proof: 'Contained an active WordPress compromise, removed the persistence, and restored operations in about 2.5 hours.',
    href: '/blog/incident-response',
  },
]
