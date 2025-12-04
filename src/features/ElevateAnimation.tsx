import { useEffect, useRef, useState } from 'react'
import { Pause, Play, RefreshCcw } from 'lucide-react'

import { usePageVisible } from '../hooks/usePageVisible'

import ElevateLogo from '../components/ElevateLogo'

const ElevateAnimation = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const replayIntervalRef = useRef<number | null>(null)

  const [animationKey, setAnimationKey] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(true)

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
  )
}

export default ElevateAnimation
