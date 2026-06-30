import React from 'react'
import { motion } from 'framer-motion'
import VideoGallery from '../components/VideoGallery/VideoGallery.jsx'
import './Page.css'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Videos() {
  return (
    <div className="page">
      <header className="page__header container">
        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.p className="eyebrow" variants={item}>
            Moments In Motion
          </motion.p>
          <motion.h1 className="section-title" variants={item}>
            Video Gallery
          </motion.h1>
          <motion.p className="section-sub" variants={item} style={{ margin: '18px auto 0' }}>
            Watch the highlights, the laughter, and the tears of joy — every
            ceremony, captured in motion.
          </motion.p>
        </motion.div>
      </header>

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container">
          <VideoGallery />
        </div>
      </section>
    </div>
  )
}