import type { Variants } from 'framer-motion'

export const starGlowVariants: Variants = {
  initial: {
    fillOpacity: 0,
    opacity: 0,
    scale: 0,
    y: 0 // starting point
  },
  animate: {
    fillOpacity: 1,
    y: -40, // only go upward
    scale: [0.4, 0.6, 1],
    opacity: [0.2],
    transition: {
      duration: 2,
      delay: 1.4
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
