import React, { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { backdropVariants, modalVariants } from '../variants'

type VideoModalProps = {
  isOpen: boolean
  onClose: () => void
  videoSrc: string
  title?: string
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoSrc,
  title = 'Video player'
}) => {
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}>
          <motion.div
            className="relative w-full max-w-3xl rounded-2xl bg-neutral-950/90 p-3 sm:p-4 shadow-xl border border-white/10"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-sm sm:text-base font-medium text-white/90">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/10 text-white/70 text-sm hover:bg-white/10 transition"
                aria-label="Close video">
                <X size={16} />
              </button>
            </div>

            <div className="relative w-full overflow-hidden rounded-xl bg-black aspect-video">
              {videoSrc.endsWith('.mp4') ? (
                <video
                  src={videoSrc}
                  controls
                  autoPlay
                  className="h-full w-full object-contain bg-black"
                />
              ) : (
                <iframe
                  src={videoSrc}
                  title={title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
