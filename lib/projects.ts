// Project data centralized for easier management
export interface Project {
  id: string
  title: string
  description: string
  impact: string
  tags: string[]
  icon?: React.ReactNode
  featured?: boolean
  images?: string[]
  liveDemo?: string
  github?: string
  demoLink: string
}

// You can move your projects array here from page.tsx if you want to centralize it
export const projectsData: Project[] = []
