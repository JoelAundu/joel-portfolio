import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import i18n from '../i18n'

const LANGS = ['EN', 'ES', 'FR']

interface NavbarProps {
  dark: boolean
  toggleTheme: () => void
}

export default function Navbar({ dark, toggleTheme }: NavbarProps) {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState(i18n.language.toUpperCase().slice(0, 2))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const changeLang = (lang: string) => {
    const code = lang.toLowerCase()
    i18n.changeLanguage(code)
    localStorage.setItem('lang', code)
    setCurrentLang(lang)
  }

  const links = [
    { key: 'about', href: '#about' },
    { key: 'skills', href: '#skills' },
    { key: 'growth', href: '#growth' },
    { key: 'projects', href: '#projects' },
    { key: 'experience', href: '#experience' },
    { key: 'contact', href: '#contact' },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'py-3 backdrop-blur-xl bg-white/80 dark:bg-bg-dark/80 border-b border-slate-200/50 dark:border-white/5 shadow-sm'
            : 'py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="font-black text-xl tracking-tight">
            <span className="text-accent">J</span>
            <span className="dark:text-white text-slate-900">A</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <a
                key={l.key}
                href={l.href}
                onClick={e => handleNavClick(e, l.href)}
                className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-accent dark:hover:text-accent transition-colors duration-200"
              >
                {t(`nav.${l.key}`)}
              </a>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* Lang switcher */}
            <div className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-white/5 rounded-full p-1">
              {LANGS.map(lang => (
                <button
                  key={lang}
                  onClick={() => changeLang(lang)}
                  className={`text-xs font-bold px-2.5 py-1 rounded-full transition-all duration-200 ${
                    currentLang === lang
                      ? 'bg-accent text-bg-dark'
                      : 'text-slate-500 dark:text-slate-400 hover:text-accent'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-accent transition-colors"
              aria-label="Toggle theme"
            >
              {dark ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Mobile burger */}
            <button
              className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className={`w-5 h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-5 h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-5 h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-bg-light dark:bg-bg-dark flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {links.map((l, i) => (
              <motion.a
                key={l.key}
                href={l.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={e => { handleNavClick(e, l.href); setMenuOpen(false) }}
                className="text-3xl font-black text-slate-800 dark:text-white hover:text-accent transition-colors"
              >
                {t(`nav.${l.key}`)}
              </motion.a>
            ))}
            {/* Mobile lang */}
            <div className="flex gap-3 mt-4">
              {LANGS.map(lang => (
                <button
                  key={lang}
                  onClick={() => { changeLang(lang); setMenuOpen(false) }}
                  className={`text-sm font-bold px-3 py-1.5 rounded-full border transition-all ${
                    currentLang === lang
                      ? 'bg-accent text-bg-dark border-accent'
                      : 'border-slate-300 dark:border-white/20 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
