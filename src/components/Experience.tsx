import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'

interface ClientPlacement {
  nameKey: string
  roleKey: string
  bullets: string[]
}

interface Job {
  companyKey: string
  roleKey: string
  periodKey: string
  locationKey: string
  bullets: string[]
  current: boolean
  clients?: ClientPlacement[]
}

const jobs: Job[] = [
  {
    companyKey: 'experience.job3_company',
    roleKey: 'experience.job3_role',
    periodKey: 'experience.job3_period',
    locationKey: 'experience.job3_location',
    bullets: ['job3_b1'],
    current: true,
    clients: [
      {
        nameKey: 'experience.job3_client1_name',
        roleKey: 'experience.job3_client1_role',
        bullets: ['job3_client1_b1', 'job3_client1_b2', 'job3_client1_b3'],
      },
    ],
  },
  {
    companyKey: 'experience.job1_company',
    roleKey: 'experience.job1_role',
    periodKey: 'experience.job1_period',
    locationKey: 'experience.job1_location',
    bullets: ['job1_b6', 'job1_b7', 'job1_b8', 'job1_b9', 'job1_b3', 'job1_b5'],
    current: false,
  },
  {
    companyKey: 'experience.job2_company',
    roleKey: 'experience.job2_role',
    periodKey: 'experience.job2_period',
    locationKey: 'experience.job2_location',
    bullets: ['job2_b2', 'job2_b3', 'job2_b4'],
    current: false,
  },
]

function JobCard({ job, index }: { job: Job; index: number }) {
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

        {job.clients && (
          <div className="mt-6 space-y-5">
            {job.clients.map((client, ci) => (
              <div key={ci} className="pl-4 border-l-2 border-accent/30">
                <span className="text-xs font-bold text-accent uppercase tracking-wider">Client Placement</span>
                <div className="flex flex-wrap items-baseline gap-x-2 mt-1 mb-3">
                  <h4 className="font-bold text-slate-800 dark:text-white">{t(client.nameKey)}:</h4>
                  <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">{t(client.roleKey)}</span>
                </div>
                <ul className="space-y-2.5">
                  {client.bullets.map(bKey => (
                    <li key={bKey} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent/60 mt-2 flex-shrink-0" />
                      {t(`experience.${bKey}`)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
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
              <p className="font-bold text-slate-800 dark:text-white mb-1">Full Stack Web Development Bootcamp</p>
              <p className="text-accent text-sm font-semibold mb-1">HyperionDev</p>
              <p className="text-xs text-slate-400 font-mono mb-3">Apr 2020 – Aug 2020</p>
              <ul className="space-y-1.5">
                {[
                  'HTML5, CSS3, Bootstrap 4',
                  'JavaScript ES6, DOM Manipulation, jQuery',
                  'Bash, Git & Version Control',
                  'Node.js, Express.js, EJS',
                  'SQL, MongoDB, Mongoose',
                  'RESTful APIs, JSON, Authentication, Firebase',
                  'React.js, React Hooks, Web Design',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="w-1 h-1 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-5 hover:border-accent/30 transition-colors">
              <p className="font-bold text-slate-800 dark:text-white mb-1">Computer Systems Engineering</p>
              <p className="text-accent text-sm font-semibold mb-1">Cape Peninsula University of Technology</p>
              <p className="text-xs text-slate-400 font-mono mb-3">2016 – 2019</p>
              <ul className="space-y-1.5">
                {[
                  'C & Java Programming',
                  'CISCO IT Essentials & CCNA Routing and Switching',
                  'MySQL: Design, implement & maintain relational databases',
                  'Digital Systems: Microcontroller programming (Arduino UNO)',
                  'Electrical & Electronic Engineering: Circuit design & troubleshooting',
                  'Computer hardware, software & network installation',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="w-1 h-1 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
