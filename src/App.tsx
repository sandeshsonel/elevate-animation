import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Pause, Play, RefreshCcw } from 'lucide-react'

import { isExpired } from './utils'
import { usePageVisible } from './hooks/usePageVisible'
import { GITHUB_URL, HOW_ITS_WORK_URL } from './config'
import { bowlMaskAnim, starGlowVariants, starVariants } from './variants'

import { VideoModal } from './components/VideoModal'

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
          cy="158"
          r="40"
          fill="url(#star-glow)"
          initial="initial"
          animate="animate"
          variants={starGlowVariants}
        />

        {/* Star */}
        <g transform="translate(200 152) scale(0.8) translate(-200 -128)">
          <motion.path
            d="M249.892 129.683C219.813 134.787 206.985 147.373 200.713 179.873C200.671 180.092 200.346 180.091 200.308 179.871C195.032 149.573 183.442 135.373 151.378 129.735C151.151 129.695 151.155 129.352 151.384 129.322C179.797 125.507 192.806 114.33 200.318 81.7959C200.365 81.5927 200.661 81.5896 200.716 81.7907C210.479 117.203 222.927 123.82 249.9 129.279C250.118 129.324 250.112 129.646 249.892 129.683Z"
            fill="white"
            initial="initial"
            animate="animate"
            variants={starVariants}
          />
        </g>

        {/* Bowl shape at bottom */}

        <motion.g
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{
            duration: 1,
            delay: 3 // wait until previous animations finish.
          }}
          transform="translate(200 172) scale(0.3) translate(-200 -80)">
          <defs>
            <clipPath id="bowl-mask">
              <motion.rect x="0" width="400" {...bowlMaskAnim} />
            </clipPath>

            <clipPath id="fill-mask">
              <motion.rect
                x="-150"
                y="-100"
                width="600"
                height="600"
                initial={{ x: -500, rotate: 0 }}
                animate={{ x: 0, rotate: -60 }}
                transition={{
                  duration: 2,
                  ease: 'easeOut',
                  delay: 0.2
                }}
              />
            </clipPath>
          </defs>

          <motion.g
            initial={{ y: 0 }}
            animate={{ y: -120 }}
            transition={{
              delay: 1,
              duration: 1.2,
              ease: 'linear'
            }}>
            {/* LAYER 1: Outline */}
            <motion.path
              d="M 0 200 Q 180 210 200 400 Q 210 220 400 200 Z"
              stroke="#ffffff"
              strokeWidth="2"
              fill="none"
              clipPath="url(#bowl-mask)"
              initial={{ pathLength: 1 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 10 }}
            />

            {/* LAYER 2: Fill */}
            <motion.path
              d="M 0 200 Q 180 210 200 400 Q 210 220 400 200 Z"
              fill="#ffffff"
              stroke="none"
              clipPath="url(#fill-mask)"
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0, duration: 1.3, ease: 'easeInOut' }}
            />
          </motion.g>
        </motion.g>
        <motion.g
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: 0, opacity: 0 }}
          className="text-center mx-auto"
          transition={{
            y: {
              delay: 2,
              duration: 1.4,
              ease: 'linear'
            },
            opacity: {
              delay: 3.3, // fade AFTER everything else finishes
              duration: 1.2,
              ease: 'linear'
            }
          }}>
          <motion.text
            x="212"
            y="325"
            textAnchor="middle"
            fill="white"
            fontSize="32.5"
            letterSpacing="20"
            fontFamily="Inter, sans-serif"
            className="font-medium"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: -34 }}
            transition={{ delay: 1.4, duration: 0.8, ease: 'linear' }}>
            ELEVATE
          </motion.text>
        </motion.g>
      </svg>
    </motion.div>
  )
}

