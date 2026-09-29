import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { projects } from '@/lib/content'
import ProjectView from '@/components/ProjectView'

// The letsdefend-phishing case study is intentionally NOT rendered through this
// shared ProjectView template. It is a 10-step interactive investigation
// walkthrough (claim ticket → triage email → threat intel → endpoint → process →
// VirusTotal → network → contain → close), and a step-by-step UI where the reader
// moves through the kill chain one stage at a time fits that narrative far better
// than the flat why/built/evidence layout the other projects use. It lives at its
// own route (app/projects/letsdefend-phishing/page.tsx) and is excluded here so the
// two do not collide. This is a deliberate design choice, not an oversight.
const dynamicProjects = projects.filter((p) => p.slug !== 'letsdefend-phishing')

export function generateStaticParams() {
  return dynamicProjects.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = dynamicProjects.find((p) => p.slug === params.slug)
  if (!project) return { title: 'Project not found' }
  return {
    title: `${project.title} | Antonio Beltran-Miller`,
    description: project.card,
  }
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = dynamicProjects.find((p) => p.slug === params.slug)
  if (!project) notFound()
  return <ProjectView project={project} />
}
