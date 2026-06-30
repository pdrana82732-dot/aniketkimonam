import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import './EventCard.css'

export default function EventCard({ event, index }) {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <>
      <motion.article
        className="event-card"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -8 }}
        onClick={() => setOpen(true)}
        style={{ cursor: 'pointer' }}
      >
        <div className="event-card__image-wrap">
          <img src={event.image} alt={event.title} loading="lazy" className="event-card__image" />
          <div className="event-card__overlay" />
          <span className="event-card__date">{event.date}</span>
        </div>
        <div className="event-card__body">
          <h3 className="event-card__title">{event.title}</h3>
          <p className="event-card__location">{event.location}</p>
          <p className="event-card__desc">{event.description}</p>
        </div>
      </motion.article>

      <AnimatePresence>
        {open && (
          <motion.div
            className="event-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="event-modal"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="event-modal__close" onClick={() => setOpen(false)}>✕</button>
              <div className="event-modal__image-wrap">
                <img src={event.image} alt={event.title} className="event-modal__image" />
              </div>
              <div className="event-modal__body">
                <span className="event-modal__date">{event.date}</span>
                <h2 className="event-modal__title">{event.title}</h2>
                <p className="event-modal__location">{event.location}</p>
                <p className="event-modal__desc">{event.description}</p>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
                  <button
                    className="cta-btn cta-btn--filled"
                    onClick={() => navigate(`/gallery?event=${event.id}`)}
                  >
                    <span>Explore More</span>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}