/* eslint-disable @typescript-eslint/no-explicit-any */
import type { MotionProps, Variants } from 'framer-motion'

interface Anim extends MotionProps {
  initial: Record<string, any>
  animate: Record<string, any>
  transition: Record<string, any>
}

export const starGlowVariants: Variants = {
  initial: {
    fillOpacity: 0,
    opacity: 0,
    scale: 0,
    y: 0
  },
  animate: {
    opacity: [0.3],
    fillOpacity: [0, 1, 1, 0],

    scale: [0.8, 1],
    y: -50,

    transition: {
      ease: 'linear',
      delay: 1.4,
      duration: 2
    }
  }
}

export const textContainerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 1.8,
      ease: 'easeOut' as const
    }
  }
}

export const starVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.1,
    rotate: 0,
    x: -100,
    y: 0
  },
  animate: {
    x: [-100, -70, 0, 0],
    y: [-40, -35, 0, -30],
    rotate: [0, 40, 180, 180],
    opacity: [0, 1, 1, 0],
    scale: [0.1, 0.3, 0.8, 1],

    transition: {
      duration: 2.8,
      delay: 0.6,
      ease: 'linear',
      times: [0.1, 0.2, 0.4, 0.8],
      opacity: {
        duration: 4, // fade time
        delay: 1 // delay AFTER main animation finishes
      }
    }
  }
}

export const bowlMaskAnim: Anim = {
  initial: { y: 400, height: 0 },
  animate: { y: 190, height: 210 },
  transition: { duration: 0.4, ease: 'easeInOut', delay: 0.2 }
}

export const fillMaskAnim: Anim = {
  initial: { x: -500, rotate: 60 },
  animate: { x: 0, rotate: 30 },
  transition: { duration: 2.4, ease: 'easeInOut', delay: 0.3 }
}

export const wrapperAnim: Anim = {
  initial: { y: 0 },
  animate: { y: -60 },
  transition: { delay: 1.6, duration: 1.8, ease: 'linear' }
}

export const outlineAnim: Anim = {
  initial: { pathLength: 1.2 },
  animate: { opacity: 1 },
  transition: { duration: 10 }
}

export const fillAnim: Anim = {
  initial: { opacity: 0.8 },
  animate: { opacity: 1 },
  transition: { delay: 1, duration: 1, ease: 'easeInOut' }
}
