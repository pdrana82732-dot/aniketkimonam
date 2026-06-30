import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlay, FiX } from 'react-icons/fi'
import videosData from '../../data/videos.js'
import './VideoGallery.css'

function VideoCard({ video, index, onPlay }) {
  const videoRef = useRef(null)

  return (
    <motion.div
      className="video-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      onMouseEnter={() => videoRef.current?.play?.().catch(() => { })}
      onMouseLeave={() => {
        if (videoRef.current) {
          videoRef.current.pause()
          videoRef.current.currentTime = 0
        }
      }}
    >
      <button className="video-card__media" onClick={() => onPlay(video)} aria-label={`Play ${video.title}`}>
        <img src={video.thumbnail} alt={video.title} loading="lazy" className="video-card__thumb" />
        <video ref={videoRef} className="video-card__preview" src={video.src} muted loop playsInline />
        <span className="video-card__play">
          <FiPlay />
        </span>
        <span className="video-card__duration">{video.duration}</span>
      </button>
      <div className="video-card__body">
        <h3 className="video-card__title">{video.title}</h3>
        <span className="video-card__category">{video.category}</span>
      </div>
    </motion.div>
  )
}

export default function VideoGallery() {
  const [active, setActive] = useState(null)

  return (
    <div className="video-gallery">
      <div className="video-gallery__grid">
        {videosData.map((v, i) => (
          <VideoCard key={v.id} video={v} index={i} onPlay={setActive} />
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="video-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="video-modal__content"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="video-modal__close" onClick={() => setActive(null)} aria-label="Close video">
                <FiX />
              </button>
              <video src={active.src} controls autoPlay className="video-modal__player" />
              <p className="video-modal__title">{active.title}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}