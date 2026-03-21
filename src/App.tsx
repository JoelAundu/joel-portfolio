import { useEffect } from 'react'
import { useTheme } from './hooks/useTheme'
import { useLenis } from './hooks/useLenis'
import { Toaster } from 'react-hot-toast'

import Cursor from './components/Cursor'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import GrowthPath from './components/GrowthPath'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const { dark, toggle } = useTheme()
  useLenis()

  // Apply dark class on mount
  useEffect(() => {
    const root = document.documentElement
    if (dark) root.classList.add('dark')
    else root.classList.remove('dark')
  }, [dark])

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#0a0a0f',
            color: '#ffffff',
            border: '1px solid rgba(56,189,248,0.3)',
            borderRadius: '12px',
            padding: '14px 20px',
            fontSize: '14px',
            fontWeight: '600',
          },
          success: {
            iconTheme: { primary: '#38bdf8', secondary: '#0a0a0f' },
          },
          error: {
            iconTheme: { primary: '#f87171', secondary: '#0a0a0f' },
          },
        }}
      />
      <Cursor />
      <ScrollProgress />
      <Navbar dark={dark} toggleTheme={toggle} />
      <main>
        <Hero />
        <About />
        <Skills />
        <GrowthPath />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
