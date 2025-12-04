import { useState } from 'react'

import { isExpired } from './utils'
import { GITHUB_URL, HOW_ITS_WORK_URL } from './config'

import { VideoModal } from './components/VideoModal'
import ElevateAnimation from './features/ElevateAnimation'

export default function App() {
  const [isOpenAnimInfoModal, setIsOpenAnimInfoModal] = useState(false)

  const handleToggleInfoModal = () => {
    setIsOpenAnimInfoModal(!isOpenAnimInfoModal)
  }

  const handleNavigate = () => {
    window.open(GITHUB_URL, '_blank')
  }

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
              className="p-1.5 cursor-pointer rounded-full bg-neutral-900 text-neutral-500 hover:bg-neutral-800 hover:text-white transition-all duration-300 focus:outline-none border border-gray-700">
              <img
                src="/assets/images/github-icon.svg"
                alt="github"
                className="w-4 h-4 text-white fill-current"
              />
            </button>
          </div>
        )}
        <ElevateAnimation />
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
