import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Loader, X } from 'lucide-react'
import { backdropVariants, modalVariants } from '../variants'

type VideoModalProps = {
  isOpen: boolean
  onClose: () => void
  title?: string
  videoSrc: string
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  title = 'Video player',
  videoSrc
}) => {
  const [loading, setLoading] = useState(true)

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
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader className="text-white" />
                </div>
              )}
              <iframe
                src={videoSrc}
                className="w-full h-full"
                onLoad={() => setLoading(false)}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
