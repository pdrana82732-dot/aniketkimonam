import React from 'react'
import { motion } from 'framer-motion'
import Timeline from '../components/Timeline/Timeline.jsx'
import './Page.css'

export default function LoveStory() {
  return (
    <div className="page">
      <header className="page__header container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="eyebrow">Our Love Story</p>
          <h1 className="section-title">From "Hello" to "I Do"</h1>
          <p className="section-sub" style={{ margin: '18px auto 0' }}>
            Every great love has a beginning. Here's how ours unfolded, one chapter at a time.
          </p>
        </motion.div>
      </header>

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container">
          <Timeline />
        </div>
      </section>
    </div>
  )
}
