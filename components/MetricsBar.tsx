'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
export default function MetricsBar() {
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    setIsVisible(true)
  }, [])
  const metrics = [
    { label: 'Active Certifications', value: 8, suffix: '' },
    { label: 'Honeypot Attacks Analyzed', value: 424000, suffix: '+' },
    { label: 'Vulnerabilities Found', value: 6, suffix: '+' },
    { label: 'Endpoints Secured', value: 150, suffix: '+' },
  ]
  return (
    <div className="fixed top-16 w-full bg-slate-900/95 backdrop-blur-lg border-b border-slate-800 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3 overflow-x-auto">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: -10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2 px-4 whitespace-nowrap"
            >
              <span className="text-xs text-slate-400">{metric.label}:</span>
              <span className="font-mono font-bold text-cyan-400">
                {isVisible && (
                  <CountUp end={metric.value} suffix={metric.suffix} />
                )}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
function CountUp({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = end / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [end])
  return <>{count.toLocaleString()}{suffix}</>
}
