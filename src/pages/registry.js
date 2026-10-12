import home from './Home.jsx'
import about from './About.jsx'
import services from './Services.jsx'
import projects from './Projects.jsx'
import contact from './Contact.jsx'
import privacy from './Privacy.jsx'
import { caseStudyPages } from './CaseStudy.jsx'

/** Every prerendered route, keyed by path. */
export const pages = {
  '/': home,
  '/about/': about,
  '/services/': services,
  '/projects/': projects,
  ...caseStudyPages,
  '/contact/': contact,
  '/privacy/': privacy,
}
