import type { Variants } from 'framer-motion'

export const starGlowVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 0 },
  visible: {
    opacity: [0, 0.3, 0.15] as const,
    scale: [0.8, 1.4, 1.1] as const,
    y: [0, 0, -10], // ➜ last animation moves up 10px
    transition: {
      duration: 3,
      times: [0, 0.5, 1] as const,
      delay: 1.0,
      repeat: Infinity,
      repeatType: 'reverse'
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
    top: -100,
    rotate: 0,
    x: -100,
    y: -60
  },
  animate: {
    x: [-100, 0, 0],
    y: [-60, 0, -40],
    rotate: [0, 360, 360],
    opacity: [0, 1, 1],
    scale: [0.1, 1, 1],
    transition: {
      duration: 2.8,
      delay: 0.6,
      ease: 'linear',
      times: [0, 0.4, 1] // first part 1.4s, second part 3s
    }
  }
}
