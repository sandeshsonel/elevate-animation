import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { starGlowVariants, starVariants } from './variants/index.'
import { RefreshCcw } from 'lucide-react'

interface PropTypes {
  replayKey: number
}

const ElevateLogo: React.FC<PropTypes> = ({ replayKey }) => {
  return (
    <motion.div
      key={replayKey}
      initial="hidden"
      animate="visible"
      className="relative w-full max-w-md aspect-square flex flex-col justify-center items-center">
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full drop-shadow-2xl"
        xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="star-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.8" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Glow */}
        <motion.circle
          cx="200"
          cy="120"
          r="70"
          fill="url(#star-glow)"
          variants={starGlowVariants}
        />

        {/* Star */}
        <motion.path
          d="M 200 60 
         Q 212 110 260 120 
         Q 212 130 200 180 
         Q 188 130 140 120 
         Q 188 110 200 60 Z"
          fill="white"
          variants={starVariants}
          initial="hidden"
          animate="visible"
        />

        {/* Bowl shape at bottom */}

        <defs>
          {/* MASK 1: Vertical Reveal (For the Outline) 
              This is your existing code.
          */}
          <clipPath id="bowl-mask">
            <motion.rect
              x="0"
              width="400"
              initial={{ y: 400, height: 0 }}
              animate={{ y: 190, height: 210 }}
              transition={{
                duration: 1.5,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.2
              }}
            />
          </clipPath>

          {/* MASK 2: Angled Fill Reveal (For the Solid White) 
              - We rotate this mask 55 degrees.
              - We start it far to the left (x: -500) and move it right.
              - The delay is set to 1.7s (1.5s + 0.2s) so it starts 
                exactly when the outline finishes.
          */}
          <clipPath id="fill-mask">
            <motion.rect
              x="-150"
              y="-100"
              width="600"
              height="600"
              initial={{ x: -500, rotate: 60 }}
              animate={{ x: 0, rotate: 30 }}
              transition={{
                duration: 2.4,
                ease: 'easeInOut',
                delay: 0.3
              }}
              style={{
                originX: 200 / 600, // ~0.33
                originY: 300 / 600 // ~0.5
              }}
            />
          </clipPath>
        </defs>

        {/* LAYER 1: The Outline (Bottom -> Top) 
            This uses your original logic.
        */}
        <motion.g style={{ transform: 'translate(80px, 74px) scale(0.6)' }}>
          <motion.path
            d="M 0 200 Q 180 210 200 400 Q 210 220 400 200 Z"
            stroke="#ffffff"
            strokeWidth="2"
            fill="none"
            clipPath="url(#bowl-mask)"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
        </motion.g>

        {/* LAYER 2: The Solid Fill (Left -> Right, 55deg) 
            - Same Path 'd'
            - Solid Fill, No Stroke
            - Uses the new 'fill-mask'
        */}
        <motion.g style={{ transform: 'translate(80px, 74px) scale(0.6)' }}>
          <motion.path
            d="M 0 200 Q 180 210 200 400 Q 210 220 400 200 Z"
            fill="#ffffff"
            stroke="none"
            clipPath="url(#fill-mask)"
            // Optional: Add a slight opacity fade alongside the wipe for smoothness
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7, duration: 1 }}
          />
        </motion.g>
      </svg>
    </motion.div>
  )
}

export default function App() {
  const [replayKey, setReplayKey] = useState(0)

  const handleReplay = () => {
    setReplayKey((prev) => prev + 1)
  }

  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center p-4 overflow-hidden font-sans">
      <div className="relative border border-neutral-900 bg-black rounded-xl p-8 shadow-2xl">
        <ElevateLogo replayKey={replayKey} />

        {/* Replay Controls */}
        <div className="absolute top-4 right-4 group z-10">
          <button
            onClick={handleReplay}
            className="p-2 rounded-full bg-neutral-900 text-neutral-500 hover:bg-neutral-800 hover:text-white transition-all duration-300 focus:outline-none"
            title="Replay Animation">
            <RefreshCcw size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
