import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const ringX = useSpring(cursorX, { stiffness: 120, damping: 18 })
  const ringY = useSpring(cursorY, { stiffness: 120, damping: 18 })

  const dotRef = useRef<HTMLDivElement>(null)
  const isHovering = useRef(false)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      isHovering.current = !!(t.closest('a, button, [data-hover]'))
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', handleOver)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', handleOver)
    }
  }, [cursorX, cursorY])

  return (
    <>
      {/* Dot */}
      <motion.div
        ref={dotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-accent rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
      />
      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-accent/60 pointer-events-none z-[9998] hidden md:block"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: isHovering.current ? 1.8 : 1, opacity: isHovering.current ? 0.5 : 0.8 }}
        transition={{ duration: 0.2 }}
      />
    </>
  )
}
