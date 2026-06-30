import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronDown } from 'react-icons/fi'
import FloatingParticles from './FloatingParticles.jsx'
import './Hero.css'

const WEDDING_DATE = new Date('2026-06-19T11:00:00')
const ANNIVERSARY_DATE = new Date('2027-06-19T11:00:00')

function useCountdown(target) {
  const [time, setTime] = useState(getTimeLeft())
  function getTimeLeft() {
    const diff = target - new Date()
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true }
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      done: false,
    }
  }
  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

const countItems = (days, hours, minutes, seconds) => [
  { v: days, l: 'Days' },
  { v: hours, l: 'Hours' },
  { v: minutes, l: 'Mins' },
  { v: seconds, l: 'Secs' },
]

export default function Hero() {
  const anniversary = useCountdown(ANNIVERSARY_DATE)

  return (
    <section className="hero" aria-label="Wedding hero">

      {/* Background Video */}
      <div className="hero__media">
        <video
          className="hero__video"
          src="https://res.cloudinary.com/dwie7kkgv/video/upload/v1782587972/Video_1_dpiml9.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="hero__overlay" />
      </div>

      <FloatingParticles />

      <div className="hero__ornament hero__ornament--tl">✦</div>
      <div className="hero__ornament hero__ornament--tr">✦</div>
      <div className="hero__ornament hero__ornament--bl">✦</div>
      <div className="hero__ornament hero__ornament--br">✦</div>

      <motion.div
        className="hero__deco-line hero__deco-line--top"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.3, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="hero__content container">

        <motion.div
          className="hero__eyebrow-wrap"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          style={{ marginTop: '80px' }}
        >
          <span className="hero__eyebrow-line" />
          <p className="eyebrow hero__eyebrow">A Journey of Love</p>
          <span className="hero__eyebrow-line" />
        </motion.div>

        <h1 className="hero__title" aria-label="Aniket & Monam">
          <motion.span
            className="hero__name"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            Aniket
          </motion.span>

          <motion.span
            className="hero__amp-wrap"
            initial={{ opacity: 0, scale: 0.4, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.75, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="hero__amp">&amp;</span>
          </motion.span>

          <motion.span
            className="hero__name"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            Monam
          </motion.span>
        </h1>

        <motion.div
          className="hero__divider"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
        >
          <span className="hero__divider-line" />
          <span className="hero__divider-icon">♥</span>
          <span className="hero__divider-line" />
        </motion.div>

        <motion.p
          className="hero__date"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
        >
          Married on 19th June, 2026 &middot; Chaita
        </motion.p>

        {anniversary.done ? (
          <motion.div
            className="hero__married"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, duration: 0.7 }}
          >
            <span className="hero__married-text">Happy 1st Anniversary! 🎉</span>
            <span className="hero__married-sub">One beautiful year together ♥</span>
          </motion.div>
        ) : (
          <motion.div
            className="hero__countdown-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.7 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}
          >
            <p className="hero__anniversary-label">
              ✦ Counting down For 1st Anniversary ✦
            </p>

            <div className="hero__countdown" style={{ marginTop: 0 }}>
              {countItems(anniversary.days, anniversary.hours, anniversary.minutes, anniversary.seconds).map((item, i) => (
                <motion.div
                  className="hero__count-box"
                  key={item.l}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 + i * 0.1, duration: 0.5 }}
                >
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={item.v}
                      className="hero__count-num"
                      initial={{ opacity: 0, y: -12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      transition={{ duration: 0.3 }}
                    >
                      {String(item.v).padStart(2, '0')}
                    </motion.span>
                  </AnimatePresence>
                  <span className="hero__count-label">{item.l}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          className="hero__cta"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.7 }}
        >
          <a href="/celebrations" className="hero__cta-btn">
            View Celebrations
          </a>
        </motion.div>
      </div>

      <motion.div
        className="hero__deco-line hero__deco-line--bottom"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
        >
          <FiChevronDown />
        </motion.div>
      </motion.div>
    </section>
  )
}