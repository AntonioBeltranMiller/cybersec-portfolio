'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ExternalLink, Github, Play } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface Project {
  id: string
  title: string
  description: string
  impact: string
  tags: string[]
  icon: React.ReactNode
  featured?: boolean
  images?: string[]
  liveDemo?: string
  github?: string
  demoLink: string
}

export default function ProjectShowcase({ project, index }: { project: Project; index: number }) {
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => {
    if (project.images) {
      setCurrentImage((prev) => (prev + 1) % project.images.length)
    }
  }

  const prevImage = () => {
    if (project.images) {
      setCurrentImage((prev) => (prev - 1 + project.images.length) % project.images.length)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`group relative ${
        project.featured 
          ? 'bg-gradient-to-r from-cyan-900/10 to-blue-900/10 border-cyan-800/50' 
          : 'bg-slate-900/50 border-slate-800'
      } backdrop-blur border rounded-xl overflow-hidden`}
    >
      {project.featured && (
        <div className="absolute top-4 right-4 z-10">
          <span className="px-3 py-1 bg-cyan-600/20 border border-cyan-600/50 rounded-full text-xs text-cyan-400">
            Featured Research
          </span>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8 p-8">
        {/* Project Info */}
        <div className="flex flex-col">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 bg-cyan-500/10 rounded-lg">
              {project.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
              <p className="text-slate-400 mb-4">{project.description}</p>
              <p className="text-green-400 text-sm font-semibold mb-4">{project.impact}</p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-slate-800/50 border border-slate-700 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-auto">
            <Link
              href={project.demoLink}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-colors"
            >
              <Play className="w-4 h-4" />
              View Details
            </Link>
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 border border-cyan-600 hover:bg-cyan-600/10 rounded-lg transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 border border-slate-600 hover:bg-slate-600/10 rounded-lg transition-colors"
              >
                <Github className="w-4 h-4" />
                Code
              </a>
            )}
          </div>
        </div>

        {/* Image Carousel */}
        <div className="relative">
          {project.images && project.images.length > 0 ? (
            <div className="relative h-[300px] bg-slate-800 rounded-lg overflow-hidden">
              {/* Placeholder for actual images */}
              <div className="absolute inset-0 flex items-center justify-center text-slate-600">
                <div className="text-center">
                  <div className="text-4xl mb-2">📸</div>
                  <p className="text-sm">{project.images[currentImage]}</p>
                  <p className="text-xs mt-2">Image {currentImage + 1} of {project.images.length}</p>
                </div>
              </div>
              
              {/* When you have actual images, replace above with: */}
              {/* <Image
                src={project.images[currentImage]}
                alt={`${project.title} screenshot ${currentImage + 1}`}
                fill
                className="object-cover"
              /> */}

              {/* Carousel Controls */}
              {project.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Image Indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {project.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImage(idx)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          idx === currentImage ? 'bg-cyan-400' : 'bg-slate-600'
                        }`}
                        aria-label={`Go to image ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="h-[300px] bg-slate-800/50 rounded-lg flex items-center justify-center">
              <p className="text-slate-600">Screenshots coming soon</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
