'use client'

import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { Shield, Github, Linkedin, Mail } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center px-4 overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Gradient orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 mb-8 rounded-full bg-cyan-500/10 border border-cyan-500/30"
          >
            <Shield className="w-10 h-10 text-cyan-400" />
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Antonio Beltran-Miller
          </h1>
          
          <div className="text-2xl md:text-3xl text-slate-300 mb-8 h-20">
            <TypeAnimation
              sequence={[
                'Cybersecurity Analyst',
                2000,
                'Security Researcher',
                2000,
                'Incident Response Lead',
                2000,
                'Security Tool Developer',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-slate-400 max-w-3xl mx-auto mb-12"
          >
            I identify vulnerabilities before they become breaches, respond to incidents when seconds matter, 
            and build systems that scale security operations.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex gap-6 justify-center"
          >
            <a 
              href="https://github.com/CyberShellCode" 
              target="_blank"
              className="p-3 bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6" />
            </a>
            <a 
              href="https://linkedin.com/in/antoniobeltran-miller" 
              target="_blank"
              className="p-3 bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a 
              href="mailto:antoniobeltranmiller@gmail.com"
              className="p-3 bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-6 h-6" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Animated security terminal */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 0.6, x: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute left-4 top-1/4 hidden lg:block font-mono text-xs text-green-400"
      >
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 0.6, x: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute right-4 bottom-1/4 hidden lg:block font-mono text-xs text-cyan-400"
      >
        <div className="bg-black/80 backdrop-blur p-4 rounded border border-cyan-500/30 max-w-xs">
          <div className="mb-2">[ALERT] Anomaly Detected</div>
          <div className="text-cyan-300">Investigating...</div>
        </div>
      </motion.div>
    </section>
  )
}
