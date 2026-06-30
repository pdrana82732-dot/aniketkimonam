import React, { useEffect, useRef } from 'react'
import { FiHeart } from 'react-icons/fi'
import wishes from '../../data/wishes.js'
import './GuestWishes.css'

export default function GuestWishes() {
  const trackRef = useRef(null)

  // duplicate the list for a seamless auto-scroll loop
  const loopWishes = [...wishes, ...wishes]

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    let frame
    let pos = 0
    const speed = 0.4

    function tick() {
      pos += speed
      if (track.scrollWidth && pos >= track.scrollWidth / 2) {
        pos = 0
      }
      track.style.transform = `translateX(-${pos}px)`
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div className="guest-wishes">
      <div className="guest-wishes__track" ref={trackRef}>
        {loopWishes.map((w, i) => (
          <div className="wish-card" key={`${w.id}-${i}`}>
            <FiHeart className="wish-card__icon" />
            <p className="wish-card__message">&ldquo;{w.message}&rdquo;</p>
            <span className="wish-card__name">{w.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
