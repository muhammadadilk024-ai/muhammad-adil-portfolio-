import { motion, useReducedMotion } from 'framer-motion'

const PURPLE = '#8f7fff'
const ORANGE = '#fe9d4a'
const ease = [0.16, 1, 0.3, 1]

const skillGroups = [
  {
    id: 'web-cms',
    label: 'Web and CMS',
    level: 'Client work',
    accent: PURPLE,
    skills: [
      { name: 'Laravel', icon: 'code' },
      { name: 'PHP', logo: '/logos/php.svg' },
      { name: 'WordPress', logo: '/logos/wordpress.svg' },
      { name: 'Custom Plugin Development', icon: 'code' },
      { name: 'Local SEO', icon: 'search' },
      { name: 'WooCommerce', logo: '/logos/woocommerce.svg' },
      { name: 'MySQL', logo: '/logos/mysql.svg' },
      { name: 'Shopify', logo: '/logos/shopify.svg' },
      { name: 'Elementor', logo: '/logos/elementor.svg' },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend and design',
    level: 'Client work',
    accent: ORANGE,
    skills: [
      { name: 'JavaScript', logo: '/logos/javascript.svg' },
      { name: 'HTML5', logo: '/logos/html5.svg' },
      { name: 'CSS3', logo: '/logos/css.svg' },
      { name: 'Tailwind CSS', logo: '/logos/tailwind.svg' },
      { name: 'UI and UX Design', icon: 'design' },
      { name: 'Figma', logo: '/logos/figma.svg' },
    ],
  },
  {
    id: 'ai-cloud',
    label: 'Full-stack and AI',
    level: 'Personal projects',
    accent: PURPLE,
    skills: [
      { name: 'React.js', logo: '/logos/react.svg' },
      { name: 'Node.js', logo: '/logos/node.svg' },
      { name: 'Python', icon: 'terminal' },
      { name: 'AI Agents', icon: 'ai' },
      { name: 'LLM API Integration', icon: 'api' },
      { name: 'Voice AI', icon: 'voice' },
      { name: 'Workflow Automation', icon: 'workflow' },
      { name: 'Supabase', icon: 'database' },
      { name: 'Cloudflare Workers', icon: 'cloud' },
      { name: 'REST APIs', icon: 'api' },
    ],
  },
  {
    id: 'mobile',
    label: 'Mobile',
    level: 'Personal projects',
    accent: ORANGE,
    skills: [
      { name: 'Flutter and Dart', icon: 'mobile' },
      { name: 'Kotlin (Android)', icon: 'code' },
      { name: 'Encrypted SQLite', icon: 'database' },
      { name: 'React Native', logo: '/logos/reactnative.svg' },
    ],
  },
  {
    id: 'foundations',
    label: 'Foundations and tooling',
    level: 'Strong foundations',
    accent: PURPLE,
    skills: [
      { name: 'Java', icon: 'terminal' },
      { name: 'C and C++', icon: 'terminal' },
      { name: 'Git', logo: '/logos/git.svg' },
      { name: 'GitHub', logo: '/logos/github.svg' },
      { name: 'Vite', logo: '/logos/vite.svg' },
      { name: 'Technical SEO', icon: 'search' },
      { name: 'Performance Optimization', icon: 'speed' },
    ],
  },
]

const skillCount = skillGroups.reduce((total, group) => total + group.skills.length, 0)

function ConceptIcon({ type }) {
  const paths = {
    api: (
      <>
        <circle cx="7" cy="7" r="2.2" />
        <circle cx="17" cy="17" r="2.2" />
        <path d="M8.8 8.8l6.4 6.4M15.5 5.5l3 3M18.5 5.5l-3 3M5.5 15.5l3 3M8.5 15.5l-3 3" />
      </>
    ),
    code: <path d="M9 7l-5 5l5 5M15 7l5 5l-5 5M14 4l-4 16" />,
    ai: (
      <>
        <path d="M12 3.5l1.2 4a4.7 4.7 0 0 0 3.3 3.3l4 1.2l-4 1.2a4.7 4.7 0 0 0-3.3 3.3l-1.2 4l-1.2-4a4.7 4.7 0 0 0-3.3-3.3l-4-1.2l4-1.2a4.7 4.7 0 0 0 3.3-3.3l1.2-4Z" />
        <path d="M18.5 3v4M16.5 5h4" />
      </>
    ),
    workflow: (
      <>
        <rect x="3" y="4" width="6" height="5" rx="1.5" />
        <rect x="15" y="15" width="6" height="5" rx="1.5" />
        <path d="M9 6.5h4a3 3 0 0 1 3 3V12M15 17.5h-4a3 3 0 0 1-3-3V12" />
      </>
    ),
    design: (
      <>
        <path d="M4 19l4.2-.9L19 7.3a2.1 2.1 0 0 0-3-3L5.2 15.1L4 19Z" />
        <path d="M14.5 5.8l3.7 3.7M12 20h8" />
      </>
    ),
    speed: (
      <>
        <path d="M4.4 17.4a8.5 8.5 0 1 1 15.2 0" />
        <path d="M12 12l4.8-4.2M7.2 17h9.6" />
      </>
    ),
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="5.8" />
        <path d="M15 15l5 5M7.8 12.8l2-2l1.6 1.3l2.5-3" />
      </>
    ),
    voice: (
      <>
        <rect x="9" y="3.5" width="6" height="11" rx="3" />
        <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3M9 21h6" />
      </>
    ),
    database: (
      <>
        <ellipse cx="12" cy="6" rx="7" ry="2.8" />
        <path d="M5 6v6c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8V6M5 12v6c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8v-6" />
      </>
    ),
    cloud: <path d="M7 18.5a4.2 4.2 0 0 1-.6-8.4a5.6 5.6 0 0 1 10.8 1.2a3.6 3.6 0 0 1-.5 7.2H7Z" />,
    mobile: (
      <>
        <rect x="6.5" y="2.8" width="11" height="18.4" rx="2.5" />
        <path d="M10 5.6h4M10.8 18.2h2.4" />
      </>
    ),
    terminal: (
      <>
        <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
        <path d="M7 10l3 2.5L7 15M12.5 15.5H17" />
      </>
    ),
  }

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[type]}
    </svg>
  )
}

