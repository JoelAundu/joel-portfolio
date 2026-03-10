import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const projects = [
  {
    num: '01',
    titleKey: 'projects.p1_title',
    roleKey: 'projects.p1_role',
    descKey: 'projects.p1_desc',
    tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'WebSockets', 'Docker', 'Jest'],
    github: 'https://github.com/JoelAundu',
    live: null,
    color: '#38bdf8',
  },
  {
    num: '02',
    titleKey: 'projects.p2_title',
    roleKey: 'projects.p2_role',
    descKey: 'projects.p2_desc',
    tech: ['React', 'GraphQL', 'TypeScript', 'TailwindCSS', 'Firebase'],
    github: 'https://github.com/JoelAundu',
    live: null,
    color: '#818cf8',
  },
  {
    num: '03',
    titleKey: 'projects.p3_title',
    roleKey: 'projects.p3_role',
    descKey: 'projects.p3_desc',
    tech: ['React Native', 'JavaScript', 'Firebase', 'Mapbox'],
    github: 'https://github.com/JoelAundu',
    live: null,
    color: '#34d399',
  },
  {
    num: '04',
    titleKey: 'projects.p4_title',
    roleKey: 'projects.p4_role',
    descKey: 'projects.p4_desc',
    tech: ['HTML', 'JavaScript', 'Supabase', 'PayFast', 'EmailJS', 'Google Apps Script'],
    github: 'https://github.com/JoelAundu',
    live: 'https://ziondewnaturals.com',
    color: '#4ade80',
  },
]

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const { t } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 10
    const y = -((e.clientX - rect.left) / rect.width - 0.5) * 10
    setTilt({ x, y })
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.3s ease',
      }}
      className="relative bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-8 group hover:border-accent/40 transition-colors duration-300 overflow-hidden"
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
        style={{ background: `radial-gradient(400px circle at 50% 0%, ${project.color}12, transparent 70%)` }}
      />

      {/* Number */}
      <div className="font-mono text-5xl font-black mb-6" style={{ color: project.color, opacity: 0.15 }}>
        {project.num}
      </div>

      {/* Role badge */}
      <div className="mb-3">
        <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md"
          style={{ background: `${project.color}18`, color: project.color, border: `1px solid ${project.color}30` }}>
          {t(project.roleKey)}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 leading-tight group-hover:text-accent transition-colors duration-300">
        {t(project.titleKey)}
      </h3>

      {/* Description */}
      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
        {t(project.descKey)}
      </p>

      {/* Tech chips */}
      <div className="flex flex-wrap gap-2 mb-8">
        {project.tech.map(tech => (
          <span key={tech} className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/10">
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-4">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-accent dark:hover:text-accent transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
          {t('projects.github')}
        </a>
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-dark transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            {t('projects.live')}
          </a>
        )}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" className="section-padding bg-bg-light dark:bg-bg-dark">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-accent font-mono text-sm font-semibold mb-3">03. Projects</p>
          <h2 className="section-title dark:text-white text-slate-900 mb-4">{t('projects.title')}</h2>
          <div className="w-16 h-1 bg-accent rounded-full mb-4" />
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-xl">{t('projects.subtitle')}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => <ProjectCard key={p.num} project={p} index={i} />)}
        </div>
      </div>
    </section>
  )
}
