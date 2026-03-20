import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const jobs = [
  {
    companyKey: 'experience.job1_company',
    roleKey: 'experience.job1_role',
    periodKey: 'experience.job1_period',
    locationKey: 'experience.job1_location',
    bullets: ['job1_b1', 'job1_b2', 'job1_b3', 'job1_b4', 'job1_b5'],
    current: true,
  },
  {
    companyKey: 'experience.job2_company',
    roleKey: 'experience.job2_role',
    periodKey: 'experience.job2_period',
    locationKey: 'experience.job2_location',
    bullets: ['job2_b1', 'job2_b2', 'job2_b3', 'job2_b4'],
    current: false,
  },
]

function JobCard({ job, index }: { job: typeof jobs[0]; index: number }) {
  const { t } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative pl-10 md:pl-16"
    >
      {/* Timeline dot */}
      <div className={`absolute left-0 top-1 w-4 h-4 rounded-full border-2 ${job.current ? 'bg-accent border-accent' : 'bg-transparent border-accent/50 dark:border-white/20'}`} />

      {/* Card */}
      <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 md:p-8 hover:border-accent/30 transition-colors duration-300">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-xl font-black text-slate-900 dark:text-white">{t(job.companyKey)}</h3>
              {job.current && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/30">
                  Current
                </span>
              )}
            </div>
            <p className="text-accent font-semibold text-base">{t(job.roleKey)}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 font-mono">{t(job.periodKey)}</p>
            <div className="flex items-center justify-end gap-1.5 mt-1">
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              <p className="text-xs text-slate-400">{t(job.locationKey)}</p>
            </div>
          </div>
        </div>

        <ul className="space-y-3">
          {job.bullets.map((bKey, bi) => (
            <motion.li
              key={bKey}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.15 + bi * 0.07 + 0.3 }}
              className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
              {t(`experience.${bKey}`)}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="experience" className="section-padding bg-slate-50 dark:bg-[#0d0d14]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-accent font-mono text-sm font-semibold mb-3">05. Experience</p>
          <h2 className="section-title dark:text-white text-slate-900 mb-4">{t('experience.title')}</h2>
          <div className="w-16 h-1 bg-accent rounded-full mb-4" />
          <p className="text-slate-500 dark:text-slate-400 text-lg">{t('experience.subtitle')}</p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[7px] md:left-[7px] top-0 bottom-0 w-px timeline-line" />

          <div className="space-y-10">
            {jobs.map((job, i) => <JobCard key={i} job={job} index={i} />)}
          </div>
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 pt-12 border-t border-slate-200 dark:border-white/10"
        >
          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6">Education & Certifications</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-5 hover:border-accent/30 transition-colors">
              <p className="font-bold text-slate-800 dark:text-white mb-1">Full Stack Engineering Specialization</p>
              <p className="text-accent text-sm font-semibold mb-1">HyperionDev</p>
              <p className="text-xs text-slate-400">Advanced MERN Stack · Microservices · Cloud Architecture</p>
            </div>
            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-5 hover:border-accent/30 transition-colors">
              <p className="font-bold text-slate-800 dark:text-white mb-1">Computer Systems Engineering</p>
              <p className="text-accent text-sm font-semibold mb-1">Cape Peninsula University of Technology</p>
              <p className="text-xs text-slate-400">Systems Design · Networking · Software Engineering Principles</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
