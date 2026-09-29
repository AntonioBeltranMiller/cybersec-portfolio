'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Terminal, Menu, X, Download } from 'lucide-react'

const navItems = [
  { label: 'Projects', href: '/#projects' },
  { label: 'Write-ups', href: '/#writeups' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Certifications', href: '/#certifications' },
  { label: 'Experience', href: '/#experience' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-colors ${
        scrolled ? 'bg-[#0a0f1a]/90 backdrop-blur-md border-b border-slate-800' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <Terminal className="w-5 h-5 text-amber-400" />
            <span className="font-semibold tracking-tight group-hover:text-amber-400 transition-colors">
              Antonio Beltran-Miller
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-7 text-sm">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} className="text-slate-400 hover:text-amber-400 transition-colors">
                {item.label}
              </Link>
            ))}
            <a
              href="/resume.pdf"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md border border-amber-600/40 text-amber-300 hover:bg-amber-600/10 transition-colors"
            >
              <Download className="w-4 h-4" />
              Resume
            </a>
          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden p-2" aria-label="Toggle menu">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden py-4 border-t border-slate-800 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="py-2 text-slate-300 hover:text-amber-400 transition-colors"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a href="/resume.pdf" className="mt-3 inline-flex items-center gap-2 text-amber-300">
              <Download className="w-4 h-4" /> Download résumé
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
