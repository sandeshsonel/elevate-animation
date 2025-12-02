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
  hidden: {
    opacity: 1,
    scale: 0.25,
    rotate: -90,
    x: -100,
    y: -60
  },

  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    x: 0,

    // ⭐ Keep your original y:0, then add a new top movement
    y: [0, 0, -60], // 1) your final position, 2) hold, 3) move up

    transition: {
      duration: 2, // your 3s animation + a little for the top move
      ease: [0.22, 1, 0.36, 1],
      times: [0, 0.78, 1], // first 78% = your animation, last 22% = move up
      delay: 0
    }
  }
}