export default function App() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const replayIntervalRef = useRef<number | null>(null)

  const [animationKey, setAnimationKey] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isOpenAnimInfoModal, setIsOpenAnimInfoModal] = useState(false)

  // Trigger animation refresh
  const handleTriggerAnimation = () => {
    setAnimationKey((prev) => prev + 1)
  }

  // Play / Pause toggle
  const handleTogglePlayback = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) video.pause()
    else video.play()

    setIsPlaying((prev) => !prev)
  }

  // Restart the video & play immediately
  const handleRestartVideo = () => {
    setIsPlaying(true)

    const video = videoRef.current
    if (!video) return

    video.pause()
    video.currentTime = 0

    requestAnimationFrame(() => video.play())
  }

  // Start the looped sequence
  const handleStartReplayLoop = () => {
    // Clear any previous loop
    if (replayIntervalRef.current) {
      clearInterval(replayIntervalRef.current)
    }

    // initial trigger
    handleTriggerAnimation()
    handleRestartVideo()

    // set interval loop
    replayIntervalRef.current = setInterval(() => {
      handleTriggerAnimation()
    }, 4500)
  }

  const handleToggleInfoModal = () => {
    setIsOpenAnimInfoModal(!isOpenAnimInfoModal)
  }

  const handleNavigate = () => {
    window.open(GITHUB_URL, '_blank')
  }

  // Restart loop when tab becomes visible
  usePageVisible(handleStartReplayLoop)

  // Start once on mount
  useEffect(() => {
    const id = setTimeout(() => {
      handleStartReplayLoop()
    }, 0)
    return () => {
      clearTimeout(id)
      if (replayIntervalRef.current) {
        clearInterval(replayIntervalRef.current)
      }
    }
  }, [])

  return (
    <>
      <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-black p-4 overflow-hidden ">
        {!isExpired() && (
          <div className="absolute top-0 right-0 flex items-center space-x-4 mx-6 my-4">
            <button
              className="text-white cursor-pointer"
              onClick={handleToggleInfoModal}>
              How its Works ?
            </button>
            <button
              title="Github"
              onClick={handleNavigate}
              className="p-2 cursor-pointer rounded-full bg-neutral-900 text-neutral-500 hover:bg-neutral-800 hover:text-white transition-all duration-300 focus:outline-none">
              <Github size={16} />
            </button>
          </div>
        )}

        <div className="">
          <div className="grid md:grid-cols-2 sm::grid-cols-1 gap-4 max-w-4xl mx-auto">
            <div className="relative border border-neutral-900 bg-black rounded-xl p-8 shadow-2xl cursor-pointer">
              <ElevateLogo replayKey={animationKey} />

              {/* Replay Controls */}
              <div className="absolute top-3 left-0 px-4 group z-10 flex justify-between items-center w-full">
                <span className="text-white text-sm">Animation</span>
                <button
                  onClick={handleStartReplayLoop}
                  className="p-2 cursor-pointer rounded-full bg-neutral-900 text-neutral-500 hover:bg-neutral-800 hover:text-white transition-all duration-300 focus:outline-none"
                  title="Replay Animation">
                  <RefreshCcw size={18} />
                </button>
              </div>
            </div>
            <div className="relative border border-neutral-900 bg-black rounded-xl p-8 shadow-2xl cursor-pointer">
              {/* Video Element */}
              <video
                ref={videoRef}
                src="/assets/videos/example.mp4"
                className="rounded-lg w-full"
                loop
                autoPlay
                muted
                playsInline
                onLoadedData={handleStartReplayLoop}
              />
              <div className="absolute top-3 left-0 px-4 group z-10 flex justify-between items-center w-full">
                <span className="text-white text-sm">Video Animation</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleTogglePlayback}
                    className="p-2 cursor-pointer rounded-full bg-neutral-900 text-neutral-500 hover:bg-neutral-800 hover:text-white transition-all duration-300 focus:outline-none"
                    title={isPlaying ? 'Pause Animation' : 'Play Animation'}>
                    {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                  </button>
                  <button
                    onClick={handleStartReplayLoop}
                    className="p-2 cursor-pointer rounded-full bg-neutral-900 text-neutral-500 hover:bg-neutral-800 hover:text-white transition-all duration-300 focus:outline-none"
                    title="Replay Animation">
                    <RefreshCcw size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpenAnimInfoModal && (
        <VideoModal
          title="How its Works ?"
          isOpen={isOpenAnimInfoModal}
          onClose={handleToggleInfoModal}
          videoSrc={HOW_ITS_WORK_URL}
        />
      )}
    </>
  )
}
