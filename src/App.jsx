import { lazy, Suspense } from 'react'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ScrollProgress from './components/ScrollProgress'
import StatsStrip from './components/StatsStrip'

const CaseStudies = lazy(() => import('./components/CaseStudies'))
const Testimonials = lazy(() => import('./components/Testimonials'))
const ServicesOrbit = lazy(() => import('./components/ServicesOrbit'))
const ProcessSection = lazy(() => import('./components/ProcessSection'))
const SkillsShowcase = lazy(() => import('./components/SkillsShowcase'))
const AboutJourney = lazy(() => import('./components/AboutJourney'))
const ProjectsShowcase = lazy(() => import('./components/ProjectsShowcase'))
const ContactSection = lazy(() => import('./components/ContactSection'))
const Footer = lazy(() => import('./components/Footer'))

function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <ScrollProgress />
      <Navbar />

      <main id="main-content">
        <Hero />
        <StatsStrip />

        <Suspense fallback={null}>
          <CaseStudies />
          <ProjectsShowcase />
          <ServicesOrbit />
          <ProcessSection />
          <SkillsShowcase />
          <Testimonials />
          <AboutJourney />
          <ContactSection />
          <Footer />
        </Suspense>
      </main>
    </>
  )
}

export default App
