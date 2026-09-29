import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Certs from '@/components/Certs'
import Experience from '@/components/Experience'
import Writeups from '@/components/Writeups'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <Writeups />
      <Skills />
      <Certs />
      <Experience />
      <Contact />
    </>
  )
}
