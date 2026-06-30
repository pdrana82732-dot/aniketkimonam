import { useEffect, useRef } from 'react'

// Controls a single background-audio element across the whole app.
export default function useBackgroundMusic(isOn) {
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = new Audio('/videos/background-music.mp3')
    audio.loop = true
    audio.volume = 0.35
    audioRef.current = audio
    return () => {
      audio.pause()
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (isOn) {
      audio.play().catch(() => {
        /* Autoplay can be blocked until the user interacts with the page */
      })
    } else {
      audio.pause()
    }
  }, [isOn])

  return audioRef
}
