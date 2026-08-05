import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const skills = ['WordPress', 'Shopify', 'SEO', 'Figma']

function DeveloperIcon() {
  return (
    <svg
      viewBox="0 0 220 220"
      className="w-24 h-24 sm:w-28 sm:h-28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="loaderIconBg" x1="35" y1="30" x2="185" y2="190">
          <stop stopColor="#c8f135" />
          <stop offset="0.55" stopColor="#d8ff4d" />
          <stop offset="1" stopColor="#f0f0f0" />
        </linearGradient>

        <linearGradient id="loaderAccent" x1="40" y1="40" x2="180" y2="180">
          <stop stopColor="#c8f135" />
          <stop offset="0.55" stopColor="#d8ff4d" />
          <stop offset="1" stopColor="#f0f0f0" />
        </linearGradient>
      </defs>

      <rect
        x="30"
        y="34"
        width="160"
        height="120"
        rx="30"
        fill="#161616"
        stroke="rgba(200,241,53,0.22)"
        strokeWidth="3"
      />

      <rect
        x="46"
        y="50"
        width="128"
        height="22"
        rx="11"
        fill="rgba(240,240,240,0.06)"
      />

      <circle cx="60" cy="61" r="4.5" fill="#c8f135" opacity="0.9" />
      <circle cx="75" cy="61" r="4.5" fill="#d0d0d0" opacity="0.85" />
      <circle cx="90" cy="61" r="4.5" fill="#9a9a9a" opacity="0.9" />

      <path
        d="M82 95L63 111L82 127"
        stroke="url(#loaderIconBg)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M138 95L157 111L138 127"
        stroke="url(#loaderIconBg)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M121 85L99 137"
        stroke="#c8f135"
        strokeWidth="10"
        strokeLinecap="round"
      />

      <path d="M54 160H166L183 184H37L54 160Z" fill="url(#loaderAccent)" />

      <path
        d="M82 173H138"
        stroke="#050505"
        strokeWidth="6"
        strokeLinecap="round"
      />

      <circle cx="168" cy="47" r="11" fill="#c8f135" />
      <circle
        cx="168"
        cy="47"
        r="21"
        stroke="#c8f135"
        strokeOpacity="0.18"
        strokeWidth="4"
      />
    </svg>
  )
}

