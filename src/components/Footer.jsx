import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-white/8 bg-[#0d0d11] px-4 py-7 text-white sm:px-7 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left"
      >
        <p className="text-xs text-white/42">
          © {currentYear} <span className="text-white/72">Muhammad Adil</span>. All rights reserved.
        </p>
        <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/28">
          Designed and developed by <span className="text-[#8f7fff]">Muhammad Adil</span>
        </p>
      </motion.div>
    </footer>
  )
}
