import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.12, ease: 'easeOut' } }),
}

function StatCard({ value, label, index }: { value: string; label: string; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 text-center hover:border-accent/50 transition-colors duration-300"
    >
      <div className="text-3xl font-black gradient-text mb-1">{value}</div>
      <div className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">{label}</div>
    </motion.div>
  )
}

export default function About() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const stats = [
    { value: t('about.stat1_value'), label: t('about.stat1_label') },
    { value: t('about.stat2_value'), label: t('about.stat2_label') },
    { value: t('about.stat3_value'), label: t('about.stat3_label') },
    { value: t('about.stat4_value'), label: t('about.stat4_label') },
  ]

  return (
    <section id="about" className="section-padding bg-bg-light dark:bg-bg-dark">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-16"
        >
          <p className="text-accent font-mono text-sm font-semibold mb-3">01. About</p>
          <h2 className="section-title dark:text-white text-slate-900 mb-4">{t('about.title')}</h2>
          <div className="w-16 h-1 bg-accent rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: text */}
          <div>
            <motion.p
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-6"
            >
              {t('about.bio')}
            </motion.p>
            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8"
            >
              {t('about.bio2')}
            </motion.p>

            {/* Location + status badges */}
            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="flex flex-wrap gap-3"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm font-medium text-slate-600 dark:text-slate-300">
                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {t('about.location')}
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-sm font-semibold text-accent">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                {t('about.available')}
              </div>
            </motion.div>
          </div>

          {/* Right: photo + stats */}
          <div className="flex flex-col gap-6">
            {/* Profile photo */}
            <motion.div
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="flex justify-center lg:justify-start"
            >
              <div className="relative">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-accent/30 shadow-2xl shadow-accent/10">
                  <img
                    src="/assets/joel-photo.jpg"
                    alt="Joel Mosio Aundu"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Glow ring */}
                <div className="absolute inset-0 rounded-full border-2 border-accent/20 scale-110 animate-pulse-slow" />
              </div>
            </motion.div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <StatCard key={i} value={s.value} label={s.label} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
