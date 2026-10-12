// Real client feedback, in the client's own words. Each quote is attributed to the project it came from.
export const testimonials = [
  {
    project: 'fusionfora',
    client: 'Fusion Fora',
    context: 'AI strategy consulting website',
    url: 'https://fusionfora.com/',
    quote: 'Great team to work with. They built our website exactly how we wanted and were easy to communicate with.',
  },
  {
    project: 'sb-traworld',
    client: 'SB TraWorld',
    context: 'Bilingual travel platform',
    url: 'https://sb-traworld.com/',
    quote: 'Very professional and reliable service. The website looks great and works smoothly on all devices.',
  },
  {
    project: 'fam-humanity',
    client: 'FAM Humanity',
    context: 'Nonprofit website',
    url: 'https://famhumanity.com/',
    quote: 'The process was simple and stress-free. They understood our ideas and delivered a clean, modern website on time.',
  },
  {
    project: 'lavish-bath',
    client: 'Lavish Bath',
    context: 'WooCommerce store',
    url: 'https://lavishbathcalgary.ca/',
    quote: 'We’re very happy with the final result. The team was helpful, responsive, and paid attention to every detail.',
  },
]

export const testimonialFor = (project) => testimonials.find((t) => t.project === project)