function IntroLoader({ onFinish }) {
  const reduceMotion = useReducedMotion()
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLeaving(true)
    }, reduceMotion ? 900 : 3100)

    return () => clearTimeout(timer)
  }, [reduceMotion])

  function handleAnimationComplete() {
    if (isLeaving && typeof onFinish === 'function') {
      onFinish()
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#111111] will-change-transform"
      initial={{ y: 0 }}
      animate={{ y: isLeaving ? '-100%' : 0 }}
      transition={{
        duration: reduceMotion ? 0.25 : 0.82,
        ease: [0.76, 0, 0.24, 1],
      }}
      onAnimationComplete={handleAnimationComplete}
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#111111_0%,#161616_52%,#111111_100%)]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,241,53,0.13),transparent_34%),radial-gradient(circle_at_42%_58%,rgba(240,240,240,0.045),transparent_28%)]" />

      <div className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(rgba(200,241,53,0.9)_1px,transparent_1px),linear-gradient(90deg,rgba(200,241,53,0.9)_1px,transparent_1px)] bg-[size:80px_80px]" />

      {!reduceMotion && (
        <>
          <motion.div
            className="absolute top-16 right-10 h-28 w-28 rounded-[35%] border border-[#c8f135]/14 sm:right-24 sm:h-40 sm:w-40 will-change-transform"
            animate={
              isLeaving
                ? { opacity: 0, scale: 0.96 }
                : {
                    rotate: [0, 28, 0],
                    scale: [1, 1.06, 1],
                    opacity: [0.35, 0.65, 0.35],
                  }
            }
            transition={{
              duration: isLeaving ? 0.25 : 4.2,
              repeat: isLeaving ? 0 : Infinity,
              ease: 'easeInOut',
            }}
          />

          <motion.div
            className="absolute bottom-16 left-10 h-24 w-24 rounded-full border border-[#c8f135]/12 sm:left-24 sm:h-32 sm:w-32 will-change-transform"
            animate={
              isLeaving
                ? { opacity: 0, scale: 0.96 }
                : {
                    y: [0, -18, 0],
                    opacity: [0.25, 0.55, 0.25],
                  }
            }
            transition={{
              duration: isLeaving ? 0.25 : 4.4,
              repeat: isLeaving ? 0 : Infinity,
              ease: 'easeInOut',
            }}
          />
        </>
      )}

      <motion.div
        className="relative z-10 flex flex-col items-center px-6 text-center will-change-transform"
        animate={{
          opacity: isLeaving ? 0 : 1,
          scale: isLeaving ? 0.965 : 1,
          y: isLeaving ? -18 : 0,
        }}
        transition={{
          duration: isLeaving ? 0.28 : 0.4,
          ease: 'easeOut',
        }}
      >
        <div className="relative mb-8 flex h-60 w-60 items-center justify-center sm:mb-10 sm:h-72 sm:w-72">
          <motion.div
            className="absolute inset-0 rounded-full border border-[#c8f135]/12 will-change-transform"
            initial={{ scale: 0.65, opacity: 0 }}
            animate={{
              scale: isLeaving ? 0.96 : 1,
              opacity: isLeaving ? 0 : 1,
              rotate: reduceMotion || isLeaving ? 0 : 360,
            }}
            transition={{
              scale: { duration: 0.7 },
              opacity: { duration: isLeaving ? 0.2 : 0.7 },
              rotate: {
                duration: 14,
                repeat: isLeaving ? 0 : Infinity,
                ease: 'linear',
              },
            }}
          />

          <motion.div
            className="absolute inset-8 rounded-full border border-[#c8f135]/14 will-change-transform"
            animate={{
              opacity: isLeaving ? 0 : 1,
              rotate: reduceMotion || isLeaving ? 0 : -360,
            }}
            transition={{
              opacity: { duration: 0.2 },
              rotate: {
                duration: 12,
                repeat: isLeaving ? 0 : Infinity,
                ease: 'linear',
              },
            }}
          />

          {skills.map((skill, index) => {
            const positions = [
              'top-3 left-1/2 -translate-x-1/2',
              'right-0 top-1/2 -translate-y-1/2',
              'bottom-3 left-1/2 -translate-x-1/2',
              'left-0 top-1/2 -translate-y-1/2',
            ]

            return (
              <motion.div
                key={skill}
                className={`absolute ${positions[index]} rounded-full border border-[#c8f135]/12 bg-[#161616]/70 px-3 py-1.5 text-[10px] text-[#c8f135]/80 backdrop-blur-sm sm:px-4 sm:py-2 sm:text-xs will-change-transform`}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{
                  opacity: isLeaving ? 0 : 1,
                  scale: isLeaving ? 0.9 : 1,
                }}
                transition={{
                  delay: isLeaving ? 0 : 0.45 + index * 0.15,
                  duration: isLeaving ? 0.2 : 0.5,
                }}
              >
                {skill}
              </motion.div>
            )
          })}

          <motion.div
            className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-[2rem] border border-[#c8f135]/20 bg-[#c8f135] shadow-[0_0_70px_rgba(200,241,53,0.16)] sm:h-32 sm:w-32 will-change-transform"
            initial={{ scale: 0, rotate: -12 }}
            animate={{
              scale: isLeaving ? 0.92 : 1,
              rotate: 0,
              opacity: isLeaving ? 0 : 1,
            }}
            transition={{
              delay: isLeaving ? 0 : 0.2,
              duration: isLeaving ? 0.25 : 0.7,
              ease: 'easeOut',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: isLeaving ? 0 : 1, y: isLeaving ? -8 : 0 }}
              transition={{
                delay: isLeaving ? 0 : 0.55,
                duration: isLeaving ? 0.2 : 0.4,
              }}
            >
              <DeveloperIcon />
            </motion.div>

            <motion.div
              className="absolute -bottom-2 -right-2 h-7 w-7 rounded-full bg-[#111111]"
              initial={{ scale: 0 }}
              animate={{ scale: isLeaving ? 0 : 1 }}
              transition={{
                delay: isLeaving ? 0 : 0.8,
                duration: isLeaving ? 0.2 : 0.35,
              }}
            />
          </motion.div>
        </div>

        <motion.p
          className="text-[10px] uppercase tracking-[0.28em] text-[#c8f135] sm:text-xs md:text-sm sm:tracking-[0.35em]"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: isLeaving ? 0 : 1, y: isLeaving ? -8 : 0 }}
          transition={{
            delay: isLeaving ? 0 : 1,
            duration: isLeaving ? 0.18 : 0.55,
          }}
        >
          Building Digital Experiences
        </motion.p>

        <motion.h1
          className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[#f0f0f0] sm:text-4xl md:text-6xl"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: isLeaving ? 0 : 1, y: isLeaving ? -10 : 0 }}
          transition={{
            delay: isLeaving ? 0 : 1.25,
            duration: isLeaving ? 0.18 : 0.7,
          }}
        >
          Muhammad <span className="text-[#c8f135]">Adil</span>
        </motion.h1>

        <motion.div
          className="mt-5 flex items-center gap-2 text-xs text-[#d0d0d0] sm:gap-3 sm:text-sm md:text-base"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: isLeaving ? 0 : 1, y: isLeaving ? -8 : 0 }}
          transition={{
            delay: isLeaving ? 0 : 1.55,
            duration: isLeaving ? 0.18 : 0.55,
          }}
        >
          <span className="text-[#9a9a9a]">&lt;</span>
          <span>WordPress & Shopify Developer</span>
          <span className="text-[#9a9a9a]">/&gt;</span>
        </motion.div>

        <motion.div
          className="mt-8 flex gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLeaving ? 0 : 1 }}
          transition={{
            delay: isLeaving ? 0 : 1.8,
            duration: isLeaving ? 0.16 : 0.3,
          }}
        >
          {[0, 1, 2].map((dot) => (
            <motion.span
              key={dot}
              className="h-2.5 w-2.5 rounded-full bg-[#c8f135]"
              animate={
                isLeaving
                  ? { opacity: 0, y: 0 }
                  : {
                      y: reduceMotion ? 0 : [0, -8, 0],
                      opacity: [0.35, 1, 0.35],
                    }
              }
              transition={{
                duration: isLeaving ? 0.15 : 0.75,
                repeat: isLeaving ? 0 : Infinity,
                delay: isLeaving ? 0 : dot * 0.15,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default IntroLoader