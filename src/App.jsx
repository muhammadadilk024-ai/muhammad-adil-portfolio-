import { lazy, Suspense } from 'react'

import Navbar from './components/Navbar'
import Hero from './components/Hero'

const ServicesOrbit = lazy(() => import('./components/ServicesOrbit'))
const SkillsShowcase = lazy(() => import('./components/SkillsShowcase'))
const AboutJourney = lazy(() => import('./components/AboutJourney'))
const ProjectsShowcase = lazy(() => import('./components/ProjectsShowcase'))
const ResumeSection = lazy(() => import('./components/ResumeSection'))
const ContactSection = lazy(() => import('./components/ContactSection'))
const Footer = lazy(() => import('./components/Footer'))

function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <Navbar />

      <main id="main-content">
        <Hero />

        <Suspense fallback={null}>
          <ProjectsShowcase />
          <ServicesOrbit />
          <SkillsShowcase />
          <AboutJourney />
          <ResumeSection />
          <ContactSection />
          <Footer />
        </Suspense>
      </main>
    </>
  )
}

export default App
