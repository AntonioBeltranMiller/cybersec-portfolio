// components/TerminalBackground.tsx
'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TerminalCommand {
  input: string
  output?: string[]
  delay?: number
  clearAfter?: boolean
}

interface Terminal {
  id: number
  position: { top?: string; bottom?: string; left?: string; right?: string }
  commands: TerminalCommand[]
  title: string
}

export default function TerminalBackground() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Don't render on mobile for performance
  if (isMobile) return null

  const terminals: Terminal[] = [
    {
      id: 1,
      position: { top: '15%', left: '5%' },
      title: 'cybershell@soc-lab:~$',
      commands: [
        {
          input: 'tcpdump -i eth0 -n port 445',
          output: [
            '15:32:41.123456 IP 192.168.1.105.445 > 10.0.0.5.38291: Flags [S]',
            '15:32:41.123501 IP 192.168.1.105.445 > 10.0.0.5.38292: Flags [S]',
            '[!] SMB brute force detected from 192.168.1.105'
          ],
          delay: 2000,
          clearAfter: true
        },
        {
          input: 'python3 isolate_host.py --ip 192.168.1.105',
          output: [
            '[*] Connecting to firewall API...',
            '[+] Host isolated successfully',
            '[+] Incident #2024-1337 created'
          ],
          delay: 3000,
          clearAfter: true
        }
      ]
    },
    {
      id: 2,
      position: { bottom: '20%', right: '8%' },
      title: 'cybershell@threat-intel:~$',
      commands: [
        {
          input: 'curl -s https://api.threatfeed.io/iocs/latest',
          output: [
            '{"new_iocs": 847}',
            '{"critical": 23}',
            '[*] Updating blocklist...'
          ],
          delay: 2000,
          clearAfter: true
        }
      ]
    },
    {
      id: 3,
      position: { top: '60%', left: '3%' },
      title: 'cybershell@honeypot:~$',
      commands: [
        {
          input: 'tail -f /var/log/cowrie/cowrie.json',
          output: [
            '{"eventid":"cowrie.login.success","username":"admin"}',
            '{"eventid":"cowrie.session.file_download","url":"bot.sh"}',
            '[*] New malware sample captured'
          ],
          delay: 2500,
          clearAfter: true
        }
      ]
    }
  ]

  // Filter terminals for tablet view (show only 2)
  const visibleTerminals = isTablet ? terminals.slice(0, 2) : terminals

  return (
    <div className="fixed inset-0 pointer-events-none z-0 terminal-background">
      {visibleTerminals.map((terminal) => (
        <TerminalWindow key={terminal.id} terminal={terminal} isTablet={isTablet} />
      ))}
    </div>
  )
}

function TerminalWindow({ terminal, isTablet }: { terminal: Terminal; isTablet?: boolean }) {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0)
  const [currentOutput, setCurrentOutput] = useState<string[]>([])
  const [isTyping, setIsTyping] = useState(true)
  const [typedCommand, setTypedCommand] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    // Cursor blink effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [])

  useEffect(() => {
    const currentCommand = terminal.commands[currentCommandIndex]
    
    if (isTyping && currentCommand) {
      // Type the command
      let charIndex = 0
      intervalRef.current = setInterval(() => {
        if (charIndex <= currentCommand.input.length) {
          setTypedCommand(currentCommand.input.slice(0, charIndex))
          charIndex++
        } else {
          clearInterval(intervalRef.current)
          setIsTyping(false)
          // Show output after typing
          setTimeout(() => {
            if (currentCommand.output) {
              setCurrentOutput(currentCommand.output)
            }
            // Move to next command after delay
            setTimeout(() => {
              if (currentCommand.clearAfter) {
                setTypedCommand('')
                setCurrentOutput([])
              }
              setCurrentCommandIndex((prev) => (prev + 1) % terminal.commands.length)
              setIsTyping(true)
            }, currentCommand.delay || 2000)
          }, 500)
        }
      }, 50 + Math.random() * 30) // Random typing speed for realism
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [currentCommandIndex, isTyping, terminal.commands])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: isTablet ? 0.4 : 0.6, scale: 1 }}
      transition={{ duration: 0.5, delay: terminal.id * 0.2 }}
      className="absolute w-80 lg:w-96 terminal-window"
      style={terminal.position}
    >
      <div className="bg-slate-950/80 backdrop-blur-sm border border-cyan-500/30 rounded-lg shadow-2xl overflow-hidden terminal-glow">
        {/* Terminal Header */}
        <div className="bg-slate-900/90 px-3 py-1 flex items-center justify-between border-b border-cyan-500/30">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
          </div>
          <span className="text-xs text-cyan-400 font-mono">{terminal.title}</span>
        </div>
        
        {/* Terminal Body */}
        <div className="p-3 font-mono text-xs">
          <div className="space-y-1">
            {/* Command Line */}
            <div className="flex items-start">
              <span className="text-cyan-400 mr-2">{terminal.title}</span>
              <span className="text-slate-100 flex-1">
                {typedCommand}
                {showCursor && <span className="inline-block w-2 h-3 bg-cyan-400 ml-0.5 animate-pulse"></span>}
              </span>
            </div>
            
            {/* Output */}
            <AnimatePresence>
              {currentOutput.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-0.5 ml-2"
                >
                  {currentOutput.map((line, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className={`${
                        line.startsWith('[!]') ? 'text-orange-400' :
                        line.startsWith('[+]') ? 'text-cyan-300' :
                        line.startsWith('[*]') ? 'text-blue-400' :
                        'text-slate-200'
                      }`}
                    >
                      {line}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
