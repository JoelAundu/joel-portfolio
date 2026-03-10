import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-slate-50 dark:bg-[#070710] border-t border-slate-200 dark:border-white/5 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <p className="font-black text-lg">
            <span className="text-accent">J</span>
            <span className="dark:text-white text-slate-900">oel Aundu</span>
          </p>
          <p className="text-xs text-slate-400 mt-1">Software Engineer · Cape Town, South Africa</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-slate-400 font-mono">{t('footer.built')}</p>
        </div>
        <p className="text-xs text-slate-400">
          © {year} Joel Aundu. {t('footer.rights')}.
        </p>
      </div>
    </footer>
  )
}
