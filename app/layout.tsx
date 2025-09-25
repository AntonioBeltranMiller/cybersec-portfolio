```tsx
// app/layout.tsx
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
  title: 'Antonio Beltran-Miller | Cybersecurity Analyst',
  description: 'Security Professional specializing in incident response, threat detection, and security architecture',
  keywords: 'cybersecurity, security analyst, incident response, threat detection, security operations',
  openGraph: {
    title: 'Antonio Beltran-Miller | Cybersecurity Analyst',
    description: 'Security Professional with proven incident response and vulnerability research experience',
    type: 'website',
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
        
        {/* Main Content */}
        <div className="relative z-10">
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
          <footer className="border-t border-slate-800 py-8 mt-20">
            <div className="container mx-auto px-4 text-center text-slate-400">
              <p>2025 Antonio Beltran-Miller. Built with security in mind.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
```
