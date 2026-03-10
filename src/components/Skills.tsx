import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const skillCategories = [
  {
    key: 'frontend',
    icon: '⚡',
    skills: ['React', 'TypeScript', 'Next.js', 'Astro', 'GraphQL', 'TailwindCSS', 'WebSocket', 'HTML5', 'CSS3'],
  },
  {
    key: 'backend',
    icon: '🛠',
    skills: ['Node.js', 'Express', 'PostgreSQL', 'Prisma', 'REST APIs', 'Microservices', 'MongoDB', 'JWT'],
  },
  {
    key: 'tools',
    icon: '🚀',
    skills: ['Docker', 'AWS', 'Firebase', 'Git', 'CI/CD', 'Jest', 'Playwright', 'Performance Optimization'],
  },
  {
    key: 'mobile',
    icon: '📱',
    skills: ['React Native', 'Mapbox', 'Agile', 'Scrum', 'TDD', 'System Design', 'Code Review'],
  },
]

function SkillCard({ category, labelKey, index }: { category: typeof skillCategories[0]; labelKey: string; index: number }) {
  const { t } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 hover:border-accent/40 transition-colors duration-300 group"
    >
      <div className="flex items-center gap-3 mb-5">
        <span className="text-2xl">{category.icon}</span>
        <h3 className="font-bold text-slate-800 dark:text-white text-lg">{labelKey}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {category.skills.map(skill => (
          <motion.span
            key={skill}
            whileHover={{ scale: 1.05, y: -2 }}
            className="tech-chip"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" className="section-padding bg-slate-50 dark:bg-[#0d0d14]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-accent font-mono text-sm font-semibold mb-3">02. Skills</p>
          <h2 className="section-title dark:text-white text-slate-900 mb-4">{t('skills.title')}</h2>
          <div className="w-16 h-1 bg-accent rounded-full mb-4" />
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-xl">{t('skills.subtitle')}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((cat, i) => (
            <SkillCard
              key={cat.key}
              category={cat}
              labelKey={t(`skills.${cat.key}`)}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
