import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { GitHubCalendar } from 'react-github-calendar'
import { useTheme } from '../hooks/useTheme'

const GITHUB_USER = 'JoelAundu'
const STATS_THEME = 'title_color=38bdf8&icon_color=38bdf8&text_color=94a3b8&bg_color=00000000&hide_border=true&ring_color=38bdf8'

const focusAreas = [
  {
    key: 'system_design',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
    chips: ['Scalability', 'Load Balancing', 'Caching', 'High Availability'],
    color: '#38bdf8',
  },
  {
    key: 'cloud',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    ),
    chips: ['AWS', 'Infrastructure as Code', 'Serverless', 'CI/CD'],
    color: '#818cf8',
  },
  {
    key: 'distributed',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
    chips: ['Event-Driven', 'Message Queues', 'CAP Theorem', 'Consistency'],
    color: '#34d399',
  },
  {
    key: 'patterns',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
      </svg>
    ),
    chips: ['Clean Architecture', 'DDD', 'CQRS', 'Event Sourcing'],
    color: '#f59e0b',
  },
]

function FocusCard({ area, index }: { area: typeof focusAreas[0]; index: number }) {
  const { t } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      className="relative bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 group hover:border-accent/40 transition-all duration-300 overflow-hidden"
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
        style={{ background: `radial-gradient(350px circle at 0% 0%, ${area.color}10, transparent 70%)` }}
      />

      {/* Icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
        style={{ background: `${area.color}18`, color: area.color, border: `1px solid ${area.color}30` }}
      >
        {area.icon}
      </div>

      {/* Title */}
      <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2 group-hover:text-accent transition-colors duration-300">
        {t(`growth.${area.key}_title`)}
      </h3>

      {/* Description */}
      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-5">
        {t(`growth.${area.key}_desc`)}
      </p>

      {/* Chips */}
      <div className="flex flex-wrap gap-2">
        {area.chips.map(chip => (
          <span
            key={chip}
            className="text-xs font-mono font-medium px-2 py-0.5 rounded"
            style={{ background: `${area.color}12`, color: area.color, border: `1px solid ${area.color}25` }}
          >
            {chip}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

const CURRENT_YEAR = new Date().getFullYear()
const YEARS = Array.from({ length: CURRENT_YEAR - 2018 }, (_, i) => 2019 + i)

function GitHubActivity() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { dark } = useTheme()
  const [selectedYear, setSelectedYear] = useState(CURRENT_YEAR)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-16"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
        <h3 className="text-lg font-black text-slate-900 dark:text-white">Live GitHub Activity</h3>
        <span className="flex items-center gap-1.5 text-xs font-semibold text-accent px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          Active
        </span>
      </div>

      {/* Stats row */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 flex items-center justify-center overflow-hidden">
          <img
            src={`https://github-readme-stats.vercel.app/api?username=${GITHUB_USER}&show_icons=true&${STATS_THEME}&hide_title=false`}
            alt="GitHub Stats"
            className="w-full max-w-sm"
            loading="lazy"
          />
        </div>
        <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 flex items-center justify-center overflow-hidden">
          <img
            src={`https://github-readme-streak-stats.herokuapp.com/?user=${GITHUB_USER}&theme=transparent&hide_border=true&ring=38bdf8&fire=38bdf8&currStreakLabel=38bdf8&sideLabels=94a3b8&dates=64748b&stroke=ffffff10`}
            alt="GitHub Streak"
            className="w-full max-w-sm"
            loading="lazy"
          />
        </div>
      </div>

      {/* Interactive contribution calendar */}
      <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-4 mb-4 min-w-0">
          <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 shrink-0">Contributions</span>
          <div className="flex gap-1 overflow-x-auto scrollbar-none min-w-0">
            {YEARS.map(year => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all duration-200 shrink-0 ${
                  selectedYear === year
                    ? 'bg-accent text-white shadow-sm shadow-accent/30'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <GitHubCalendar
            username={GITHUB_USER}
            year={selectedYear}
            colorScheme={dark ? 'dark' : 'light'}
            blockSize={13}
            blockMargin={4}
            fontSize={12}
            showWeekdayLabels
          />
        </div>
      </div>
    </motion.div>
  )
}

export default function GrowthPath() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="growth" className="section-padding bg-bg-light dark:bg-bg-dark">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-accent font-mono text-sm font-semibold mb-3">03. Growth Path</p>
          <h2 className="section-title dark:text-white text-slate-900 mb-4">{t('growth.title')}</h2>
          <div className="w-16 h-1 bg-accent rounded-full mb-4" />
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl">{t('growth.subtitle')}</p>
        </motion.div>

        {/* Mission statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-12 p-6 rounded-2xl border border-accent/20 bg-accent/5 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent to-transparent rounded-l-2xl" />
          <p className="text-slate-700 dark:text-slate-200 font-semibold text-lg pl-2">
            "{t('growth.mission')}"
          </p>
        </motion.div>

        {/* Focus area cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {focusAreas.map((area, i) => (
            <FocusCard key={area.key} area={area} index={i} />
          ))}
        </div>

        {/* GitHub activity */}
        <GitHubActivity />
      </div>
    </section>
  )
}
