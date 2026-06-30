import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero/Hero.jsx'
import GuestWishes from '../components/GuestWishes/GuestWishes.jsx'
import FloatingHearts from '../components/MusicToggle/FloatingHearts.jsx'
import HighlightSlider from '../components/HighlightSlider/HighlightSlider.jsx'
import './Page.css'

export default function Home() {
  return (
    <div className="page">
      <Hero />

      <section className="section section--alt" style={{ position: 'relative' }}>
        <FloatingHearts count={8} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="page__section-head">
            <div>
              <p className="eyebrow">Celebrations</p>
              <h2 className="section-title">Highlighted Moments</h2>
            </div>

            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link to="/celebrations" className="cta-btn cta-btn--outline cta-btn--events">
                <span>View All Events</span>
                <span className="arrow-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
              </Link>
            </motion.div>
          </div>

          <HighlightSlider />
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="eyebrow">With Love, From Everyone</p>
          <h2 className="section-title">Guest Wishes</h2>
          <p className="section-sub" style={{ margin: '18px auto 40px' }}>
            Sweet words from the people who watched this love story unfold.
          </p>
        </div>
        <GuestWishes />
      </section>

      <section className="section page__cta">
        <div className="container page__cta-inner">
          <h2 className="section-title">Relive Every Memory</h2>
          <p className="section-sub" style={{ margin: '16px auto 28px' }}>
            Browse the full gallery of photos and videos from every celebration.
          </p>
          <div className="page__cta-actions">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link to="/gallery" className="cta-btn cta-btn--filled">
                <span>Explore Gallery</span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link to="/videos" className="cta-btn cta-btn--outline">
                <span>Watch Videos</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}