import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import TerminalBackground from '@/components/TerminalBackground'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

const jetbrains = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono'
})

export const metadata: Metadata = {
  title: 'Antonio Beltran-Miller | SOC Analyst & Security Researcher',
  description: 'Cybersecurity professional specializing in SOC automation, threat intelligence, and security research. Portfolio featuring AI-powered detection engineering, honeypot analysis, and vulnerability research.',
  keywords: 'cybersecurity analyst, SOC automation, threat intelligence, detection engineering, security research, incident response, MITRE ATT&CK, vulnerability research, honeypot analysis, security operations',
  authors: [{ name: 'Antonio Beltran-Miller' }],
  openGraph: {
    title: 'Antonio Beltran-Miller | SOC Analyst & Security Researcher',
    description: 'Cybersecurity professional showcasing SOC automation, threat intelligence analysis, and security research projects',
    type: 'website',
    locale: 'en_US',
    siteName: 'Antonio Beltran-Miller Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Antonio Beltran-Miller | SOC Analyst & Security Researcher',
    description: 'Cybersecurity professional specializing in SOC automation and threat intelligence',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable + ' ' + jetbrains.variable}>
      <body className="bg-slate-950 text-slate-100 antialiased">
        <TerminalBackground />
        <div className="relative z-10">
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
          <footer className="border-t border-slate-800 py-8 mt-20">
            <div className="container mx-auto px-4 text-center text-slate-400">
              <p>Antonio Beltran-Miller&apos;s Professional Portfolio</p>
              <p className="text-sm mt-2 text-slate-500">
                SOC Automation • Threat Intelligence • Security Research
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
