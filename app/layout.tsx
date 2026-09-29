import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Background from '@/components/TerminalBackground'
import { profile } from '@/lib/content'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  metadataBase: new URL('https://antoniobeltranmiller.com'),
  title: 'Antonio Beltran-Miller | SOC Analyst',
  description:
    'Security+ certified, transitioning into a SOC role. Home-lab detection engineering, T-Pot honeypot threat intelligence, and responsible bug bounty research — every claim backed by evidence.',
  keywords:
    'SOC analyst, detection engineering, Splunk, threat intelligence, honeypot, incident response, MITRE ATT&CK, bug bounty, Ann Arbor',
  authors: [{ name: 'Antonio Beltran-Miller' }],
  openGraph: {
    title: 'Antonio Beltran-Miller | SOC Analyst',
    description:
      'Home-lab detection engineering, honeypot threat intelligence, and responsible bug bounty research.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Antonio Beltran-Miller',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="antialiased">
        <Background />
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <footer className="border-t border-slate-800 mt-24">
          <div className="container mx-auto max-w-5xl px-4 py-10">
            <p className="text-sm text-slate-300">
              Open to SOC Analyst &amp; detection roles.{' '}
              <a href="/resume.pdf" className="text-amber-400 hover:text-amber-300 transition-colors">
                Résumé
              </a>{' '}
              ·{' '}
              <a href={`mailto:${profile.email}`} className="text-amber-400 hover:text-amber-300 transition-colors">
                {profile.email}
              </a>
            </p>
            <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm text-slate-500">
              <p>
                {profile.name} · {profile.location}
              </p>
              <div className="flex items-center gap-5">
                <a href={profile.github} className="hover:text-amber-400 transition-colors" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
                <a href={profile.linkedin} className="hover:text-amber-400 transition-colors" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
                <a href={`mailto:${profile.email}`} className="hover:text-amber-400 transition-colors">
                  Email
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
