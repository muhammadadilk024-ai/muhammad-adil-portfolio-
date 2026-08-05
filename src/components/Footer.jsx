import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-[#222222] bg-[#111111] px-5 py-8 text-white sm:px-8 lg:px-10">
      <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(200,241,53,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(200,241,53,.16)_1px,transparent_1px)] [background-size:96px_96px]" />

      <motion.div
        initial={{ opacity: 0, y: 18, filter: 'blur(5px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 rounded-[1.5rem] border border-[#222222] bg-[#161616] px-5 py-5 text-center sm:flex-row sm:text-left"
      >
        <p className="text-sm font-medium text-[#d0d0d0]">
          © {currentYear}{' '}
          <span className="font-semibold text-[#f0f0f0]">Muhammad Adil</span>.
          All rights reserved.
        </p>

        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9a9a9a]">
          Built with <span className="text-[#c8f135]">React</span> & Tailwind CSS
        </p>
      </motion.div>
    </footer>
  )
}