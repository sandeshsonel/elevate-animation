import { motion } from 'framer-motion'
import {
  bowlMaskAnim,
  bowlRiseVariants,
  fadeOutVariants,
  fillMaskVariants,
  starGlowVariants,
  starVariants
} from '../variants'

interface PropTypes {
  replayKey: number
}

const ElevateLogo: React.FC<PropTypes> = ({ replayKey }) => {
  return (
    <motion.div
      key={replayKey}
      initial="hidden"
      animate="visible"
      className="relative w-full max-w-md aspect-square flex justify-center items-center">
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full drop-shadow-2xl"
        xmlns="http://www.w3.org/2000/svg">
        {/* ----------------------------------------------------------
              GRADIENT DEFINITIONS
          ----------------------------------------------------------- */}
        <defs>
          <radialGradient id="star-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.8" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ----------------------------------------------------------
              STAR GLOW BEHIND STAR
          ----------------------------------------------------------- */}
        <motion.circle
          cx="200"
          cy="170"
          r="40"
          fill="url(#star-glow)"
          initial="initial"
          animate="animate"
          variants={starGlowVariants}
        />

        {/* ----------------------------------------------------------
              MAIN STAR SHAPE
          ----------------------------------------------------------- */}
        <g transform="translate(200 156) scale(0.8) translate(-200 -128)">
          <motion.path
            d="M249.892 129.683C219.813 134.787 206.985 147.373 200.713 179.873C200.671 180.092 200.346 180.091 200.308 179.871C195.032 149.573 183.442 135.373 151.378 129.735C151.151 129.695 151.155 129.352 151.384 129.322C179.797 125.507 192.806 114.33 200.318 81.7959C200.365 81.5927 200.661 81.5896 200.716 81.7907C210.479 117.203 222.927 123.82 249.9 129.279C250.118 129.324 250.112 129.646 249.892 129.683Z"
            fill="white"
            initial="initial"
            animate="animate"
            variants={starVariants}
          />
        </g>

        {/* ----------------------------------------------------------
              ANIMATED BOWL SHAPE (BOTTOM SHINE EFFECT)
          ----------------------------------------------------------- */}
        <motion.svg
          width={124}
          height={124}
          viewBox="0 0 400 400"
          x={140}
          y={144}>
          <motion.g
            {...fadeOutVariants} // fade-out animation
          >
            <defs>
              {/* Mask for drawing bowl outline */}
              <clipPath id="bowl-mask">
                <motion.rect x="0" width="400" {...bowlMaskAnim} />
              </clipPath>

              {/* Mask for filling the bowl */}
              <clipPath id="fill-mask">
                <motion.rect
                  x="-150"
                  y="-100"
                  width="600"
                  height="600"
                  {...fillMaskVariants}
                />
              </clipPath>
            </defs>

            {/* Bowl moves up */}
            <motion.g {...bowlRiseVariants}>
              {/* Bowl outline */}
              <motion.path
                d="M 0 200 Q 180 210 200 400 Q 210 220 400 200 Z"
                stroke="#ffffff"
                strokeWidth="2"
                fill="none"
                clipPath="url(#bowl-mask)" // reveal outline using mask
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
              />

              {/* Bowl fill */}
              <motion.path
                d="M 0 200 Q 180 210 200 400 Q 210 220 400 200 Z"
                fill="#ffffff"
                clipPath="url(#fill-mask)" // reveal fill using mask
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.3, ease: 'easeInOut' }}
              />
            </motion.g>
          </motion.g>
        </motion.svg>

        {/* ----------------------------------------------------------
              TEXT ANIMATION – "ELEVATE"
          ----------------------------------------------------------- */}
        <motion.g
          /* Fade-out + slight upward shift group container */
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: 0, opacity: 0 }}
          transition={{
            // Group stays still vertically but fades out after text animates in
            opacity: { delay: 3.3, duration: 1.2, ease: 'linear' }
          }}>
          <motion.text
            x="212"
            y="325"
            textAnchor="middle"
            fill="white"
            fontSize="33"
            letterSpacing="20"
            fontFamily="Inter, sans-serif"
            /* Text fades & drifts upward */
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: -32 }}
            transition={{
              delay: 1.5, // Text appears first
              duration: 0.8, // Smooth quick rise
              ease: 'linear'
            }}>
            ELEVATE
          </motion.text>
        </motion.g>
      </svg>
    </motion.div>
  )
}

export default ElevateLogo
