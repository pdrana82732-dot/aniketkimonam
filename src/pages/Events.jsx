import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import EventCard from '../components/Timeline/EventCard.jsx'
import events from '../data/events.js'
import './Page.css'
import '../styles/EventsPage.css'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.16, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const lineItem = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: { opacity: 1, scaleX: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export default function Events() {
  return (
    <div className="page">
      {/* Decorative floating side ornament */}
      <div className="events-side-deco" aria-hidden="true">
        <div className="events-side-deco__vine" />

        <motion.span
          className="events-side-deco__item events-side-deco__item--ring"
          animate={{ y: [0, -22, 0], x: [0, 6, 0], rotate: [0, 12, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        >
          ◌
        </motion.span>

        <motion.span
          className="events-side-deco__item events-side-deco__item--petal"
          animate={{ y: [0, 28, 0], x: [0, -8, 0], rotate: [0, -20, 0], opacity: [0.4, 0.85, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        >
          ❀
        </motion.span>

        <motion.span
          className="events-side-deco__item events-side-deco__item--spark"
          animate={{ y: [0, -16, 0], rotate: [0, 18, 0], scale: [1, 1.25, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        >
          ✦
        </motion.span>

        <motion.span
          className="events-side-deco__item events-side-deco__item--petal events-side-deco__item--small"
          animate={{ y: [0, 20, 0], x: [0, 10, 0], rotate: [0, 25, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        >
          ❀
        </motion.span>

        <motion.span
          className="events-side-deco__item events-side-deco__item--ring events-side-deco__item--small"
          animate={{ y: [0, -18, 0], rotate: [0, -15, 0], opacity: [0.25, 0.6, 0.25] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 1.6 }}
        >
          ◌
        </motion.span>
      </div>

      <header className="page__header container">
        <motion.div
          className="events-hero"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <div className="events-hero__glow" />

          <motion.span className="events-hero__spark" variants={item} />

          <motion.div className="events-hero__eyebrow-row" variants={item}>
            <span className="flare" />
            <p className="eyebrow">A Story Worth Celebrating</p>
            <span className="flare right" />
          </motion.div>

          <motion.h1 className="section-title" variants={item}>
            Every Ritual, One Forever
          </motion.h1>

          <motion.p className="section-sub" variants={item}>
            From the Tilak to the wedding vows — step through each celebration
            that brought two families together as one.
          </motion.p>

          <motion.div className="events-hero__line" variants={lineItem} />
        </motion.div>
      </header>

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container">
          <div className="page__events-grid">
            {events.map((e, i) => (
              <EventCard key={e.id} event={e} index={i} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 60 }}>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
              <Link to="/gallery" className="cta-btn cta-btn--filled">
                <span>View Gallery</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}