function SkillChip({ skill, accent }) {
  return (
    <span
      className="skills-ribbon-chip inline-flex shrink-0 items-center gap-2.5 rounded-full border border-white/10 bg-[#17171d]/95 px-4 py-2.5 text-sm shadow-[0_12px_35px_rgba(0,0,0,.2)] backdrop-blur-sm"
      style={{ '--chip-accent': accent }}
    >
      {skill.logo ? (
        <img src={skill.logo} alt="" className="h-5 w-5 shrink-0 object-contain" loading="lazy" decoding="async" />
      ) : (
        <span className="shrink-0" style={{ color: accent }}>
          <ConceptIcon type={skill.icon} />
        </span>
      )}
      <span className="whitespace-nowrap font-medium text-white/82">{skill.name}</span>
    </span>
  )
}

function RibbonSet({ skills, accent, hidden = false }) {
  return (
    <div className="skills-ribbon-set flex shrink-0 gap-3 pr-3" aria-hidden={hidden || undefined}>
      {skills.map((skill, index) => (
        <SkillChip key={`${skill.name}-${index}`} skill={skill} accent={accent} />
      ))}
    </div>
  )
}

function SkillRibbon({ group, index, reduceMotion }) {
  const reverse = index % 2 === 1
  const duration = 27 + index * 3
  // Short rows are repeated so the looping ribbon never leaves a gap on wide screens.
  const loopSkills = group.skills.length < 7 ? [...group.skills, ...group.skills] : group.skills

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.55 }}
      transition={{ duration: reduceMotion ? 0 : 0.58, delay: reduceMotion ? 0 : index * 0.07, ease }}
      className="grid items-center gap-4 border-t border-white/10 py-5 md:grid-cols-[210px_minmax(0,1fr)]"
    >
      <div className="flex items-center gap-3 px-1">
        <motion.span
          aria-hidden="true"
          animate={reduceMotion ? undefined : { scale: [1, 1.45, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.8, repeat: Infinity, delay: index * 0.22, ease: 'easeInOut' }}
          className="h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: group.accent, boxShadow: `0 0 16px ${group.accent}` }}
        />
        <span>
          <span className="block text-sm font-semibold tracking-[-0.02em] text-white/86">{group.label}</span>
          <span className="mt-0.5 block font-mono text-[8px] uppercase tracking-[0.16em] text-white/32">{group.level}</span>
        </span>
      </div>

      <div className="skills-ribbon-window group relative min-w-0 overflow-hidden">
        <div
          className={`skills-ribbon-track flex w-max ${reverse ? 'skills-ribbon-reverse' : ''}`}
          style={{ '--ribbon-duration': `${duration}s` }}
        >
          <RibbonSet skills={loopSkills} accent={group.accent} />
          <RibbonSet skills={loopSkills} accent={group.accent} hidden />
        </div>
      </div>
    </motion.div>
  )
}

export default function SkillsShowcase() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="skills" className="relative -mt-px overflow-hidden bg-[#0d0d11] px-4 py-24 text-white sm:px-7 md:py-28 lg:px-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-12 h-[28rem] w-[28rem] rounded-full bg-[#8f7fff]/8 blur-[140px]" />
        <div className="absolute -right-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-[#fe9d4a]/7 blur-[150px]" />
        <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:110px_110px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,transparent_0%,rgba(13,13,17,.18)_45%,#0d0d11_100%)]" />
      </div>

      <div className="relative mx-auto max-w-[1400px]">
        <div className="flex flex-col justify-between gap-7 border-b border-white/10 pb-8 lg:flex-row lg:items-end">
          <div>
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: reduceMotion ? 0 : 0.6, ease }}
              className="font-mono text-[10px] font-semibold uppercase tracking-[0.27em] text-[#8f7fff]"
            >
              Skills and Technologies
            </motion.p>

            <motion.h2
              initial={reduceMotion ? false : { opacity: 0, y: 28, filter: 'blur(7px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.55 }}
              transition={{ duration: reduceMotion ? 0 : 0.72, delay: reduceMotion ? 0 : 0.08, ease }}
              className="mt-4 max-w-3xl text-4xl font-light leading-[1.02] tracking-[-0.052em] text-white sm:text-5xl lg:text-6xl"
            >
              The tools behind everything I build.
            </motion.h2>
          </div>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : 0.22, ease }}
            className="max-w-xl text-sm leading-7 text-white/52 sm:text-[15px] lg:pb-1"
          >
            From client-ready WordPress and ecommerce to AI agents, cloud backends and mobile apps. Each row shows where the skill comes from: client work, personal projects or strong foundations.
          </motion.p>
        </div>

        <div className="border-b border-white/10 pt-7 sm:pt-9">
          {skillGroups.map((group, index) => (
            <SkillRibbon key={group.id} group={group} index={index} reduceMotion={reduceMotion} />
          ))}
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.4 }}
          className="mt-5 flex items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-[0.17em] text-white/28"
        >
          <span>{skillCount} capabilities across {skillGroups.length} disciplines</span>
          <span className="hidden sm:inline">Hover a ribbon to pause</span>
        </motion.div>
      </div>
    </section>
  )
}
