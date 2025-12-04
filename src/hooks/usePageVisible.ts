import { useEffect } from 'react'

export function usePageVisible(callback: () => void) {
  useEffect(() => {
    const handler = () => {
      if (document.visibilityState === 'visible') {
        callback()
      }
    }

    document.addEventListener('visibilitychange', handler)

    return () => document.removeEventListener('visibilitychange', handler)
  }, [callback])
}
