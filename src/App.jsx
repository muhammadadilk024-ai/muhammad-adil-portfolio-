import { useState, lazy, Suspense } from 'react'

import IntroLoader from './components/IntroLoader'
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
  const [showLoader, setShowLoader] = useState(true)

  return (
    <>
      {showLoader && <IntroLoader onFinish={() => setShowLoader(false)} />}

      <Navbar />

      <main>
        <Hero />

        <Suspense fallback={null}>
          <ServicesOrbit />
          <SkillsShowcase />
          <AboutJourney />
          <ProjectsShowcase />
          <ResumeSection />
          <ContactSection />
          <Footer />
        </Suspense>
      </main>
    </>
  )
}

export default App