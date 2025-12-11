/* eslint-disable @typescript-eslint/no-explicit-any */
import type { MotionProps, Variants } from 'framer-motion'

interface Anim extends MotionProps {
  initial: Record<string, any>
  animate: Record<string, any>
  transition: Record<string, any>
}

export const starGlowVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0
  },
  animate: {
    opacity: [0, 0.2, 0],
    scale: [0, 0.8, 1],
    y: [0, -44],

    transition: {
      duration: 1.2,
      delay: 1,
      ease: 'linear',
      opacity: {
        duration: 5.4
      }
    }
  }
}

export const starVariants: Variants = {
  initial: {
    opacity: 1,
    scale: 0.2,
    rotate: 0,
    x: -66,
    y: -22
  },
  animate: {
    x: [-70, -55, 0, 0],
    y: [-20, -19.8, 16, -44],
    rotate: [-20, 80, 180, 180],
    opacity: [1, 1, 1, 0],
    scale: [0.2, 0.6, 0.8],

    transition: {
      duration: 2.8,
      delay: 0,
      ease: 'linear',
      times: [0.1, 0.2, 0.4, 0.8],
      opacity: {
        duration: 4,
        delay: 0.3
      },
      scale: {
        duration: 2,
        ease: 'linear'
      }
    }
  }
}

export const bowlMaskAnim: Anim = {
  initial: { y: 400, height: 0 },
  animate: { y: 190, height: 210 },
  transition: { duration: 0.4, ease: 'easeInOut', delay: 0.2 }
}

export const bowlRiseVariants: Anim = {
  initial: { y: 0 },
  animate: { y: -125 },
  transition: { delay: 1.2, duration: 1, ease: 'linear' }
}

export const fadeOutVariants: Anim = {
  initial: { opacity: 1 },
  animate: { opacity: 0 },
  transition: { duration: 1, delay: 3 }
}

export const fillMaskVariants: Anim = {
  initial: { x: -500, rotate: 0 },
  animate: { x: 0, rotate: -60 },
  transition: {
    duration: 2.6,
    ease: ['easeOut', 'linear', 'easeInOut'],
    delay: 0.2
  }
}

export const textGroupVariants: Variants = {
  initial: { y: 0, opacity: 1 },
  animate: {
    y: 0,
    opacity: 0,
    transition: {
      opacity: { delay: 3.3, duration: 1.2, ease: 'linear' }
    }
  }
}

export const textVariants: Variants = {
  initial: { y: 0, opacity: 0 },
  animate: {
    opacity: 1,
    y: -32,

    transition: {
      delay: 1.5,
      duration: 0.8,
      ease: 'linear'
    }
  }
}

export const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
}

export const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 220,
      damping: 20
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: { duration: 0.15 }
  }
}
